import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { sign } from 'jsonwebtoken';
import { authOptions } from './[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the session server-side
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      console.error('No session found');
      return res.status(401).json({ error: 'No session found' });
    }

    if (!session.user) {
      console.error('No user in session:', session);
      return res.status(401).json({ error: 'No user in session' });
    }

    if (!session.user.id || !session.user.email) {
      console.error('Missing required user data:', session.user);
      return res.status(400).json({ error: 'Missing required user data' });
    }

    // Check for encryption secret
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error('No encryption secret found in environment variables');
      return res.status(500).json({ error: 'Server configuration error - No encryption secret' });
    }

    // Create JWT token with error handling
    try {
      const token = sign(
        {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name || undefined
        },
        secret,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token });
    } catch (signError) {
      console.error('Error signing JWT:', signError);
      return res.status(500).json({ error: 'Failed to generate token' });
    }
  } catch (error) {
    console.error('Unexpected error in token generation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 