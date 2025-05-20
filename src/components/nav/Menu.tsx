'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow-md w-full text-sm">
      {/* Link-Gruppe: Kategorien */}
      <div className="flex gap-6">
        <Link
          href="/womens"
          className={`font-medium hover:text-orange-500 ${
            pathname === '/womens' ? 'text-yellow-500' : 'text-gray-700'
          }`}
        >
          Damen
        </Link>
        <Link
          href="/mens"
          className={`font-medium hover:text-orange-500 ${
            pathname === '/mens' ? 'text-yellow-500' : 'text-gray-700'
          }`}
        >
          Herren
        </Link>
        <Link
          href="/childs"
          className={`font-medium hover:text-orange-500 ${
            pathname === '/childs' ? 'text-yellow-500' : 'text-gray-700'
          }`}
        >
          Kinder
        </Link>
        <Link
          href="/universal"
          className={`font-medium hover:text-orange-500 ${
            pathname === '/universal' ? 'text-yellow-500' : 'text-gray-700'
          }`}
        >
          Universal
        </Link>
      </div>

      {/* Link-Gruppe: Shop */}
      <div className="flex gap-6">
        <Link
          href="/myAccount"
          className={`font-medium hover:text-orange-500 ${
            pathname === '/myAccount' ? 'text-yellow-500' : 'text-gray-700'
          }`}
        >
          Mein Konto
        </Link>
        <Link
          href="/cart"
          className={`font-medium hover:text-orange-500 ${
            pathname === '/cart' ? 'text-yellow-500' : 'text-gray-700'
          }`}
        >
          <ShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
