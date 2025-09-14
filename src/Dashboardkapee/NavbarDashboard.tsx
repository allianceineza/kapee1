import React from 'react';
import { Menu, Bell, Moon, User } from 'lucide-react';
import { useSidebar } from '../context/SidebarProvider';

// Navbar Component
const Navbar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">GB ENGLISH</span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Moon size={20} />
          </button>
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              6
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;