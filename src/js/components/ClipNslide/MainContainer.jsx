import React, { useState } from "react";
import "./mainContainerStyles.css";

const MainContainer = props => {
  const [clipNslide, setClipNslide] = useState({
    displayChild: 0
  });

  const handleChangeSlide = event => {
    event.preventDefault();

    const windowWidth =
      window.innerWidth > 0 ? window.innerWidth : window.screen.width;

    let newDisplayChild = (clipNslide.displayChild + 1) % props.children.length;

    if (event.clientX < windowWidth * 0.3) {
      newDisplayChild =
        clipNslide.displayChild - 1 < 0
          ? props.children.length - 1
          : clipNslide.displayChild - 1;
    }

    setClipNslide({
      ...clipNslide,
      displayChild: newDisplayChild
    });
  };


  const backgroundStyle = /(url\()|(\/)/g.test(props.background)
    ? { backgroundImage: props.background}
    : { backgroundColor: props.background };

  return (
    <div
      id="ClipNSlide-Main-Container"
      style={backgroundStyle}
      onClick={event => handleChangeSlide(event)}
    >
      {props.children[clipNslide.displayChild]}
    </div>
  );
};

export default MainContainer;
