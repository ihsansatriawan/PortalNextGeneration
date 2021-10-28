import React, { useState } from 'react';
import { Card, Form, Button, Select, Input, Icon } from 'antd';
import { object, string, bool, func } from 'prop-types';
import provinsiData from '@helper/dataIndonesia/provinsi.json';

import {
  styFilterCardWrapper,
  styCardWrapper,
  styFormFilterWrapper,
  styItemInput,
} from './style';

const { Option } = Select;

const FilterCard = (props) => {
  const { getFieldDecorator } = props.form;
  const { onHandleClickSearch } = props;
  const [idProvinsi, setIdProvinsi] = useState('');
  let dataKota = [];
  if (idProvinsi) {
    // eslint-disable-next-line no-undef
    dataKota = require(`@helper/dataIndonesia/kabupaten/${idProvinsi}.json`);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll(async (err, values) => {
      onHandleClickSearch(values);
    });
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Card css={styCardWrapper} padding='0'>
        <div css={styFilterCardWrapper}>
          <h4> Filter Capes Berdasarkan</h4>
          <div css={styFormFilterWrapper}>
            <div css={styItemInput}>
              <Form.Item label='Nama Lengkap'>
                {getFieldDecorator('name', {
                  rules: [{ required: false, message: '' }],
                })(
                  <Input placeholder='Nama Lengkap' style={{ width: '100%' }} />
                )}
              </Form.Item>
              {/* <Form.Item label='Jalur Masuk'>
                {getFieldDecorator('gender', {
                  rules: [{ required: false, message: 'Pilih jalur masuk' }],
                })(
                  <Radio.Group
                    defaultValue='a'
                    buttonStyle='solid'
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Radio.Button value='Alumni' style={{ width: '48%' }}>
                      Alumni
                    </Radio.Button>
                    <Radio.Button value='Umum' style={{ width: '48%' }}>
                      Umum
                    </Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item> */}
            </div>

            <div css={styItemInput}>
              <Form.Item label='Kota'>
                {getFieldDecorator('provinceAddress', {
                  rules: [
                    { required: false, message: 'Isi Provinsi Alamat kamu!' },
                  ],
                })(
                  <Select
                    showSearch
                    placeholder='Pilih Provinsi dulu'
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      const jsonId = provinsiData.find(
                        (value) => value.nama === e
                      );
                      if (jsonId) {
                        setIdProvinsi(jsonId.id);
                      }
                    }}
                  >
                    <Option value=''></Option>
                    {provinsiData.map((value, index) => (
                      <Option key={index} value={value.nama}>
                        {value.nama}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </div>

            <div css={styItemInput}>
              <Form.Item label=' '>
                {getFieldDecorator('cityAddress', {
                  rules: [
                    { required: false, message: 'Isi Kota Alamat kamu!' },
                  ],
                })(
                  <Select
                    showSearch
                    placeholder='Lalu isi Kota'
                    style={{ width: '100%' }}
                  >
                    <Option value=''></Option>
                    {dataKota.map((value, index) => (
                      <Option key={index} value={value.nama}>
                        {value.nama}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </div>

            <div css={styItemInput}>
              <Form.Item label='Profesi'>
                {getFieldDecorator('occupation', {
                  rules: [{ required: false, message: '' }],
                })(
                  <Input
                    placeholder='profesi peserta'
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </div>

            <Form.Item style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button
                size='large'
                css={{ background: '#ff8229' }}
                type='primary'
                htmlType='submit'
              >
                <Icon type='search' /> Cari
              </Button>
            </Form.Item>
          </div>
        </div>
      </Card>
    </Form>
  );
};

const WrappedFilterForm = Form.create({ name: 'filter' })(FilterCard);

FilterCard.propTypes = {
  form: object.isRequired,
  cookieLogin: string,
  isInPreview: bool,
  onHandleClickSearch: func,
};

export default WrappedFilterForm;
