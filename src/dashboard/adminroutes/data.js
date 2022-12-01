import * as Icon from 'react-icons/fi'
import {RiExchangeLine} from 'react-icons/ri'
// import { icons } from 'react-icons/lib';


const data = [
  {
    title: 'Home',
    icon: <Icon.FiHome size={'20px'} color='gold'/>,
    link: '/admin',
  },
  {
    title: 'Manage Agents',
    icon: <Icon.FiUsers size={'20px'} color='gold'/>,
    link: '/admin/agents',
  },
  {
    title: 'Add Agent',
    icon: <RiExchangeLine size={'20px'} color='gold'/>,
    link: '/admin/trade',
  },
  {
    title: 'Transactions',
    icon: <Icon.FiDollarSign size={'20px'} color='gold' />,
    link: '/admin/transactions',
  },
  {
    title: 'Activities',
    icon: <Icon.FiActivity size={'20px'} color='gold' />,
    link: '/admin/activity',
  },
  {
    title: 'Cards and Rates ',
    icon: <Icon.FiCreditCard size={'20px'} color='gold'/>,
    link: '/admin/cards',
  },
  {
    title: 'Manage Admins',
    icon: <Icon.FiSettings size={'20px'} color='gold' />,
    link: '/admin/admins',
  },
];

export default data;
