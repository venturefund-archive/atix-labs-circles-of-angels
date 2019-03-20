import React from "react";

import "./_style.scss";
import ButtonUploadImage from "../../atoms/ButtonUploadImage/ButtonUploadImage";

const UploadImage = ({ subtitle, text }) => (
  <div className="UploadImageContainer">
    <h2>{subtitle}</h2>
    <p>{text}</p>
    <ButtonUploadImage />
  </div>
);

export default UploadImage;
