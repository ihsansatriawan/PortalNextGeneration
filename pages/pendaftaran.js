import React, { useEffect, useState } from "react";
import Container from "@components/FIM23";
import { Skeleton } from "antd";
import { newAuth } from "@HoC/withNewAuth";

const Pendaftaran = (props) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [step, setStep] = useState(-1);

//   useEffect(() => {
//     const fetchToken = async () => {
//       const { token_FIM, step } = await newAuth(props.cookieLogin);

//       setToken(token_FIM);
//       setStep(step);
//     };

//     fetchToken();
//     setLoading(false);
//   }, []);

  return loading ? <Skeleton /> : <Container {...props} />;
};

export default Pendaftaran;
