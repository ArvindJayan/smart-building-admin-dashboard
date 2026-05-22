"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Building2, Menu, Settings } from "lucide-react";

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            <nav className="flex flex-col gap-4 pt-4">
                                <a href="#" className="flex items-center gap-2 text-sm font-medium text-primary">
                                    Dashboard
                                </a>
                                <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                                    Buildings
                                </a>
                                <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                                    Assets
                                </a>
                                <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                                    Reports
                                </a>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-semibold">SmartBuild</h1>
                            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a href="#" className="text-sm font-medium text-primary">
                        Dashboard
                    </a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Buildings
                    </a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Assets
                    </a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Reports
                    </a>
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
                            3
                        </Badge>
                        <span className="sr-only">Notifications</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Admin User</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        admin@smartbuild.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
