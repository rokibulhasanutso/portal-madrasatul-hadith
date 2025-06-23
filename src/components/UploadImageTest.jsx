import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import supabase from "../supabase/config";

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

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
      const fileExt = compressedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from("student-image")
        .upload(filePath, compressedFile);

      if (error) {
        console.error("Upload error:", error.message);
        alert("Upload failed.");
      } else {
        // get public URL
        const { data: publicData } = supabase.storage
          .from("student-image")
          .getPublicUrl(filePath);

        console.log(publicData.publicUrl);
      }

      if (error) {
        alert("Upload failed: " + error.message);
      } else {
        alert("Upload successful!");
        console.log("File uploaded at:", data);
      }

      console.log(filePath, compressedFile);
    } catch (error) {
      console.error("Error compressing/uploading:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>Processing & uploading...</p>}

      {previewUrl && (
        <div style={{ marginTop: "20px" }}>
          <h4>Compressed Preview:</h4>
          <img
            src={previewUrl}
            alt="Compressed Preview"
            style={{ maxWidth: "300px" }}
          />
          <p>Size: {compressedSize} KB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
