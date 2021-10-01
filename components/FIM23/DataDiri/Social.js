import React, { useState } from 'react';
import { Card, Row, Form, Col, Input, Typography, Icon, Checkbox } from 'antd';
import { useIdentity } from '@context/profileContext';

import { styCardWrapper } from '../style';
import { object, bool } from 'prop-types';
const { Text } = Typography;
import LoadingSpin from '../LoadingSpin';
const { TextArea } = Input;

const Social = (props) => {
  const { SocialMedia } = useIdentity();
  let hasReason = false;

  if (SocialMedia !== null) {
    hasReason = SocialMedia.reason !== null;
  }

  const { getFieldDecorator, isLoading } = props.form;
  const { isInPreview } = props;
  const isDisabled = isInPreview;
  const [dontHaveSocmed, setDontHaveSocmed] = useState(hasReason);

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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
                addonBefore={<Icon type='link' />}
                placeholder='https://'
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox
            onChange={() => {
              setDontHaveSocmed((prevState) => !prevState);
            }}
            checked={dontHaveSocmed}
            style={{ marginBottom: '20px;' }}
          >
            Saya tidak memiliki social media
          </Checkbox>
        </Col>
      </Row>
      {dontHaveSocmed && (
        <Row>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator('reason', {
                rules: [
                  {
                    required: false,
                    message: null,
                  },
                ],
              })(
                <TextArea
                  style={{ marginTop: '20px;' }}
                  disabled={isDisabled}
                  placeholder='Alasan tidak memiliki sosial media'
                  rows={2}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      )}
    </Card>
  );
};

Social.propTypes = {
  form: object.isRequired,
  isLoading: bool,
  isInPreview: bool,
};

export default Social;
