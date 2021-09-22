import React from "react";
import Slider from "@components/Home/Slider";

import { homePageWrapper } from "./index-style.js";

const homePage = (props) => {
  return (
    <div css={homePageWrapper}>
      <Slider {...props} />
    </div>
  );
};

export default homePage;
