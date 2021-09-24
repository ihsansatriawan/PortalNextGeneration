import React, { useState } from "react";
import { Card } from "antd";
import {
  Typography,
  Form,
  Row,
  Col,
  Upload,
  message,
  Button,
  Icon,
} from "antd";

import {
  styCardWrapper,
  styProfpicWrapper,
  styUploadPhoto,
  styUploadProfpicButton,
  styButtonUploadFoto,
} from "./style";

const { Title } = Typography;

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

const DataDiri = () => {
  const [isButtonLoading, setButtonLoading, message] = useState(false);

  const handleChangeProfpic = (info) => {
    const status = info.file.status;

    switch (status) {
      case "uploading":
        setButtonLoading(true);
        break;
      case "error":
        message.error("Gagal Upload Foto");
        setButtonLoading(false);
        break;
      case "done":
        message.success("Sukses Upload");
        const { secure_url } = info.file.response;
        setButtonLoading(false);
        break;
      default:
        break;
    }
  };

  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Data Diri</Title>
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
    </Card>
  );
};
export default DataDiri;
