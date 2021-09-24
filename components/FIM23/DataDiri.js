import React from "react";
import { Card } from "antd";
import { Typography, Form } from "antd";

import { styCardWrapper } from "./style";
import Image from "next/image";
import EmptyPlaceholderImg from "@components/assets/empty-profpic.jpg";

const { Title } = Typography;

const DataDiri = () => {
  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Data Diri</Title>

      <Image alt="profpic" src={EmptyPlaceholderImg} />
    </Card>
  );
};
export default DataDiri;
