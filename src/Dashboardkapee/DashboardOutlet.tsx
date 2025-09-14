import React from 'react';
import { 
  ShoppingCart,
  RotateCcw,
  Truck,
  CheckCircle
} from 'lucide-react';

// Dashboard Content (Outlet) Component
const DashboardOutlet: React.FC = () => {
  const salesData = [
    { 
      label: 'Today Orders', 
      amount: '$405.18', 
      color: 'bg-emerald-500', 
      cash: '$405.18', 
      card: '$0.00', 
      credit: '$0.00' 
    },
    { 
      label: 'Yesterday Orders', 
      amount: '$174.04', 
      color: 'bg-orange-500', 
      cash: '$174.04', 
      card: '$0.00', 
      credit: '$0.00' 
    },
    { 
      label: 'This Month', 
      amount: '$19584.06', 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Last Month', 
      amount: '$10711.39', 
      color: 'bg-cyan-500' 
    },
    { 
      label: 'All-Time Sales', 
      amount: '$1066525.57', 
      color: 'bg-green-600' 
    },
  ];

  const orderStats = [
    { 
      label: 'Total Order', 
      value: '1155', 
      icon: <ShoppingCart size={20} />, 
      color: 'bg-orange-100 text-orange-600' 
    },
    { 
      label: 'Orders Pending', 
      value: '20', 
      amount: '(9541.64)', 
      icon: <RotateCcw size={20} />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'Orders Processing', 
      value: '4', 
      icon: <Truck size={20} />, 
      color: 'bg-emerald-100 text-emerald-600' 
    },
    { 
      label: 'Orders Delivered', 
      value: '30', 
      icon: <CheckCircle size={20} />, 
      color: 'bg-green-100 text-green-600' 
    },
  ];

  const weeklyChartData = [12000, 8000, 15000, 16000, 9000, 18000, 14000];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const bestSellingProducts = [
    { name: 'Head Shoulders Shampoo', color: 'bg-emerald-500' },
    { name: 'Mint', color: 'bg-blue-500' },
    { name: 'Pantene hair-care', color: 'bg-orange-500' },
    { name: 'Dark & Lovely Conditioner', color: 'bg-cyan-500' },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {salesData.map((item, index) => (
          <div key={index} className={`${item.color} text-white p-6 rounded-xl shadow-sm`}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white bg-opacity-60 rounded"></div>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">{item.label}</h3>
            <p className="text-2xl font-bold mb-4">{item.amount}</p>
            {item.cash && (
              <div className="text-sm space-y-1">
                <div>Cash: {item.cash}</div>
                <div>Card: {item.card}</div>
                <div>Credit: {item.credit}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {orderStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">
              {stat.label} 
              {stat.amount && <span className="text-red-500"> {stat.amount}</span>}
            </h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Sales</h3>
          <div className="flex gap-4 mb-6">
            <button className="text-emerald-600 font-medium border-b-2 border-emerald-600 pb-1">
              Sales
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              Orders
            </button>
          </div>
          
          {/* Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {weeklyChartData.map((value, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="bg-emerald-500 rounded-t-sm w-8 transition-all duration-300 hover:bg-emerald-600"
                  style={{ height: `${(value / 18000) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500">
                  {weekDays[index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">Sales</div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Best Selling Products</h3>
          
          <div className="space-y-3 mb-6">
            {bestSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-3 h-3 ${product.color} rounded-full`}></div>
                <span className="text-sm text-gray-600">{product.name}</span>
              </div>
            ))}
          </div>

          {/* Pie Chart */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full relative overflow-hidden">
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: 'conic-gradient(#10b981 0deg 120deg, #3b82f6 120deg 200deg, #f59e0b 200deg 280deg, #06b6d4 280deg 360deg)' 
                }}
              ></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">4</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Revenue Growth</h4>
          <div className="text-3xl font-bold text-green-600 mb-1">+24.5%</div>
          <p className="text-sm text-gray-500">vs last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Customer Satisfaction</h4>
          <div className="text-3xl font-bold text-blue-600 mb-1">94.2%</div>
          <p className="text-sm text-gray-500">average rating</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Active Users</h4>
          <div className="text-3xl font-bold text-purple-600 mb-1">2,847</div>
          <p className="text-sm text-gray-500">online now</p>
        </div>
      </div>
    </main>
  );
};

export default DashboardOutlet;