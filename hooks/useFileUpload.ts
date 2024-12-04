import { MAX_FILE_SIZE, ONE_MB } from "@/lib/consts";
import { uploadFile } from "@/lib/ipfs/uploadFile";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useState } from "react";

const useFileUpload = () => {
  const { setName, setImageUri, setAnimationUri, setMimeType, animationUri } =
    useZoraCreateProvider();
  const [blurImageUrl, setBlurImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fileUpload = async (event) => {
    setError("");
    setLoading(true);

    try {
      const file = event.target.files[0];
      if (!file) {
        throw new Error();
      }
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `File size exceeds the maximum limit of ${MAX_FILE_SIZE / ONE_MB}MB.`
        );
      }

      const mimeType = file.type;
      const isImage = mimeType.includes("image");

      if (isImage) {
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        setName(fileNameWithoutExtension);
      }

      const { uri } = await uploadFile(file);
      if (isImage) {
        setImageUri(uri);
        setBlurImageUrl(URL.createObjectURL(file));
        if (!animationUri) {
          setMimeType(mimeType);
        }
      } else {
        setAnimationUri(uri);
        setMimeType(mimeType);
      }
    } catch (err) {
      console.error(err);
      setError(err.message ?? "Failed to upload the file. Please try again.");
    }
    setLoading(false);
  };

  return { fileUpload, loading, error, blurImageUrl };
};

export default useFileUpload;
