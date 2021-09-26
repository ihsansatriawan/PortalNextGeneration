import React from 'react';
import { Card, Row, Form, Col, Input, Typography, Icon } from 'antd';
import { styCardWrapper } from '../style';
import { object, bool } from 'prop-types';
const { Text } = Typography;
import LoadingSpin from '../LoadingSpin';

const Social = (props) => {
  const { getFieldDecorator, isLoading } = props.form;

  return (
    <Card css={styCardWrapper}>
      {isLoading && <LoadingSpin />}
      <Text strong level={3}>
        Akun Media Sosial
      </Text>
      <p>
        Masukkan link profile media sosial kamu di bawah ini. Kosongkan jika
        tidak memiliki media sosial.
      </p>

      <Row>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator('twitterUrl', {
              rules: [
                {
                  required: false,
                  message: null,
                },
              ],
            })(
              <Input
                addonBefore={<Icon type='twitter' />}
                placeholder='https://twitter.com/<username>'
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator('instagramUrl', {
              rules: [
                {
                  required: false,
                  message: null,
                },
              ],
            })(
              <Input
                addonBefore={<Icon type='instagram' />}
                placeholder='https://instagram.com/<username>'
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator('facebookUrl', {
              rules: [
                {
                  required: false,
                  message: null,
                },
              ],
            })(
              <Input
                addonBefore={<Icon type='facebook' />}
                placeholder='https://facebook.com/<username>'
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator('websiteUrl', {
              rules: [
                {
                  required: false,
                  message: null,
                },
              ],
            })(
              <Input
                addonBefore={<Icon type='global' />}
                placeholder='https://www.<nama-website>.com'
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            {getFieldDecorator('otherSiteUrl', {
              rules: [
                {
                  required: false,
                  message: null,
                },
              ],
            })(
              <Input
                addonBefore={<Icon type='link' />}
                placeholder='https://'
              />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

Social.propTypes = {
  form: object.isRequired,
  isLoading: bool,
};

export default Social;
