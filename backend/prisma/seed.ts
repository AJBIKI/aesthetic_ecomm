import { PrismaClient, IssueStatus, StockStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.product.deleteMany();
  await prisma.volume.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.order.deleteMany();
  await prisma.adminUser.deleteMany();

  // Create Issue
  const issue = await prisma.issue.create({
    data: {
      code: 'ISSUE 01 / SS26',
      title: 'The Rain Issue.',
      subtitle: 'Dresses That Move With The Season.',
      season: 'Spring / Summer 2026',
      status: IssueStatus.ACTIVE,
      coverImage: 'https://cdn.themonsoonclub.com/hero-1.png',
      manifesto: {
        quote: 'Fashion is the armor to survive the reality of everyday life.',
        paragraphs: [
          'The Monsoon Club debuts with an exploration of movement, weight, and the poetry of draping. Each piece is a study in how fabric interacts with the body — how it falls, folds, and flows through space.',
          'This first issue brings together three volumes that span the spectrum of silk craftsmanship: from the liquid weight of 30-momme Mulberry to the ethereal lightness of Habotai, to the sculptural permanence of archival silhouettes.',
          'Welcome to The Rain Issue. Welcome to The Monsoon Club.',
        ],
      },
      minPrice: 12500,
      maxPrice: 24500,
      cities: ['MUMBAI', 'LONDON', 'PARIS'],
      publishedAt: new Date(),
    },
  });

  // Create Volumes
  const vol1 = await prisma.volume.create({
    data: {
      issueId: issue.id,
      volumeNumber: 'VOL. I',
      name: '30-Momme Mulberry Silks',
      fabricCategory: 'Mulberry Silk',
      description: 'Heavyweight bias-cut silk gowns that drape to the floor with liquid momentum. Each piece is handcrafted from 30-momme sand-washed Mulberry silk.',
      heroImage: 'https://cdn.themonsoonclub.com/hero-1.png',
      order: 1,
    },
  });

  const vol2 = await prisma.volume.create({
    data: {
      issueId: issue.id,
      volumeNumber: 'VOL. II',
      name: 'Washed Silk Habotai Slips',
      fabricCategory: 'Habotai Silk',
      description: 'Light-as-air habotai silk slips and separates. Washed for a soft, lived-in hand feel with a subtle crinkled texture.',
      heroImage: 'https://cdn.themonsoonclub.com/dress-2-a.png',
      order: 2,
    },
  });

  const vol3 = await prisma.volume.create({
    data: {
      issueId: issue.id,
      volumeNumber: 'VOL. III',
      name: 'Archival Silhouettes',
      fabricCategory: 'Structured Silk',
      description: 'Sculptural evening pieces that blend structure with fluidity. Architectural draping meets timeless elegance.',
      heroImage: 'https://cdn.themonsoonclub.com/dress-3-a.png',
      order: 3,
    },
  });

  // Create Products
  await prisma.product.create({
    data: {
      slug: 'midnight-bias-gown',
      issueId: issue.id,
      volumeId: vol1.id,
      figureTag: '[FIG. 01.1]',
      name: 'The Midnight Bias Gown',
      price: 18500,
      currency: 'INR',
      category: 'Bias Silk Gown',
      tagline: 'Drapes to the floor with liquid momentum.',
      description: 'Cut on a true 45-degree bias from heavy 30-momme Mulberry silk. Features a deep cowl back and hand-mitered seams that skim the body without clinging.',
      fabric: '100% 30-momme sand-washed Mulberry Silk',
      care: 'Dry clean only. Store flat.',
      details: ['Hand-mitered silk seams', 'Deep cowl back', 'Inner silk weight hem', 'Made in India'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      stockStatus: StockStatus.IN_STOCK,
      isFeatured: true,
      primaryImage: 'https://cdn.themonsoonclub.com/dress-1-a.png',
      hoverImage: 'https://cdn.themonsoonclub.com/dress-1-b.png',
      gallery: [
        'https://cdn.themonsoonclub.com/dress-1-a.png',
        'https://cdn.themonsoonclub.com/dress-1-b.png',
      ],
    },
  });

  await prisma.product.create({
    data: {
      slug: 'deep-ocean-cowl-gown',
      issueId: issue.id,
      volumeId: vol1.id,
      figureTag: '[FIG. 01.2]',
      name: 'The Deep Ocean Cowl Gown',
      price: 19500,
      currency: 'INR',
      category: 'Bias Silk Gown',
      tagline: 'A plunge into midnight.',
      description: 'An architectural cowl neckline cascades into a full-length bias-cut silhouette. The weight of the 30-momme silk creates a liquid drape that moves with the body.',
      fabric: '100% 30-momme sand-washed Mulberry Silk',
      care: 'Dry clean only. Store flat.',
      details: ['Dramatic cowl neckline', 'Full-length bias cut', 'Side seam pockets'],
      sizes: ['XS', 'S', 'M', 'L'],
      stockStatus: StockStatus.IN_STOCK,
      isFeatured: true,
      primaryImage: 'https://cdn.themonsoonclub.com/dress-2-a.png',
      hoverImage: 'https://cdn.themonsoonclub.com/dress-2-b.png',
      gallery: [
        'https://cdn.themonsoonclub.com/dress-2-a.png',
        'https://cdn.themonsoonclub.com/dress-2-b.png',
      ],
    },
  });

  await prisma.product.create({
    data: {
      slug: 'ember-silk-slip',
      issueId: issue.id,
      volumeId: vol2.id,
      figureTag: '[FIG. 02.1]',
      name: 'The Ember Silk Slip',
      price: 12500,
      currency: 'INR',
      category: 'Habotai Silk Slip',
      tagline: 'Barely there, unforgettable.',
      description: 'A weightless habotai silk slip dress with delicate spaghetti straps. The washed finish gives it a soft, matte hand feel with a subtle, organic texture.',
      fabric: '100% 8-momme washed Habotai Silk',
      care: 'Hand wash cold. Line dry.',
      details: ['Adjustable spaghetti straps', 'Washed for softness', 'French seam construction'],
      sizes: ['XS', 'S', 'M', 'L'],
      stockStatus: StockStatus.LOW_STOCK,
      isFeatured: false,
      primaryImage: 'https://cdn.themonsoonclub.com/dress-3-a.png',
      hoverImage: 'https://cdn.themonsoonclub.com/dress-3-b.png',
      gallery: [
        'https://cdn.themonsoonclub.com/dress-3-a.png',
        'https://cdn.themonsoonclub.com/dress-3-b.png',
      ],
    },
  });

  await prisma.product.create({
    data: {
      slug: 'storm-cloud-mini',
      issueId: issue.id,
      volumeId: vol2.id,
      figureTag: '[FIG. 02.2]',
      name: 'The Storm Cloud Mini',
      price: 13500,
      currency: 'INR',
      category: 'Habotai Silk Mini',
      tagline: 'A storm in miniature.',
      description: 'A short, swingy habotai silk dress with voluminous dolman sleeves. The lightweight fabric catches air with every movement.',
      fabric: '100% 8-momme washed Habotai Silk',
      care: 'Hand wash cold. Line dry.',
      details: ['Dolman sleeves', 'Elasticated waist', 'Side pockets'],
      sizes: ['S', 'M', 'L', 'XL'],
      stockStatus: StockStatus.IN_STOCK,
      isFeatured: false,
      primaryImage: 'https://cdn.themonsoonclub.com/dress-4-a.png',
      hoverImage: 'https://cdn.themonsoonclub.com/dress-4-b.png',
      gallery: [
        'https://cdn.themonsoonclub.com/dress-4-a.png',
        'https://cdn.themonsoonclub.com/dress-4-b.png',
      ],
    },
  });

  await prisma.product.create({
    data: {
      slug: 'dusk-column-gown',
      issueId: issue.id,
      volumeId: vol3.id,
      figureTag: '[FIG. 03.1]',
      name: 'The Dusk Column Gown',
      price: 24500,
      currency: 'INR',
      category: 'Structured Silk Gown',
      tagline: 'Standing at the edge of night.',
      description: 'A sculptural column gown that combines structured silk with a liquid crepe back. The fitted bodice opens into a wide-leg silhouette that moves like water.',
      fabric: 'Silk crepe with structured bodice panel',
      care: 'Dry clean only.',
      details: ['Structured bodice with boning', 'Wide-leg silhouette', 'Concealed back zip', 'Built-in slip lining'],
      sizes: ['XS', 'S', 'M', 'L'],
      stockStatus: StockStatus.SOLD_OUT,
      isFeatured: false,
      primaryImage: 'https://cdn.themonsoonclub.com/dress-1-a.png',
      hoverImage: 'https://cdn.themonsoonclub.com/dress-1-b.png',
      gallery: [
        'https://cdn.themonsoonclub.com/dress-1-a.png',
        'https://cdn.themonsoonclub.com/dress-1-b.png',
      ],
    },
  });

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.adminUser.create({
    data: {
      email: 'admin@themonsoonclub.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`   Issue: "${issue.title}"`);
  console.log(`   Volumes: 3 created`);
  console.log(`   Products: 6 created`);
  console.log(`   Admin: admin@themonsoonclub.com`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
