import React from 'react';
import { func, string, number } from 'prop-types';
import { Descriptions, Avatar, Button, Rate } from 'antd';
import './showingAnswer.css';

const ShowingAnswer = (props) => {
  const { handleRating, answerId } = props;
  const theAswer = JSON.parse(props.answer.answer);
  const theKey = Object.keys(theAswer);

  return (
    <Descriptions
      // bordered
      column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
    >
      {theKey.map((value, index) => {
        let theanswertype = theAswer[value];
        if (
          theAswer[value] !== null &&
          theAswer[value].substring(0, 4) === 'http'
        ) {
          theanswertype = (
            <a href={theAswer[value]} target='_blank' rel='noreferrer'>
              <Button>Download</Button>
            </a>
          );
        }

        return (
          <div className key={index}>
            <div
              className='the-question'
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
            <div className='the-answer'>
              <Avatar
                className='avatar'
                shape='circle'
                src={props.photoUrl ? props.photoUrl : null}
                size={40}
                icon='user'
              />
              <span className='value-answer'> {theanswertype}</span>
            </div>

           
          </div>
        );
      })}
    </Descriptions>
  );
};

ShowingAnswer.propTypes = {
  handleRating: func,
  photoUrl: string,
  answerId: number,
};

export default ShowingAnswer;
