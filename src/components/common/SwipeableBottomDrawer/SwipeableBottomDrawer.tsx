import { useState, ReactNode, useCallback } from 'react';
import { Drawer } from '../../ui';

interface Props {
  handleAbout: () => void;
  handleExperience: () => void;
  handleProjects: () => void;
  handleContact: () => void;
  children: ReactNode;
}

function SwipeableBottomDrawer({
  handleAbout,
  handleExperience,
  handleProjects,
  handleContact,
  children
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = useCallback((action: () => void) => {
    action();
    // Small delay to allow scroll to start before closing drawer
    setTimeout(() => setDrawerOpen(false), 100);
  }, []);

  const menuItems = [
    { label: 'About Me', action: handleAbout },
    { label: 'Experience', action: handleExperience },
    { label: 'Featured Projects', action: handleProjects },
    { label: 'Contact Information', action: handleContact },
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
                <button
                  onClick={() => handleNavigate(item.action)}
                  className="w-full text-left px-6 py-4 text-text hover:bg-surface0 hover:text-pink transition-colors duration-200 text-base"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
}

export default SwipeableBottomDrawer;
