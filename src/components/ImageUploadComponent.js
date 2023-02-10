import axios from "axios";
import swal from "sweetalert";


function ImageUpload(props) {
  const { image, setImage, filter } = props;


  const handleUpload = async (file) => {
    const shownImage = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setImage(response.data);
    } catch (error) {
      console.error(error);
      setImage(shownImage);
    }
  };


  const handleChange = event => {
    const file = event.target.files[0];
    if (file) {
      const types = ["image/jpeg", "image/png"];
      if (types.includes(file.type)) {
        handleUpload(file);
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
