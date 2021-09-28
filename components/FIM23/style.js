import { css } from '@emotion/react';
import { mq } from '@helper/viewport';

export const stySpinWrapper = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  top: 0;
  left: 0;
  background: rgb(255 255 255 / 80%);
  z-index: 100;

  .spin-gif {
    margin-top: 100px;
  }
`;

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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  ${mq[1]} {
    justify-content: flex-start;
  }

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

export const styCardWrapper = css`
  background: white;
  margin-bottom: 20px;
  position: relative;
`;

/**
  Data Diri Css
 */

export const styProfpicWrapper = css`
  width: 150px;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-right: 14px;
  margin-bottom: 20px;
  img {
    height: 100%;
  }
`;

export const styUploadPhoto = css`
  display: flex;
  flex-direction: row;
`;

export const styUploadProfpicButton = css`
  .maincaption {
    font-weight: 700;
  }

  .caption {
    font-size: 10px;
    line-height: auto;
  }
`;

export const styButtonUploadFoto = css`
  margin-top: 20px;
  border-color: #ff8229;
  color: #ff8229;
`;

export const styFileUploader = css`
  width: 100%;
  margin-top: 10px;

  .ant-upload {
    width: 100%;
  }
`;

export const styTextUploadWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px 20px;

  .ant-upload-text {
    line-height: 1.5;
    margin-bottom: 10px;
  }

  small {
    font-size: 7pt;
  }
`;

export const styBtnAddFieldBerkas = css`
  cursor: pointer;
  background: #f2eae4;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #a68b77;
  margin-bottom: 10px;
`;

export const styIconFileWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

export const stySubmitWrapperButton = css`
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const styButtonSave = css`
  background: #ff8229;
  width: 200px;
  border: none;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  height: 48px;
`;

export const styMeterWrapper = css`
  display: flex;
  flex-direction: row !important;
`;
export const styButtonSubmitAll = css`
  background: #ff8229;
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const styModalWrapper = css`
  display: flex;
  flex-direction: column;

  p {
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

export const styButtonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .batal {
    width: 48%;
    font-size: 12px;
    height: 50px;
    font-weight: 700;
    color: #ff8229;
    border: 1px solid #ff8229;
  }

  .submit {
    width: 48%;
    font-size: 12px;
    background: #ff8229;
    color: white;
    height: 50px;
    font-weight: 700;
  }
`;
