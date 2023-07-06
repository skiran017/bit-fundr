export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: '',
    link: '/',
  },
  // {
  //   name: 'campaign',
  //   imgUrl: createCampaign,
  //   link: '/create-campaign',
  // },
  // {
  //   name: 'payment',
  //   imgUrl: payment,
  //   link: '/',
  //   disabled: true,
  // },
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

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/',
    // icon: <Dashboard />,
  },
  {
    label: 'Campaigns',
    children: [
      {
        label: 'Create Campaign',
        subLabel: 'Find your dream design job',
        href: '/create-campaign',
      },
      {
        label: 'Existing Campaigns',
        subLabel: '',
        href: '/all-campaigns',
      },
    ],
  },
  {
    label: 'Payment',
    href: '#',
    disabled: true,
  },
  {
    label: 'Withdraw',
    href: '#',
    disabled: true,
  },
  {
    label: 'Profile',
    href: '/profile',
  },
];
