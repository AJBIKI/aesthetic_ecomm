import slugify from 'slugify';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Post()
  async create(@Body() body: any) {
    const slug = slugify(body.name, { lower: true, strict: true });

    // Auto-generate figureTag: [FIG. {volumeNumber}.{count}]
    const volume = await this.prisma.volume.findUnique({
      where: { id: body.volumeId },
      include: { products: true },
    });
    const productCount = volume ? volume.products.length + 1 : 1;
    const volNum = volume?.volumeNumber?.replace('VOL. ', '')?.trim() || '01';
    const figureTag = `[FIG. ${volNum.padStart(2, '0')}.${productCount}]`;

    return this.prisma.product.create({
      data: { ...body, slug, figureTag },
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const data = { ...body };
    if (data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }
    return this.prisma.product.update({ where: { id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
