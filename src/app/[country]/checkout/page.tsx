
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ShieldCheck, Truck, CreditCard, Lock, ArrowRight, ChevronRight, Globe, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/**
 * Institutional Settlement Registry: Bank-Grade Checkout.
 * High-fidelity multi-step flow for high-ticket acquisitions.
 */
export default function CheckoutPage() {
  const { cart, clearCart, createInvoice, createTransaction, activeBrandId } = useAppStore();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSettling, setIsSettling] = useState(false);
  
  const subtotal = cart.reduce((acc, item) => acc + (item.basePrice * item.quantity), 0);

  const handlePlaceOrder = () => {
    setIsSettling(true);
    
    // Simulate Institutional Settlement Delay
    setTimeout(() => {
      const orderId = `AM-${(Math.random() * 10000).toFixed(0)}`;
      const invoiceId = `inv-${Date.now()}`;
      const customerName = `${firstName} ${lastName}`;
      
      createInvoice({
        id: invoiceId,
        orderId,
        customerName,
        amount: subtotal,
        currency: countryCode.toUpperCase(),
        status: 'paid',
        date: new Date().toISOString(),
        taxAmount: subtotal * 0.08,
        taxRate: 8,
        complianceCertified: true,
        brandId: activeBrandId
      });

      createTransaction({
        id: `tx-${Date.now()}`,
        country: countryCode,
        type: 'Sale',
        clientName: customerName,
        amount: subtotal,
        currency: countryCode.toUpperCase(),
        status: 'Settled',
        timestamp: new Date().toISOString(),
        invoiceId: invoiceId,
        brandId: activeBrandId,
        artifactName: cart[0]?.name,
        isProvenanceCertified: true
      });

      setIsSettling(false);
      setStep(3);
      clearCart();
      toast({
        title: "Settlement Confirmed",
        description: "Your acquisition registry entry has been formalized.",
      });
    }, 2000);
  };

  if (cart.length === 0 && step !== 3) {
    router.push(`/${countryCode}/cart`);
    return null;
  }

  return (
    <div className="container mx-auto px-12 py-24 max-w-7xl animate-fade-in">
      {/* 1. Protocol Progress */}
      <div className="flex justify-center items-center space-x-12 mb-24">
        <ProtocolStep num={1} label="Logistics Registry" active={step === 1} completed={step > 1} />
        <div className={cn("w-20 h-px transition-colors duration-1000", step > 1 ? "bg-plum" : "bg-border")} />
        <ProtocolStep num={2} label="Financial Settlement" active={step === 2} completed={step > 2} />
        <div className={cn("w-20 h-px transition-colors duration-1000", step > 2 ? "bg-plum" : "bg-border")} />
        <ProtocolStep num={3} label="Archive Confirmation" active={step === 3} completed={step === 3} />
      </div>

      <div className="flex flex-col lg:flex-row gap-24 items-start">
        {step < 3 ? (
          <>
            {/* Form Section */}
            <div className="flex-1 space-y-16">
              {step === 1 && (
                <div className="space-y-12 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-headline font-bold italic tracking-tight">Identity & Dispatch</h2>
                    <p className="text-sm text-gray-500 font-light italic">Define your global delivery charter.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Legal First Name</Label>
                      <Input 
                        className="rounded-none border-border bg-ivory/30 h-14 text-sm italic focus:border-plum" 
                        placeholder="Julian" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Legal Last Name</Label>
                      <Input 
                        className="rounded-none border-border bg-ivory/30 h-14 text-sm italic focus:border-plum" 
                        placeholder="Vandervilt" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Primary Residence / Dispatch Address</Label>
                      <Input className="rounded-none border-border bg-ivory/30 h-14 text-sm italic focus:border-plum" placeholder="730 Fifth Avenue" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Jurisdictional City</Label>
                      <Input className="rounded-none border-border bg-ivory/30 h-14 text-sm italic focus:border-plum" placeholder="New York" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Postal Protocol</Label>
                      <Input className="rounded-none border-border bg-ivory/30 h-14 text-sm font-mono focus:border-plum" placeholder="10019" />
                    </div>
                  </div>

                  <div className="pt-12 border-t border-border flex justify-end">
                    <Button 
                      className="h-20 px-16 bg-black text-white hover:bg-plum rounded-none text-[11px] font-bold tracking-[0.4em] uppercase transition-all shadow-2xl disabled:opacity-30"
                      onClick={() => setStep(2)}
                      disabled={!firstName || !lastName}
                    >
                      CONTINUE TO SETTLEMENT <ArrowRight className="ml-4 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-12 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-headline font-bold italic tracking-tight">Vault Authorization</h2>
                    <p className="text-sm text-gray-500 font-light italic">Institutional payment gateway • 256-bit encrypted.</p>
                  </div>

                  <div className="p-12 border border-plum/30 bg-plum/5 space-y-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
                       <Lock className="w-64 h-64 text-black" />
                    </div>
                    
                    <div className="flex items-center space-x-4 text-plum relative z-10">
                      <CreditCard className="w-6 h-6" />
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Private Client Card</span>
                    </div>

                    <div className="grid grid-cols-1 gap-10 relative z-10">
                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Treasury Identifier (Card Number)</Label>
                        <Input className="rounded-none border-plum/20 bg-white/50 h-14 text-lg font-mono focus:border-plum" placeholder="**** **** **** 1924" />
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Expiry Horizon</Label>
                          <Input className="rounded-none border-plum/20 bg-white/50 h-14 text-sm font-mono" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Security Node (CVC)</Label>
                          <Input className="rounded-none border-plum/20 bg-white/50 h-14 text-sm font-mono" placeholder="***" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-6">
                    <Button 
                      disabled={isSettling}
                      className="w-full h-24 bg-plum text-white hover:bg-black rounded-none text-[12px] font-bold tracking-[0.5em] uppercase transition-all shadow-2xl"
                      onClick={handlePlaceOrder}
                    >
                      {isSettling ? 'PROCESSING SETTLEMENT...' : `AUTHORIZE SETTLEMENT — ${formatPrice(subtotal, countryCode)}`}
                    </Button>
                    <button onClick={() => setStep(1)} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors self-center">
                      REVISE DISPATCH REGISTRY
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <aside className="lg:w-96 shrink-0 lg:sticky lg:top-40">
              <div className="bg-ivory p-10 border border-border space-y-10 rounded-none shadow-sm">
                <h3 className="text-xl font-headline font-bold uppercase tracking-widest border-b border-border pb-6">Acquisition Context</h3>
                
                <div className="space-y-8 max-h-80 overflow-y-auto custom-scrollbar pr-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start group">
                      <div className="space-y-1 flex-1">
                        <span className="block font-bold text-sm uppercase tracking-tight text-gray-900 group-hover:text-plum transition-colors">{item.name}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-sm tabular pl-4">{formatPrice(item.basePrice * item.quantity, countryCode)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-border space-y-4">
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <span>Dispatch Protocol</span>
                    <span className="text-plum">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-end pt-6">
                    <span className="text-xl font-headline font-bold italic tracking-tight">Aggregate Yield</span>
                    <span className="text-3xl font-bold tabular">{formatPrice(subtotal, countryCode)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div className="flex items-center justify-center space-x-3 text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>Immutable Audit Trail Active</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                  <Truck className="w-4 h-4 text-gold" />
                  <span>Global White-Glove Dispatch</span>
                </div>
              </div>
            </aside>
          </>
        ) : (
          /* Confirmation State: The Success Registry */
          <div className="w-full flex flex-col items-center justify-center py-32 space-y-16 animate-fade-in text-center max-w-4xl mx-auto">
            <div className="relative">
               <div className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-xl">
                 <Check className="w-16 h-16 text-emerald-500 stroke-[3px]" />
               </div>
               <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-2xl border border-gray-100">
                  <ShieldCheck className="w-6 h-6 text-gold" />
               </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                 <span className="text-plum text-[10px] font-bold tracking-[0.6em] uppercase">Acquisition Successful</span>
                 <h1 className="text-7xl font-headline font-bold italic tracking-tighter text-gray-900">Settlement Registry Established</h1>
              </div>
              <p className="text-xl text-gray-500 font-light italic max-w-2xl mx-auto leading-relaxed">
                Thank you for your choice. Your artifacts have been secured within the Maison registry. A private curator from our Parisian atelier will contact you within the hour to finalize the dispatch charter.
              </p>
            </div>

            <div className="pt-12 border-t border-border w-full max-w-lg space-y-10">
              <div className="bg-ivory p-8 border border-border flex items-center justify-between group cursor-help">
                <div className="flex flex-col items-start space-y-1">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Registry Reference</span>
                   <span className="font-mono text-xl font-bold uppercase tracking-tighter text-gray-900">#AM-{(Math.random() * 10000).toFixed(0)}</span>
                </div>
                <div className="p-3 bg-white border border-border rounded-full group-hover:border-plum transition-colors">
                   <Lock className="w-5 h-5 text-plum" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <Button 
                  onClick={() => router.push(`/${countryCode}/account/acquisitions`)}
                  variant="outline"
                  className="h-16 rounded-none border-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white"
                >
                  ACQUISITION DASHBOARD
                </Button>
                <Button 
                  onClick={() => router.push(`/${countryCode}`)}
                  className="h-16 rounded-none bg-black text-white hover:bg-plum text-[10px] font-bold tracking-[0.3em] uppercase shadow-2xl"
                >
                  RETURN TO MAISON
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProtocolStep({ num, label, active, completed }: { num: number, label: string, active: boolean, completed: boolean }) {
  return (
    <div className={cn(
      "flex items-center space-x-4 transition-all duration-700",
      active ? "text-black scale-110" : completed ? "text-plum" : "text-gray-300"
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-700",
        active ? "border-black bg-black text-white shadow-xl shadow-black/10" : 
        completed ? "border-plum bg-plum/5 text-plum" : 
        "border-border bg-transparent text-gray-300"
      )}>
        {completed && !active ? <Check className="w-5 h-5 stroke-[3px]" /> : num}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{label}</span>
    </div>
  );
}
