import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

interface Currency {
  base_code: string;
  conversion_rates: string;
  update_date: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { base_code } = req.query;
      console.log('Fetching currency data for base_code:', base_code);

      let query = supabase.from('currency').select('*');
      
      if (base_code) {
        query = query.eq('base_code', base_code);
      }

      const { data, error } = await query;
      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ 
          error: error.message,
          data: base_code ? {
            base_code: base_code,
            conversion_rates: "{}",
            update_date: new Date().toISOString()
          } : []
        });
      }

      // If requesting specific currency but not found
      if (base_code && (!data || data.length === 0)) {
        console.log('Currency not found, fetching from external API');
        try {
          const externalResponse = await fetch(`https://v6.exchangerate-api.com/v6/fe7dfda1cacbc547ab0385d6/latest/${base_code}`);
          const externalData = await externalResponse.json();
          
          if (externalResponse.ok) {
            // Insert the new data
            const { error: insertError } = await supabase
              .from('currency')
              .upsert({
                base_code: base_code,
                conversion_rates: JSON.stringify(externalData.conversion_rates),
                update_date: new Date().toISOString()
              });

            if (insertError) {
              console.error('Error inserting new currency data:', insertError);
            }

            return res.status(200).json({
              base_code: base_code,
              conversion_rates: JSON.stringify(externalData.conversion_rates),
              update_date: new Date().toISOString()
            });
          } else {
            console.error('External API error:', externalData);
            return res.status(404).json({ 
              error: `Currency with base_code ${base_code} not found`,
              data: {
                base_code: base_code,
                conversion_rates: "{}",
                update_date: new Date().toISOString()
              }
            });
          }
        } catch (externalError) {
          console.error('External API error:', externalError);
          return res.status(404).json({ 
            error: `Currency with base_code ${base_code} not found`,
            data: {
              base_code: base_code,
              conversion_rates: "{}",
              update_date: new Date().toISOString()
            }
          });
        }
      }

      // Ensure conversion_rates is always a valid JSON string
      const formattedData = data?.map(item => ({
        ...item,
        conversion_rates: typeof item.conversion_rates === 'string' 
          ? item.conversion_rates 
          : JSON.stringify(item.conversion_rates || {}),
        update_date: item.update_date || new Date().toISOString()
      }));

      if (base_code) {
        return res.status(200).json(formattedData?.[0] || {
          base_code: base_code,
          conversion_rates: "{}",
          update_date: new Date().toISOString()
        });
      }

      return res.status(200).json(formattedData || []);
    } catch (error: any) {
      console.error('API error:', error);
      return res.status(500).json({ 
        error: error.message,
        data: req.query.base_code ? {
          base_code: req.query.base_code,
          conversion_rates: "{}",
          update_date: new Date().toISOString()
        } : []
      });
    }
  } else if (req.method === 'POST') {
    try {
      const currency: Currency = req.body;
      
      const { error } = await supabase
        .from('currency')
        .upsert({
          base_code: currency.base_code,
          conversion_rates: currency.conversion_rates,
          update_date: currency.update_date
        });

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: 'Currency updated successfully' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { base_code, conversion_rates, update_date }: Currency = req.body;

      const { error } = await supabase
        .from('currency')
        .update({
          conversion_rates: typeof conversion_rates === 'object' ? JSON.stringify(conversion_rates) : conversion_rates,
          update_date: update_date,
        })
        .eq('base_code', base_code);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: 'Currency updated successfully' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { base_code } = req.body;

      const { error } = await supabase
        .from('currency')
        .delete()
        .eq('base_code', base_code);

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