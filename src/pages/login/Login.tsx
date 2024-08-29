
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../redux/store/store"
import { loginUser } from "../../redux/slice/authSlice"
import { toast } from "react-toastify"
import bg from "/assets/background.svg"
import "./form.css"
const Login = () => {
    const dispatch: any = useDispatch()
    const status = useSelector((state: RootState) => state.auth.status)
    const [data, setData] = useState<any>({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)


    const handleSubmit = (data: any) => {
        dispatch(loginUser(data))
        // .then(() => {
        //     window.location.reload()
        // })
    }

    const validation = [data.email, data.password].some((data) => data?.trim() === "")

    return (
        <div className="bg-white w-screen h-screen overflow-hidden relative">
            <img className="absolute top-0 object-center left-0 min-w-[100vw]  scale-y-[700%] z-10" src={bg} alt="" />
            {status === "loading" && <div className="h-screen w-screen fixed top-0 left-0 bg-transparent cursor-not-allowed"></div>}
            <div className="w-[500px] absolute top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] px-10 bg-[rgb(247,247,247,1)] shadow-lg shadow-black/80 flex flex-col gap-3 items-center py-5  rounded-lg ">
                <h1 className="text-[32px] text-black/70 font-semibold mb-5">Login</h1>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-black" htmlFor="Email">Email</label>
                    <input
                        id="Email"
                        name="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value })
                        }}
                        placeholder="email"
                        className="input bg-white focus:outline-none text-black/70 input-bordered w-full max-w-lg"
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-black" htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value })
                            }}
                            placeholder="password"
                            className="input text-black/70 bg-white input-bordered w-full max-w-lg focus:outline-none "
                        />
                        <span
                            onClick={() => {
                                setShowPassword(!showPassword)
                            }}
                            className="text-[14px] text-gray-400 p-1 cursor-pointer absolute right-3 top-2">{showPassword ? "hide" : "show"}</span>
                    </div>
                    <Link className="text-[#088395] text-[13px] self-start" to={"/sign-up"}>Don't have an account ?</Link>
                </div>
                <button
                    onClick={() => {
                        if (!validation) {
                            handleSubmit(data)
                        } else {
                            toast.error("All fields are required")
                        }
                    }}
                    className="btn bg-[#37B7C3] hover:bg-[#088395] border-none btn-active btn-primary px-10 text-white mt-8 text-[16px] mb-4">{status === "loading" ? <span className="loading loading-dots loading-lg text-black/70"></span> : "login"}</button>

            </div>
        </div>
    )
}

export default Login