import React from 'react'
import CIcon from '@coreui/icons-react'
import { HiMiniUsers } from 'react-icons/hi2'
import { FaBoxesPacking, FaTruckMoving } from 'react-icons/fa6'
import { FaBoxOpen, FaCar, FaSwatchbook } from 'react-icons/fa'
import { FaServer } from 'react-icons/fa'
import { TbPackages } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'

import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { IoHome } from 'react-icons/io5'

const _user_nav = [
  // {
  //   component: CNavItem,
  //   name: 'Home',
  //   to: '/',
  //   icon: <IoHome icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/user/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/user/edit/profile',
    icon: <CgProfile size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bookings',
    to: '/user/booking',
    icon: <FaSwatchbook size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  },
]

export default _user_nav
