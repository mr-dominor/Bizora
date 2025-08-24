import dotenv from 'dotenv';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

// Load .env variables
dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const sql = postgres(process.env.DATABASE_URL!);

import items from '@/utils/fashion_products_with_images.json';
import itemsusers from '@/utils/users.json';
import wishlistItems from '@/utils/wishlist.json';
import cartItems from '@/utils/cart.json';

async function ensureUuidExtension() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log('UUID extension ensured.');
  } catch (e) {
    console.warn('UUID extension issue:', (e as Error).message);
  }
}

async function seedItems() {
  console.log('Seeding items...');
  await sql`
    CREATE TABLE IF NOT EXISTS items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      occasion VARCHAR(255) NOT NULL,
      style VARCHAR(255) NOT NULL,
      fit VARCHAR(255) NOT NULL,
      fabric VARCHAR(255) NOT NULL,
      color VARCHAR(255) NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      features TEXT NOT NULL,
      image VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  for (const item of items) {
    await sql`
      INSERT INTO items (title, occasion, style, fit, fabric, color, price, features, image)
      VALUES (${item.title}, ${item.occasion}, ${item.style}, ${item.fit}, ${item.fabric}, ${item.color}, ${item.price}, ${item.features}, ${item.image})
      ON CONFLICT DO NOTHING
    `;
  }
  console.log('Items seeded.');
}

async function seedUsers() {
  console.log('Seeding users...');
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      userId UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      phoneNumber VARCHAR(20) NOT NULL,
      address VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  for (const user of itemsusers) {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    await sql`
      INSERT INTO users (userId, name, email, phoneNumber, address, password, createdAt)
      VALUES (${user.userId}, ${user.name}, ${user.email}, ${user.phoneNumber}, ${user.address}, ${hashedPassword}, ${user.createdAt || new Date()})
      ON CONFLICT (userId) DO NOTHING
    `;
  }
  console.log('Users seeded.');
}

async function seedCart() {
  console.log('Seeding cart...');
  await sql`
    CREATE TABLE IF NOT EXISTS cart (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      cartId VARCHAR(255) NOT NULL,
      userId UUID NOT NULL REFERENCES users(userId) ON DELETE CASCADE,
      productId UUID NOT NULL,
      quantity INT NOT NULL CHECK (quantity > 0),
      price DECIMAL(10,2) NOT NULL,
      image VARCHAR(255) NOT NULL,
      totalPrice DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price) STORED,
      addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  for (const item of cartItems) {
    await sql`
      INSERT INTO cart (cartId, userId, productId, quantity, price, image, addedAt)
      VALUES (${item.cartId}, ${item.userId}, ${item.productId}, ${item.quantity}, ${item.price}, ${item.image}, ${item.addedAt || new Date()})
      ON CONFLICT DO NOTHING
    `;
  }
  console.log('Cart seeded.');
}

async function seedWishlist() {
  console.log('Seeding wishlist...');
  await sql`
    CREATE TABLE IF NOT EXISTS wishlist (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      userId UUID NOT NULL REFERENCES users(userId) ON DELETE CASCADE,
      productId UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  for (const item of wishlistItems) {
    await sql`
      INSERT INTO wishlist (userId, productId, title, image, addedAt)
      VALUES (${item.userId}, ${item.productId}, ${item.title}, ${item.image}, ${item.addedAt || new Date()})
      ON CONFLICT DO NOTHING
    `;
  }
  console.log('Wishlist seeded.');
}
export async function GET() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    await ensureUuidExtension();

    await sql.begin(async () => {
      // await seedItems();
      await seedCart();
      await seedWishlist();
    });

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }), { status: 200 });
  } catch (error) {
    console.error('Seeding failed:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), { status: 500 });
  }
}
