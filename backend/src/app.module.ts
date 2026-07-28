import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { IssuesModule } from './issues/issues.module';
import { VolumesModule } from './volumes/volumes.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    IssuesModule,
    VolumesModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
