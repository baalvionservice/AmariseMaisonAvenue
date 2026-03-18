
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cart, clearCart, createInvoice } = useAppStore();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const subtotal = cart.reduce((acc, item) => acc + (item.basePrice * item.quantity), 0);

  const handlePlaceOrder = () => {
    const orderId = `AM-${(Math.random() * 10000).toFixed(0)}`;
    
    // Simulate generation of invoice in the mock system
    createInvoice({
      id: `inv-${Date.now()}`,
      orderId,
      customerName: `${firstName} ${lastName}`,
      amount: subtotal,
      currency: countryCode.toUpperCase(),
      status: 'paid',
      date: new Date().toISOString(),
      taxAmount: subtotal * 0.08
    });

    setStep(3);
    clearCart();
    toast({
      title: "Order Confirmed",
      description: "Your luxury pieces are being prepared by our master artisans.",
    });
  };

  if (cart.length === 0 && step !== 3) {
    router.push(`/${countryCode}/cart`);
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
      {/* Checkout Progress */}
      <div className="flex justify-center items-center space-x-8 mb-20">
        <ProgressStep num={1} label="Shipping" active={step === 1} completed={step > 1} />
        <div className="w-12 h-px bg-border" />
        <ProgressStep num={2} label="Payment" active={step === 2} completed={step > 2} />
        <div className="w-12 h-px bg-border" />
        <ProgressStep num={3} label="Confirmation" active={step === 3} completed={step === 3} />
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        {step < 3 ? (
          <>
            {/* Form Section */}
            <div className="flex-1 space-y-12">
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-headline font-bold">Shipping Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">First Name</Label>
                      <Input 
                        className="rounded-none bg-muted/30 border-border" 
                        placeholder="Julian" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Last Name</Label>
                      <Input 
                        className="rounded-none bg-muted/30 border-border" 
                        placeholder="Vandervilt" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Address</Label>
                      <Input className="rounded-none bg-muted/30 border-border" placeholder="123 Luxury Avenue" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">City</Label>
                      <Input className="rounded-none bg-muted/30 border-border" placeholder="Metropolis" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Postal Code</Label>
                      <Input className="rounded-none bg-muted/30 border-border" placeholder="LV-1234" />
                    </div>
                  </div>
                  <Button 
                    className="w-full h-16 bg-primary hover:bg-secondary rounded-none text-xs tracking-widest font-bold"
                    onClick={() => setStep(2)}
                    disabled={!firstName || !lastName}
                  >
                    CONTINUE TO PAYMENT
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-headline font-bold">Secure Payment</h2>
                  <div className="p-8 border border-primary/30 bg-primary/5 space-y-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold tracking-widest uppercase">Credit / Debit Card</span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Card Number</Label>
                      <Input className="rounded-none bg-muted/30 border-border" placeholder="**** **** **** 1924" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Expiry</Label>
                        <Input className="rounded-none bg-muted/30 border-border" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">CVC</Label>
                        <Input className="rounded-none bg-muted/30 border-border" placeholder="***" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Button 
                      className="w-full h-16 bg-primary hover:bg-secondary rounded-none text-xs tracking-widest font-bold"
                      onClick={handlePlaceOrder}
                    >
                      PLACE ORDER — {formatPrice(subtotal, countryCode)}
                    </Button>
                    <Button variant="ghost" className="text-xs uppercase tracking-widest" onClick={() => setStep(1)}>
                      Back to Shipping
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-80 space-y-8">
              <div className="bg-card p-8 border border-border space-y-6">
                <h3 className="text-lg font-headline font-bold uppercase tracking-widest">Order Summary</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="font-light">
                        <span className="block font-bold truncate w-32">{item.name}</span>
                        <span className="text-[10px] text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-light">{formatPrice(item.basePrice * item.quantity, countryCode)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-border space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest">
                    <span>Shipping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between text-xl font-headline font-bold pt-4">
                    <span>Total</span>
                    <span>{formatPrice(subtotal, countryCode)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                  <Truck className="w-3 h-3 text-primary" />
                  <span>Global White-Glove Delivery</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Confirmation State */
          <div className="w-full flex flex-col items-center justify-center py-20 space-y-12 animate-fade-in text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-headline font-bold italic">Order Received</h1>
              <p className="text-muted-foreground max-w-lg mx-auto font-light leading-relaxed">
                Thank you for choosing Amarisé Luxe. Your request has been sent to our Parisian atelier. A private concierge will contact you shortly to confirm delivery details.
              </p>
            </div>
            <div className="pt-8 border-t border-border w-full max-w-md">
              <div className="flex justify-between text-xs uppercase tracking-widest mb-4">
                <span className="text-muted-foreground">Order Reference</span>
                <span className="font-bold">#AM-{(Math.random() * 10000).toFixed(0)}</span>
              </div>
              <Button 
                onClick={() => router.push(`/${countryCode}`)}
                variant="outline"
                className="w-full h-14 rounded-none border-foreground text-[10px] font-bold tracking-[0.3em]"
              >
                RETURN TO MAISON
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressStep({ num, label, active, completed }: { num: number, label: string, active: boolean, completed: boolean }) {
  return (
    <div className={`flex items-center space-x-3 transition-colors ${active ? 'text-primary' : completed ? 'text-foreground' : 'text-muted-foreground'}`}>
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${active ? 'border-primary bg-primary text-white scale-110 shadow-lg shadow-primary/20' : completed ? 'border-foreground bg-foreground text-background' : 'border-border'}`}>
        {completed && !active ? <Check className="w-3 h-3" /> : num}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}
