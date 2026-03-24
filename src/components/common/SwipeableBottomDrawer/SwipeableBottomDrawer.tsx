import { useState, ReactNode } from 'react';
import { Drawer } from '../../ui';

interface Props {
  children: ReactNode;
}

function SwipeableBottomDrawer({ children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-transparent text-pink transition-colors hover:border-pink/25 hover:bg-surface0/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
        aria-expanded={drawerOpen}
        aria-controls="mobile-nav-drawer"
        aria-label="Open navigation menu"
      >
        {children}
      </button>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        anchor="bottom"
      >
        <nav id="mobile-nav-drawer" className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2" aria-label="Primary">
          <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-surface2/80" aria-hidden />
          <ul className="m-0 list-none divide-y divide-surface1/60 p-0">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setTimeout(() => setDrawerOpen(false), 100)}
                  className="block w-full py-2.5 pl-1 pr-2 text-left text-sm font-medium tracking-wide text-subtext1 no-underline transition-colors hover:text-pink active:bg-surface0/40"
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
