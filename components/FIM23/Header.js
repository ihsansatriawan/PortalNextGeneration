import React from "react";
import { styHeaderWrapper } from "./style";

const Header = () => {
  return (
    <div css={styHeaderWrapper}>
      <h1>Halo, Galang Dayu Nugraha!</h1>
      <p>
        Selamat datang di website pendaftaran FIM 23. Yuk lengkapi seluruh form
        dan dokumen pendaftaran.
      </p>
    </div>
  );
};

export default Header;
