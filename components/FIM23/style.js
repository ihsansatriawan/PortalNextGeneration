import { css } from "@emotion/react";
import { mq } from "@helper/viewport";

export const styFormWrapper = css`
  display: flex;
  flex-direction: column;
  background: white;

  ${mq[1]} {
    margin: 64px 150px;
    flex-direction: row;
  }
`;

export const styLogo = css`
  margin-bottom: 20px;
`;

export const stySidebarWrapper = css`
  margin: 20px;
  display: flex;
  flex-direction: column;

  ${mq[1]} {
    width: 20%;
  }
`;

export const styMainFormWrapper = css`
  ${mq[1]} {
    width: 80%;
  }
`;

export const styHeaderWrapper = css`
  margin: 20px;
  h1 {
    font-size: 24px;
  }

  p {
    font-size: 14px;
  }
`;

export const styProgressWrapper = css`
  background: #f2eae4;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  .progressBar {
    margin-right: 10px;
  }

  .caption {
    .title {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
      color: rgba(140, 105, 79, 1);
      margin-bottom: 5px;
    }

    .subTitle {
      font-size: ${10 / 14}rem;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0em;
      text-align: left;
      color: rgba(140, 105, 79, 1);
    }
  }
`;

export const styStepMobileWrapper = css`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  width: 100%;
  overflow: scroll;
  background: white;
  margin-top: 10px !important;
  padding: 10px;

  /* For WebKit implementations, provide inertia scrolling */
  -webkit-overflow-scrolling: touch;

  /* Make an auto-hiding scroller for the 3 people using a IE */
  -ms-overflow-style: -ms-autohiding-scrollbar;

  // For Firefox
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .chipStep {
    display: flex;
    flex-direction: row;
    padding: 12px;
    width: max-content;
    border-radius: 6px;
    border: 1px solid #a68b77;
    margin-right: 10px;
    align-items: center;
    cursor: pointer;

    .checkbox {
      margin-right: 10px;

      .done {
        color: rgba(91, 198, 104, 1);
      }

      .empty {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 3px solid #ecddd2;
      }
    }

    .nameStep {
      white-space: nowrap;
    }
  }

  .active {
    background: #a68b77;
    color: white;
  }

  ${mq[1]} {
    display: none;
  }
`;

export const styStepDesktopWrapper = css`
  display: none;
  flex-direction: column;
  width: 100%;
  background: white;
  margin-top: 60px !important;

  ${mq[1]} {
    display: flex;
  }

  .chipStep {
    display: flex;
    flex-direction: row;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #a68b77;
    margin-bottom: 10px;
    align-items: flex-start;
    cursor: pointer;

    .checkbox {
      margin-right: 10px;

      .done {
        color: rgba(91, 198, 104, 1);
      }

      .empty {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 3px solid #ecddd2;
      }
    }

    .nameStep {
      display: flex;
      flex-direction: column;

      .title {
        font-weight: 500;
        font-size: 18px;
      }

      .description {
        font-weight: normal;
        font-size: 14px;
        color: #868686;
      }
    }
  }

  .active {
    background: #a68b77;
    color: white;
  }
`;
