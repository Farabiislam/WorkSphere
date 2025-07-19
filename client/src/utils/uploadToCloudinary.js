import axios from "axios";

export const uploadToCloudinary = async (file) => {
    if (!file) throw new Error("No file provided");
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "suraiya");
    data.append("cloud_name", "drf93dyq6");

    try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/drf93dyq6/image/upload",
            data
        );
        return res.data.secure_url;
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        return null;
    }
};
