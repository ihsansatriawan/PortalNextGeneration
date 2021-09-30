import React from 'react';
import { Card, Row, Form, Col, Input, Typography } from 'antd';
import { styCardWrapper } from '../style';
import { object, bool } from 'prop-types';
const { Title } = Typography;

const Reference = (props) => {
  const { getFieldDecorator } = props.form;
  const { isInPreview } = props;
  const isDisabled = isInPreview;

  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Referensi Alumni FIM</Title>
      <Row>
        <Col span={24}>
          <Form.Item label='Nama Lengkap'>
            {getFieldDecorator('fullNameRef', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input disabled={isDisabled} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Angkatan FIM'>
            {getFieldDecorator('batchRef', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input disabled={isDisabled} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='No HP'>
            {getFieldDecorator('phoneNumberRef', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input disabled={isDisabled} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Kenal Berapa Lama ?'>
            {getFieldDecorator('acquaintedSinceRef', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input disabled={isDisabled} placeholder='Contoh: >5 Tahun' />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Mengenal sebagai Apa ?'>
            {getFieldDecorator('relationshipRef', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input disabled={isDisabled} placeholder='Contoh: Mentor' />)}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

Reference.propTypes = {
  form: object.isRequired,
  isInPreview: bool,
};

export default Reference;
