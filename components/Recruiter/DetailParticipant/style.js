import { css } from '@emotion/react';

export const styDetailParticipantWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ede4de;
`;

export const styHeader = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 15px;
  margin-bottom: 15px;

  font-size: 18px;
  width: 100%;

  .icon-back {
    margin-right: 20px;
    cursor: pointer;
  }
`;

export const styStatusBar = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    font-size: 12px;
    margin-right: 20px;
  }

  .status {
    background: #f8f8f8;
    border-radius: 6px;
    padding: 10px;
    font-size: 13px;

    .check-circle {
      margin-right: 20px;
    }
  }
`;

export const styBody = css`
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #a68b77;
  }
`;

export const styDataDiriWrapper = css`
  padding: 20px;

  hr {
    height: 1px;
    background-color: #ede4de;
    border: none;
  }
`;

export const styPrimaryIdentity = css`
  padding: 20px;
  background: #f8f8f8;
  display: flex;
  flex-direction: row;
  wdith: 100%;
  line-height: 2;
  align-items: space-between;
`;

export const styPhotoProfileWrapper = css`
  width: 165px;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  margin-right: 20px;
  justify-content: center;
  width: 20%;

  img {
    height: 100%;
  }
`;

export const styBasicInfo = css`
  width: 80%;
`;

export const styInfo = css`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-weight: 700;
  }
`;

export const stySocialMediaWrapper = css`
  font-size: 14px;
  color: #8a6b57;
  a {
    color: #8a6b57;
  }

  .icon {
    margin-right: 10px;
  }
`;

export const styCardNilai = css`
  margin-top: 20px;
  background: #a68b77;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  width: fit-content;

  strong {
    margin-right: 10px;
  }

  .input-field {
    width: 200px;
    margin-right: 20px;
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
