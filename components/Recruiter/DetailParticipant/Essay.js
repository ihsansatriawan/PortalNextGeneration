import React, { useState, useEffect } from 'react';
import { string, object } from 'prop-types';
import { fetch } from '@helper/fetch';
import { notification, Row, Col, Card, Input, Button, Icon } from 'antd';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import ShowingAnswer from '@components/Recruiter/ListCardRecruiter/showingAnswer';

import { styDataDiriWrapper, styCardNilai } from './style';

const tunnelId = 12;

const Essay = (props) => {
  const { cookieLogin, category } = props;
  const { Answers, Identity } = props.dataParticipant;
  const [isLoading, setIsLoading] = useState(false);
  const [dataQuestion, setDataQuestion] = useState([]);
  const [payload, setPayload] = useState([]);
  const [isLoadingSave, setIsLoadingSave] = useState(false);

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

  const handleSaveScore = async () => {
    setIsLoadingSave(true);

    try {
      const response = await fetch({
        url: `/participant/assessment`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: payload,
      });

      const status = response.status || false;

      if (!status) {
        notification.error({ message: response.data.message });
      } else {
        notification.success({ message: response.data.message });
        setIsLoadingSave(false);
      }
    } catch (error) {
      console.error(error);

      setIsLoadingSave(false);
    }
  };

  useEffect(() => {
    fetchEssayList();
  }, []);

  if (isLoading) {
    return <LoadingSpin />;
  }

  const handleRating = (e, answerId) => {
    const value = e.target.value;
    const isPayloadExist = payload.find((val) => val.answerId === answerId);
    const currentPaylod = [...payload];

    if (isPayloadExist) {
      const indexPosition = currentPaylod.indexOf(isPayloadExist);
      currentPaylod.splice(indexPosition, 1, {
        answerId: answerId,
        score: value,
      });
      setPayload(currentPaylod);
    } else {
      currentPaylod.push({
        answerId: answerId,
        score: value,
      });
      setPayload(currentPaylod);
    }
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
                    <div>
                      <ShowingAnswer
                        answerId={findAnswer.id}
                        handleRating={handleRating}
                        question={question.question}
                        answer={findAnswer ? findAnswer : null}
                        photoUrl={Identity.photoUrl ? Identity.photoUrl : null}
                      />
                      <div css={styCardNilai}>
                        <strong>Berikan Nilai</strong>
                        <Input
                          className='input-field'
                          defaultValue={findAnswer.score}
                          onChange={(e) => handleRating(e, findAnswer.id)}
                        />
                        <Button
                          className='save-btn'
                          loading={isLoadingSave}
                          onClick={handleSaveScore}
                        >
                          {isLoadingSave ? 'Loading...' : 'Simpan'}
                        </Button>
                        {findAnswer.score && (
                          <div style={{ marginLeft: '10px', fontSize: '20px' }}>
                            <Icon
                              type='check-circle'
                              theme='twoTone'
                              twoToneColor='#52c41a'
                            />
                          </div>
                        )}
                      </div>
                    </div>
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
