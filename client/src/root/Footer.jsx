import React from 'react';

const Footer = () => {
    return (
        <footer className="py-2 border-t ">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Company Info */}
                <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold">Workey</h3>
                    
                </div>
                <p className="text-xs">
                        &copy; {new Date().getFullYear()} Workey. All rights reserved.
                    </p>
                {/* Navigation Links */}
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="hover:underline text-sm">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline text-sm">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline text-sm">
                            Privacy Policy
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;