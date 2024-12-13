import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectUser = () => {
    const { currentUser } = useSelector((state: any)=> state.user)
  return currentUser ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectUser