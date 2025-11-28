import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

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

interface CartSheetProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveFromCart: (id: number) => void;
  totalPrice: number;
}

const CartSheet = ({ cart, onUpdateQuantity, onRemoveFromCart, totalPrice }: CartSheetProps) => {
  return (
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle className="text-2xl">Корзина</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {cart.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.price} ₽</p>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => onRemoveFromCart(item.id)}
                          className="ml-auto text-destructive"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">{totalPrice} ₽</span>
              </div>
              <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  );
};

export default CartSheet;
