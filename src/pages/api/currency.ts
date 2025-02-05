import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Currency {
  base_code: string;
  conversion_rates: string;
  update_date: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { base_code } = req.query;

    if (base_code) {
      const conversion = await prisma.currency.findUnique({
        where: { base_code: String(base_code) },
      });

      if (conversion) {
        res.status(200).json(conversion);
      } else {
        res.status(200).json([]);
        // res.status(404).json({ message: 'Conversion not found' });
      }
    } else {
      const conversions = await prisma.currency.findMany();
      res.status(200).json(conversions);
    }
  } else if (req.method === 'POST') {
    const { base_code, conversion_rates, update_date }: Currency = req.body;

    const newConversion = await prisma.currency.create({
      data: {
        base_code,
        conversion_rates: typeof conversion_rates === 'object' ? JSON.stringify(conversion_rates) : conversion_rates,
        update_date: `${update_date}T00:00:00.000Z`,
      },
    });
    res.status(201).json(newConversion);
  } else if (req.method === 'PUT') {
    const { base_code, conversion_rates, update_date }: Currency = req.body;

    const updatedConversion = await prisma.currency.update({
      where: { base_code: String(base_code) },
      data: {
        conversion_rates: typeof conversion_rates === 'object' ? JSON.stringify(conversion_rates) : conversion_rates,
        update_date: `${update_date}T00:00:00.000Z`,
      },
    });
    res.status(200).json(updatedConversion);
  } else if (req.method === 'DELETE') {
    const { base_code } = req.body;

    await prisma.currency.delete({
      where: { base_code },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}