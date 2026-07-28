import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    issueId?: string;
    volumeId?: string;
    category?: string;
    search?: string;
  }) {
    const where: any = {};

    if (params.issueId) where.issueId = params.issueId;
    if (params.volumeId) where.volumeId = params.volumeId;
    if (params.category) where.category = params.category;
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { tagline: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    });
    if (!product) throw new NotFoundException(`Product with slug "${slug}" not found`);
    return product;
  }
}
