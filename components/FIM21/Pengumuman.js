import React, { Component, Fragment } from "react";
import DataLolos from './Lolos';
import DataLolosFix from './FixLolos';

class Pengumuman extends Component {

  renderTidakLolos = () => {
    const { dataUser } = this.props;

    return (<div style={{ fontWeight: 'bold' }}>
      <p>Dear {dataUser.Identity.name}, aplikasi pendaftaranmu sudah kami terima, namun mohon maaf kali ini kamu belum dapat kami terima sebagai peserta Pelatihan Forum Indonesia angkatan 21. Semoga di pelatihan berikutnya kita akan bertemu yah, kalau kata Pak Elmir: "Jangan menyerah sebelum ditolak 21 kali!", tetap semangat teman!</p>
    </div>)
  }

  renderLolos = (jalurs) => {
    const { dataUser } = this.props;

    return (<div style={{ fontWeight: 'bold' }}>
      <p>Dear {dataUser.Identity.name}, SELAMAT! Kamu terima sebagai peserta Pelatihan Forum Indonesia angkatan 21. Silahkan konfirmasi ke CP: 08xxxxx </p>
    </div>)
  }

  render() {
    const { dataUser } = this.props

    const dataFiltered = DataLolos.filter((data) => {
      if (data['No. KTP'] !== '0') {
        return data['No. KTP'] === dataUser.Identity.ktpNumber
      } else {
        return data['E-mail'] === dataUser.Identity.email
      }
    })

    const isLolos = dataFiltered.length > 0;

    return (<Fragment>
      <h1>Pengumuman</h1>
      {
        isLolos ? this.renderLolos(dataFiltered) : this.renderTidakLolos()
      }
    </Fragment>)
  }
}

export default Pengumuman;