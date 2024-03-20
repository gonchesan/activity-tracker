import React from 'react';

import NavbarIcon from '@/assets/icons/navbar-icon.svg?react';
import UserDropdown from '@/components/ui/UserDropdown';

const Topbar: React.FC = () => {
  return (
    <aside className="flex justify-between items-center container mx-auto">
      <NavbarIcon />
      <UserDropdown />
    </aside>
  );
};

export default Topbar;
