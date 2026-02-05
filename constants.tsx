import { Product, Platform, Category } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ps5-disc',
    name: 'PlayStation 5 Console (Disc Edition)',
    price: 185000,
    oldPrice: 195000,
    image: 'https://picsum.photos/seed/ps5/600/600',
    platform: Platform.PLAYSTATION,
    category: Category.CONSOLES,
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    stockStatus: 'In Stock',
    rating: 4.9,
    specs: { 'Processor': 'AMD Zen 2', 'GPU': '10.3 TFLOPS', 'Storage': '825GB SSD', 'RAM': '16GB GDDR6' }
  },
  {
    id: 'dualsense-edge',
    name: 'DualSense Edge™ Wireless Controller',
    price: 75000,
    image: 'https://picsum.photos/seed/controller/600/600',
    platform: Platform.PLAYSTATION,
    category: Category.CONTROLLERS,
    description: 'Get an edge in gameplay by creating your own custom controls to fit your playstyle.',
    stockStatus: 'In Stock',
    rating: 4.8,
    specs: { 'Connection': 'Wireless/USB-C', 'Battery Life': '6-10 Hours', 'Haptic Feedback': 'Yes' }
  },
  {
    id: 'xbox-series-x',
    name: 'Xbox Series X',
    price: 175000,
    image: 'https://picsum.photos/seed/xboxx/600/600',
    platform: Platform.XBOX,
    category: Category.CONSOLES,
    description: 'The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles.',
    stockStatus: 'Low Stock',
    rating: 4.7,
    specs: { 'Processor': 'AMD Zen 2', 'GPU': '12 TFLOPS', 'Storage': '1TB NVMe SSD' }
  },
  {
    id: 'switch-oled',
    name: 'Nintendo Switch - OLED Model',
    price: 115000,
    image: 'https://picsum.photos/seed/switch/600/600',
    platform: Platform.NINTENDO,
    category: Category.CONSOLES,
    description: 'Features a vibrant 7-inch OLED screen, a wide adjustable stand, and wired LAN port.',
    stockStatus: 'In Stock',
    rating: 4.9,
    specs: { 'Screen': '7" OLED', 'Battery': '4.5 - 9 Hours', 'Storage': '64GB' }
  },
  {
    id: 'rog-zephyrus',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    price: 450000,
    image: 'https://picsum.photos/seed/laptop1/600/600',
    platform: Platform.LAPTOP,
    category: Category.LAPTOPS,
    description: 'Powerful 14-inch gaming laptop with Ryzen 9 and RTX 40 series graphics.',
    stockStatus: 'Low Stock',
    rating: 4.6,
    specs: { 'CPU': 'Ryzen 9 8945HS', 'GPU': 'RTX 4070', 'RAM': '32GB', 'Storage': '1TB NVMe' }
  }
];

export const PLATFORM_COLORS = {
  [Platform.PLAYSTATION]: '#ffffff',
  [Platform.XBOX]: '#d1d1d1',
  [Platform.NINTENDO]: '#a1a1a1',
  [Platform.LAPTOP]: '#717171',
  [Platform.ACCESSORIES]: '#e5e5e5'
};