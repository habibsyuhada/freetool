import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MasterCurrency {
  code: string;
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { code } = req.query;

    if (code) {
      const conversion = await prisma.master_currency.findUnique({
        where: { code: String(code) },
      });

      if (conversion) {
        res.status(200).json(conversion);
      } else {
        res.status(200).json([conversion]);
      }
    } else {
      const conversions = await prisma.master_currency.findMany();
      res.status(200).json(conversions);
    }
  } else if (req.method === 'POST') {
    const { code, name }: MasterCurrency = req.body;

    const newConversion = await prisma.master_currency.create({
      data: {
        code,
        name,
      },
    });
    res.status(201).json(newConversion);
  } else if (req.method === 'PUT') {
    const { code, name }: MasterCurrency = req.body;

    const updatedConversion = await prisma.master_currency.update({
      where: { code },
      data: {
        name,
      },
    });
    res.status(200).json(updatedConversion);
  } else if (req.method === 'DELETE') {
    const { code } = req.body;

    await prisma.master_currency.delete({
      where: { code },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}