import React from 'react'
import Header from '../../components/User/Header'
import Footer from '../../components/User/Footer'
import UserSidebar from '../../components/User/UserSidebar'
import EditPost from '../../components/User/EditPost'


function  EditPostPage() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="bg-white-100 w-1/4 p-4"> {/* Sidebar area */}
          <UserSidebar />
        </div>
        <div className="w-3/4 p-6 overflow-y-auto"> {/* Main content area */}
          <h2 className="text-2xl font-semibold font-serif text-customGray mb-4">Edit Posts</h2>
         <EditPost/>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  )
}

export default EditPostPage
