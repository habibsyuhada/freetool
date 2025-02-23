import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

interface MasterCurrency {
  code: string;
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('master_currency')
        .select('*');

      if (error) {
        throw error;
      }

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const currency: MasterCurrency = req.body;
      
      const { error } = await supabase
        .from('master_currency')
        .upsert({
          code: currency.code,
          name: currency.name
        });

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: 'Master currency added successfully' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const currency: MasterCurrency = req.body;
      
      const { error } = await supabase
        .from('master_currency')
        .update({ name: currency.name })
        .eq('code', currency.code);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: 'Master currency updated successfully' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { code } = req.body;
      
      const { error } = await supabase
        .from('master_currency')
        .delete()
        .eq('code', code);

      if (error) {
        throw error;
      }

      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}