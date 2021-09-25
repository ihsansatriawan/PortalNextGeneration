import React from "react";

import {
  Typography,
  Card,
  Row,
  Form,
  Col,
  Upload,
  message,
  Button,
  Icon,
  Input,
  DatePicker,
  Radio,
  Select,
} from "antd";

const BasicInfo = (props) => {
  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Data Diri</Title>
      <Row>
        <div css={styUploadPhoto}>
          <Col span={12}>
            <div css={styProfpicWrapper}>
              <img src="https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a" />
            </div>
          </Col>
          <Col span={12}>
            <div css={styUploadProfpicButton}>
              <p className="maincaption">Upload foto diri kamu di sini</p>
              <p className="caption">
                File berupa JPG, JPEG2000, dan PNG. Max File 3 Mb.
              </p>
              <Upload
                className="avatar-uploader"
                showUploadList={false}
                action="https://api.cloudinary.com/v1_1/fim-indonesia/image/upload"
                beforeUpload={beforeUpload}
                onChange={handleChangeProfpic}
                data={(file) => {
                  return {
                    upload_preset: "profile_photo",
                    file,
                    tags: "browser_upload",
                  };
                }}
              >
                <Button css={styButtonUploadFoto} loading={isButtonLoading}>
                  <Icon type="upload" /> Upload Foto Diri
                </Button>
              </Upload>
            </div>
          </Col>
        </div>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Nama Depan">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your Name",
                },
              ],
            })(<Input placeholder="isi nama dulu ya" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Nama Belakang">
            {getFieldDecorator("lastName", {
              rules: [
                {
                  required: true,
                  message: "Please input your Name",
                },
              ],
            })(<Input placeholder="isi nama belakang" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Tempat Lahir">
            {getFieldDecorator("bornPlace", {
              rules: [{ required: true, message: "Isi tempat lahir kamu ya!" }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Tanggal Lahir">
            {getFieldDecorator("bornDate", {
              rules: [
                { required: true, message: "Tolong isi tanggal lahir kamu" },
              ],
            })(<DatePicker style={{ width: "100%" }} />)}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Jenis Kelamin">
            {getFieldDecorator("gender", {
              rules: [{ required: true, message: "Pilih jenis kelamin kamu" }],
            })(
              <Radio.Group
                defaultValue="a"
                buttonStyle="solid"
                size="large"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Radio.Button value="Pria" style={{ width: "48%" }}>
                  Pria
                </Radio.Button>
                <Radio.Button value="Wanita" style={{ width: "48%" }}>
                  Wanita
                </Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Kota">
            {getFieldDecorator("cityAddress", {
              rules: [{ required: true, message: "Isi Kota Alamat kamu!" }],
            })(<Input placeholder="kota domisili saat ini" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Provinsi">
            {getFieldDecorator("provinceAddress", {
              rules: [{ required: true, message: "Isi Provinsi Alamat kamu!" }],
            })(<Input placeholder="provinsi domisili saat ini" />)}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Alamat Lengkap">
            {getFieldDecorator("address", {
              rules: [
                { required: true, message: "Please input your address!" },
              ],
            })(<TextArea placeholder="alamat domisili saat ini" rows={4} />)}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Golongan Darah">
            {getFieldDecorator("bloodGroup", {
              rules: [{ required: true, message: "Pilih Golongan Darah" }],
            })(
              <Radio.Group
                buttonStyle="solid"
                size="large"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Radio.Button value="A" style={{ width: "22%" }}>
                  A
                </Radio.Button>
                <Radio.Button value="B" style={{ width: "22%" }}>
                  B
                </Radio.Button>
                <Radio.Button value="AB" style={{ width: "22%" }}>
                  AB
                </Radio.Button>
                <Radio.Button value="O" style={{ width: "22%" }}>
                  O
                </Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Agama">
            {getFieldDecorator("religion", {
              rules: [
                { required: true, message: "Please select your religion" },
              ],
            })(
              <Select style={{ width: "100%" }}>
                <Option value="Islam">Islam</Option>
                <Option value="Kristen Protestan">Kristen Protestan</Option>
                <Option value="Katolik">Katolik</Option>
                <Option value="Hindu">Hindu</Option>
                <Option value="Buddha">Buddha</Option>
                <Option value="Kong Hu Cu">Kong Hu Cu</Option>
                <Option value="Kepercayaan Lain nya">
                  Kepercayaan Lain nya
                </Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Hobi">
            {getFieldDecorator("hobby", {
              rules: [{ required: true, message: "Tolong isi Hobi kamu!" }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item label="Nomor HP">
            {getFieldDecorator("phone", {
              rules: [
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ],
            })(
              <Input
                placeholder="nomor telepon pribadi"
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Nomor HP Darurat">
            {getFieldDecorator("emergencyPhone", {
              rules: [{ required: true, message: "Isi Nomor Darurat kamu!" }],
            })(
              <Input placeholder="nomor telepon untuk dihubungi saat kejadian darurat, tuliskan pemilik nomor dan hubungannya dengan kamu. Misal: Budi (Ayah) 08123456789" />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default BasicInfo;
