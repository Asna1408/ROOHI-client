import Home from "../../components/User/Home"
import Header from "../../components/User/Header"
import Footer from "../../components/User/Footer"


type Props = {}

function Homepage({}: Props) {
  return (
    <div>
      <Header/>
      <Home/>
      <Footer/>
      </div>
  )
}

export default Homepage