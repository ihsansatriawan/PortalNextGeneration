import { css } from '@emotion/react';

export const styParticipantCardWrapper = css`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background: white;
  width: 100%;
  border: 1px solid #ede4de;
  margin-bottom: 20px;
  border-radius: 6px;
  align-items: center;
`;

export const styProfilPicture = css`
  width: 12%;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
  }
`;

export const styName = css`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 28%;

  span {
    font-weight: 700;
  }
`;

export const styProfesi = css`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 15%;

  span {
    font-weight: 700;
  }
`;

export const styAsal = css`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 20%;

  span {
    font-weight: 700;
  }
`;

export const styCta = css`
  display: flex;
  flex-direction: column;
  width: 25%;

  span {
    font-weight: 700;
  }

  .button-preview {
    background: #ff8229;
    height: 44px;
    color: white;
    font-weight: 400;
    border: none;
  }
`;
