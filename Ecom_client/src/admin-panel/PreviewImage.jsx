import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return (
    <div>
      {preview ? (
        <img class="card-img-top rounded " src={preview} alt="preview" />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default PreviewImage;
