import React from "react";
import { styStepDesktopWrapper } from "./style.js";
import { CheckCircleFilled } from "@ant-design/icons";

const StepDesktop = (props) => {
  return (
    <div css={styStepDesktopWrapper}>
      {props.liststep.map((value) => {
        return (
          <div className="chipStep">
            <div className="checkbox">
              {/* <CheckCircleFilled className="done " /> */}
              <div className="empty"></div>
            </div>
            <div className="nameStep">
              <span className="title">{value.name}</span>
              <span className="description">{value.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepDesktop;
