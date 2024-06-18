interface AuthConfig {
  secretKey: string;
  expiresJwt: string;
  googleClientId: string;
  googleClientSecret: string;
}

const authConfig = {
  secretKey: process.env.SECRET_KEY,
  expiresJwt: process.env.EXPIRED_JWT,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
} as AuthConfig;

export default authConfig;
