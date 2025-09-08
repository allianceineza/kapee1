import React from "react";
import image1 from '../assets/image.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
interface Product {
  id: number;
  name: string;
  price: number | string;
  originalPrice?: number;
  image: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

// ✅ Sample Data
const featuredProducts: Product[] = [
  { id: 1, name: "Apple AirPods with Wireless Case", price: 85, 
    image: "airpods.png" },
  { id: 2, name: "JBL Wireless Bluetooth Speaker", price: 96, 
    image: "jbl-speaker.png" },
  { id: 3, name: "JBL On-Ear Headphones", price: 124,
     image: "jbl-headphones.png" },
];

const recentProducts: Product[] = [
  { id: 1, name: "Apple iPhone 11 Pro Max 256GB", price: 199, originalPrice: 254, 
    image: image1,},
  {
  id: 2, 
  name: "Apple AirPods with Wireless Case",
  price: 85,  
  image: image2 },
  { 
    id: 3, name: "Apple Watch Series 5", 
    price: "$499.00 - $599.00", 
    image: image3 },
];

const onSaleProducts: Product[] = [
  { id: 1, name: "Apple iPhone 11 Pro Max 256GB", price: 199, originalPrice: 254, 
    image: image4 },
  { id: 2, name: "Apple Watch Series 5", price: "$499.00 - $599.00", 
    image: image5 },
  { id: 3, name: "Samsung Gear 360 Camera", price: 29, originalPrice: 48, 
    image: image6 },
];

const topRatedProducts: Product[] = [
  { id: 1, name: "Samsung Virtual Reality Headset", price: 18,
     image: image1 },
  { id: 2, name: "Microsoft Xbox One Wireless Controller", price: 25, originalPrice: 45,
     image: image2 },
  { id: 3, name: "Apple Watch Series 5 Black Milanese Loop", price: 599, 
    image: image3 },
];

// ✅ Reusable Section Component
const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold uppercase border-b-2 border-yellow-400 pb-1 mb-4">
        {title}
      </h3>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-3">
            {/* Image */}
            <img src={product.image} alt={product.name} className="w-14 h-14 object-contain" />

            {/* Info */}
            <div>
              <p className="text-sm text-gray-700 truncate">{product.name}</p>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-gray-800">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-gray-500">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ✅ Main Component
const ProductTabs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
      <ProductSection title="Featured" products={featuredProducts} />
      <ProductSection title="Recent" products={recentProducts} />
      <ProductSection title="On Sale" products={onSaleProducts} />
      <ProductSection title="Top Rated" products={topRatedProducts} />
    </div>
  );
};

export default ProductTabs;
