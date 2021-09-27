import React from 'react';
import { array } from 'prop-types';
import { styStepDesktopWrapper } from './style.js';
import { CheckCircleFilled } from '@ant-design/icons';
import { useIdentity } from '@context/profileContext';

const StepDesktop = (props) => {
  const { formCompleteness, setStep } = useIdentity();

  return (
    <div css={styStepDesktopWrapper}>
      {props.liststep.map((value, key) => {
        const isDone = formCompleteness[value.type];
        return (
          <div className='chipStep' key={key} onClick={() => setStep(value.id)}>
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
