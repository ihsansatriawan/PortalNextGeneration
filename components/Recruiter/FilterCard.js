import React, { useState } from 'react';
import { Card, Form, Radio, Select } from 'antd';
import { object, string, bool } from 'prop-types';
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
  const [idProvinsi, setIdProvinsi] = useState('');
  let dataKota = [];
  if (idProvinsi) {
    // eslint-disable-next-line no-undef
    dataKota = require(`@helper/dataIndonesia/kabupaten/${idProvinsi}.json`);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll(async (err, values) => {
      console.log(values);
    });
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Card css={styCardWrapper} padding='0'>
        <div css={styFilterCardWrapper}>
          <h4> Filter Capes Berdasarkan</h4>
          <div css={styFormFilterWrapper}>
            <div css={styItemInput}>
              <Form.Item label='Jalur Masuk'>
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
              </Form.Item>
            </div>

            <div css={styItemInput}>
              <Form.Item label='Provinsi'>
                {getFieldDecorator('provinceAddress', {
                  rules: [
                    { required: false, message: 'Isi Provinsi Alamat kamu!' },
                  ],
                })(
                  <Select
                    showSearch
                    placeholder='Provinsi Peserta'
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
              <Form.Item label='Kota'>
                {getFieldDecorator('cityAddress', {
                  rules: [{ required: false, message: 'Isi Kota Alamat kamu!' }],
                })(
                  <Select
                    showSearch
                    placeholder='Kota domisili saat ini'
                    style={{ width: '100%' }}
                  >
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
                {getFieldDecorator('profesi', {
                  rules: [{ required: false, message: 'Isi Kota Alamat kamu!' }],
                })(
                  <Select
                    showSearch
                    placeholder='Profesi Peserta'
                    style={{ width: '100%' }}
                  >
                    {dataKota.map((value, index) => (
                      <Option key={index} value={value.nama}>
                        {value.nama}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </div>
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
};

export default WrappedFilterForm;
