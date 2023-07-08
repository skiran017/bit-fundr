import { FiGrid, FiPlusSquare, FiCreditCard } from 'react-icons/fi';
import { FaBitcoin } from 'react-icons/fa';

export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Explore',
    href: '/',
  },
  // {
  //   name: 'withdraw',
  //   imgUrl: withdraw,
  //   link: '/',
  //   disabled: true,
  // },
  // {
  //   name: 'profile',
  //   imgUrl: profile,
  //   link: '/profile',
  // },
  // {
  //   name: 'logout',
  //   imgUrl: logout,
  //   link: '/',
  //   disabled: true,
  // },
];

export const sibeBarLinkItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: FiGrid,
  },
  {
    label: 'Create Campaign',
    href: '/create-campaign',
    icon: FiPlusSquare,
  },
  {
    label: 'Payment',
    href: '/payment',
    icon: FiCreditCard,
    disabled: true,
  },
  {
    label: 'Withdraw',
    href: '/withdraw',
    icon: FaBitcoin,
    disabled: true,
  },
];
