import React, { Component, Fragment } from "react";
import DataLolos from './Lolos';

class Pengumuman extends Component {

  renderTidakLolos = () => {
    const { dataUser } = this.props

    return (<div style={{ fontWeight: 'bold' }}>
      <div>Name: {dataUser.Identity.name}</div>

      <div>Mohon maaf, kamu belum bisa melanjutkan tahap seleksi Pelatnas FIM 21.</div>
      <div>Tetap semangat dan kami tunggu kamu di pelatnas FIM selanjutnya!</div>
    </div>)
  }

  renderLolos = (jalurs) => {
    return (<Fragment>
      <div>Name: {jalurs[0]['Nama Capes']}</div>
      {
        jalurs.map((jalur, index) => {
          return <div>Jalur {index+1}: {jalur.Jalur}</div>
        })
      }
      <div>Selamat, kamu dinyatakan lolos seleksi tahap 1 Pelatnas FIM 21 dan berkesempatan untuk melanjutkan proses ke tahap selanjutnya (interview).</div>
      <div>Seleksi tahap kedua akan dilangsungkan selama tanggal 7-13 September 2019. Panitia akan segera menghubungi kamu untuk penyesuaian jadwal interview. Jadi pastikan ponselmu selalu aktif dan tetap semangat. Semoga berhasil!</div>
    </Fragment>)
  }

  render() {
    const { dataUser } = this.props
    console.log("dataUser: ", dataUser)
    console.log("DataLolos: ", DataLolos)

    const dataFiltered = DataLolos.filter((data) => {
      if (data['E-mail'] !== '0') {
        return data['E-mail'] === dataUser.Identity.email
      } else {
        return data['Nama Capes'] === dataUser.Identity.name
      }
    })

    console.log("dataFiltered: ", dataFiltered)

    const isLolos = dataFiltered.length > 0;

    console.log("isLolos: ", isLolos)

    const tidakLolos = [
      {
        "Nama Capes": "Muhammad Nasar K",
        "E-mail": "muhammadnasar22@gmail.com",
        "Jalur": "NEXT - GENERATION"
      },
      {
        "Nama Capes": "Muhammad Fachrizal",
        "E-mail": "mhdfachrizal@gmail.com",
        "Jalur": "NEXT - GENERATION"
      },
      {
        "Nama Capes": "Muhammad Hafid",
        "E-mail": "muhammad.hafid744@gmail.com",
        "Jalur": "NEXT - GENERATION"
      },
    ]

    return (<Fragment>
      <h1>Pengumuman</h1>
      {
        isLolos ? "LOLOS!!" : this.renderTidakLolos()
      }
    </Fragment>)
  }
}

export default Pengumuman;