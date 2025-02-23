import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function migrateCurrencyData() {
  console.log('Migrating currency data...');
  const currencies = await prisma.currency.findMany();
  
  for (const currency of currencies) {
    const { error } = await supabase
      .from('currency')
      .upsert({
        base_code: currency.base_code,
        conversion_rates: currency.conversion_rates,
        update_date: currency.update_date
      });
      
    if (error) {
      console.error(`Error migrating currency ${currency.base_code}:`, error);
    }
  }
}

async function migrateMasterCurrency() {
  console.log('Migrating master currency data...');
  const masterCurrencies = await prisma.master_currency.findMany();
  
  for (const currency of masterCurrencies) {
    const { error } = await supabase
      .from('master_currency')
      .upsert({
        code: currency.code,
        name: currency.name
      });
      
    if (error) {
      console.error(`Error migrating master currency ${currency.code}:`, error);
    }
  }
}

async function migrateUsers() {
  console.log('Migrating users...');
  const users = await prisma.user.findMany({
    include: {
      Account: true,
      Habit: true
    }
  });
  
  for (const user of users) {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password || crypto.randomUUID(), // Generate random password if none exists
      email_confirm: true,
      user_metadata: {
        name: user.name,
        image: user.image
      }
    });

    if (authError) {
      console.error(`Error migrating user ${user.email}:`, authError);
      continue;
    }

    // Migrate habits
    for (const habit of user.Habit) {
      const { error: habitError } = await supabase
        .from('habits')
        .insert({
          id: habit.id,
          name: habit.name,
          description: habit.description,
          created_at: habit.createdAt,
          updated_at: habit.updatedAt,
          user_id: authData.user.id
        });

      if (habitError) {
        console.error(`Error migrating habit ${habit.id}:`, habitError);
      }
    }
  }
}

async function main() {
  try {
    await migrateCurrencyData();
    await migrateMasterCurrency();
    await migrateUsers();
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 