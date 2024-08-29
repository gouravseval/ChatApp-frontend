import { LogOutIcon } from "lucide-react"
import { FC } from "react"

const LogoutButton: FC<any> = ({ onClick, status }) => {
    return (
        <button
            onClick={onClick}
            className="btn btn-active bg-[#088395] hover:bg-[#37B7C3] border-none btn-primary px-10 text-white text-[16px] ">{status === "loading" ? <span className="loading loading-dots loading-lg text-white"></span> : <p className="flex gap-3 items-center text-[20px]">Logout <LogOutIcon /></p>}
            </button>
    )
}

export default LogoutButton