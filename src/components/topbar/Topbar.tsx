import { FC } from "react"
import userPic from "/assets/user.jpg"
const Topbar:FC<any> = ({name, img, onClick}) => {
  return (
    <div 
    onClick={onClick}
    className="w-full h-[55px] bg-[#EBF4F6] flex items-center px-4 cursor-pointer">
        <div className="flex gap-4 items-center ">
            <img className="w-10 border-2 border-[#088395] h-10 object-cover object-center rounded-[50%]" src={img ? img : userPic} alt="" />
            <p className="font-medium text-[20px] text-black/70">{name}</p>
        </div>
    </div>
  )
}

export default Topbar