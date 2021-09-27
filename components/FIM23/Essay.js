import React, { useState, useEffect, Fragment } from 'react';
import { object, string } from 'prop-types';
import {
  Form,
  DatePicker,
  Card,
  Input,
  Typography,
  notification,
  InputNumber,
  Select,
} from 'antd';
import LoadingSpin from './LoadingSpin';
import { styCardWrapper } from './style';
const { Title } = Typography;
import { fetch } from '@helper/fetch';
import moment from 'moment';
import UploadInput from '../UploadInput/UploadInput';
import { debounce } from 'debounce';

const { Option } = Select;
const tunnelId = 12;

const Essay = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  console.log(questions);
  console.log('questions');

  const fetchEssayList = async (cb) => {
    const { cookieLogin, step } = props;
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
        const responseData = response.data || [];

        setQuestions(
          responseData.data.filter((value) => value.category === step)
        );
        cb();
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      // Jika error auto logout
      //   logout({
      //     onLogoutSuccess: () => {
      //       redirectAfterSuccessLogout();
      //     },
      //   });
      setIsLoading(false);
    }
  };

  const handleChange = (event, id, header, conditionalitem) => {
    let yangdiketik;
    if (
      event !== null &&
      event.target !== undefined &&
      conditionalitem === undefined
    ) {
      event.preventDefault();
      yangdiketik = event.target.value;
    } else {
      if (event !== null && event.constructor === Array) {
        yangdiketik = event;
      } else if (event !== null && typeof event === 'object') {
        yangdiketik = event;
      } else {
        yangdiketik = event;
      }
    }

    const currentAnswer = [...answers];

    // jika id pertanyaan yang dijawab belum ada di state answers
    const newArray = [...currentAnswer];
    let isExistQuestion = false;
    newArray.map((value) => {
      if (value.QuestionId === id) {
        isExistQuestion = true;
      }
    });

    if (isExistQuestion) {
      newArray.map((value, index) => {
        if (value.QuestionId === id) {
          let conditionalvalue;
          let yangdiketik2;
          if (conditionalitem) {
            yangdiketik2 = event.target.value;
            conditionalvalue = {
              ...value.answer,
              // ...[header[0]],
              [conditionalitem]: yangdiketik2,
            };
          } else {
            conditionalvalue = {
              ...value.answer,
              [header[0]]: yangdiketik,
            };
          }

          // update answer in specific index
          const newJawaban = {
            QuestionId: id,
            answer: {
              ...conditionalvalue,
            },
          };

          newArray.splice(index, 1, newJawaban);
        }
      });
    } else {
      // jika yang dijawab sudah ada di state answers, update
      newArray.push({
        QuestionId: id,
        answer: {
          [header[0]]: yangdiketik,
        },
      });
    }

    setAnswers(newArray);
  };

  const _fetchAnswer = async () => {
    const { cookieLogin } = props;

    try {
      const response = await fetch({
        url: '/answer/lists',
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: {
          TunnelId: tunnelId,
          //   ktpNumber: dataUser.Identity.ktpNumber,
        },
      });

      const status = response.data.status || false;
      const data = response.data.data || [];

      if (status && data.length > 0) {
        const newData = data.map((x) => {
          return {
            QuestionId: x.QuestionId,
            answer: JSON.parse(x.answer),
          };
        });

        setAnswers(newData);
      }
    } catch (error) {
      console.log(error);
      console.log('error');
    }
  };

  const _saveAnswer = async () => {
    const { cookieLogin } = props;

    try {
      const response = await fetch({
        url: '/answer/save',
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: {
          answers: answers,
          TunnelId: tunnelId,
          //   ktpNumber: dataUser.Identity.ktpNumber,
        },
      });

      const status = response.data.status || false;

      if (!status) {
        if (response.data.message) {
          notification.error({ message: response.data.message });
        } else {
          notification.error({ message: 'Gagal menyimpan data' });
        }
      } else {
        notification.success({ message: response.data.message });
      }
    } catch (error) {
      console.log('err: ', error);
      notification.error({ message: 'Gagal menyimpan Data' });
    }
  };

  useEffect(() => {
    if (answers.length > 0) {
      debounce(_saveAnswer(), 900);
    }
  }, [answers]);

  const renderQuestin = (question) => {
    if (question.id !== null) {
      const headline = question.headline;
      const subheadline = question.question;
      const note = question.note;

      const headerQuestion = JSON.parse(question.header);
      const entriesQ = Object.entries(headerQuestion);
      const dateFormatList = ['DD-MM-YYYY', 'DD/MM/YY'];
      const findAnswer = answers.find(
        (answer) => answer.QuestionId === question.id
      );

      return (
        <Card css={styCardWrapper}>
          <Title level={3}>{headline}</Title>
          <div
            className='the-question'
            style={{ marginBottom: '20px' }}
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />
          <div
            className='note-question'
            dangerouslySetInnerHTML={{ __html: note }}
          />
          <div>
            {entriesQ.map((q, idx) => {
              const type = typeof q[1] == 'object' ? q[1].type : q[1];
              const placeholder =
                typeof q[1] == 'object' ? q[1].placeholder : q[1];

              let inputvar = (
                <Input
                  // value={findAnswer.answer[q[0]]}
                  onChange={(e) => {
                    handleChange(e, question.id, q);
                  }}
                />
              );

              const { RangePicker } = DatePicker;
              const { TextArea } = Input;
              let conditionalnest = null;

              switch (type) {
                case 'text':
                  inputvar = (
                    <Input
                      size='large'
                      placeholder={placeholder !== 'text' && placeholder}
                      value={findAnswer ? findAnswer.answer[q[0]] : null}
                      onChange={(e) => {
                        handleChange(e, question.id, q);
                      }}
                    />
                  );
                  break;
                case 'date':
                  inputvar = (
                    <DatePicker
                      size='large'
                      value={
                        findAnswer ? moment(findAnswer.answer[q[0]]) : null
                      }
                      format={dateFormatList}
                      onChange={(e) => {
                        handleChange(e, question.id, q);
                      }}
                    />
                  );

                  break;
                case 'daterange':
                  inputvar = (
                    <RangePicker
                      size='large'
                      value={
                        findAnswer && [
                          moment(findAnswer.answer[q[0]][0]),
                          moment(findAnswer.answer[q[0]][1]),
                        ]
                      }
                      format={dateFormatList}
                      onChange={(e) => {
                        handleChange(e, question.id, q);
                      }}
                    />
                  );

                  break;
                case 'number':
                  inputvar = (
                    <InputNumber
                      size='large'
                      value={findAnswer && findAnswer.answer[q[0]]}
                      onChange={(e) => {
                        handleChange(e, question.id, q);
                      }}
                    />
                  );
                  break;
                case 'textarea':
                  inputvar = (
                    <TextArea
                      size='large'
                      placeholder={placeholder !== 'textarea' && placeholder}
                      rows={4}
                      value={findAnswer && findAnswer.answer[q[0]]}
                      onChange={(e) => {
                        handleChange(e, question.id, q);
                      }}
                    />
                  );
                  break;
                case 'select':
                  inputvar = (
                    <>
                      <Select
                        size='large'
                        style={{ width: '100%' }}
                        placeholder={q[1].placeholder}
                        value={findAnswer && findAnswer.answer[q[0]]}
                        onChange={(e) => {
                          handleChange(e, question.id, q);
                        }}
                      >
                        {q[1].options.map((optionitem, index) => {
                          //   const nilainya =
                          //     findAnswer &&
                          //     findAnswer.answer[q[0]] &&
                          //     findAnswer.answer[q[0]];
                          if (optionitem.conditionalnest !== null) {
                            // nested conditional input saat ini hanya mendukung tipe text saja, kedepan bisa pengembangan per type field
                            if (
                              findAnswer !== undefined &&
                              optionitem.value === findAnswer.answer[q[0]]
                            ) {
                              const arrayNestedConditionalSelect =
                                Object.entries(optionitem.conditionalnest);
                              conditionalnest = (
                                <Input
                                  size='large'
                                  value={
                                    findAnswer.answer[optionitem.value]
                                      ? findAnswer.answer[optionitem.value]
                                      : null
                                  }
                                  onChange={(e) => {
                                    handleChange(
                                      e,
                                      question.id,
                                      q,
                                      optionitem.value
                                    );
                                  }}
                                  placeholder={
                                    arrayNestedConditionalSelect[0][1]
                                      .placeholder
                                  }
                                ></Input>
                              );
                            }
                          }
                          return (
                            <Option value={optionitem.value} key={index}>
                              {optionitem.label}
                            </Option>
                          );
                        })}
                      </Select>
                      {conditionalnest}
                    </>
                  );
                  break;

                case 'upload':
                  inputvar = (
                    <UploadInput
                      filetype='pdf'
                      valueUrl={findAnswer ? findAnswer.answer[q[0]] : null}
                      onChange={(e) => {
                        handleChange(e, question.id, q);
                      }}
                    />
                  );

                  break;
                default:
                  break;
              }

              return (
                <div key={idx} style={{ marginBottom: '30px' }}>
                  <div
                    className='question-level2'
                    style={{ marginBottom: '20px' }}
                  >
                    {q[0] !== 'answer' && q[0]}
                  </div>
                  {inputvar}
                </div>
              );
            })}
          </div>
        </Card>
      );
    }
  };

  const renderContent = () => {
    if (questions.length > 0) {
      return questions.map(renderQuestin);
      //   return (
      //     <Card css={styCardWrapper}>
      //        <Title level={3}>Data Diri</Title>
      //     </Card>
      //   );
    }
  };

  useEffect(() => {
    fetchEssayList(_fetchAnswer);
  }, []);

  if (isLoading) {
    return <LoadingSpin />;
  }

  return <div>{renderContent()}</div>;
};

Essay.propTypes = {
  form: object,
  cookieLogin: string,
  step: string.isRequired,
};

const WrappedEssayForm = Form.create({ name: 'essay' })(Essay);

export default WrappedEssayForm;
