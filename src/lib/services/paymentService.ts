
/**
 * @fileOverview Production-Grade Payment Orchestration Service (Mock)
 * Simulates gateway interactions for Stripe, Razorpay, PayU, and Bank Transfers.
 */

import { PaymentGateway, PaymentStatus, Payment } from '../types';

export interface PaymentIntentResponse {
  success: boolean;
  payment_id: string;
  client_secret?: string;
  gateway_order_id?: string;
  instructions?: string;
  message: string;
}

export class MockPaymentService {
  /**
   * Simulates POST /payments/create
   */
  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    gateway: PaymentGateway;
    userId: string;
    tenantId: string;
    subscriptionId?: string;
  }): Promise<PaymentIntentResponse> {
    const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
    const { amount, gateway } = params;

    // Simulate Network Latency
    await new Promise(resolve => setTimeout(resolve, 800));

    switch (gateway) {
      case 'STRIPE':
        return {
          success: true,
          payment_id: paymentId,
          client_secret: `pi_${paymentId}_secret_${Math.random().toString(36).substr(2, 5)}`,
          message: "Stripe PaymentIntent created"
        };
      case 'RAZORPAY':
        return {
          success: true,
          payment_id: paymentId,
          gateway_order_id: `order_${paymentId}`,
          message: "Razorpay Order created"
        };
      case 'PAYU':
        return {
          success: true,
          payment_id: paymentId,
          client_secret: `payu_token_${paymentId}`,
          message: "PayU Transaction initialized"
        };
      case 'BANK_TRANSFER':
        return {
          success: true,
          payment_id: paymentId,
          instructions: `Please transfer ${params.currency} ${amount.toLocaleString()} to Maison Escrow Account: 1234-5678-9012. Reference: ${paymentId}`,
          message: "Bank transfer instructions generated"
        };
      default:
        throw new Error("Invalid Payment Gateway");
    }
  }

  /**
   * Simulates Webhook Processing Loop
   */
  async simulateWebhook(paymentId: string, status: PaymentStatus = 'SUCCESS'): Promise<void> {
    console.log(`%c[WEBHOOK MOCK] Received event for ${paymentId} with status: ${status}`, "color: #7E3F98; font-weight: bold;");
    // In a real app, this would trigger a background worker
  }
}

export const paymentService = new MockPaymentService();
