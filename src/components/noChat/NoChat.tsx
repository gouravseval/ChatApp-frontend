const NoChat = () => {
    return (
        <div className="w-full h-full flex bg-white justify-center items-center px-3 rounded-l-3xl border-l-[6px] border-[#088395]">
                <div className="flex flex-col text-[16px] text-black"> <h1 className="text-black/70 font-semibold text-[20px]">Hey, this is the chat app developed by GOURAV JANGRA.</h1>
                    <br />
                    Following technologies are used in this app.
                    <li className="list-disc font-medium"><span className="font-semibold">Frontend : </span>React js for UI and UX, Redux Toolkit for state management.</li>
                    <li className="list-disc font-medium"><span className="font-semibold">Backend : </span>Node js, Express js, Mongoose, Cloudinary for image Uploading, JWT for authentication and SOCKET.IO for real time messages</li>
                    <li className="list-disc font-medium"><span className="font-semibold">DataBase : </span>MongoDb</li>
                    <li className="list-disc font-medium"><span className="font-semibold">Instruction : </span>Start chat by click on any user.</li>
                    <br /><br />
                    <li className="text-[20px] font-medium"><span className="font-semibold">Contact me : </span><a className="text-blue-700" href="mailto:gouravjangra033@gmail.com">gouravjangra033@gmail.com</a></li>
                </div>
        </div>
    )
}

export default NoChat