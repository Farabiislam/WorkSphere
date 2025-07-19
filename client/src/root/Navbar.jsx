import React from 'react';
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from '../components/mode-toggle';
import { Link, NavLink, useLocation } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { MenuIcon } from 'lucide-react';
import { DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '../components/ui/dropdown-menu';

const Navbar = () => {
    const location = useLocation()
    const user = true;
    return (
        <div className='w-full shadow-md shadow-secondary'>
            <header className="w-11/12 mx-auto py-4 sm:px-4 flex justify-between items-center">
                {/* Dropdown Menu for smaller screens */}
                <div className='sm:hidden'>
                    <DropdownMenu>
                        <DropdownMenuTrigger><MenuIcon /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <NavLink to="/">Home</NavLink>
                            </DropdownMenuItem>
                            {user && (<DropdownMenuSub>
                                <div className='flex'><NavLink to="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></NavLink>{location.pathname === '/dashboard' && <DropdownMenuSubTrigger></DropdownMenuSubTrigger>}</div>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {
                                            location.pathname === '/dashboard' && (
                                                <>
                                                    <DropdownMenuItem> <NavLink to="/employees"  >All Employee List</NavLink></DropdownMenuItem>
                                                    <DropdownMenuItem><NavLink to="/payroll">Payroll</NavLink></DropdownMenuItem>
                                                    <DropdownMenuItem><NavLink to="/employee-list">Employee List</NavLink></DropdownMenuItem>
                                                    <DropdownMenuItem><NavLink to="/work-progress">Work Progress</NavLink></DropdownMenuItem>
                                                    <DropdownMenuItem><NavLink to="/worksheet">Work Sheet</NavLink></DropdownMenuItem>
                                                    <DropdownMenuItem><NavLink to="/payment-history">Payment History</NavLink></DropdownMenuItem>
                                                </>
                                            )
                                        }
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>)}

                            <DropdownMenuItem>
                                <NavLink to="/contact">Contact Us</NavLink>
                            </DropdownMenuItem>

                            <DropdownMenuItem></DropdownMenuItem>
                            {!user && (
                                <div className="custom-btn">
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link to="/login" >
                                            <Button variant="primary">Login</Button>
                                        </Link>
                                        <Link to="/register">
                                            <Button variant="secondary">Register</Button>
                                        </Link>
                                    </DropdownMenuItem>
                                </div>
                            )
                            }

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="text-xl font-bold"><Link to="/">Workey</Link></div>
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-4">
                        <div className='gap-4 items-center hidden sm:flex'>
                            {user && <NavigationMenuItem><NavLink to="/dashboard">Dashboard</NavLink></NavigationMenuItem>}

                            <NavigationMenuItem><NavLink to="/contact">Contact Us</NavLink></NavigationMenuItem>
                        </div>

                        <NavigationMenuItem><ModeToggle /></NavigationMenuItem>
                        {user ?
                            (<>
                                <Tooltip>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <TooltipTrigger>
                                                <Avatar className="border-3 border-primary rounded-full">
                                                    <AvatarImage src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                                                        alt="User Avatar"
                                                        className="object-cover" />
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                            </TooltipTrigger>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Button variant="destructive">Logout</Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <TooltipContent>
                                        <p>username</p>
                                    </TooltipContent>
                                </Tooltip>
                            </>) :
                            (<>
                                {location.pathname === '/login' ? (
                                    <NavigationMenuItem><Link to="/register"><Button variant="">Register</Button></Link></NavigationMenuItem>
                                ) : location.pathname === '/register' ? (
                                    <NavigationMenuItem><Link to="/login"><Button variant="">Login</Button></Link></NavigationMenuItem>
                                ) : (
                                    <>
                                        <NavigationMenuItem>
                                            <Link to="/login"><Button variant="" className="custom-auth-btn">Login</Button></Link>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <Link to="/register"><Button variant="" className="custom-auth-btn">Register</Button></Link>
                                        </NavigationMenuItem>
                                    </>
                                )}
                            </>)
                        }
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
        </div>
    );
};

export default Navbar;