import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import SignUp from "./pages/SignUp/SignUp"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchProfilPic } from "./redux/slice/userDetailsSlice"

const user: any = sessionStorage.getItem("userData")
let authuser: any
if (user) {
  authuser = JSON.parse(user)
}
function App() {

  const dispatch: any = useDispatch()
  useEffect(() => {
    if(authuser){
      dispatch(fetchProfilPic())
    }
  }, [])


  return (
    <>
      <Routes>
        <Route path="/" element={authuser?.data ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authuser?.data ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/sign-up" element={authuser?.data ? <Navigate to={"/"} /> : <SignUp />} />
      </Routes>
    </>
  )
}

export default App
