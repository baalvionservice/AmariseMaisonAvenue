/**
 * @fileOverview Institutional Observability Engine (Mock SRE)
 * Handles metrics calculation, alert triggering, and health scoring.
 */

import { MaisonMetric, MaisonAlert, SystemHealthScore, CountryCode } from '../types';

export class ObservabilityEngine {
  private static instance: ObservabilityEngine;
  private metrics: MaisonMetric[] = [];
  private alerts: MaisonAlert[] = [];

  private constructor() {}

  public static getInstance(): ObservabilityEngine {
    if (!ObservabilityEngine.instance) {
      ObservabilityEngine.instance = new ObservabilityEngine();
    }
    return ObservabilityEngine.instance;
  }

  /**
   * Records a new system metric
   */
  public recordMetric(params: Omit<MaisonMetric, 'id' | 'timestamp'>) {
    const metric: MaisonMetric = {
      ...params,
      id: `met_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString()
    };
    this.metrics.unshift(metric);
    if (this.metrics.length > 1000) this.metrics.pop();

    this.evaluateAlerts(metric);
    return metric;
  }

  /**
   * Evaluates if a metric should trigger an alert
   */
  private evaluateAlerts(metric: MaisonMetric) {
    // 1. Payment Success Rate Monitor
    if (metric.name === 'payment_success_rate' && metric.value < 85) {
      this.triggerAlert({
        type: 'payment',
        severity: 'critical',
        message: `High Payment Failure Detected: ${metric.value}% success rate in ${metric.country}.`,
        country: metric.country
      });
    }

    // 2. Latency Monitor
    if (metric.name === 'api_response_time' && metric.value > 500) {
      this.triggerAlert({
        type: 'api',
        severity: 'medium',
        message: `Degraded API Performance: ${metric.value}ms avg response time.`,
        country: metric.country
      });
    }

    // 3. Inventory Contention Monitor
    if (metric.name === 'stock_lock_fail_count' && metric.value > 10) {
      this.triggerAlert({
        type: 'inventory',
        severity: 'high',
        message: `Critical Stock Contention: ${metric.value} failed locks in 5 mins.`,
        country: metric.country
      });
    }
  }

  /**
   * Triggers an institutional alert
   */
  public triggerAlert(params: Omit<MaisonAlert, 'id' | 'triggeredAt' | 'status'>) {
    const alert: MaisonAlert = {
      ...params,
      id: `alt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      triggeredAt: new Date().toISOString(),
      status: 'active'
    };
    this.alerts.unshift(alert);
    console.warn(`%c[ALERT] 🚨 ${alert.severity.toUpperCase()} | ${alert.message}`, 'color: #ef4444; font-weight: bold;');
    return alert;
  }

  /**
   * Calculates the overall System Health Score (0-100)
   */
  public calculateHealth(country: CountryCode | 'global' = 'global'): SystemHealthScore {
    const filter = (m: MaisonMetric) => country === 'global' ? true : m.country === country;
    
    const getAvg = (name: string, fallback = 100) => {
      const relevant = this.metrics.filter(m => m.name === name && filter(m));
      if (relevant.length === 0) return fallback;
      return relevant.reduce((a, b) => a + b.value, 0) / relevant.length;
    };

    const paymentScore = getAvg('payment_success_rate');
    const apiScore = Math.max(0, 100 - (getAvg('api_response_time', 50) / 10)); // 500ms = 50 score
    const inventoryScore = Math.max(0, 100 - (getAvg('stock_lock_fail_count', 0) * 5));
    const aiScore = getAvg('ai_decision_confidence', 95);

    // Weighted Overall Score
    const overall = (paymentScore * 0.4) + (apiScore * 0.3) + (inventoryScore * 0.2) + (aiScore * 0.1);

    return {
      overall: Math.round(overall),
      subsystems: {
        payments: Math.round(paymentScore),
        api: Math.round(apiScore),
        inventory: Math.round(inventoryScore),
        ai: Math.round(aiScore)
      },
      lastUpdated: new Date().toISOString()
    };
  }

  public getRegistry() {
    return {
      metrics: this.metrics,
      alerts: this.alerts
    };
  }
}

export const obsEngine = ObservabilityEngine.getInstance();
