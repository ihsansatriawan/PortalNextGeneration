import React, { useState, useEffect } from 'react';
import { string, object } from 'prop-types';
import { fetch } from '@helper/fetch';
import { notification, Row, Col, Card, Input } from 'antd';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import ShowingAnswer from '@components/Recruiter/ListCardRecruiter/showingAnswer';

import { styDataDiriWrapper } from './style';

const tunnelId = 12;

const Essay = (props) => {
  const { cookieLogin, category } = props;
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

  const handleRating = (value) => {
    console.log(value);
    console.log('value');
  };

  return (
    <div css={styDataDiriWrapper}>
      {dataQuestion
        .filter((val) => val.category === category)
        .map((question, key) => {
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
                    <>
                      <ShowingAnswer
                        answerId={findAnswer.id}
                        handleRating={handleRating}
                        question={question.question}
                        answer={findAnswer ? findAnswer : null}
                        photoUrl={Identity.photoUrl ? Identity.photoUrl : null}
                      />
                      <div style={{ marginTop: '20px' }}>
                        <strong style={{ marginRight: '10px' }}>
                          {' '}
                          Berikan Nilai
                        </strong>
                        <Input
                          onChange={(rating) =>
                            handleRating(rating, findAnswer.id)
                          }
                        />
                      </div>
                    </>
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
  category: string,
};

export default Essay;
