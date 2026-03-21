import { useState, useEffect, useCallback } from 'react';
import SwipeableBottomDrawer from '../common/SwipeableBottomDrawer/SwipeableBottomDrawer';

function NavBar() {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const isVisibleNow = prevScrollPos > currentScrollPos || currentScrollPos < 10;
    setPrevScrollPos(currentScrollPos);
    setVisible(isVisibleNow);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems = [
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-50 bg-base rounded-b-xl transition-all duration-500 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="px-4 py-1 flex justify-between items-center">
        {/* Logo */}
        <a href="#about" className="cursor-pointer group block" title="Back to top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-9 w-9"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10.5"
              className="stroke-pink opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              strokeWidth="1.5"
            />
            <path
              d="M7.5 14L12 9L16.5 14"
              className="stroke-pink group-hover:translate-y-[-2px] transition-transform duration-300 ease-out"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              className="text-text cursor-pointer hover:bg-surface0 hover:text-pink px-3 py-2 rounded-md transition-colors no-underline"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <SwipeableBottomDrawer>
            <div className="relative w-10 h-10 cursor-pointer group">
              <span className="absolute block h-1.5 w-full bg-pink rounded-full left-0 top-1 transition-all duration-300 ease-in-out origin-left group-hover:rotate-45" />
              <span className="absolute block h-1.5 w-full bg-pink rounded-full left-0 top-[14px] transition-all duration-300 ease-in-out origin-left group-hover:opacity-0 group-hover:w-0" />
              <span className="absolute block h-1.5 w-full bg-pink rounded-full left-0 top-[26px] transition-all duration-300 ease-in-out origin-left group-hover:-rotate-45" />
            </div>
          </SwipeableBottomDrawer>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
