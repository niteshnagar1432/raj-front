import React from 'react'
import { AppContent, AppFooter, AppHeader } from '../components/index'
import AppSidebarUser from '../components/AppSidebarUser'

const UserLayout = () => {
  return (
    <div>
      <AppSidebarUser />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default UserLayout
