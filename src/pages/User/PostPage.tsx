import Header from '../../components/User/Header'
import Post from '../../components/User/Post'
import Footer from '../../components/User/Footer'
import UserSidebar from '../../components/User/UserSidebar'

function PostPage() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="bg-white-100 w-1/4 p-4"> {/* Sidebar area */}
          <UserSidebar />
        </div>
        <div className="w-3/4 p-6 overflow-y-auto"> {/* Main content area */}
          <h2 className="text-2xl font-semibold font-serif text-customGray mb-4">Add Posts</h2>
          <Post />
        </div>
      </div>
      <Footer />
    </div>
    </div>
  )
}

export default PostPage
