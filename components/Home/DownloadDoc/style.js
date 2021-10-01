import { css } from '@emotion/react';
import { mq } from '@helper/viewport';

export const styWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;

  ${mq[1]} {
    margin: 0px 150px;
  }
`;

export const styDownloadWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mq[1]} {
    display: flex;
    flex-direction: row;
  }

  a {
    padding: 20px;
    display: flex;
    justify-content: center;
    background: #f2eae4;
    color: #8c694f;
    margin-bottom: 20px;

    ${mq[1]} {
      width: 48%;
    }

    i {
      margin-right: 15px;
    }
  }
`;

export const styButton = css``;

export const styDescriptionTimeline = css`
  margin-top: 5px;
  width: 150%;
  
  .dateChoose {
    margin-bottom: 10px;
  }

  .marginTop {
    margin-top: 10px;
  }
`;
