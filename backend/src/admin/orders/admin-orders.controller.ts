import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    const where = status ? { status } : {};
    return this.prisma.order.findMany({
      where,
      include: { user: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('stats')
  async getStats() {
    const [totalOrders, totalRevenue, paidOrders, pendingOrders, recentOrders] =
      await Promise.all([
        this.prisma.order.count(),
        this.prisma.order.aggregate({ _sum: { total: true }, where: { status: 'PAID' } }),
        this.prisma.order.count({ where: { status: 'PAID' } }),
        this.prisma.order.count({ where: { status: 'PENDING' } }),
        this.prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: { orderNumber: true, customerName: true, total: true, status: true, createdAt: true },
        }),
      ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      paidOrders,
      pendingOrders,
      recentOrders,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
