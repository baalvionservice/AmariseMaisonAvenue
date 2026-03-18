'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, MessageSquare, Mail, Globe, ArrowRight, Lock, Crown } from 'lucide-react';
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      country: 'Market Registry Verified',
      budgetRange: formData.budget as any,
      intent: formData.intent as any,
      message: formData.message,
      contactMethod: formData.contactMethod as any,
      status: 'new',
      leadTier: 3, // Calculated in store
      timestamp: new Date().toISOString()
    });

    setIsSubmitted(true);
    toast({
      title: "Acquisition Request Transmitted",
      description: "A specialist curator has been assigned to your inquiry.",
    });
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl bg-white p-16 text-center space-y-12 rounded-none border-none shadow-2xl animate-fade-in">
          <div className="w-24 h-24 bg-plum/5 rounded-full flex items-center justify-center mx-auto border border-plum/10">
            <ShieldCheck className="w-12 h-12 text-plum" />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-5xl font-headline font-bold italic tracking-tight text-gray-900 leading-tight">Request Received</h2>
            <div className="prose prose-lg text-gray-600 font-light italic leading-relaxed text-left border-l-2 border-plum/20 pl-8 bg-ivory/50 p-8">
              <p className="mb-4">"Thank you for your inquiry.</p>
              <p className="mb-4">Your request has been personally reviewed by our acquisition desk.</p>
              <p className="mb-4 font-normal">Before we proceed, I would like to understand your intent more precisely — are you looking for:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>A collectible investment piece</li>
                <li>A personal statement acquisition</li>
                <li>Or a rare archival find</li>
              </ul>
              <p className="mb-4">We curate differently based on purpose.</p>
              <p className="font-bold uppercase tracking-widest text-[10px] text-plum">— AMARISÉ Curatorial Desk"</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center space-y-6">
            <p className="text-xs text-gray-400 italic">A specialist curator will contact you via {formData.contactMethod} shortly.</p>
            <Button onClick={onClose} className="w-full h-16 bg-black text-white hover:bg-plum rounded-none text-[10px] font-bold tracking-[0.4em] uppercase transition-all shadow-xl">
              CONTINUE DISCOVERY
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-white p-0 overflow-hidden flex flex-col md:flex-row rounded-none border-none shadow-2xl animate-fade-in">
        {/* Left: Branding & High-Ticket Context */}
        <div className="w-full md:w-[40%] bg-ivory p-12 space-y-12 flex flex-col justify-center border-r border-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-plum via-gold to-plum opacity-50" />
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-secondary">
               <Crown className="w-5 h-5" />
               <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Acquisition Desk</span>
            </div>
            <h2 className="text-5xl font-headline font-bold italic leading-[0.9] text-gray-900 tracking-tighter">
              Private <br /> Acquisition
            </h2>
            <div className="h-px w-16 bg-plum" />
          </div>

          <p className="text-lg text-gray-500 font-light leading-relaxed italic">
            "We believe the acquisition of an artifact is a dialogue. Our curators provide a discreet, personalized experience for the world's most discerning collectors."
          </p>

          <div className="space-y-8 pt-4">
            <FeatureItem icon={<Globe className="w-5 h-5 text-gold" />} label="Global Sourcing Network" />
            <FeatureItem icon={<ShieldCheck className="w-5 h-5 text-gold" />} label="Institutional Responsibility" />
            <FeatureItem icon={<MessageSquare className="w-5 h-5 text-gold" />} label="Bespoke Curatorial Guidance" />
          </div>

          {product && (
            <div className="p-8 bg-white border border-border shadow-sm group">
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">TARGET ARTIFACT</span>
               <p className="text-xl font-headline font-bold italic text-gray-900 truncate group-hover:text-plum transition-colors">{product.name}</p>
            </div>
          )}
        </div>

        {/* Right: Lead Capture Form */}
        <div className="w-full md:w-[60%] p-16 space-y-10 bg-white">
          <div className="space-y-2">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Collector Registration</h3>
             <p className="text-sm font-light italic">Please provide your details for private verification.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Full Name</Label>
                <Input required className="h-12 rounded-none bg-ivory/30 border-border focus:border-plum transition-colors px-4" placeholder="Julian Vandervilt" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Email Address</Label>
                <Input required type="email" className="h-12 rounded-none bg-ivory/30 border-border focus:border-plum transition-colors px-4" placeholder="j.vandervilt@lux.net" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Acquisition Intent</Label>
                <Select value={formData.intent} onValueChange={v => setFormData({...formData, intent: v as any})}>
                  <SelectTrigger className="rounded-none bg-ivory/30 border-border h-12 px-4 focus:ring-plum">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-border shadow-luxury">
                    <SelectItem value="Personal" className="text-[10px] uppercase font-bold">Personal Acquisition</SelectItem>
                    <SelectItem value="Investment" className="text-[10px] uppercase font-bold">Strategic Investment</SelectItem>
                    <SelectItem value="Collector" className="text-[10px] uppercase font-bold">Private Curation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Market Bracket</Label>
                <Select value={formData.budget} onValueChange={v => setFormData({...formData, budget: v as any})}>
                  <SelectTrigger className="rounded-none bg-ivory/30 border-border h-12 px-4 focus:ring-plum">
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

            <div className="space-y-3">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Discreet Message (Optional)</Label>
              <Textarea className="rounded-none bg-ivory/30 border-border min-h-[120px] text-xs px-4 py-4 italic font-light focus:border-plum" placeholder="Specify requirements, heritage preferences, or provenance inquiries..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">PREFERRED DIALOGUE CHANNEL</p>
              <div className="flex space-x-6">
                <ContactMethodBtn icon={<MessageSquare className="w-4 h-4" />} label="WhatsApp" active={formData.contactMethod === 'WhatsApp'} onClick={() => setFormData({...formData, contactMethod: 'WhatsApp'})} />
                <ContactMethodBtn icon={<Mail className="w-4 h-4" />} label="Secure Email" active={formData.contactMethod === 'Email'} onClick={() => setFormData({...formData, contactMethod: 'Email'})} />
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit" className="w-full h-20 bg-plum text-white hover:bg-black rounded-none text-[11px] font-bold tracking-[0.5em] uppercase transition-all shadow-2xl shadow-plum/20">
                <Lock className="w-4 h-4 mr-4" /> TRANSMIT ACQUISITION REQUEST <ArrowRight className="ml-4 w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeatureItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center space-x-4 group">
      <div className="p-3 bg-white rounded-full shadow-sm border border-border group-hover:bg-gold/10 transition-colors">{icon}</div>
      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-700 leading-none">{label}</span>
    </div>
  );
}

function ContactMethodBtn({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center space-x-3 h-14 border transition-all duration-500 ${active ? 'border-plum bg-plum/5 text-plum shadow-inner' : 'border-border text-gray-400 hover:border-plum hover:text-plum'}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}
