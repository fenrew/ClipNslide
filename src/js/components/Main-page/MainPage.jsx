import React from "react";

import MainContainer from "../ClipNslide/MainContainer";
import Content from "../ClipNslide/Content/Content";

import "./mainPageStyles.css";

const MainPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MainContainer background="black" divideBy="5">
        <Content>
          <div className="slider-container" id="slider-one">
            <h1 className="slider-header">Markus Heldrup</h1>
            <div className="slider-quote">
              - Developer by day, sleeper by night!
            </div>
            <div className="slider-content">
              This homepage is my protofolio created in March 2020. As you can
              imagine my developer skills along with bitcoins have increase
              drastically since then! *hopefully*
            </div>
            <div className="slider-content">
              The website is focused towards javascript skills and effects, thus
              it may come at the cost of design. As we all know, a porofolio
              webpage is only about displaying skills in the awesome art of
              programming as we all love and have come acusomed to. At this
              point I am just rambeling, so without further a due, enjoy my
              nifty little website!
            </div>
          </div>
        </Content>
        <Content>
          <div className="slider-container" id="slider-two">
            <h1 className="slider-header">Markus Heldrup</h1>
            <div className="slider-quote">
              - Developer by day, sleeper by night!
            </div>
            <div className="slider-content">
              This homepage is my protofolio created in March 2020. As you can
              imagine my developer skills along with bitcoins have increase
              drastically since then! *hopefully*
            </div>
            <div className="slider-content">
              The website is focused towards javascript skills and effects, thus
              it may come at the cost of design. As we all know, a porofolio
              webpage is only about displaying skills in the awesome art of
              programming as we all love and have come acusomed to. At this
              point I am just rambeling, so without further a due, enjoy my
              nifty little website!
            </div>
          </div>
        </Content>
        <Content>
          <div className="slider-container" id="slider-three">
            <h1 className="slider-header">Markus Heldrup</h1>
            <div className="slider-quote">
              - Developer by day, sleeper by night!
            </div>
            <div className="slider-content">
              This homepage is my protofolio created in March 2020. As you can
              imagine my developer skills along with bitcoins have increase
              drastically since then! *hopefully*
            </div>
            <div className="slider-content">
              The website is focused towards javascript skills and effects, thus
              it may come at the cost of design. As we all know, a porofolio
              webpage is only about displaying skills in the awesome art of
              programming as we all love and have come acusomed to. At this
              point I am just rambeling, so without further a due, enjoy my
              nifty little website!
            </div>
          </div>
        </Content>
      </MainContainer>
    </div>
  );
};

export default MainPage;
