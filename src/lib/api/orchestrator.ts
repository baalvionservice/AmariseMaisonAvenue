/**
 * @fileOverview BAALVION / AMARISÉ - API Orchestrator (Mock)
 * Simulates real-world backend behavior including latency, idempotency, and errors.
 */

import { CountryCode, PaymentGateway, TransactionStatus } from '../types';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  code?: number;
}

class MockApiOrchestrator {
  private latency = 800; // Simulated ms
  private processedKeys = new Set<string>();

  private async simulate() {
    await new Promise(resolve => setTimeout(resolve, this.latency));
  }

  /**
   * 🛍️ PRODUCT APIs
   */
  async getProducts(filters: any): Promise<ApiResponse<any>> {
    await this.simulate();
    return {
      status: 'success',
      data: {
        items: [], // Would fetch from INITIAL_PRODUCTS
        count: 0
      }
    };
  }

  /**
   * 📦 INVENTORY APIs (Atomic Locking)
   */
  async lockInventory(variantId: string, userId: string): Promise<ApiResponse<any>> {
    await this.simulate();
    // Simulation: 10% chance item was just taken by another VIP
    if (Math.random() < 0.1) {
      return {
        status: 'error',
        error: 'CONFLICT: Artifact locked by another collector node.',
        code: 409
      };
    }
    return {
      status: 'success',
      data: {
        lock_id: `lock_${Math.random().toString(36).substr(2, 5)}`,
        ttl_minutes: 15
      }
    };
  }

  /**
   * 💳 PAYMENT APIs (Idempotent)
   */
  async initiatePayment(params: {
    idempotencyKey: string;
    amount: number;
    gateway: PaymentGateway;
  }): Promise<ApiResponse<any>> {
    await this.simulate();

    if (this.processedKeys.has(params.idempotencyKey)) {
      return {
        status: 'error',
        error: 'IDEMPOTENCY_CONFLICT: Settlement already processed.',
        code: 409
      };
    }

    this.processedKeys.add(params.idempotencyKey);

    return {
      status: 'success',
      data: {
        payment_id: `pay_${Date.now()}`,
        gateway_ref: `gw_${params.gateway}_${Math.random().toString(36).substr(2, 5)}`,
        status: 'PENDING'
      }
    };
  }

  /**
   * 🛠️ ADMIN APIs (RBAC Checked)
   */
  async viewAuditLogs(role: string): Promise<ApiResponse<any>> {
    await this.simulate();
    if (role !== 'super_admin' && role !== 'country_admin') {
      return {
        status: 'error',
        error: 'ACCESS_DENIED: Institutional authority required.',
        code: 403
      };
    }
    return { status: 'success', data: [] };
  }
}

export const apiOrchestrator = new MockApiOrchestrator();
