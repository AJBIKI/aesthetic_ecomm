import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AdminIssuesController } from './issues/admin-issues.controller';
import { AdminVolumesController } from './volumes/admin-volumes.controller';
import { AdminProductsController } from './products/admin-products.controller';
import { AdminOrdersController } from './orders/admin-orders.controller';
import { AdminUploadController } from './upload/upload.controller';
import env from '../config/env';

@Module({
  imports: [
    JwtModule.register({
      secret: env().JWT_SECRET,
      signOptions: { expiresIn: env().JWT_EXPIRATION as any },
    }),
  ],
  controllers: [
    AuthController,
    AdminIssuesController,
    AdminVolumesController,
    AdminProductsController,
    AdminOrdersController,
    AdminUploadController,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AdminModule {}
