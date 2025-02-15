import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with required fields
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(), // Generate a UUID for the user
        name: name || null,
        email,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    // Create credentials account with required fields
    await prisma.account.create({
      data: {
        id: crypto.randomUUID(), // Generate a UUID for the account
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: user.id,
      },
    });

    return res.status(200).json({ message: 'User created successfully', userId: user.id });
  } catch (error: any) {
    console.error('Registration error:', error?.message || 'Unknown error');
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error?.message || 'Unknown error'
    });
  }
}
