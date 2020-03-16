import React, { useState, useEffect } from "react";
import "./mainContainerStyles.css";

const MainContainer = props => {
  const [clipNslide, setClipNslide] = useState({
    displayChild: 0,
    clippedElements: [],
    clippedIncomingElements: [],
    animation: false,
    finishedClippig: false
  });

  const handleChangeSlide = event => {
    event.preventDefault();

    const windowWidth =
      window.innerWidth > 0 ? window.innerWidth : window.screen.width;

    let newDisplayChild = (clipNslide.displayChild + 1) % props.children.length;

    // 0.3 is 30% of the screen to go to previous child in the slider
    if (event.clientX < windowWidth * 0.3) {
      newDisplayChild =
        clipNslide.displayChild - 1 < 0
          ? props.children.length - 1
          : clipNslide.displayChild - 1;
    }

    const {clippedElements, clippedIncomingElements} = clipAnimationElements();

    setClipNslide({
      ...clipNslide,
      displayChild: newDisplayChild,
      clippedElements,
      clippedIncomingElements,
      animation: true,
      finishedClippig: true
    });
  };

  const clipAnimationElements = () => {
    // const windowHeight =
    //   window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    const divideBy = props.divideBy ? props.divideBy : 3;
    const clippedElements = [],
      clippedIncomingElements = [];

    for (let i = 1; i <= divideBy; i++) {
      const stylesObj = {
        clipPath: `polygon(0 ${((i - 1) * 100) / divideBy}%, 0% ${(i * 100) /
          divideBy}%, 100% ${(i * 100) / divideBy}%, 100% ${((i - 1) * 100) /
          divideBy}%)`,
        zIndex: `${5 + i}`,
        transition: `left ${i % 2 == 0 ? Math.random() * 0.4 + 1.3 : Math.random() * 0.3 + 1}s ease-in`,
        transitionDelay: `${i === 1 ? 0 : Math.random() * 0.5}s`
      };

      clippedElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "0%"
          }}
          className="clipped-element"
        >
          {props.children[clipNslide.displayChild]}
        </div>
      );

      clippedIncomingElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "160%"
          }}
          className="clipped-element"
        >
          {props.children[clipNslide.displayChild+1]}
        </div>
      );
    }

    return {clippedElements, clippedIncomingElements};
  };

  const runAnimation = () => {
    const { clippedElements, clippedIncomingElements } = clipNslide;

    const newClippedElements = clippedElements.map(element => {
      return (
        <element.type
          {...element.props}
          key={element.key}
          style={{
            ...element.props.style,
            left: "-160%"
          }}
        />
      );
    });

    const newClippedIncomingElements = clippedIncomingElements.map(element => {
      return (
        <element.type
          {...element.props}
          key={element.key}
          style={{
            ...element.props.style,
            left: "0%"
          }}
        />
      );
    });

    setClipNslide({
      ...clipNslide,
      finishedClippig: false,
      clippedElements: newClippedElements,
      clippedIncomingElements: newClippedIncomingElements
    });
  };

  useEffect(() => {
    if (clipNslide.finishedClippig) {
      runAnimation();
    }
  });

  //Sets the background to either a color or a url depending on what is given by the user
  const backgroundStyle = /(url\()|(\/)/g.test(props.background)
    ? { backgroundImage: props.background }
    : { backgroundColor: props.background };

  return (
    <div
      id="ClipNSlide-Main-Container"
      style={backgroundStyle}
      onClick={event => (clipNslide.animation ? "" : handleChangeSlide(event))}
    >
      {clipNslide.animation
        ? clipNslide.clippedElements
        : props.children[clipNslide.displayChild]}
      {clipNslide.animation ? clipNslide.clippedIncomingElements : ""}
    </div>
  );
};

export default MainContainer;
