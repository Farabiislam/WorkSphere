import React, { useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext';



const Navbar = () => {
    const { user, logout, loading, role } = useContext(AuthContext)
    const location = useLocation()

    
    const handleLogout = function () {
        logout().then(() => {
            // Sign-out successful.
            // console.log("logged out")
            // toast.success("Logged Out Sucessful");


        }).catch((error) => {
            //
            // console.log("An error happened.", error)
            //toast.error(error);

        });

    }
    return (
        <div className='w-full shadow-md shadow-secondary'>
            <header className="w-11/12 mx-auto py-4 sm:px-4 flex justify-between items-center">
                {/* Dropdown Menu for smaller screens */}
                <div className='sm:hidden'>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild><MenuIcon /></DropdownMenuTrigger>
                        <DropdownMenuContent className="sm:hidden">
                            <DropdownMenuItem>
                                <NavLink to="/">Home</NavLink>
                            </DropdownMenuItem>
                            {user && (<DropdownMenuSub>
                                <div className='flex'><NavLink to="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></NavLink>{location.pathname.startsWith('/dashboard') && <DropdownMenuSubTrigger></DropdownMenuSubTrigger>}</div>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className={"sm:hidden"}>
                                        {
                                            location.pathname.startsWith('/dashboard') && (
                                                <>
                                                    {role === 'admin' && (
                                                        <>
                                                            <DropdownMenuItem>
                                                                <NavLink to="/dashboard/employees">All Employee List</NavLink>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <NavLink to="/dashboard/payroll">Payroll</NavLink>
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}

                                                    {role === 'hr' && (
                                                        <>
                                                            <DropdownMenuItem>
                                                                <NavLink to="/dashboard/employee-list">Employee List</NavLink>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <NavLink to="/dashboard/work-progress">Work Progress</NavLink>
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}

                                                    {role === 'employee' && (
                                                        <>
                                                            <DropdownMenuItem>
                                                                <NavLink to="/dashboard/worksheet">Work Sheet</NavLink>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <NavLink to="/dashboard/payment-history">Payment History</NavLink>
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
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

                                <DropdownMenu>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <DropdownMenuTrigger asChild>
                                                <Avatar className="border-3 border-primary rounded-full">
                                                    <AvatarImage src={user.photoURL}
                                                        alt="User Avatar"
                                                        className="object-cover" />
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{user.displayName}</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Button onClick={handleLogout} variant="destructive">Logout</Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

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