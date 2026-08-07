"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        document.body.classList.toggle("open", menuOpen);
        return () => document.body.classList.remove("open");
    }, [menuOpen]);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-transparent flex justify-center h-24 lg:px-[4rem] z-999">
            <div className="w-full grid grid-cols-[minmax(5vw,1fr)_minmax(auto,1400px)_minmax(5vw,1fr)] z-1">
                <div className="max-w-[1360px] px-5  col-start-2 grid grid-cols-2 gap-x-3 items-center w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">

                    {/* Logo */}
                    <Link href="/" className=" max-w-[240px] ">
                        <Image src="/images/logo.png" alt="Logo" width={220} height={70} className="object-contain " />
                    </Link>


                    {/* Hamburger Menu */}
                    <button
                        className="flex items-center justify-end z-50 w-nav-button p-2 cursor-pointer "
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="uppercase hidden md:block bg-[var(--light-outline)] text-sm py-1 pr-3 pl-2 mr-[-10px] rounded-tl-[8px] rounded-bl-[8px]">Menu</span>
                        <div className="flex items-center justify-center bg-[var(--light-outline)] w-12 h-12 rounded-full">
                            {menuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 text-white menu-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            ) : (

                                <div className="menu-icon">
                                    {/* <Image src="/images/hamburger.svg" alt="Open menu" width={30} height={30} className="menu-icon" /> */}
                                    <span></span>
                                    <span></span>
                                    {/* <span></span> */}
                                </div>
                            )}
                        </div>
                    </button>


                </div>
            </div>
            <div className="nav-cover"></div>

            {/* Mobile Nav */}
            <div
                className={`absolute  w-full transition-all duration-700 mobile-nav-menu menu-set  top-0 ${menuOpen ? "menu-set-open visible" : "invisible"
                    }`}
            >
                <nav className={` min-h-screen flex flex-col justify-center duration-700 relative ${menuOpen ? "opacity-100 " : "opacity-0  scale-50"
                    }`}>
                    <Link href="/" className="block text-white py-2 px-6 nav-link uppercase text-center text-[7vh]" onClick={handleLinkClick}>Home</Link>
                    <Link href="" className="block  py-2 px-6 nav-link uppercase text-center text-[7vh]" onClick={handleLinkClick}>Projects</Link>
                    <Link href="" className="block  py-2 px-6 nav-link uppercase text-center text-[7vh]" onClick={handleLinkClick}>My Skills</Link>
                    <Link href="" className="block  py-2 px-6 nav-link uppercase text-center text-[7vh]" onClick={handleLinkClick}>About</Link>
                    <Link href="" className="block  py-2 px-6 nav-link uppercase text-center text-[7vh]" onClick={handleLinkClick}>Contact</Link>

                </nav>
            </div>
        </header>
    );
}
