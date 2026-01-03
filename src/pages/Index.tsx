import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  category: string;
  seller: {
    name: string;
    rating: number;
    avatar: string;
  };
  isFavorite: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'Все категории', icon: 'Grid3x3' },
    { id: 'electronics', name: 'Электроника', icon: 'Smartphone' },
    { id: 'fashion', name: 'Одежда и обувь', icon: 'Shirt' },
    { id: 'home', name: 'Для дома', icon: 'Home' },
    { id: 'auto', name: 'Авто', icon: 'Car' },
    { id: 'realty', name: 'Недвижимость', icon: 'Building' },
    { id: 'services', name: 'Услуги', icon: 'Briefcase' },
  ];

  const [listings] = useState<Listing[]>([
    {
      id: 1,
      title: 'iPhone 14 Pro 256GB Space Black',
      price: 89990,
      location: 'Москва',
      image: '/placeholder.svg',
      category: 'electronics',
      seller: { name: 'Александр', rating: 4.8, avatar: '' },
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Диван угловой с оттоманкой',
      price: 45000,
      location: 'Санкт-Петербург',
      image: '/placeholder.svg',
      category: 'home',
      seller: { name: 'Мария', rating: 4.9, avatar: '' },
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Toyota Camry 2020',
      price: 2100000,
      location: 'Москва',
      image: '/placeholder.svg',
      category: 'auto',
      seller: { name: 'Дмитрий', rating: 4.7, avatar: '' },
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Квартира 2-комнатная, 55м²',
      price: 8500000,
      location: 'Екатеринбург',
      image: '/placeholder.svg',
      category: 'realty',
      seller: { name: 'Елена', rating: 5.0, avatar: '' },
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Кроссовки Nike Air Max',
      price: 7500,
      location: 'Казань',
      image: '/placeholder.svg',
      category: 'fashion',
      seller: { name: 'Игорь', rating: 4.6, avatar: '' },
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Ремонт квартир под ключ',
      price: 50000,
      location: 'Новосибирск',
      image: '/placeholder.svg',
      category: 'services',
      seller: { name: 'Сергей', rating: 4.9, avatar: '' },
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredListings = listings.filter((listing) => {
    const matchesCategory = activeCategory === 'all' || listing.category === activeCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favoriteListings = listings.filter((listing) => favorites.includes(listing.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="ShoppingBag" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">МаркетМаркет</h1>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Найти товары и услуги..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
              <Button className="ml-2">
                <Icon name="Plus" size={20} className="mr-2" />
                Разместить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                className={`flex items-center gap-2 whitespace-nowrap transition-all ${
                  activeCategory === category.id ? 'animate-scale-in' : 'hover:scale-105'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon name={category.icon as any} size={18} />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Icon name="Grid3x3" size={16} />
              Все объявления
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Icon name="Heart" size={16} />
              Избранное
              {favorites.length > 0 && (
                <Badge variant="secondary" className="ml-1">{favorites.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing, index) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 rounded-full bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(listing.id);
                      }}
                    >
                      <Icon
                        name="Heart"
                        size={18}
                        className={favorites.includes(listing.id) ? 'fill-accent text-accent' : ''}
                      />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Icon name="MapPin" size={14} />
                      {listing.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-primary">
                        {listing.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 border-t">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={listing.seller.avatar} />
                        <AvatarFallback>{listing.seller.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{listing.seller.name}</p>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{listing.seller.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Написать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <Icon name="Search" size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-gray-500">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            {favoriteListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteListings.map((listing, index) => (
                  <Card
                    key={listing.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 rounded-full bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(listing.id);
                        }}
                      >
                        <Icon
                          name="Heart"
                          size={18}
                          className="fill-accent text-accent"
                        />
                      </Button>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Icon name="MapPin" size={14} />
                        {listing.location}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-2xl font-bold text-primary">
                          {listing.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={listing.seller.avatar} />
                          <AvatarFallback>{listing.seller.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{listing.seller.name}</p>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{listing.seller.rating}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          Написать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <Icon name="Heart" size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Избранное пусто
                </h3>
                <p className="text-gray-500">
                  Добавляйте понравившиеся объявления в избранное
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl">ИИ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">Иван Иванов</CardTitle>
                      <CardDescription>На сервисе с января 2024</CardDescription>
                      <div className="flex items-center gap-1 mt-2">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">4.9</span>
                        <span className="text-sm text-gray-500 ml-1">(42 отзыва)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="Package" size={18} />
                        Мои объявления
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <img src="/placeholder.svg" alt="" className="w-20 h-20 rounded object-cover" />
                              <div className="flex-1">
                                <p className="font-medium line-clamp-2 text-sm">iPhone 14 Pro 256GB</p>
                                <p className="text-primary font-bold mt-1">89 990 ₽</p>
                                <Badge variant="secondary" className="mt-2">Активно</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <img src="/placeholder.svg" alt="" className="w-20 h-20 rounded object-cover" />
                              <div className="flex-1">
                                <p className="font-medium line-clamp-2 text-sm">MacBook Pro 16"</p>
                                <p className="text-primary font-bold mt-1">145 000 ₽</p>
                                <Badge variant="secondary" className="mt-2">Активно</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="Settings" size={18} />
                        Настройки
                      </h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Bell" size={18} className="mr-2" />
                          Уведомления
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Shield" size={18} className="mr-2" />
                          Безопасность
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="CreditCard" size={18} className="mr-2" />
                          Способы оплаты
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;