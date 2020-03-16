import React, { useState, useEffect } from "react";
import "./mainContainerStyles.css";

const MainContainer = props => {
  const [clipNslide, setClipNslide] = useState({
    displayChild: 0,
    clippedElements: [],
    animation: false,
    finishedClippig: false,
  });

  const handleChangeSlide = event => {
    event.preventDefault();

    const windowWidth =
      window.innerWidth > 0 ? window.innerWidth : window.screen.width;

    let newDisplayChild = (clipNslide.displayChild + 1) % props.children.length;

    // 0.3 is 30% of the screen to go to previous child
    if (event.clientX < windowWidth * 0.3) {
      newDisplayChild =
        clipNslide.displayChild - 1 < 0
          ? props.children.length - 1
          : clipNslide.displayChild - 1;
    }

    const clippedElements = clipAnimationElements();

    setClipNslide({
      ...clipNslide,
      displayChild: newDisplayChild,
      clippedElements,
      animation: true,
      finishedClippig: true
    });
  };

  const clipAnimationElements = () => {
    // const windowHeight =
    //   window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    const currentChild = props.children[clipNslide.displayChild];

    const divideBy = props.divideBy ? props.divideBy : 3;
    const clippedElements = [];

    for (let i = 1; i <= divideBy; i++) {
      clippedElements.push(
        <div
          key={i}
          style={{
            clipPath: `polygon(0 ${((i - 1) * 100) / divideBy}%, 0% ${(i *
              100) /
              divideBy}%, 100% ${(i * 100) / divideBy}%, 100% ${((i - 1) *
              100) /
              divideBy}%)`,
            zIndex: `${5 + i}`,
            transition: `left ${i%2==0 ? Math.random()*0.5+1.3 : Math.random()*0.3+1}s ease-in`,
            transitionDelay: `${i === 1 ? 0 : Math.random()*0.7}s`,
            left: "0%"
          }}
          className="clipped-element"
        >
          {currentChild}
        </div>
      );
    }

    return clippedElements;
  };

  const runAnimation = () => {
    const { clippedElements } = clipNslide;

    const newClippedElements = clippedElements.map(element => {
      return (
        <element.type
          {...element.props}
          key={element.key}
          style={{
            ...element.props.style,
            left: '-100%',
          }}
        />
      )
    });

    setClipNslide({
      ...clipNslide,
      finishedClippig: false,
      clippedElements:newClippedElements
    });
  };

  useEffect(() => {
    if (clipNslide.finishedClippig) {
      runAnimation();
    }
  });

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
    </div>
  );
};

export default MainContainer;
