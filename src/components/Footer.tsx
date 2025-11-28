import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Satellite" size={28} />
              <span className="text-xl font-bold">АнтеннУслуги</span>
            </div>
            <p className="text-white/80">Профессиональное оборудование и услуги для связи</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-white/80">
              <p>+7 (495) 123-45-67</p>
              <p>info@antennuslugi.ru</p>
              <p>Московская область, Химкинский район, д. Брехово, ТЦ СТРОЙДВОР БРЕХОВО, павильон А32</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
            <div className="space-y-2 text-white/80">
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб-Вс: выходной</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          © 2024 АнтеннУслуги. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;