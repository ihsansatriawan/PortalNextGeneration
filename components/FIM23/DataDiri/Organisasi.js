import React from 'react';
import { Card, Row, Form, Col, Typography, Radio, Input } from 'antd';
import { styCardWrapper } from '../style';
import { object } from 'prop-types';
const { Title } = Typography;
const { TextArea } = Input;

const Organisasi = (props) => {
  const { getFieldDecorator } = props.form;

  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Keaktifan Organisasi</Title>
      <p>
        Isi form keaktifan FIM di bawah ini apabila dalam satu tahun terakhir
        kamu aktif di FIM. Kosongkan jika tidak ada.
      </p>

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
            })(<Input placeholder='isi peran kamu di sini ' />)}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label='Referensi atau Penanggungjawab'>
            {getFieldDecorator('referencePerson', {
              rules: [
                {
                  required: false,
                  message: 'Form ini harus diisi',
                },
              ],
            })(<Input placeholder='isi nama leader kamu ya ' />)}
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
            })(<Input placeholder='isi nama leader kamu ya ' />)}
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

Organisasi.propTypes = {
  form: object.isRequired,
};

export default Organisasi;
