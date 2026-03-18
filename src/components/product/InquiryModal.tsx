'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, MessageSquare, Mail, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Product, MaisonService } from '@/lib/types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  service?: MaisonService;
}

export function InquiryModal({ isOpen, onClose, product, service }: InquiryModalProps) {
  const { upsertPrivateInquiry } = useAppStore();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: 'Tier 2',
    intent: 'Personal',
    message: '',
    contactMethod: 'WhatsApp'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    upsertPrivateInquiry({
      id: `inq-${Date.now()}`,
      productId: product?.id,
      serviceId: service?.id,
      customerName: formData.name,
      email: formData.email,
      country: 'Detected',
      budgetRange: formData.budget as any,
      intent: formData.intent as any,
      message: formData.message,
      contactMethod: formData.contactMethod as any,
      status: 'new',
      timestamp: new Date().toISOString()
    });

    setIsSubmitted(true);
    toast({
      title: "Inquiry Transmitted",
      description: "A Maison curator has received your request for private acquisition.",
    });
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl bg-white p-12 text-center space-y-8 rounded-none border-none shadow-2xl">
          <div className="w-20 h-20 bg-plum/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-plum" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold italic">Request Received</h2>
            <p className="text-gray-500 font-light italic leading-relaxed">
              "Your inquiry has been personally reviewed by our acquisition desk. A specialist curator will contact you via {formData.contactMethod} shortly."
            </p>
          </div>
          <Button onClick={onClose} className="w-full h-14 bg-black text-white rounded-none text-[10px] font-bold tracking-[0.4em] uppercase">
            CONTINUE DISCOVERY
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white p-0 overflow-hidden flex flex-col md:flex-row rounded-none border-none shadow-2xl">
        {/* Left: Branding & Context */}
        <div className="w-full md:w-2/5 bg-ivory p-12 space-y-12 flex flex-col justify-center border-r border-border">
          <div className="space-y-4">
            <span className="text-secondary text-[10px] font-bold tracking-[0.5em] uppercase">Acquisition Desk</span>
            <h2 className="text-4xl font-headline font-bold italic leading-tight text-gray-900">
              Private Inquiry
            </h2>
            <div className="h-px w-12 bg-gold" />
          </div>

          <p className="text-sm text-gray-500 font-light leading-relaxed italic">
            "We believe the acquisition of an artifact is a dialogue. Our curators provide a discreet, personalized experience for the world's most discerning collectors."
          </p>

          <div className="space-y-6">
            <FeatureItem icon={<Globe className="w-4 h-4 text-gold" />} label="Global Sourcing" />
            <FeatureItem icon={<ShieldCheck className="w-4 h-4 text-gold" />} label="Discreet Sourcing" />
            <FeatureItem icon={<MessageSquare className="w-4 h-4 text-gold" />} label="Curatorial Guidance" />
          </div>

          {product && (
            <div className="p-6 bg-white border border-border shadow-sm">
               <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Target Artifact</span>
               <p className="text-sm font-bold uppercase truncate mt-1">{product.name}</p>
            </div>
          )}
        </div>

        {/* Right: Lead Capture Form */}
        <div className="w-full md:w-3/5 p-12 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Your Name</Label>
                <Input required className="rounded-none bg-ivory/50" placeholder="Julian Vandervilt" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Email Address</Label>
                <Input required type="email" className="rounded-none bg-ivory/50" placeholder="j.vandervilt@lux.net" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Acquisition Intent</Label>
                <Select value={formData.intent} onValueChange={v => setFormData({...formData, intent: v})}>
                  <SelectTrigger className="rounded-none bg-ivory/50 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-border shadow-luxury">
                    <SelectItem value="Personal" className="text-[10px] uppercase font-bold">Personal Acquisition</SelectItem>
                    <SelectItem value="Investment" className="text-[10px] uppercase font-bold">Strategic Investment</SelectItem>
                    <SelectItem value="Collector" className="text-[10px] uppercase font-bold">Collection Curation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Market Bracket</Label>
                <Select value={formData.budget} onValueChange={v => setFormData({...formData, budget: v})}>
                  <SelectTrigger className="rounded-none bg-ivory/50 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-border shadow-luxury">
                    <SelectItem value="Tier 3" className="text-[10px] uppercase font-bold">Below $10,000</SelectItem>
                    <SelectItem value="Tier 2" className="text-[10px] uppercase font-bold">$10,000 - $50,000</SelectItem>
                    <SelectItem value="Tier 1" className="text-[10px] uppercase font-bold">$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest font-bold">Discreet Message (Optional)</Label>
              <Textarea className="rounded-none bg-ivory/50 min-h-[100px] text-xs" placeholder="Specific requirements or provenance inquiries..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Preferred Contact Method</p>
              <div className="flex space-x-4">
                <ContactMethodBtn icon={<MessageSquare className="w-3 h-3" />} label="WhatsApp" active={formData.contactMethod === 'WhatsApp'} onClick={() => setFormData({...formData, contactMethod: 'WhatsApp'})} />
                <ContactMethodBtn icon={<Mail className="w-3 h-3" />} label="Secure Email" active={formData.contactMethod === 'Email'} onClick={() => setFormData({...formData, contactMethod: 'Email'})} />
              </div>
            </div>

            <Button type="submit" className="w-full h-16 bg-plum text-white hover:bg-gold hover:text-black rounded-none text-[10px] font-bold tracking-[0.4em] transition-all shadow-xl shadow-plum/10">
              TRANSMIT ACQUISITION REQUEST <ArrowRight className="w-4 h-4 ml-3" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeatureItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{label}</span>
    </div>
  );
}

function ContactMethodBtn({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center space-x-2 h-12 border transition-all ${active ? 'border-plum bg-plum/5 text-plum' : 'border-border text-gray-400 hover:border-plum'}`}
    >
      {icon}
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
