import { useState, ReactNode, useCallback } from 'react';
import { Drawer } from '../../ui';

interface Props {
  children: ReactNode;
}

function SwipeableBottomDrawer({
  children
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact Information', id: 'contact' },
  ];

  return (
    <>
      <div onClick={() => setDrawerOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        anchor="bottom"
      >
        <nav className="py-4">
          <ul className="list-none m-0 p-0">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setTimeout(() => setDrawerOpen(false), 100)}
                  className="block w-full text-left px-6 py-4 text-text hover:bg-surface0 hover:text-pink transition-colors duration-200 text-[1rem] no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
}

export default SwipeableBottomDrawer;
