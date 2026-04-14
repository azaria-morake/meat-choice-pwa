import { BottomNav } from '@/components/layout/BottomNav';
import { BudgetDrawer } from '@/components/modules/budget/BudgetDrawer';
import { Header } from '@/components/layout/Header';
import { Toaster } from 'sonner';
import { ProductDetailModal } from '@/components/modules/product/ProductDetailModal';

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
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          className: 'brand-toast',
          style: {
            background: '#E11D48',
            color: 'white',
            borderRadius: '20px',
            border: '4px solid #F4F4F5',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontFamily: 'inherit',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '12px',
            width: '100%',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
      <BottomNav />
      <BudgetDrawer />
      <ProductDetailModal />
    </div>
  );
}
