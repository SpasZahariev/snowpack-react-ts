import { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
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
      <div className="flex items-center justify-between px-3 py-0.5 md:px-4 md:py-1">
        {/* Logo — compact on mobile to match hamburger; larger on md+ */}
        <a
          href="#about"
          className="group flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-pink transition-colors hover:border-pink/25 hover:bg-surface0/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink md:block md:h-auto md:w-auto md:rounded-none md:border-0 md:hover:border-transparent md:hover:bg-transparent"
          title="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 opacity-90 md:h-9 md:w-9 md:opacity-100"
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
              className="stroke-pink transition-transform duration-300 ease-out group-hover:translate-y-[-2px]"
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

        {/* Mobile menu */}
        <div className="md:hidden">
          <SwipeableBottomDrawer>
            <Menu size={20} strokeWidth={1.75} className="opacity-90" aria-hidden />
          </SwipeableBottomDrawer>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
