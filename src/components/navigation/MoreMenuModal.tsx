'use client';

import { useState } from 'react';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { MoreHorizontal, Clock, MapPin, Phone, Briefcase, ChevronDown } from 'lucide-react';

export function MoreMenuModal() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-blue-950 opacity-60 hover:opacity-100 flex flex-col items-center gap-1">
          <MoreHorizontal size={22} />
          <span className="text-[9px] font-black uppercase">More</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-white rounded-t-[40px] px-8 pb-12 pt-4 max-w-md mx-auto h-[85vh]">
        <DrawerTitle className="sr-only">Store Information</DrawerTitle>

        <h2 className="text-2xl font-black uppercase tracking-tight mb-6 mt-4 text-blue-950">Store <span className="text-[#E11D48]">Info</span></h2>

        <div className="space-y-4 overflow-y-auto no-scrollbar pb-6">
          <MenuRow icon={<Clock size={20} />} title="Trading Hours">
            <span className="text-slate-800 uppercase block mb-1">Palm Ridge</span>
            <div className="flex justify-between"><span>Mon - Fri</span> <span>08:00 - 18:00</span></div>
            <div className="flex justify-between"><span>Sat - Sun</span> <span>09:00 - 15:00</span></div>
            <div className="flex justify-between text-[#E11D48]"><span>Public Holidays</span> <span>Closed</span></div>
          </MenuRow>

          <MenuRow icon={<MapPin size={20} />} title="Store Locations">
            <div className="mb-2">
              <span className="text-slate-800 uppercase block mb-1">Palm Ridge</span>
              <p className="text-[10px] text-slate-500 font-medium mb-2 leading-relaxed">Coner Of Celtis Street And Mangrove Street, Palm Ridge 1488 Katlehong, South Africa</p>
              <a href="https://maps.app.goo.gl/DEAK9wDL2i91aUD56" target="_blank" rel="noreferrer" className="text-blue-600 underline text-[10px] hover:text-blue-800">Open in Google Maps</a>
            </div>

            <div className="mb-2">
              <span className="text-slate-800 uppercase block mb-1">Roodekop</span>
              <p className="text-[10px] text-slate-500 font-medium mb-2 leading-relaxed"> 557a Luthando St, Roodekop, Germiston, 1401</p>
              <a href="https://maps.app.goo.gl/g8WhjmGxtTUfKW858" target="_blank" rel="noreferrer" className="text-blue-600 underline text-[10px] hover:text-blue-800">Open in Google Maps</a>
            </div>
          </MenuRow>

          <MenuRow icon={<Phone size={20} />} title="Contact Us">
            <a href="tel:+27110000000" className="flex items-center gap-2 text-blue-600 mb-2 hover:text-blue-800 font-black">
              <Phone size={14} /> +27 11 866 2304
            </a>
            <p className="text-[10px] text-slate-500 font-medium">Available during trading hours.</p>
          </MenuRow>

          <MenuRow icon={<Briefcase size={20} />} title="Careers">
            <p className="mb-2 text-slate-600 font-medium leading-relaxed">We're always looking for passionate people. Drop your CV at the store or email us.</p>
            <a href="mailto:jobs@meatchoice.co.za" className="text-blue-600 text-[10px] underline hover:text-blue-800 font-black">jobs@meatchoice.co.za</a>
          </MenuRow>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function MenuRow({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-4 items-center p-4 cursor-pointer hover:bg-slate-100 transition-colors"
      >
        <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-[#E11D48] shadow-sm shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-black text-sm uppercase text-slate-800">{title}</h3>
        </div>
        <div className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </div>

      <div
        className={`px-4 pt-0 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] pb-4 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="border-t border-slate-200 pt-4 text-xs font-bold text-slate-600 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}
