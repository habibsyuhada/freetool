import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const authHandler: NextApiHandler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        const userData = {  
          id: user.id,  
          email: user.email,  
          name: user.name,  
          image: user.image,  
        };

        const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;  
        if (!jwtSecret) {  
          throw new Error("JWT_SECRET is not defined in the environment variables");  
        }  
        const token = sign(userData, jwtSecret, { expiresIn: '1h' });  

        return {
          ...userData,
          token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {  
    async jwt({ token, user }) {  
      if (user) {  
        token.id = user.id;  
        token.email = user.email; // Simpan email jika perlu  
        token.name = user.name; // Simpan nama jika perlu  
        token.image = user.image; // Simpan gambar jika perlu  
        token.token = user.token; // Simpan token JWT  
      }  
      return token;  
    },  
    async session({ session, token }) {  
      if (session?.user) {  
        session.user.id = token.id as string;  
        session.user.token = token.token as string; // Pastikan token diakses dengan benar  
      }  
      return session;  
    },  
  }  
  
});

export default authHandler;
