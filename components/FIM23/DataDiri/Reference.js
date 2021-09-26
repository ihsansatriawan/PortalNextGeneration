import React from 'react';
import { Card, Row, Form, Col, Input, Typography } from 'antd';
import { styCardWrapper } from '../style';
import { object } from 'prop-types';
const { Title } = Typography;

const Reference = (props) => {
  const { getFieldDecorator } = props.form;

  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Referensi Alumni FIM</Title>
      <Row>
        <Col span={24}>
          <Form.Item label='Nama Lengkap'>
            {getFieldDecorator('fullName', {
              rules: [
                {
                  required: true,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Angkatan FIM'>
            {getFieldDecorator('batch', {
              rules: [
                {
                  required: true,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='No HP'>
            {getFieldDecorator('phoneNumber', {
              rules: [
                {
                  required: true,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Kenal Berapa Lama ?'>
            {getFieldDecorator('acquaintedSince', {
              rules: [
                {
                  required: true,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input placeholder='>5 Tahun' />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Mengenal sebagai Apa ?'>
            {getFieldDecorator('relationship', {
              rules: [
                {
                  required: true,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input placeholder='>Mentor' />)}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

Reference.propTypes = {
  form: object.isRequired,
};

export default Reference;
