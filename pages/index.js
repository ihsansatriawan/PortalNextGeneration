import { Result, Icon, Button, Divider, List, Avatar, Carousel } from "antd";
import { Fragment } from "react";
import { withRouter } from "next/router";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { sendTracker } from "@tracker";
import { styHomePageWrapper } from "@components/style/index";

import "../static/css/carousel.css";

const data = [
  {
    title: "File Surat Rekomendasi",
    description: "File ini digunakan untuk diisi oleh perekomendasi kamu",
    urlFile:
      "https://res.cloudinary.com/fim-indonesia/raw/upload/v1597596652/document/SURAT_REKOMENDASI_FIM_22.docx",
  },
  {
    title: "File Surat Pernyataan Komitmen Diri",
    description: "File ini sebagai bukti komitmen kamu",
    urlFile:
      "https://res.cloudinary.com/fim-indonesia/raw/upload/v1597659663/document/SURAT_PERNYATAAN_KOMITMEN_DIRI_FIM_22.docx",
  },
];

function Index(props) {
  const { cookieLogin } = props;

  useEffect(() => {
    props.router.prefetch("/login");
    props.router.prefetch("/fim21");
  }, []);

  let decode = {};

  try {
    decode = jwtDecode(cookieLogin);
  } catch (error) {}

  const _onClickHandler = () => {
    sendTracker({
      eventCategory: "Pendaftaran FIM",
      eventAction: "clickButton",
      eventLabel: "Daftar FIM",
    });
    Router.push("/fim");
  };

  let extraButton = [
    <Button
      className="cta-button"
      key={1}
      onClick={() => {
        _onClickHandler();
      }}
      type="primary"
    >
      Daftar FIM 22
    </Button>,
  ];

  return (
    <div>
      <Carousel autoplay effect="fade">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ maxHeight: "100%", maxWidth: "200px", margin: "auto" }}
            alt="all-fim"
            src="https://res.cloudinary.com/fim-indonesia/image/upload/q_auto:low/v1597501520/Screen_Shot_2020-08-15_at_21.23.27.png"
          />
        </div>
      </Carousel>

      <div css={styHomePageWrapper} className="welcome-wrapper">
        <h1>Halo Pemuda Pemudi Indonesia!</h1>
        <span>{`Hi ${
          decode.email || ""
        } Mari Bergabung ke Keluarga Besar Forum Indonesia Muda`}</span>
        {extraButton}
      </div>

      <div className="file-attach-info">
        <Divider>File Format Berkas Terbaru</Divider>
        <p>
          Berikut ini list file berformat yang dibutuhkan untuk diupload di
          tahap pendaftaran
        </p>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="file-word" />}
                title={<a href={item.urlFile}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default withRouter(Index);
