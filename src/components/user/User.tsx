import { FC } from "react"
import user from "/assets/user.jpg"

const User: FC<any> = ({ username, userPic, onlineStatus ,onClick, className }) => {
  return (
    <div 
    onClick={onClick}
    className={`${className}  relative w-full py-[5px] flex items-center gap-6 px-4 cursor-pointer bg-[#088395] hover:bg-[#088395] rounded-md`}>
      <img className=" w-10 h-10 object-cover rounded-[50%] object-center" src={userPic ? userPic : user} alt="" />
      <div>
        <p className='text-[16px] text-white'>{username?.toUpperCase()}</p>
      </div>
      {onlineStatus && <span className="absolute z-50 top-0 bg-green-700 h-[10px] w-[10px] rounded-[50%]"></span>}
    </div>
  )
}

export default User