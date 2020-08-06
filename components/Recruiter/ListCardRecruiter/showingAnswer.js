import React, { useState } from 'react';
import { Descriptions, Avatar } from 'antd';
import './showingAnswer.css';

const ShowingAnswer = (props) => {
  
  
  const theAswer = JSON.parse(props.answer.answer);
  const theKey = Object.keys(theAswer);
  
  // const [answer, setAnswer]=useState(theKey)
  

  return (
    <Descriptions
      // bordered
      column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
    >
      {theKey.map((value, index) => (
        // <>
        <div className>
          <div className="the-question">{value}</div>
          <div className="the-answer">
            <Avatar className="avatar" shape="circle" src={props.photoUrl ? props.photoUrl : null} size={40} icon="user" />
            <span className="value-answer"> {theAswer[value]}</span>
          </div>
        </div>

        //     {/* <Descriptions
        //         bordered
        //         column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        //     >
        //         <Descriptions.Item label={value}></Descriptions.Item>
        //     </Descriptions > */}
        // </>
      ))}
    </Descriptions>
  )

}

export default ShowingAnswer;