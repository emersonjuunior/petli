import { ChangeEvent, useState } from "react";

const File = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "djzmzwwtm");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djzmzwwtm/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImageURL = await res.json();
    setImageURL(uploadedImageURL.url);
    console.log(uploadedImageURL.url);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {imageURL && <img src={imageURL} alt="Imagem" />}
    </div>
  );
};

export default File;
