import React from 'react';
import { string, number } from 'prop-types';
import { Button } from 'antd';
import Link from 'next/link';

import {
  styParticipantCardWrapper,
  styProfilPicture,
  styName,
  styProfesi,
  styAsal,
  styCta,
} from './style';

const ParticipantCard = ({
  photoUrl,
  fullName,
  occupation,
  cityAddress,
  userId,
}) => {
  return (
    <div css={styParticipantCardWrapper}>
      <div css={styProfilPicture}>
        <img className='profpic' src={photoUrl} />
      </div>

      <div css={styName}>
        <label>Nama</label>
        <span>{fullName}</span>
      </div>

      <div css={styProfesi}>
        <label>Profesi</label>
        <span>{occupation}</span>
      </div>

      <div css={styAsal}>
        <label>Asal Daerah</label>
        <span>{cityAddress}</span>
      </div>

      <div css={styCta}>
        <Link href={`/recruiter/participant-detail?userid=${userId}`}>
          <Button className='button-preview'>Lihat Detail Formulir</Button>
        </Link>
      </div>
    </div>
  );
};

ParticipantCard.propTypes = {
  photoUrl: string,
  fullName: string,
  occupation: string,
  cityAddress: string,
  userId: number,
};

export default ParticipantCard;

// address: "Jl Bhakti Husada II No.17-19, Mojo, Gubeng, Surabaya"
// bloodGroup: "A"
// bornDate: "1999-09-26T17:00:00.000Z"
// bornPlace: "Sragen"
// cityAddress: "KOTA SURABAYA"
// emergencyPhone: "087564535 budi"
// firstName: "Anik Ima"
// fullName: "Anik Ima Wati"
// gender: "Pria"
// hobby: "mancing"
// institution: "Universitas Bangga Padamu"
// ktpNumber: "331413570006463"
// lastName: "Wati"
// occupation: "Karyawan"
// phone: "086865646545"
// photoUrl: "https://res.cloudinary.com/fim-indonesia/image/upload/v1633960621/profile_photo/Screen_Shot_2021-10-11_at_20.53.33_lusex1.png"
// provinceAddress: "JAWA TIMUR"
// religion: "Kristen Protestan"
