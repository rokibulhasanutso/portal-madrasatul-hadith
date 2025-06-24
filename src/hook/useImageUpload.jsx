import { useState } from "react";
import imageCompression from "browser-image-compression";
import supabase from "../supabase/config";

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleImageUpload = async (file, bucketName, fileName) => {
    if (!file || !bucketName || !fileName) return;

    setUploading(true);
    let compressedFile = file;

    try {
      if (file.size > 25 * 1024) {
        const options = {
          maxSizeMB: 0.025, // 25KB
          useWebWorker: true,
          maxWidthOrHeight: 1024,
        };
        compressedFile = await imageCompression(file, options);
      }

      // Preview compressed image
      const previewBlobUrl = URL.createObjectURL(compressedFile);
      setPreviewUrl(previewBlobUrl);
      setCompressedSize((compressedFile.size / 1024).toFixed(2)); // KB

      // Upload to Supabase
      const filePath = `${fileName}.png`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .update(filePath, compressedFile, {
          upsert: true,
        });

      console.log(data);

      if (error) {
        console.error("Upload error:", error.message);
        alert("Upload failed.");
        return;
      }

      const { data: publicData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (publicData?.publicUrl) {
        setUploadedUrl(publicData.publicUrl);
      }

      setUploadSuccess(true);
    } catch (error) {
      console.error("Error compressing/uploading:", error);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadSuccess,
    previewUrl,
    compressedSize,
    uploadedUrl,
    handleImageUpload,
  };
};

export default useImageUpload;
