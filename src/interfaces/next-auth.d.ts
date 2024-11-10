import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Agrega el tipo id
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface Token {
    id: string;
  }
}
