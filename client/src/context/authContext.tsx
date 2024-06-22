import { ResponseJson } from "@/types";
import AppAxios from "@/util/AppAxios";
import { User } from "@prisma/client";
import * as React from "react";

interface AuthContext {
  user: User | null;
}

const initialState: AuthContext = {
  user: null,
};

const AuthContext = React.createContext(initialState);

interface GetUserResponseData {
  user: User;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const getCurrentUser = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }

      const res = await AppAxios.post<ResponseJson<GetUserResponseData>>(
        "/auth/getuser"
      );

      setUser(res.data.data.user);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const { user } = React.useContext(AuthContext);

  return { user };
};
