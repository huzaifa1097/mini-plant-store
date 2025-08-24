import '../styles/globals.css';
import { Inter, Lora } from 'next/font/google';
import { CartProvider } from '../context/CartContext'; // Import the provider

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider> {/* Wrap the app */}
      <main className={`${inter.variable} ${lora.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </CartProvider>
  );
}

export default MyApp;