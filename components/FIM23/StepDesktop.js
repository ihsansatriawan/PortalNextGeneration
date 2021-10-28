import React from 'react';
import { notification } from 'antd';
import { array, number, func } from 'prop-types';
import { styStepDesktopWrapper } from './style.js';
import { CheckCircleFilled } from '@ant-design/icons';
import { useIdentity } from '@context/profileContext';
import Router, { useRouter } from 'next/router';

const StepDesktop = (props) => {
  const { formCompleteness, setStep } = useIdentity();
  const { pathname } = useRouter();

  const { step, liststep, setStepAdmin } = props;

  let selectedStep = step;

  const renderIcon = (step, isDone) => {
    if (step.icon) {
      return step.icon;
    }

    if (isDone) {
      return <CheckCircleFilled className='done ' />;
    } else {
      return <div className='empty'></div>;
    }
  };

  return (
    <div css={styStepDesktopWrapper}>
      {liststep.map((value, key) => {
        const isDone = formCompleteness[value.type];
        return (
          <div
            className={
              value.id === selectedStep ? 'chipStep active' : 'chipStep'
            }
            key={key}
            onClick={() => {
              // From recruiter side

              if (value.icon) {
                setStepAdmin(value.id);
              }

              if (!formCompleteness.submittedAt || value.id === 5) {
                setStep(value.id);
                if (pathname === '/pengumuman') {
                  Router.push('/pendaftaran');
                }
              } else {
                notification.error({
                  message: `Kamu sudah mengirim data pendaftaran`,
                });
              }
            }}
          >
            <div className='checkbox'>{renderIcon(value, isDone)}</div>
            <div className='nameStep'>
              <div className='menu-item'>
                <span className='title'>
                  {value.name} {value.count && `(${value.count})`}
                </span>
                {/* {value.count && <div className='count'>1</div>} */}
              </div>
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
  step: number,
  setStepAdmin: func,
};

export default StepDesktop;
