import React, { useState } from 'react';
import { Descriptions } from 'antd';

const ShowingAnswer = (props) => {
  const theAswer = JSON.parse(props.answer);
  const theKey = Object.keys(theAswer);
  // const [answer, setAnswer]=useState(theKey)


  return (
    <Descriptions
      bordered
      column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
    >
      {theKey.map((value, index) => (
        // <>
        <div>
          <div>Pertanyaan: {value}</div>
          <div>Jawaban: {theAswer[value]}</div>
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