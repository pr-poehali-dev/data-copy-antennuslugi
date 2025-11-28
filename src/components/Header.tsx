import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import CartSheet from './CartSheet';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface HeaderProps {
  currentPage: 'home' | 'catalog' | 'about' | 'services' | 'delivery' | 'contacts';
  onNavigate: (page: 'home' | 'catalog' | 'about' | 'services' | 'delivery' | 'contacts') => void;
  cart: CartItem[];
  totalItems: number;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveFromCart: (id: number) => void;
  totalPrice: number;
}

const Header = ({ 
  currentPage, 
  onNavigate, 
  cart, 
  totalItems, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  totalPrice 
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Icon name="Satellite" size={32} className="text-primary" />
            <span className="text-2xl font-bold">АнтеннУслуги</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { page: 'home', label: 'Главная' },
              { page: 'catalog', label: 'Каталог' },
              { page: 'about', label: 'О компании' },
              { page: 'services', label: 'Услуги' },
              { page: 'delivery', label: 'Доставка' },
              { page: 'contacts', label: 'Контакты' }
            ].map(item => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page as any)}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  currentPage === item.page ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary">{totalItems}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <CartSheet
              cart={cart}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveFromCart={onRemoveFromCart}
              totalPrice={totalPrice}
            />
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
