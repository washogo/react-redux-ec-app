import React from "react";

const ImagePreview = (props) => {
  return (
    <div className="p-media__thumb">
      <img alt="ăȘăă" src={props.path} onClick={() => delete(props.id)} />
    </div>
  );
};

export default ImagePreview;
