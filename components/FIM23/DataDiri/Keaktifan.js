import React from 'react';
import { Card, Row, Form, Col, Typography, Radio, Input } from 'antd';
import { object } from 'prop-types';
const { Title } = Typography;
import { styCardWrapper } from '../style';

const { TextArea } = Input;

const Keaktifan = (props) => {
  const { getFieldDecorator } = props.form;

  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Keaktifan FIM</Title>
      <p>
        Isi form keaktifan FIM di bawah ini apabila dalam satu tahun terakhir
        kamu aktif di FIM. Kosongkan jika tidak ada.
      </p>

      <Row>
        <Col span={24}>
          <Form.Item label='Tugas / Tanggung Jawab'>
            {getFieldDecorator('responsibility', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(
              <TextArea placeholder='isi tugas/tanggung jawab kamu di sini ' />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Peran'>
            {getFieldDecorator('role', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<TextArea placeholder='isi peran kamu di sini ' />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Durasi Kegiatan'>
            {getFieldDecorator('duration', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<TextArea placeholder='isi durasi kegiatan' />)}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='Skala Kegiatan'>
            {getFieldDecorator('eventScale', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(
              <Radio.Group
                buttonStyle='solid'
                size='large'
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Radio.Button value='Regional' style={{ width: '30%' }}>
                  Regional
                </Radio.Button>
                <Radio.Button value='Nasional' style={{ width: '30%' }}>
                  Nasional
                </Radio.Button>
                <Radio.Button value='Internasional' style={{ width: '30%' }}>
                  Internasional
                </Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Hasil Kegiatan'>
            {getFieldDecorator('result', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<TextArea placeholder='isi hasil kegiatan' />)}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

Keaktifan.propTypes = {
  form: object.isRequired,
};

export default Keaktifan;