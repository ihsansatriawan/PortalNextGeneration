import React from "react";
import { styStepMobileWrapper } from "./style.js";
import { CheckCircleFilled } from "@ant-design/icons";

const StepMobile = (props) => {
  return (
    <div css={styStepMobileWrapper}>
      {props.liststep.map((value) => {
        return (
          <div className="chipStep active">
            <div className="checkbox">
              {/* <CheckCircleFilled className="done " /> */}
              <div className="empty"></div>
            </div>
            <div className="nameStep">{value.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StepMobile;
