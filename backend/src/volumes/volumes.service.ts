import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VolumesService {
  constructor(private prisma: PrismaService) {}

  async findAll(issueId?: string) {
    const where = issueId ? { issueId } : {};
    return this.prisma.volume.findMany({
      where,
      include: { products: true },
      orderBy: { order: 'asc' },
    });
  }
}
