import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentsService } from '../payments/payments.service';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private paymentsService: PaymentsService,
  ) {}

  async checkout(dto: CheckoutDto, userId?: string) {
    const subtotal = dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    const date = new Date();
    const prefix = `TMC-${date.getFullYear()}-`;
    const lastOrder = await this.prisma.order.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    let seq = 1;
    if (lastOrder) {
      const num = parseInt(lastOrder.orderNumber.split('-').pop() || '0', 10);
      seq = num + 1;
    }
    const orderNumber = `${prefix}${String(seq).padStart(3, '0')}`;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        customerName: dto.customerName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address as any,
        items: dto.items as any,
        subtotal,
        total,
        status: 'PENDING',
      },
    });

    const razorpayOrder = await this.paymentsService.createOrder({
      amount: total,
      currency: 'INR',
      receipt: orderNumber,
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return {
      orderId: order.id,
      orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID,
    };
  }

  async confirmPayment(dto: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    const valid = this.paymentsService.verifyPayment({
      razorpayOrderId: dto.razorpayOrderId,
      razorpayPaymentId: dto.razorpayPaymentId,
      razorpaySignature: dto.razorpaySignature,
    });

    if (!valid) {
      throw new BadRequestException('Invalid payment signature');
    }

    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id: dto.orderId },
      data: {
        status: 'PAID',
        paymentId: dto.razorpayPaymentId,
      },
    });
  }
}
