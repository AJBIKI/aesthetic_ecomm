import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/volumes')
export class AdminVolumesController {
  constructor(private prisma: PrismaService) {}

  @Post()
  create(@Body() body: any) {
    return this.prisma.volume.create({ data: body });
  }
}
