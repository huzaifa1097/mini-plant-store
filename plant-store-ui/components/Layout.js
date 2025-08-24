import Head from 'next/head';
import Link from 'next/link'; // Import the Link component
import { useCart } from '../context/CartContext';

export default function Layout({ children }) {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Head>
        <title>Plant Haven | A Mini Plant Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col font-sans">
        <header className="bg-brand-cream/80 backdrop-blur-sm sticky top-0 z-20 border-b border-brand-green/20">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-serif font-bold text-brand-green">Plant Haven by Huzaifa 🌿</Link>
            
            {/* THIS IS THE UPDATED PART */}
            <Link href="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-brand-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {/* END OF UPDATED PART */}

          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-brand-green-dark text-brand-cream text-center p-6">
          <p>&copy; 2025 Huzaifa & Co. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}