import React from 'react';
import { SidebarProvider } from '../context/SidebarProvider';
import Sidebar from './Sidebar';
import Navbar from './NavbarDashboard';
import DashboardOutlet from './DashboardOutlet';

const DashboardLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                        <DashboardOutlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;
