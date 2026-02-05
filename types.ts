
export enum Platform {
  PLAYSTATION = 'PlayStation',
  XBOX = 'Xbox',
  NINTENDO = 'Nintendo',
  LAPTOP = 'Laptop',
  ACCESSORIES = 'Accessories'
}

export enum Category {
  CONSOLES = 'Consoles',
  CONTROLLERS = 'Controllers',
  GAMES = 'Games',
  LAPTOPS = 'Laptops',
  PERIPHERALS = 'Peripherals'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[]; // Multiple images support
  platform: Platform;
  category: Category;
  description: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  specs: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RepairBooking {
  id: string;
  deviceType: Platform;
  model: string;
  issue: string;
  customerName: string;
  email: string;
  phone: string;
  status: 'Pending' | 'Diagnosed' | 'In Progress' | 'Completed';
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

export interface HomePageSection {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  productIds: string[];
  enabled: boolean;
}

export interface HomePageConfig {
  sections: HomePageSection[];
}
