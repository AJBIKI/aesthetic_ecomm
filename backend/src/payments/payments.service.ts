import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Razorpay = require('razorpay');
const crypto = require('crypto');
import env from '../config/env';

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = env();

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

@Injectable()
export class PaymentsService {
  private razorpay: InstanceType<typeof Razorpay>;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(params: { amount: number; currency: string; receipt: string }): Promise<RazorpayOrder> {
    return this.razorpay.orders.create({
      amount: params.amount * 100,
      currency: params.currency,
      receipt: params.receipt,
    });
  }

  verifyPayment(params: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): boolean {
    const body = `${params.razorpayOrderId}|${params.razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    return expectedSignature === params.razorpaySignature;
  }
}
