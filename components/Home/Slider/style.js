import { css } from "@emotion/react";
import { mq } from "@helper/viewport";

export const stySliderWrapper = css`
  background: #f6f0ec;

  ${mq[1]} {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
  }
`;

export const styPrimaryHomeHeader = css`
  padding: 16px;

  h1 {
    font-size: 24px;
    font-weight: 700;

    ${mq[1]} {
      font-size: 34px;
    }
  }

  h3 {
    font-size: 16px;
    color: rgba(125, 107, 93, 1);
    line-height: 1.7;
  }

  ${mq[1]} {
    width: 500px;
    position: relative;
  }
`;

export const styLogoWrapper = css`
  padding: 16px;

  ${mq[1]} {
    transform: translate(10%, 40%);
  }
`;

export const styImageWrapper = css`
  ${mq[1]} {
    width: 50vw;

    .primary-illustration {
      height: 430px;
      transform: scale(1.8) translate(20%, 12%);
    }
  }
`;
