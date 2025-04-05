import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import logo from '../assets/logo.png';
import avatarImg from "../assets/avatar.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" }
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart?.cartItems || []);
    const { currentUser, logout } = useAuth();
    const dropdownRef = useRef(null);

    const handelLogOut = () => {
        logout();
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <header className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 md:py-6">
            <nav className="flex justify-between items-center">
                {/* Logo and Title */}
                <div className="flex items-center gap-6 md:gap-20">
                    <Link to="/">
                        <img src={logo} alt="logo" className="h-10" />
                    </Link>
                    <div className="relative w-32 sm:w-48 md:w-72">
                        <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search Here"
                            className="bg-[#EAEAEA] w-full py-1 pl-8 pr-2 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative flex items-center space-x-4 md:space-x-6">
                    <div>
                        {currentUser ? (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatarImg} alt="avatar" className="rounded-full ring-2 ring-blue-500" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-primary shadow-md rounded-md z-40 font-medium">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="px-4 py-2 hover:bg-yellow-200 block text-sm">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handelLogOut}
                                                    className="w-full text-left px-4 py-2 hover:bg-yellow-200 block text-sm"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <FaRegUser className="size-6" />
                            </Link>
                        )}
                    </div>

                    <button className="hidden sm:block">
                        <FaRegHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-primary p-1 px-3 sm:px-5 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className="size-6" />
                        <span className="text-sm font-semibold sm:ml-1">
                            {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
