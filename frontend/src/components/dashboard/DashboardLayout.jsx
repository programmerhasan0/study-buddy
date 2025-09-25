/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : DashboardLayout.jsx
 * File description: This file represents the layout for logged in users
 * Date : 24/09/2025
 *
 */

import {Outlet} from 'react-router';
import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/app-sidebar';

const DashboardLayout = () => {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 p-4">
                    <SidebarTrigger className="" />
                    <div className="">
                        <Outlet />
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout;
