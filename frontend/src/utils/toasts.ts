import toast from "react-hot-toast";
export const successToast = (text: string) => toast.success(text);
export const errorToast = (text: string) => toast.error(text);
