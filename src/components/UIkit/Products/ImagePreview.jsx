import React from "react";

const ImagePreview = (props) => {
  return (
    <div className="p-media__thumb">
      <img alt="ないよ" src={props.path} onClick={() => delete(props.id)} />
    </div>
  );
};

export default ImagePreview;
