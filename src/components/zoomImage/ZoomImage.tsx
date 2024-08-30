const ZoomImage = ({ img, isEdit, onEdit, onClose, status }: any) => {
    const handleInputClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click from bubbling up and triggering onClose
    };

    
    return (
        <div
            onClick={onClose}
            className="fixed h-screen flex-col gap-5 z-[998] w-screen flex items-center justify-center top-0 left-0 bg-black/70"
        >
            {status === "loading" && <div
                onClick={onClose}
                className="fixed h-screen flex-col gap-5 z-[999] w-screen flex items-center justify-center top-0 left-0 bg-black/70"
            >
                <span className="loading loading-dots loading-lg"></span>
            </div>}
            <div>
                <img src={img} className="object-cover object-center h-[500px] w-[500px] overflow-hidden" alt="Zoomed Image" />
            </div>
            {isEdit && (
                <div onClick={handleInputClick}>
                    <label htmlFor="file" className="bg-white p-2 border-none outline-none rounded-md text-black cursor-pointer">
                        Change Profile Pic
                    </label>
                    <input
                        id="file"
                        type="file"
                        onChange={onEdit}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            )}
        </div>
    );
}

export default ZoomImage;
