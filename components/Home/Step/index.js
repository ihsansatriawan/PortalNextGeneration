import React from 'react';
import { Steps } from 'antd';
import { stepList } from '@helper/data/dataStep.js';
import {
  styWrapper,
  styDownloadWrapper,
  styDescriptionTimeline,
} from '../DownloadDoc/style';

const { Step } = Steps;

const Stepper = () => {
  const currentTime = Math.round(new Date().getTime() / 1000);
  let currentStep = 0;

  if (currentTime > 1635526800) {
    // 30 Oktober
    currentStep = 1;
  }

  if (currentTime > 1635699600) {
    // 1 Nov
    currentStep = 2;
  }

  if (currentTime > 1637082000) {
    // 1 Nov
    currentStep = 3;
  }

  return (
    <div css={styWrapper} style={{ marginTop: '20px' }}>
      <h2>Timeline Pendaftaran</h2>
      <div css={styDownloadWrapper} style={{ marginTop: '20px' }}>
        <Steps current={currentStep} mode='right'>
          {stepList.map((value, index) => (
            <Step
              title={value.name}
              description={
                <div css={styDescriptionTimeline}>
                  <span className='dateChoose'>{value.date}</span>
                  <div className='marginTop'>{value.description}</div>
                </div>
              }
              key={index}
            ></Step>
          ))}
        </Steps>
      </div>
    </div>
  );
};

export default Stepper;
