import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string) {
    const where = status ? { status: status as any } : { status: 'ACTIVE' as any };
    return this.prisma.issue.findMany({
      where,
      include: { volumes: true, products: true },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const issue = await this.prisma.issue.findUnique({
      where: { id },
      include: {
        volumes: { orderBy: { order: 'asc' } },
        products: true,
      },
    });
    if (!issue) throw new NotFoundException(`Issue with id "${id}" not found`);
    return issue;
  }
}
