'use client';

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { MoreHorizontal, Clock, MapPin, Phone, Briefcase } from 'lucide-react';

export function MoreMenuModal() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-slate-300 flex flex-col items-center gap-1">
          <MoreHorizontal size={22} />
          <span className="text-[9px] font-black uppercase">More</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-white rounded-t-[40px] px-8 pb-12 pt-4 max-w-md mx-auto">
        <DrawerTitle className="sr-only">Store Information</DrawerTitle>
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
        
        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Store Info</h2>
        
        <div className="space-y-4">
          <MenuRow icon={<Clock size={20} />} title="Trading Hours" subtitle="Mon-Sun: 08:00 - 18:00" />
          <MenuRow icon={<MapPin size={20} />} title="Store Locations" subtitle="Palm Ridge & Roodekop" />
          <MenuRow icon={<Phone size={20} />} title="Contact Us" subtitle="Call +27 11 000 0000" />
          <MenuRow icon={<Briefcase size={20} />} title="Careers" subtitle="Join our team" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function MenuRow({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 active:scale-95 transition-transform cursor-pointer">
      <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-slate-800 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="font-black text-sm uppercase">{title}</h3>
        <p className="text-[10px] font-bold text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}
