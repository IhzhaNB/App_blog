import { Handler, Request } from "express";
import prisma from "../lib/prisma";
import ResponseJson from "../util/ResponseJson";
import bcrypt from "bcrypt";
import * as Yup from "yup";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";

import passport from "passport";
import ErrorResponse from "../util/ErrorResponse";
import { User } from "@prisma/client";
import generateToken from "../util/generateToken";
import authConfig from "../config/auth";
import attachCookie from "../util/attachCookie";

const userRequestBody = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export const register: Handler = async (req, res, next) => {
  try {
    const { username, password } = await userRequestBody.validate(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json(new ResponseJson(true, "Register Success", { newUser }));
  } catch (error) {
    return next(error);
  }
};

passport.use(
  new LocalStrategy(async function (username: string, password: string, done) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        throw new ErrorResponse("User Not Found", 401);
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new ErrorResponse("Wrong Password", 401);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export const login: Handler = async (req, res, next) => {
  try {
    passport.authenticate("local", (err: ErrorResponse, user: User) => {
      if (err) {
        return next(new ErrorResponse(err.message, 401));
      }

      const token = generateToken(user.id);
      attachCookie(res, token);

      return res.status(200).json(
        new ResponseJson(true, "Logged in Success", {
          user: { ...user, password: undefined },
          token,
        })
      );
    })(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const cookieExtrator = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const optionJwt: StrategyOptionsWithoutRequest = {
  jwtFromRequest: cookieExtrator,
  secretOrKey: authConfig.secretKey,
};

passport.use(
  new JwtStrategy(optionJwt, async function (jwtPayload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwtPayload.id,
        },
      });

      if (!user) {
        throw new ErrorResponse("User Not Found", 401);
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

export const getUser: Handler = (req, res, next) => {
  return res.status(200).json(
    new ResponseJson(true, "Get User Success", {
      user: {
        ...req.user,
        password: undefined,
      },
    })
  );
};

passport.use(
  new GoogleStrategy(
    {
      clientID: authConfig.googleClientId,
      clientSecret: authConfig.googleClientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        let user = await prisma.user.findUnique({
          where: { username: profile.displayName },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: profile.displayName,
              password: "",
            },
          });
        }

        return callback(null, user);
      } catch (error) {
        callback(error as Error);
      }
    }
  )
);

export const redirectToGoogle: Handler = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })(req, res, next);
};

export const handleGoogleCallback: Handler = (req, res, next) => {
  passport.authenticate(
    "google",
    {
      session: false,
    },
    (err: Error, user: User) => {
      const token = generateToken(user.id);

      attachCookie(res, token);

      return res.redirect(`http://localhost:5173`);
    }
  )(req, res, next);
};

export { passport };
