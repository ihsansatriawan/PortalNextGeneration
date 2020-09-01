import React, { Component, Fragment } from 'react';
import {
  Skeleton,
  Button,
  message,
  Input,
  Modal,
  Divider,
  DatePicker,
  InputNumber,
  Select
} from 'antd';
import { fetch } from '@helper/fetch';
import { object } from 'prop-types';
import { debounce } from "debounce";
import { sendPageview } from '@tracker';
import "./Question.css";
import moment from 'moment';
import UploadInput from '../UploadInput/UploadInput';

const { Option } = Select;
const { confirm } = Modal;

class Question extends Component {

  constructor(props) {
    super(props)

    this.saveAnswer = debounce(this._saveAnswer, 900)
  }

  state = {
    answers: [],
    isLoadButton: false,
    isLoadQ: false,
    dataQuestion: [],
    currentTunnel: '',
    isLoadTunnel: false,
  }

  componentDidMount = () => {
    this.fetchQuestion(this.fetchExistAnswer)

    this.props.dataUser.TunnelId && this.fetchList()

    sendPageview({ pathName: '/question' })
  }

  fetchExistAnswer = async () => {
    const { cookieLogin, dataUser } = this.props;
    const { answers } = this.state;

    try {
      const response = await fetch({
        url: '/answer/lists',
        method: 'post',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`
        },
        data: {
          TunnelId: dataUser.TunnelId,
          ktpNumber: dataUser.Identity.ktpNumber,
        }
      })



      const status = (response.data.status || false)
      const data = response.data.data || []

      if (status && data.length > 0) {

        const newData = data.map(x => {
          return {
            QuestionId: x.QuestionId,
            answer: JSON.parse(x.answer)
          }
        })

        // console.log(newData)

        // const newAnswer = answers.map(answer => {

        //   const findingData = newData.find(data => data.QuestionId === answer.QuestionId)
        //   if (findingData) {
        //     return findingData
        //   } else {
        //     return answer
        //   }

        // })



        this.setState({ answers: newData })
      }

    } catch (error) {

    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { answers: prevAnswer } = prevState
    const { answers: currentAnswer } = this.state;

    if (currentAnswer.length > 0) {
      (JSON.stringify(prevAnswer) !== JSON.stringify(currentAnswer)) && this.saveAnswer()
    }
  }

  addMoreHandling = (e, question) => {
    // console.log(question)
  }

  toggleLoadQ = () => {
    this.setState(prevState => ({ isLoadQ: !prevState.isLoadQ }))
  }

  toggleLoadTunnel = () => {
    this.setState(prevState => ({ isLoadTunnel: !prevState.isLoadTunnel }))
  }

  setCurrentTunnel = (value) => {
    this.setState({ currentTunnel: value })
  }

  setErrorData = () => {
    this.setState({ dataQuestion: [0] })
  }

  fetchList = async () => {
    const { dataUser, cookieLogin } = this.props;

    this.toggleLoadTunnel()

    try {
      const response = await fetch({
        url: '/tunnel/list',
        method: 'get',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`
        },
      })

      const status = (response.data.status || false)

      if (!status) {
        message.error("Server Error")
        this.setCurrentTunnel('ERROR')
      } else {
        const responseData = response.data.data || []

        if (dataUser.TunnelId) {
          const findData = responseData.find(item => item.id === dataUser.TunnelId)
          findData && this.setCurrentTunnel(findData)
        }

      }

      this.toggleLoadTunnel()

    } catch (error) {
      message.error("Server Error")
      this.setCurrentTunnel('ERROR')
      this.toggleLoadTunnel()
    }
  }

  fetchQuestion = async (cb) => {
    const { cookieLogin, dataUser } = this.props;

    this.toggleLoadQ()

    try {
      const response = await fetch({
        url: '/question/list',
        method: 'post',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`
        },
        data: {
          "TunnelId": dataUser.TunnelId || 1
        }
      })

      const status = (response.data.status || false)

      if (status) {
        this.setState({
          dataQuestion: response.data.data,
          // answers: response.data.data.map(item => {
          //   return {
          //     QuestionId: item.id,
          //     answer: JSON.parse(item.header)
          //   }
          // })
        }, () => { cb() })
      } else {
        this.setErrorData()
      }

      this.toggleLoadQ()

    } catch (error) {
      this.setErrorData()
      this.toggleLoadQ()
    }

  }

  handleChange = (event, id, header, conditionalitem) => {
    console.log(event)
    let yangdiketik;
    if (event !== null && event.target !== undefined && conditionalitem === undefined) {
      event.preventDefault()
      yangdiketik = event.target.value;
    } else {
      if (event !== null && event.constructor === Array) {
        yangdiketik = event;
      } else if (event !== null &&  typeof (event) === "object") {
        yangdiketik = event;
      } else {
        yangdiketik = event;
      }
    }



    const { answers } = this.state;
    const currentAnswer = [...this.state.answers];

    // jika id pertanyaan yang dijawab belum ada di state answers
    const newArray = [...currentAnswer];
    let isExistQuestion = false;
    newArray.map((value) => {
      if (value.QuestionId === id) {
        isExistQuestion = true;
      }
    })

    if (isExistQuestion) {
      newArray.map((value, index) => {
        if (value.QuestionId === id) {


          let conditionalvalue;
          let yangdiketik2;
          if (conditionalitem) {
            yangdiketik2 = event.target.value
            conditionalvalue = {
              ...value.answer,
              // ...[header[0]],
              [conditionalitem]: yangdiketik2
            }
          } else {
            conditionalvalue = {
              ...value.answer,
              [header[0]]: yangdiketik,
            }
          }



          // update answer in specific index
          const newJawaban = {
            QuestionId: id,
            answer: {
              ...conditionalvalue
            },


          }

          newArray.splice(index, 1, newJawaban)

        }
      })


    } else {
      // jika yang dijawab sudah ada di state answers, update
      newArray.push({
        QuestionId: id,
        answer:
        {
          [header[0]]: yangdiketik
        }

      })
    }


    this.setState({
      answers: newArray
    })

  }

  renderQuestion = (question) => {

    if (question.id !== null) {
      const { answers } = this.state;
      const headerQuestion = JSON.parse(question.header)

      const entriesQ = Object.entries(headerQuestion)
      const findAnswer = answers.find(answer => answer.QuestionId === question.id)

      const dateFormatList = ['DD-MM-YYYY', 'DD/MM/YY'];
      // console.log(findAnswer)

      return <Fragment key={question.id}>
        <h1 className="headline-question" style={{ fontWeight: 'bold' }}>{question.headline}</h1>
        <div className="the-question" dangerouslySetInnerHTML={{ __html: question.question }} />
        <div className="note-question" dangerouslySetInnerHTML={{ __html: question.note }} />
        <div>
          {entriesQ.map((q, idx) => {
            const pertanyaanHeader = q[0];
            const type = typeof (q[1]) == "object" ? q[1].type : q[1];
            const placeholder = typeof (q[1]) == "object" ? q[1].placeholder : q[1];

            let inputvar = <Input
              // value={findAnswer.answer[q[0]]} 
              onChange={(e) => { this.handleChange(e, question.id, q) }}
            />;

            const { RangePicker } = DatePicker;
            const { TextArea } = Input;
            let conditionalnest = null;

            switch (type) {
              case "text":
                inputvar = <Input size="large"
                  placeholder={placeholder !== "text" && placeholder}
                  value={findAnswer ? findAnswer.answer[q[0]] : null}
                  onChange={(e) => { this.handleChange(e, question.id, q) }}
                />
                break;
              case "date":
                inputvar = <DatePicker size="large"
                  value={findAnswer ? moment(findAnswer.answer[q[0]]) : null}
                  format={dateFormatList}
                  onChange={(e) => { this.handleChange(e, question.id, q) }}
                />

                break;
              case "daterange":
                inputvar = <RangePicker size="large"
                  value={findAnswer && [moment(findAnswer.answer[q[0]][0]), moment(findAnswer.answer[q[0]][1])]}
                  format={dateFormatList}
                  onChange={(e) => { this.handleChange(e, question.id, q) }}
                />

                break;
              case "number":
                inputvar = <InputNumber size="large"
                  value={findAnswer && findAnswer.answer[q[0]]}
                  onChange={(e) => { this.handleChange(e, question.id, q) }}
                />
                break;
              case "textarea":
                inputvar = <TextArea size="large"
                  placeholder={placeholder !== "textarea" && placeholder}
                  rows={4}
                  value={findAnswer && findAnswer.answer[q[0]]}
                  onChange={(e) => { this.handleChange(e, question.id, q) }}
                />
                break;
              case "select":

                inputvar = <>
                  <Select size="large" style={{ width: '100%' }}
                    placeholder={q[1].placeholder}
                    value={findAnswer && findAnswer.answer[q[0]]}
                    onChange={(e) => { this.handleChange(e, question.id, q) }}
                  >
                    {q[1].options.map((optionitem, index) => {
                      const nilainya = findAnswer && findAnswer.answer[q[0]] && findAnswer.answer[q[0]];
                      if (optionitem.conditionalnest !== null) {

                        // nested conditional input saat ini hanya mendukung tipe text saja, kedepan bisa pengembangan per type field
                        if (findAnswer !== undefined && optionitem.value === findAnswer.answer[q[0]]) {
                          const arrayNestedConditionalSelect = Object.entries(optionitem.conditionalnest);
                          conditionalnest = <Input size="large" value={findAnswer.answer[optionitem.value] ? findAnswer.answer[optionitem.value] : null} onChange={(e) => { this.handleChange(e, question.id, q, optionitem.value) }} placeholder={arrayNestedConditionalSelect[0][1].placeholder}></Input>
                        }
                      }
                      return <Option value={optionitem.value} key={index}>{optionitem.label}</Option>
                    }
                    )}
                  </Select>
                  {conditionalnest}
                </>
                break;

              case "upload":
                inputvar = <UploadInput
                  filetype="pdf"
                  valueUrl={findAnswer ? findAnswer.answer[q[0]] : null}
                  onChange={(e) => { this.handleChange(e, question.id, q) }}
                />


                break;
              default:
                break;
            }

            return (
              <Fragment key={idx}>
                <div className="question-level2" >{q[0] !== "answer" && q[0]}</div>
                {inputvar}
              </Fragment>)
          })}
        </div>
        {/* {question.isMany == 1 && (<Button onClick={(e)=>this.addMoreHandling(e,question)}>Add More</Button>)} */}
        <br />
      </Fragment>
    }
  }

  renderContent = () => {
    const { dataQuestion, currentTunnel } = this.state;

    if (dataQuestion.length == 0) {
      return <Fragment>
      <div className="question-wrapper">
        <div className="you-choose">
          <Divider />
          <span>Sayang sekali,</span>
          <h1 style={{ fontWeight: 'bold' }}>pendaftaran FIM 22 untuk Jalur Alumni FIM 20 dan Volunteer FIM sudah di tutup :(. Sampai jumpa di pendaftaran FIM selanjutnya 😊.</h1>
        </div>
        <Divider />        
      </div>
    </Fragment>
    }

    return <Fragment>
      <div className="question-wrapper">
        <div className="you-choose">
          <Divider />
          <span>Jalur kamu </span>
          <h1 style={{ fontWeight: 'bold' }}>{currentTunnel.name}</h1>
        </div>
        <Divider />
        <div className="question-container">
          {dataQuestion.length > 0 && dataQuestion.map(this.renderQuestion)}
        </div>
      </div>
    </Fragment>
  }

  _saveAnswer = async () => {
    const { cookieLogin, dataUser, refetchStep } = this.props;
    const { answers } = this.state;

    try {
      const response = await fetch({
        url: '/answer/save',
        method: 'post',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`
        },
        data: {
          answers: answers,
          TunnelId: dataUser.TunnelId,
          ktpNumber: dataUser.Identity.ktpNumber,
        }
      })

      const status = (response.data.status || false)

      if (!status) {
        if (response.data.message) {          
          message.error(response.data.message)
        }else{
          message.error("Gagal menyimpan data")
        }
      } else {
        message.success(response.data.message)
      }

    } catch (error) {
      console.log("err: ", error)
      message.error("Gagal menyimpan Data")
    }
  }

  toggleLoadButton = () => {
    this.setState(prevState => ({ isLoadButton: !prevState.isLoadButton }))
  }

  submitEvent = async () => {
    const { answers } = this.state;
    const { cookieLogin, dataUser, refetchStep } = this.props;

    try {
      const response = await fetch({
        url: '/summary/update-final-submit',
        method: 'post',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`
        },
        data: {
          TunnelId: dataUser.TunnelId,
          ktpNumber: dataUser.Identity.ktpNumber,
        }
      })

      const status = (response.data.status || false)

      if (!status) {
        message.error("Gagal menyimpan Data")
      } else {
        message.success(response.data.message)
        refetchStep()
      }

    } catch (error) {
      message.error("Gagal menyimpan Data")

    }

    //TODO: Hit Final Submit

    // try {

    // } catch (error) {

    // }
  }

  showConfirm = () => {
    confirm({
      title: 'Kamu yakin akan mengirimkan data ini?',
      content: 'Sekali kamu kirimkan, tidak akan bisa diubah!',
      onOk: () => {
        this.submitEvent()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  get buttonSubmitProps() {
    const { isLoadButton } = this.state;

    return {
      loading: isLoadButton,
      onClick: this.showConfirm,
      type: 'primary',
      size: 'large'
    }
  }

  render() {
    const { isLoadQ } = this.state;
    const { dataUser, refetchStep } = this.props;

    if (!dataUser.TunnelId) {
      return <Fragment>
        <div>Anda Belum Milih Jalur</div>
        <div><Button onClick={() => { refetchStep() }} type="primary">Refresh</Button></div>
      </Fragment>
    }

    return (<Fragment>
      {isLoadQ && this.state.dataQuestion.length > 0 ? <Skeleton active /> : this.renderContent()}
      <div className="submit-question-button">
        <Button {...this.buttonSubmitProps} >
          Submit
      </Button>
      </div>
    </Fragment>)
  }
}

export default Question;