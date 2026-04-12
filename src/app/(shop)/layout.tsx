import { BottomNav } from '@/components/layout/BottomNav';
import { BudgetDrawer } from '@/components/modules/budget/BudgetDrawer';
import { Header } from '@/components/layout/Header';
import { Toaster } from 'sonner';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1440px] w-full mx-auto bg-[#F4F4F5] min-h-[100dvh] relative shadow-2xl flex flex-col text-slate-900 font-sans isolate">
      <Header />
      <main className="flex-1 pb-32 md:pb-12 px-0 md:px-8">
        {children}
      </main>
      <Toaster position="top-center" richColors />
      <BottomNav />
      <BudgetDrawer />
    </div>
  );
}
