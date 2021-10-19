import React, { useState, useEffect } from 'react';
import { string, object } from 'prop-types';
import { fetch } from '@helper/fetch';
import { notification, Row, Col, Card } from 'antd';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import ShowingAnswer from '@components/Recruiter/ListCardRecruiter/showingAnswer';

import { styDataDiriWrapper } from './style';

const tunnelId = 12;

const Essay = (props) => {
  const { cookieLogin } = props;
  const { Answers, Identity } = props.dataParticipant;
  const [isLoading, setIsLoading] = useState(false);
  const [dataQuestion, setDataQuestion] = useState([]);

  const fetchEssayList = async () => {
    setIsLoading(true);

    try {
      const response = await fetch({
        url: `/question?tunnelId=${tunnelId}&batchFim=23`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      const status = response.status || false;

      if (!status) {
        notification.error({ message: response.message });
      } else {
        const responseData = response.data.data || [];

        setDataQuestion(responseData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEssayList();
  }, []);

  if (isLoading) {
    return <LoadingSpin />;
  }

  return (
    <div css={styDataDiriWrapper}>
      {dataQuestion.map((question, key) => {
        const findAnswer = Answers.find(
          (answer) => answer.QuestionId === question.id
        );

        return (
          <Row key={key}>
            <Col span={24}>
              <h1
                style={{
                  marginBottom: '20px',
                  textAlign: 'center',
                  marginTop: '20px',
                }}
                dangerouslySetInnerHTML={{ __html: question.headline }}
              />

              <Card
                key={key}
                title={
                  <div
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  ></div>
                }
                style={{ marginTop: '20px' }}
              >
                {findAnswer !== undefined && (
                  <ShowingAnswer
                    question={question.question}
                    answer={findAnswer ? findAnswer : null}
                    photoUrl={Identity.photoUrl ? Identity.photoUrl : null}
                  />
                )}
              </Card>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

Essay.propTypes = {
  cookieLogin: string,
  dataParticipant: object,
};

export default Essay;
