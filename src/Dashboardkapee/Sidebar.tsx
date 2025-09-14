import React from 'react';
import {
  LayoutGrid,
  Package,
  Users,
  ShoppingBag,
  UserCheck,
  Settings,
  Globe,
  Monitor,
  FileText,
  ChevronRight,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useSidebar } from '../context/SidebarProvider';

// Types
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
  isActive?: boolean;
}

// Sidebar Component
const Sidebar: React.FC = () => {
  const { sidebarOpen, expandedMenus, setExpandedMenus } = useSidebar();

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid size={20} />, isActive: true },
    { id: 'catalog', label: 'Catalog', icon: <Package size={20} />, hasSubmenu: true },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'staff', label: 'Our Staff', icon: <UserCheck size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'international', label: 'International', icon: <Globe size={20} />, hasSubmenu: true },
    { id: 'online-store', label: 'Online Store', icon: <Monitor size={20} />, hasSubmenu: true },
    { id: 'pages', label: 'Pages', icon: <FileText size={20} />, hasSubmenu: true },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev: string[]) =>
      prev.includes(menuId)
        ? prev.filter((id: string) => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          {sidebarOpen && <span className="text-xl font-bold text-gray-800">Dashtar</span>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => item.hasSubmenu && toggleMenu(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${
                item.isActive ? 'bg-emerald-50 text-emerald-600 border-r-2 border-emerald-500' : ''
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {sidebarOpen && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.hasSubmenu && (
                    expandedMenus.includes(item.id) ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                  )}
                </>
              )}
            </button>
            
            {/* Submenu */}
            {item.hasSubmenu && expandedMenus.includes(item.id) && sidebarOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <div className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded cursor-pointer">
                  Submenu Item 1
                </div>
                <div className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded cursor-pointer">
                  Submenu Item 2
                </div>
                <div className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded cursor-pointer">
                  Submenu Item 3
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Log Out Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
          <LogOut size={20} />
          {sidebarOpen && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;