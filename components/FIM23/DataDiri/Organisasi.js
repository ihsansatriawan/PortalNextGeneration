import React from 'react';
import { Card, Row, Form, Col, Typography, Radio, Input, Icon } from 'antd';
import { styCardWrapper } from '../style';
import { styBtnAddField, styOrganizationWrapper } from './styles';
import { object } from 'prop-types';
const { Title } = Typography;
const { TextArea } = Input;

let id = 0;

const Organisasi = (props) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;
  getFieldDecorator('organizations', { initialValue: [] });
  const keys = getFieldValue('organizations');

  const onHandleAddForm = () => {
    const keys = getFieldValue('organizations');
    const nextKeys = keys.concat(id++);
    setFieldsValue({
      organizations: nextKeys,
    });
  };

  const formItems = keys.map((key, index) => (
    <div css={styOrganizationWrapper} key={index}>
      <Row>
        <Col span={24}>
          <Form.Item label='Peran'>
            {getFieldDecorator(`orgRole[${key}]`, {
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
            {getFieldDecorator(`orgReferencePerson[${key}]`, {
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
            {getFieldDecorator(`orgDuration[${key}]`, {
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
            {getFieldDecorator(`orgEventScale[${key}]`, {
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
            {getFieldDecorator(`orgResult[${key}]`, {
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
    </div>
  ));

  return (
    <Card css={styCardWrapper}>
      <div css={styBtnAddField} onClick={onHandleAddForm}>
        <Icon type='plus' />
      </div>
      <Title level={3}>Keaktifan Organisasi</Title>
      <p>
        Isi form keaktifan FIM di bawah ini apabila dalam satu tahun terakhir
        kamu aktif di FIM. Kosongkan jika tidak ada.
      </p>
      {formItems}
    </Card>
  );
};

Organisasi.propTypes = {
  form: object.isRequired,
};

export default Organisasi;
