import { SendHorizonal } from "lucide-react"
import { FC } from "react"

const MessageSender: FC<any> = ({ onClick, onChange, value, status }) => {
  return (
    <div className="relative flex w-full gap-8 h-full px-6 items-center">
      <input
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick()
      }
      }}
        disabled={status === "loading"}
        onChange={onChange}
        value={value}
        className=" border-b w-full border-gray-400 text-black/70 outline-none bg-transparent" type="text" />
      {status === "loading" ?
        <span className="loading loading-spinner loading-md text-[#088395]"></span>
        : <SendHorizonal onClick={onClick} className="text-[#088395] hover:bg-[#37B7C3] p-2 rounded-[50%] h-12 duration-75 cursor-pointer w-12" />
      }
    </div>
  )
}

export default MessageSender