import { Carousel, Row, Col, Steps, Divider, Collapse } from 'antd';
import { Fragment } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useEffect } from 'react';
import '../static/css/carousel.css';

const { Step } = Steps;

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Faq() {
  return (
    <Collapse accordion>
      <Panel header="This is panel header 1" key="1">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  )
}

const CarouselTemplate = () => {
  return (
    <Carousel autoplay>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
    </Carousel>
  )
}

const FirstColumn = () => {
  return (<Fragment>
    <Divider>Timeline Pendaftaran</Divider>
    <Steps direction="vertical" current={1}>
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
  </Fragment>)
}

const SecondColumn = () => {
  return (<Fragment>
    <Divider>FAQ</Divider>
    <Faq />
  </Fragment>)
}

const Content = () => {
  return (
    <div>
      <Row>
        <Col span={12}><FirstColumn /></Col>
        <Col span={12}><SecondColumn /></Col>
      </Row>
    </div>
  )
}

function Index(props) {

  useEffect(() => {
    props.router.prefetch('/login')
    props.router.prefetch('/fim21')
  }, [])

  return (
    <div>
      <CarouselTemplate />
      <Content />
    </div>
  )
}

export default withRouter(Index);