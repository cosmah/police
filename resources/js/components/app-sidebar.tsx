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
    const isAdmin = auth.user?.role === 'admin' || auth.user?.role === 'super_admin';
    const isOfficer = auth.user?.role === 'officer';

    const mainNavItems: NavItem[] = [
        ...(isAdmin ? [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Users',
                href: '/users',
                icon: Users,
            },
            {
                title: 'Stations',
                href: '/stations',
                icon: Building2,
            },
            {
                title: 'Documents',
                href: '/admin/documents',
                icon: FilePlus,
            },
            {
                title: 'Documents View',
                href: '/officer/documents',
                icon: FileText,
            },
        ] : []),
        ...(isOfficer ? [
            {
                title: 'Documents View',
                href: '/officer/documents',
                icon: FileText,
            },
        ] : []),
    ];



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
