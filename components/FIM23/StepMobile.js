import React from 'react';
import { array } from 'prop-types';
import { styStepMobileWrapper } from './style.js';
import { CheckCircleFilled } from '@ant-design/icons';
import { useIdentity } from '@context/profileContext';

const StepMobile = (props) => {
  const { formCompleteness, setStep, step } = useIdentity();

  return (
    <div css={styStepMobileWrapper}>
      {props.liststep.map((value, key) => {
        const isDone = formCompleteness[value.type];

        return (
          <div
            className={value.id === step ? 'chipStep active' : 'chipStep'}
            key={key}
            onClick={() => setStep(value.id)}
          >
            <div className='checkbox'>
              {isDone ? (
                <CheckCircleFilled className='done ' />
              ) : (
                <div className='empty'></div>
              )}
            </div>
            <div className='nameStep'>{value.name}</div>
          </div>
        );
      })}
    </div>
  );
};

StepMobile.propTypes = {
  liststep: array,
};

export default StepMobile;
