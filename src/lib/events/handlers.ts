/**
 * @fileOverview Maison Event Handlers
 * Defines how specific modules react to global events.
 */

import { eventBus } from './bus';
import { StockManager } from '../inventory/stockManager';
import { sendEmailMock } from '../notifications/mock-engine';

/**
 * Initialize all core platform handlers
 */
export function initializeGlobalHandlers() {
  
  // 1. Payment Success Reactions
  eventBus.subscribe('payment_success', async (event) => {
    const { orderId, amount, userId } = event.payload;
    
    // Trigger Order Confirmation
    await eventBus.publish({
      type: 'order_confirmed',
      source: 'orders',
      countryCode: event.countryCode,
      payload: { orderId, status: 'PAID' }
    });

    // Send Receipt Notification
    sendEmailMock('client', `Payment of ${amount} confirmed for Order ${orderId}.`, event.countryCode);
  });

  // 2. Inventory Management
  eventBus.subscribe('inventory_locked', async (event) => {
    console.log(`%c[INVENTORY] Lock secured for artifact ${event.payload.productId}`, "color: #3B82F6;");
  });

  // 3. AI Insights
  eventBus.subscribe('order_confirmed', async (event) => {
    // Analytics & AI trigger
    await eventBus.publish({
      type: 'ai_insight_generated',
      source: 'ai',
      countryCode: event.countryCode,
      payload: { 
        insight: `High-value purchase detected in ${event.countryCode}. User segment migration suggested.`,
        confidence: 0.98
      }
    });
  });

  // 4. Failure Recovery
  eventBus.subscribe('payment_failed', async (event) => {
    const { productId, quantity } = event.payload;
    
    // Auto-release stock back to the archive
    StockManager.releaseStock(productId, quantity);
    
    console.warn(`%c[RECOVERY] Payment failed. Artifact ${productId} restored to registry.`, "color: #ef4444;");
  });

  console.log("%c[SYSTEM] Global Event Handlers Initialized.", "color: #10b981; font-weight: bold;");
}
