import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const showToast = useShowToast();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = () => {
                setImgUrl(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            showToast("Invalid file type", "Please select an image", "error");
            setImgUrl(null);
        }
    };
    return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
