import React, { useState, useEffect } from "react";
import "./mainContainerStyles.css";

const MainContainer = props => {
  const [clipNslide, setClipNslide] = useState({
    displayChild: 0,
    clippedElements: [],
    clippedIncomingElements: [],
    finishedClippig: false,
    ref: React.createRef()
  });

  const [showAnimation, setShowAnimation] = useState({
    animation: false
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

    const {
      clippedElements,
      clippedIncomingElements
    } = clipAnimationElements();

    setClipNslide({
      ...clipNslide,
      displayChild: newDisplayChild,
      clippedElements,
      clippedIncomingElements,
      animation: true,
      finishedClippig: true
    });

    setShowAnimation({
      animation: true
    });
  };

  const clipAnimationElements = () => {
    // const windowHeight =
    //   window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    const divideBy = props.divideBy ? props.divideBy : 3;
    const clippedElements = [],
      clippedIncomingElements = [];
    const oddOrEvenTransition = Math.floor(Math.random() * 2) + 1;
    console.log("ODD OR EVEN", oddOrEvenTransition);

    for (let i = 1; i <= divideBy; i++) {
      const transitionTimer =
        i % oddOrEvenTransition === 0
          ? Math.random() * 0.3 + 1.25
          : Math.random() * 0.3 + 1.0;

      const stylesObj = {
        clipPath: `polygon(0 ${((i - 1) * 100) / divideBy}%, 0% ${(i * 100) /
          divideBy}%, 100% ${(i * 100) / divideBy}%, 100% ${((i - 1) * 100) /
          divideBy}%)`,
        zIndex: `${5 + i}`,
        transitionDelay: `${i === 1 ? 0 : Math.random() * 0.4 + 0.4}s`
      };

      clippedElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "0%",
            transition: `left ${transitionTimer}s ease-in`
          }}
          className="clipped-element"
        >
          {props.children[clipNslide.displayChild]}
        </div>
      );

      let nextChild = (clipNslide.displayChild + 1) % props.children.length;

      clippedIncomingElements.push(
        <div
          key={i}
          style={{
            ...stylesObj,
            left: "300%",
            transition: `left ${transitionTimer}s ease-out`
          }}
          className="clipped-element"
        >
          {props.children[nextChild]}
        </div>
      );
    }

    return { clippedElements, clippedIncomingElements };
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
            left: "-300%"
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

  const addEventListener = () => {
    let listenedAmountOfTimes = 0;

    clipNslide.ref.current.addEventListener("transitionend", () => {
      listenedAmountOfTimes++;
      let divideBy = (props.divideBy ? props.divideBy : 3) * 2;
      if (listenedAmountOfTimes % divideBy === 0) {
        setShowAnimation({
          ...showAnimation,
          animation: false
        });
      }
    });
  };

  useEffect(() => {
    if (clipNslide.finishedClippig) {
      runAnimation();
    }
  });

  useEffect(() => {
    addEventListener();
  }, []);

  //Sets the background to either a color or a url depending on what is given by the user
  const backgroundStyle = /(url\()|(\/)/g.test(props.background)
    ? { backgroundImage: props.background }
    : { backgroundColor: props.background };

  return (
    <div
      id="ClipNSlide-Main-Container"
      style={{ ...backgroundStyle, position: "relative", overflow: "hidden" }}
      ref={clipNslide.ref}
      onClick={event =>
        showAnimation.animation ? "" : handleChangeSlide(event)
      }
    >
      {showAnimation.animation
        ? clipNslide.clippedElements
        : props.children[clipNslide.displayChild]}
      {showAnimation.animation ? clipNslide.clippedIncomingElements : ""}
    </div>
  );
};

export default MainContainer;
