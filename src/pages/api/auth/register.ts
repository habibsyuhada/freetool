import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

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

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password should be at least 6 characters' });
    }

    // Additional password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
      });
    }

    // Sign up user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || null,
        },
        emailRedirectTo: `${process.env.NEXTAUTH_URL}/auth/callback`
      },
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ 
      message: 'User created successfully', 
      userId: data.user?.id 
    });
  } catch (error: any) {
    console.error('Registration error:', error?.message || 'Unknown error');
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error?.message || 'Unknown error'
    });
  }
}
