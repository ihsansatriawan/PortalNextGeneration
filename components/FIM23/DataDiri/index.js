import React, { useState } from "react";
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

import {
  styCardWrapper,
  styProfpicWrapper,
  styUploadPhoto,
  styUploadProfpicButton,
  styButtonUploadFoto,
} from "./style";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const beforeUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("Image must smaller than 1MB!");
  }
  return isJPG && isLt2M;
};

const beforeUploadCertificate = (file) => {
  const isJPGorPDF = file.type === "image/jpeg" || "application/pdf";
  if (!isJPGorPDF) {
    message.error("You can only upload JPG or PDF file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("Image must smaller than 1MB!");
  }
  return isJPGorPDF && isLt2M;
};

const DataDiri = (props) => {
  const [isButtonLoading, setButtonLoading, message] = useState(false);
  const [listCertificate, setListCertificate] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: [],
  });

  const handleChangeProfpic = (info) => {
    const status = info.file.status;

    switch (status) {
      case "uploading":
        setButtonLoading(true);
        break;
      case "error":
        // message.error("Gagal Upload Foto");
        setButtonLoading(false);
        break;
      case "done":
        // message.success("Sukses Upload");
        const { secure_url } = info.file.response;
        setButtonLoading(false);
        break;
      default:
        break;
    }
  };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } =
    props.form;

  const handlePreviewOnPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setListCertificate((prevState) => ({
      ...prevState,
      previewImage: file.url || file.preview,
      previewVisible: true,
    }));
  };

  const handleChangeCertificate = (file) => {
    const { fileList } = file;

    setListCertificate((prevState) => {
      return {
        ...prevState,
        fileList: fileList.map((value) => {
          let success = {};

          if (value.response) {
            success = {
              url: value.response.secure_url,
            };
          }

          return {
            ...value,
            uid: value.uid,
            name: value.name,
            status: value.status,
            ...success,
          };
        }),
      };
    });
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Tambah Sertifikat</div>
    </div>
  );

  return (
    <>
      
      <Card css={styCardWrapper}>
        <Row>
          <Col span={24}>
            <Form.Item label="Institusi">
              {getFieldDecorator("institution", {
                rules: [
                  {
                    required: true,
                    message: "Tolong isi Institusi asal kamu!",
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Profesi/Jabatan">
              {getFieldDecorator("occupation", {
                rules: [
                  {
                    required: true,
                    message:
                      "Tolong isi Profesi jabatan/aktivitas kamu saat ini ",
                  },
                ],
              })(<Input placeholder="Isi Profesi / Jabatan" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Apakah memiliki keahlian video editing ?">
              {getFieldDecorator("isAbleVideoEditing", {
                rules: [{ required: true, message: "Pilihan wajib diisi" }],
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
                  <Radio.Button
                    value="BISA"
                    style={{ width: "48%", textAlign: "center" }}
                  >
                    Ya
                  </Radio.Button>
                  <Radio.Button
                    value="TIDAK BISA"
                    style={{ width: "48%", textAlign: "center" }}
                  >
                    Tidak
                  </Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Portfolio Video Editing">
              {getFieldDecorator("videoEditingPortofolioUrl", {
                rules: [
                  {
                    required: false,
                    message: null,
                  },
                ],
              })(
                <Input placeholder="tambahkan link portfolio video editing (jika ada)" />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label strong style={{ marginBottom: "10px" }}>
              Sertifikasi Keahlian
            </label>
            <Upload
              action="https://api.cloudinary.com/v1_1/fim-indonesia/image/upload"
              listType="picture-card"
              beforeUpload={beforeUploadCertificate}
              fileList={listCertificate.fileList}
              onPreview={handlePreviewOnPreview}
              onChange={handleChangeCertificate}
              accept="image/jpeg,application/pdf"
              style={{ marginTop: "10px" }}
              data={(file) => {
                return {
                  upload_preset: "profile_photo",
                  file,
                  tags: "browser_upload",
                };
              }}
            >
              {listCertificate.fileList.length >= 3 ? null : uploadButton}
            </Upload>
          </Col>
        </Row>
      </Card>
      <Card css={styCardWrapper}>
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
              {getFieldDecorator("twitterUrl", {
                rules: [
                  {
                    required: false,
                    message: null,
                  },
                ],
              })(
                <Input
                  addonBefore={<Icon type="twitter" />}
                  placeholder="https://twitter.com/<username>"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator("instagramUrl", {
                rules: [
                  {
                    required: false,
                    message: null,
                  },
                ],
              })(
                <Input
                  addonBefore={<Icon type="instagram" />}
                  placeholder="https://instagram.com/<username>"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator("facebookUrl", {
                rules: [
                  {
                    required: false,
                    message: null,
                  },
                ],
              })(
                <Input
                  addonBefore={<Icon type="facebook" />}
                  placeholder="https://facebook.com/<username>"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator("websiteUrl", {
                rules: [
                  {
                    required: false,
                    message: null,
                  },
                ],
              })(
                <Input
                  addonBefore={<Icon type="global" />}
                  placeholder="https://www.<nama-website>.com"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator("otherSiteUrl", {
                rules: [
                  {
                    required: false,
                    message: null,
                  },
                ],
              })(
                <Input
                  addonBefore={<Icon type="link" />}
                  placeholder="https://"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card css={styCardWrapper}>
        <Title level={3}>Referensi Alumni FIM</Title>
        <Row>
          <Col span={24}>
            <Form.Item label="Nama Lengkap">
              {getFieldDecorator("fullName", {
                rules: [
                  {
                    required: true,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Angkatan FIM">
              {getFieldDecorator("batch", {
                rules: [
                  {
                    required: true,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="No HP">
              {getFieldDecorator("phoneNumber", {
                rules: [
                  {
                    required: true,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Kenal Berapa Lama ?">
              {getFieldDecorator("acquaintedSince", {
                rules: [
                  {
                    required: true,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input placeholder=">5 Tahun" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Mengenal sebagai Apa ?">
              {getFieldDecorator("relationship", {
                rules: [
                  {
                    required: true,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input placeholder=">Mentor" />)}
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card css={styCardWrapper}>
        <Title level={3}>Keaktifan FIM</Title>
        <p>
          Isi form keaktifan FIM di bawah ini apabila dalam satu tahun terakhir
          kamu aktif di FIM. Kosongkan jika tidak ada.
        </p>

        <Row>
          <Col span={24}>
            <Form.Item label="Tugas / Tanggung Jawab">
              {getFieldDecorator("responsibility", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(
                <TextArea placeholder="isi tugas/tanggung jawab kamu di sini " />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Peran">
              {getFieldDecorator("role", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<TextArea placeholder="isi peran kamu di sini " />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Durasi Kegiatan">
              {getFieldDecorator("duration", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<TextArea placeholder="isi durasi kegiatan" />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Skala Kegiatan">
              {getFieldDecorator("eventScale", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
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
                  <Radio.Button value="Regional" style={{ width: "30%" }}>
                    Regional
                  </Radio.Button>
                  <Radio.Button value="Nasional" style={{ width: "30%" }}>
                    Nasional
                  </Radio.Button>
                  <Radio.Button value="Internasional" style={{ width: "30%" }}>
                    Internasional
                  </Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Hasil Kegiatan">
              {getFieldDecorator("result", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<TextArea placeholder="isi hasil kegiatan" />)}
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card css={styCardWrapper}>
        <Title level={3}>Keaktifan Organisasi</Title>
        <p>
          Isi form keaktifan FIM di bawah ini apabila dalam satu tahun terakhir
          kamu aktif di FIM. Kosongkan jika tidak ada.
        </p>

        <Row>
          <Col span={24}>
            <Form.Item label="Peran">
              {getFieldDecorator("role", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input placeholder="isi peran kamu di sini " />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Referensi atau Penanggungjawab">
              {getFieldDecorator("referencePerson", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input placeholder="isi nama leader kamu ya " />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Durasi Kegiatan">
              {getFieldDecorator("duration", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<Input placeholder="isi nama leader kamu ya " />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Skala Kegiatan">
              {getFieldDecorator("eventScale", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
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
                  <Radio.Button value="Regional" style={{ width: "30%" }}>
                    Regional
                  </Radio.Button>
                  <Radio.Button value="Nasional" style={{ width: "30%" }}>
                    Nasional
                  </Radio.Button>
                  <Radio.Button value="Internasional" style={{ width: "30%" }}>
                    Internasional
                  </Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Hasil Kegiatan">
              {getFieldDecorator("result", {
                rules: [
                  {
                    required: false,
                    message: "Form ini harus diisi",
                  },
                ],
              })(<TextArea placeholder="isi hasil kegiatan" />)}
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(DataDiri);

export default WrappedRegistrationForm;
