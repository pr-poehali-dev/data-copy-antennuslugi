import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="aspect-square overflow-hidden bg-white">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <Badge className="mb-3">{product.category}</Badge>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                {product.oldPrice} ₽
              </span>
            )}
            <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
          </div>
          <Button onClick={() => onAddToCart(product)} className="bg-secondary hover:bg-secondary/90">
            <Icon name="ShoppingCart" size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
