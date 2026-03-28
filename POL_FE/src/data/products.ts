export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  image?: string; // Backward compatibility (virtual field from backend)
  badge?: string;
  inStock?: boolean;
  specs?: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "HP Pavilion 15 Laptop - Intel Core i5, 8GB RAM, 512GB SSD",
    category: "laptops",
    price: 54999,
    originalPrice: 64999,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"],

    badge: "Best Seller",
    inStock: true,
    specs: ["Intel Core i5-1235U", "8GB DDR4", "512GB NVMe SSD", "15.6\" FHD IPS"],
    description: "Experience power and portability with the HP Pavilion 15 Laptop. Powered by an Intel Core i5 processor and 8GB of RAM, this laptop handles multitasking with ease. The 512GB SSD ensures lightning-fast boot times and ample storage for your files. Its 15.6-inch Full HD IPS display delivers crystal-clear visuals, making it perfect for work, entertainment, and creative projects. With a sleek design and long-lasting battery life, the HP Pavilion 15 is your ideal daily driver."
  },
  {
    id: 2,
    name: "Dell OptiPlex 3090 Desktop - Core i7, 16GB RAM",
    category: "desktops",
    price: 42500,
    images: ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80"],

    inStock: true,
    specs: ["Intel Core i7-10700", "16GB DDR4", "1TB HDD", "Windows 11 Pro"],
    description: "Boost your productivity with the Dell OptiPlex 3090 Desktop. Featuring a robust Intel Core i7 processor and 16GB of DDR4 RAM, this desktop is built to handle intensive applications and multitasking workflows efficiently. The 1TB HDD provides massive storage space for all your documents and media. Pre-loaded with Windows 11 Pro, it offers enterprise-grade security and management features, making it a reliable choice for business and home office setups."
  },
  {
    id: 3,
    name: "Logitech MX Master 3 Wireless Mouse",
    category: "accessories",
    price: 8999,
    originalPrice: 10999,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"],

    badge: "Sale",
    inStock: true,
    specs: ["4000 DPI", "USB-C Rechargeable", "Multi-device", "Ergonomic Design"],
    description: "Master your workflow with the Logitech MX Master 3. This advanced wireless mouse is designed for precision and comfort, featuring a 4000 DPI Darkfield sensor that tracks on virtually any surface, even glass. The MagSpeed electromagnetic scrolling wheel is precise enough to stop on a pixel and quick enough to scroll 1,000 lines in a second. Its ergonomic silhouette fits your hand perfectly, and customizable buttons allow a tailored experience for every app used."
  },
  {
    id: 4,
    name: "Samsung 27\" Curved Monitor - Full HD, 75Hz",
    category: "monitors",
    price: 18499,
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"],

    inStock: true,
    specs: ["27\" Curved VA Panel", "1920x1080 FHD", "75Hz Refresh", "AMD FreeSync"],
    description: "Immerse yourself in the action with the Samsung 27\" Curved Monitor. The 1800R scale screen curvature provides a truly immersive viewing experience that lets you enjoy big, bold, and stunning views while you work or play. With a 75Hz refresh rate and AMD FreeSync technology, you can enjoy smooth gameplay without stuttering or tearing. The VA panel technology delivers a 3000:1 contrast ratio for deeper blacks and more brilliant whites."
  },
  {
    id: 5,
    name: "ASUS ROG Gaming Laptop - RTX 3060, Ryzen 7",
    category: "laptops",
    price: 89999,
    originalPrice: 99999,
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80"],

    badge: "Gaming",
    inStock: true,
    specs: ["AMD Ryzen 7 6800H", "16GB DDR5", "RTX 3060 6GB", "15.6\" 144Hz"],
    description: "Dominate the battlefield with the ASUS ROG Gaming Laptop. Equipped with a powerful AMD Ryzen 7 6800H processor and NVIDIA GeForce RTX 3060 graphics, this machine delivers high-frame-rate gameplay for competitive gaming. The 15.6-inch 144Hz display ensures fluid motion and minimal motion blur. With 16GB of next-gen DDR5 RAM and a specialized cooling system, it stays cool under pressure while you push performance to the limit."
  },
  {
    id: 6,
    name: "Intel Core i5-12400F Processor",
    category: "components",
    price: 15999,
    images: ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"],

    inStock: true,
    specs: ["6 Cores, 12 Threads", "2.5GHz Base Clock", "4.4GHz Boost", "LGA 1700"],
    description: "Build your dream PC with the Intel Core i5-12400F Processor. Part of the 12th Gen Alder Lake family, it features 6 Performance cores and 12 threads to handle demanding games and applications effectively. With a max turbo frequency of 4.4GHz, it delivers snappy responsiveness. Compatible with LGA 1700 motherboards and supporting both DDR4 and DDR5 memory, it offers a flexible foundation for a modern, high-performance system."
  },
  {
    id: 7,
    name: "TP-Link Archer AX50 WiFi 6 Router",
    category: "networking",
    price: 7499,
    images: ["https://images.unsplash.com/photo-1544244015-9c72362c2122?auto=format&fit=crop&w=800&q=80"],

    inStock: true,
    specs: ["WiFi 6 AX3000", "Dual Band", "OFDMA", "4 Gigabit Ports"],
    description: "Upgrade your home network with the TP-Link Archer AX50 WiFi 6 Router. Delivering speeds up to 3000 Mbps, it ensures buffer-free 4K/8K streaming and lag-free gaming. The OFDMA technology increases capacity by 4 times to enable simultaneous transmission to more devices. It also features HomeCare security to protect your network and connected devices, along with parental controls for a safer online experience."
  },
  {
    id: 8,
    name: "HP LaserJet Pro MFP Printer",
    category: "printers",
    price: 24999,
    images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80"],

    badge: "New",
    inStock: false,
    specs: ["Print/Scan/Copy", "22 PPM", "Auto Duplex", "Wireless"],
    description: "Simplify your office tasks with the HP LaserJet Pro MFP Printer. This versatile multi-function printer handles printing, scanning, and copying with professional quality. It offers fast print speeds of up to 22 pages per minute and automatic two-sided printing to save paper. With built-in wireless connectivity, you can easily print from your smartphone or tablet using the HP Smart app. Compact and efficient, it fits perfectly in any workspace."
  },
];
