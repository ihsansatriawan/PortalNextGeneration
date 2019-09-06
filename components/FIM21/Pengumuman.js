import React, { Component, Fragment } from "react";
import DataLolos from './Lolos';

class Pengumuman extends Component {

  renderTidakLolos = () => {
    const { dataUser } = this.props;

    return (<div style={{ fontWeight: 'bold' }}>
      <div>Name: {dataUser.Identity.name}</div>

      <div>Mohon maaf, kamu belum bisa melanjutkan tahap seleksi Pelatnas FIM 21.</div>
      <div>Tetap semangat dan kami tunggu kamu di pelatnas FIM selanjutnya!</div>
    </div>)
  }

  renderLolos = (jalurs) => {
    const { dataUser } = this.props;

    return (<div style={{ fontWeight: 'bold' }}>
      <p>Name: {dataUser.Identity.name}</p>
      {
        jalurs.map((jalur, index) => {
          return <div>Jalur {index+1}: {jalur.Jalur}</div>
        })
      }
      <p style={{ marginTop: '10px' }} >Selamat, kamu dinyatakan lolos seleksi tahap 1 Pelatnas FIM 21 dan berkesempatan untuk melanjutkan proses ke tahap selanjutnya (interview).</p>
      <p>Seleksi tahap kedua akan dilangsungkan selama tanggal 7-13 September 2019. Panitia akan segera menghubungi kamu untuk penyesuaian jadwal interview. Jadi pastikan ponselmu selalu aktif dan tetap semangat. Semoga berhasil!</p>
    </div>)
  }

  render() {
    const { dataUser } = this.props

    const dataFiltered = DataLolos.filter((data) => {
      if (data['E-mail'] !== '0') {
        return data['E-mail'] === dataUser.Identity.email
      } else {
        return data['Nama Capes'] === dataUser.Identity.name
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