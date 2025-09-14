// SidebarProvider.tsx
import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    expandedMenus: string[];
    setExpandedMenus: React.Dispatch<React.SetStateAction<string[]>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

    return (
        <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, expandedMenus, setExpandedMenus }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};