import React from 'react';
import { notification } from 'antd';
import { array } from 'prop-types';
import { styStepDesktopWrapper } from './style.js';
import { CheckCircleFilled } from '@ant-design/icons';
import { useIdentity } from '@context/profileContext';

const StepDesktop = (props) => {
  const { formCompleteness, setStep, step } = useIdentity();

  return (
    <div css={styStepDesktopWrapper}>
      {props.liststep.map((value, key) => {
        const isDone = formCompleteness[value.type];
        return (
          <div
            className={value.id === step ? 'chipStep active' : 'chipStep'}
            key={key}
            onClick={() => {
              if (!formCompleteness.submittedAt) {
                setStep(value.id);
              } else {
                notification.error({
                  message: `Kamu sudah mengirim data pendaftaran`,
                });
              }
            }}
          >
            <div className='checkbox'>
              {isDone ? (
                <CheckCircleFilled className='done ' />
              ) : (
                <div className='empty'></div>
              )}
            </div>
            <div className='nameStep'>
              <span className='title'>{value.name}</span>
              <span className='description'>{value.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

StepDesktop.propTypes = {
  liststep: array,
};

export default StepDesktop;
