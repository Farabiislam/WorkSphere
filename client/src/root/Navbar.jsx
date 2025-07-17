import React from 'react';
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from '../components/mode-toggle';

const Navbar = () => {
    return (
        <div className='w-full shadow'>
            <header className="w-11/12 mx-auto p-4 flex justify-between items-center">
                <div className="text-xl font-bold">EmployeeManagement</div>
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-4">
                        <NavigationMenuItem><ModeToggle/></NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant="">Login</Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant="">Register</Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
        </div>
    );
};

export default Navbar;