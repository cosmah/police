import React from 'react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItem, AuthUser } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, Building2, FilePlus, FileText } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<{ auth: AuthUser }>().props;
    const isSuperAdmin = auth.user?.role === 'super_admin';
    const isAdmin = auth.user?.role === 'admin';
    const isOfficer = auth.user?.role === 'officer';

    // Dashboard is available to all users
    const dashboardItem: NavItem = {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    };

    // Define role-specific navigation items
    const superAdminItems: NavItem[] = [
        dashboardItem,
        {
            title: 'Users',
            href: '/users',
            icon: Users,
        },
        {
            title: 'Stations',
            href: '/stations',
            icon: Building2,
        }
    ];

    const adminItems: NavItem[] = [
        dashboardItem,
        {
            title: 'Documents',
            href: '/admin/documents',
            icon: FilePlus,
        }
    ];

    const officerItems: NavItem[] = [
        dashboardItem,
        {
            title: 'Documents View',
            href: '/officer/documents',
            icon: FileText,
        }
    ];

    // Determine which items to show based on user role
    let mainNavItems: NavItem[] = [];

    if (isSuperAdmin) {
        mainNavItems = superAdminItems;
    } else if (isAdmin) {
        mainNavItems = adminItems;
    } else if (isOfficer) {
        mainNavItems = officerItems;
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
