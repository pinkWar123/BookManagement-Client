import axiosInstance from "./config";

export const callUploadFiles = async (formData: FormData) => {
  return (
    await axiosInstance.post("Attachment", formData, {
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
};
