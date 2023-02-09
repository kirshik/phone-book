import { useState } from "react";
import swal from "sweetalert";

function ImageUpload(props) {
  const { image, setImage, filter } = props;

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  })

  
  const handleChange = event => {
    const file = event.target.files[0];
    if (file) {
      const types = ["image/jpeg", "image/png"];
      if (types.includes(file.type)) {
        fileToDataUri(file).then((dataUri) => {
          setImage(dataUri);
        });
      } else {
        setImage("");
        swal(
          "Please select an image file (jpeg or png)",
          {
            icon: "error"
          }
        )
      }
    }
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="file-input">Choose Image:</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleChange}
          id="file-input"
          className="form-control form-control-file"
        />
      </div>
      {image && (
        <div className="form-group">
          <img src={image} alt="uploaded" className={`img-fluid modal-img ${filter}`} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
