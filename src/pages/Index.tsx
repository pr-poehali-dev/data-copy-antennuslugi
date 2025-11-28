import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

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

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'about' | 'services' | 'delivery' | 'contacts'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Спутниковая антенна 0.9м',
      price: 4500,
      oldPrice: 5500,
      image: 'https://cdn.poehali.dev/projects/21501e85-b374-4e43-90d8-296a6d54b24e/files/838309ba-d29d-49b7-bf9a-24832fdf645e.jpg',
      category: 'Спутниковое ТВ',
      description: 'Офсетная спутниковая антенна диаметром 0.9м для приема цифрового ТВ',
      inStock: true
    },
    {
      id: 2,
      name: 'Wi-Fi роутер AC1200',
      price: 3200,
      image: 'https://cdn.poehali.dev/projects/21501e85-b374-4e43-90d8-296a6d54b24e/files/0c569c60-c78a-4555-8085-ddfec17952b3.jpg',
      category: 'Интернет оборудование',
      description: 'Двухдиапазонный Wi-Fi роутер с скоростью до 1200 Мбит/с',
      inStock: true
    },
    {
      id: 3,
      name: 'Комплект кабелей RG-6',
      price: 850,
      image: 'https://cdn.poehali.dev/projects/21501e85-b374-4e43-90d8-296a6d54b24e/files/3c6ce69d-c3e8-4c29-b8d0-f138a8384a68.jpg',
      category: 'Кабели и аксессуары',
      description: 'Коаксиальный кабель RG-6 премиум качества, 20 метров',
      inStock: true
    },
    {
      id: 4,
      name: 'Спутниковый ресивер HD',
      price: 2900,
      image: 'https://cdn.poehali.dev/projects/21501e85-b374-4e43-90d8-296a6d54b24e/files/838309ba-d29d-49b7-bf9a-24832fdf645e.jpg',
      category: 'Спутниковое ТВ',
      description: 'Цифровой спутниковый ресивер с поддержкой Full HD',
      inStock: true
    },
    {
      id: 5,
      name: 'Усилитель сигнала LTE',
      price: 5800,
      oldPrice: 6800,
      image: 'https://cdn.poehali.dev/projects/21501e85-b374-4e43-90d8-296a6d54b24e/files/0c569c60-c78a-4555-8085-ddfec17952b3.jpg',
      category: 'Интернет оборудование',
      description: 'Усилитель 4G/LTE сигнала для стабильного интернета',
      inStock: true
    },
    {
      id: 6,
      name: 'Эфирная антенна DVB-T2',
      price: 1200,
      image: 'https://cdn.poehali.dev/projects/21501e85-b374-4e43-90d8-296a6d54b24e/files/3c6ce69d-c3e8-4c29-b8d0-f138a8384a68.jpg',
      category: 'Эфирное ТВ',
      description: 'Комнатная антенна для приема цифрового эфирного ТВ',
      inStock: true
    }
  ];

  const categories = ['all', 'Спутниковое ТВ', 'Интернет оборудование', 'Кабели и аксессуары', 'Эфирное ТВ'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderHome = () => (
    <div className="animate-fade-in">
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-scale-in">
              Антенны и Оборудование
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Профессиональное оборудование для спутникового и эфирного ТВ, интернета и связи
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-6 text-lg"
                onClick={() => setCurrentPage('catalog')}
              >
                <Icon name="Package" size={20} className="mr-2" />
                Каталог товаров
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-8 py-6 text-lg backdrop-blur-sm"
                onClick={() => setCurrentPage('services')}
              >
                <Icon name="Wrench" size={20} className="mr-2" />
                Наши услуги
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Популярные товары</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button 
              size="lg" 
              onClick={() => setCurrentPage('catalog')}
              className="bg-primary hover:bg-primary/90"
            >
              Посмотреть весь каталог
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'BadgeCheck', title: 'Гарантия качества', desc: 'Все товары сертифицированы' },
              { icon: 'Truck', title: 'Быстрая доставка', desc: 'По Москве и всей России' },
              { icon: 'Wrench', title: 'Профессиональный монтаж', desc: 'Опытные специалисты' },
              { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Всегда на связи' }
            ].map((item, i) => (
              <Card key={i} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderCatalog = () => (
    <div className="py-12 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Каталог товаров</h1>
        
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'bg-primary' : ''}
            >
              {cat === 'all' ? 'Все товары' : cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="py-12 px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">О компании</h1>
        <Card className="p-8">
          <p className="text-lg mb-4">
            Мы специализируемся на продаже и установке спутникового и эфирного телевизионного оборудования, интернет-систем и систем связи.
          </p>
          <p className="text-lg mb-4">
            Наша компания работает на рынке более 15 лет и за это время завоевала доверие тысяч клиентов по всей России.
          </p>
          <p className="text-lg">
            Мы предлагаем только качественное сертифицированное оборудование от ведущих мировых производителей с официальной гарантией.
          </p>
        </Card>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="py-12 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Наши услуги</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Установка спутниковых антенн',
              desc: 'Профессиональный монтаж и настройка спутникового телевидения',
              icon: 'Satellite'
            },
            {
              title: 'Настройка интернета',
              desc: 'Подключение и настройка роутеров, усилителей сигнала',
              icon: 'Wifi'
            },
            {
              title: 'Прокладка кабелей',
              desc: 'Монтаж кабельных систем любой сложности',
              icon: 'Cable'
            },
            {
              title: 'Техническая поддержка',
              desc: 'Обслуживание и ремонт установленного оборудования',
              icon: 'Settings'
            }
          ].map((service, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={service.icon as any} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDelivery = () => (
    <div className="py-12 px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Доставка и оплата</h1>
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="Truck" size={24} className="text-primary" />
              Доставка
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>По Москве - бесплатно при заказе от 5000 ₽</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>По России - курьерскими службами СДЭК, Boxberry</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>Самовывоз из нашего офиса - бесплатно</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="CreditCard" size={24} className="text-primary" />
              Оплата
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>Наличными при получении</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>Банковской картой на сайте</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>Безналичный расчет для юридических лиц</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="py-12 px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Контакты</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="MapPin" size={24} className="text-primary" />
              Адрес
            </h2>
            <p className="text-lg">Московская область, Химкинский район, д. Брехово, ТЦ СТРОЙДВОР БРЕХОВО, павильон А32</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="Phone" size={24} className="text-primary" />
              Телефон
            </h2>
            <p className="text-lg">+7 (495) 123-45-67</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="Mail" size={24} className="text-primary" />
              Email
            </h2>
            <p className="text-lg">info@antennuslugi.ru</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="Clock" size={24} className="text-primary" />
              Режим работы
            </h2>
            <p className="text-lg">Пн-Пт: 9:00 - 18:00<br />Сб-Вс: выходной</p>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cart={cart}
        totalItems={totalItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
      />

      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'catalog' && renderCatalog()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'services' && renderServices()}
        {currentPage === 'delivery' && renderDelivery()}
        {currentPage === 'contacts' && renderContacts()}
      </main>

      <Footer />
    </div>
  );
};

export default Index;