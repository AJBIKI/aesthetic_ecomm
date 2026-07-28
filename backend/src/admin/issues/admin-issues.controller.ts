import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/issues')
export class AdminIssuesController {
  constructor(private prisma: PrismaService) {}

  @Post()
  create(@Body() body: any) {
    return this.prisma.issue.create({ data: body });
  }

  @Post(':id')
  update(@Body() body: any) {
    return this.prisma.issue.update({ where: { id: body.id }, data: body });
  }
}
