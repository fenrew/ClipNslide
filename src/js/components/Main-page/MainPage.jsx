import React from "react";

import MainContainer from "../ClipNslide/MainContainer";
import Content from "../ClipNslide/Content/Content";

const MainPage = () => {
  return (
    <div>
      <MainContainer background="black">
        <Content>
          <div
            style={{
              backgroundImage:
                "url(https://www.bigstockphoto.com/images/homepage/module-6.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "100vh",
              width: "100%"
            }}
          ></div>
        </Content>
        <Content>
          <div
            style={{
              backgroundImage:
                "url(https://www.w3schools.com/w3css/img_lights.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "100vh",
              width: "100%"
            }}
          ></div>
        </Content>
        <Content>
          <div
            style={{
              backgroundImage:
                "url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "100vh",
              width: "100%"
            }}
          ></div>
        </Content>
      </MainContainer>
    </div>
  );
};

export default MainPage;
