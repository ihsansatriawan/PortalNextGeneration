import React, { Component, Fragment } from "react";
import dayjs from 'dayjs';
import DataLolos from './Lolos';
import DataLolosFix from './FixLolos';
import "./Pengumuman.css"
import { Button, List, Avatar, Select, DatePicker, Upload, Input, Icon, message } from 'antd';
import { fetch } from '@helper/fetch';




class Pengumuman extends Component {
  state = {
    kehadiran: this.props.dataUser.Identity.batchFim !== null ? (this.props.dataUser.Identity.batchFim == '22' ? 1 : 0) : null,
    isLoading: false,
    batchFim: this.props.dataUser.Identity.batchFim,
    mbti: this.props.dataUser.Identity.mbti,

    tanggal_bayar: this.props.dataUser.Identity.paymentDate,
    bank_transfer: this.props.dataUser.Identity.bankTransfer,
    urlTransferPhoto: this.props.dataUser.Identity.urlTransferPhoto
  }

  get isLaunch() {
    const today = dayjs(new Date());
    const launchTime = dayjs.unix(1568811600)

    return launchTime.unix() <= today.unix()
  }



  renderTidakLolos = () => {
    const { dataUser } = this.props;

    return (<div className="pengumuman-wrapper" style={{ fontWeight: 'bold' }}>
      <p>Dear {dataUser.Identity.name}, mohon maaf kali ini kamu belum dapat kami terima sebagai peserta Pelatihan Forum Indonesia Muda angkatan 22. Semoga di pelatihan berikutnya kita akan bertemu yah, kalau kata Pak Elmir: "Jangan menyerah sebelum ditolak 21 kali!", tetap semangat teman!</p>
      <p><br /><br /></p>
      <p>Salam pemuda Indonesia!</p>
      <p>Panitia FIM 22</p>
    </div>)
  }

  renderLolosWawancara = () => {
    const { dataUser } = this.props;

    return <div className="pengumuman-wrapper">
      <h1 className="high-emphasis">Selamat {dataUser.Identity.name}, kamu berhasil <b style={{ color: "#e11c26" }}>LOLOS</b> ke tahap wawancara FIM 22 !</h1>

      <p>
        Sesi wawancara akan dilaksanakan pada rentang tanggal 22-30 September 2020 secara online. Interviewer akan menghubungi kamu melalui WhatsApp/E-Mail. Jadi, pastikan nomor/e-mail kamu selalu standby untuk dikontak ya.
      </p>

      <p>
        Selamat berjuang di tahap kedua, tetap semangat dan berikan yang terbaik :)
      </p>

      <p><br /><br /></p>
      <p>Salam pemuda Indonesia!</p>
      <p>Panitia FIM 22</p>
    </div>

    // return (<div>
    //   <p>Halo, {dataUser.Identity.name}.</p>
    //   <p>Terima kasih atas partisipasi kamu dalam mengikuti proses pendaftaran Pelatihan FIM 21.</p>
    //   <p>Menyeleksi dari 3733 calon peserta membuat tim seleksi benar-benar harus bekerja ekstra untuk menentukan calon pemimpin bangsa yang ingin mengembangkan dirinya melalui pelatihan FIM 21 ini. Kami ucapkan <strong>SELAMAT</strong> karena <strong>kamu telah terpilih menjadi peserta Forum Indonesia Muda 21</strong>!</p>
    //   <p>Selanjutnya, ada beberapa langkah yang perlu kamu lakukan:</p>
    //   <ol>
    //     <li>Silakan untuk segera melakukan konfirmasi keikutsertaan pada rangkaian kegiatan FIM 21 pada tanggal 23-27 Oktober 2019 bertempat di Taman Wiladatika Cibubur, Jakarta Timur. Peserta diharapkan tiba di lokasi sebelum pukul 08.00 WIB di tanggal 23 Oktober 2019.<br />Bagi peserta yang karena satu dan lain hal khawatir tidak bisa datang tepat waktu dan bagi peserta yang datang dari luar kota, panitia menyiapkan penginapan di Wiladatika pada tanggal 22 Oktober 2019 dengan biaya tambahan.<br />Konfirmasi dilakukan dengan mengirimkan pesan via whatsapp/sms ke narahubung Pelatihan FIM 21 <strong>Rifa (0852-1655-9005)</strong> dengan format: Nama_No KTP_Bersedia/Tidak Bersedia mengikuti seluruh rangkaian kegiatan Pelatihan FIM 21 (23-27 Oktober 2019) secara penuh tanpa terkecuali.<br />Konfirmasi ditunggu sampai tanggal <strong>23 September 2019 pukul 21.00 WIB</strong>. Jika telah melewati waktu tersebut maka kamu dianggap mengundurkan diri dan status kesertaan akan dicabut.</li>
    //     <li>Peserta terpilih harap membayar uang pengganti training kit sebesar <strong>Rp450.000</strong> ke nomor rekening a.n. <strong>Forum Indonesia Muda di 0060007150786, Bank Mandiri cabang Pulomas, Jakarta</strong>. Pembayaran dilakukan paling lambat tanggal <strong>30 September pukul 23.59 WIB</strong>.<br />Adapun training kit pelatihan terdiri dari: Name tag, sertifikat, topi, buku FIM, pin, dan t-shirt.<br />Selanjutnya, silakan melakukan konfirmasi pembayaran kepada narahubung Rifa ke 0852-1655-9005, bukti pembayaran harap dibawa pada saat pelatihan. Diimbau agar bukti pembayaran segera di fotokopi untuk menghindari lunturnya tulisan di bukti pembayaran.</li>
    //     <li>Bagi peserta yang membutuhkan surat izin atau proposal untuk menghadiri pelatihan, harap mengikuti alur permohonan surat izin di bawah ini:<br />-Permohonan surat izin dilakukan pada tanggal <strong>18-30 September 2019</strong>.<br />-Surat akan dikirim ke e-mail peserta.<br />-Permohonan pembuatan surat dilakukan dengan mengisi tautan <strong>bit.ly/suratizinpesertafim21</strong></li>
    //     <li>Peserta harap melakukan konfirmasi waktu kedatangan di lokasi pelatihan. Konfirmasi dilakukan via sms/whatsapp kepada narahubung Rifa (0852-1655-9005). Konfirmasi kedatangan ditunggu sampai tanggal <strong>30 September 2019</strong>.</li>
    //   </ol>
    //   <p><br /><br /></p>
    //   <p>Kami yakin kamu dapat memanfaatkan kesempatan ini dengan sebaik-baiknya. Kami ingatkan kembali bahwa kesediaan untuk mengikuti pelatihan berarti bahwa kamu telah berkomitmen untuk hadir di Pelatihan Forum Indonesia Muda 21 dan mengikuti seluruh rangkaian kegiatan secara penuh tanpa terkecuali (dispensasi bagi kejadian darurat tiba-tiba seperti bencana alam, kedukaan, dsb). Konsekuensi dari pelanggaran komitmen tersebut adalah blacklist bagi peserta untuk pelatihan FIM selanjutnya, serta pengganti training kit yang telah dibayarkan tidak dapat dikembalikan.</p>
    //   <p>Demikian informasi kali ini. Kami sungguh berharap dapat bertemu dan berbagi dengan para pemuda pilihan di bulan Oktober nanti.</p>
    //   <p><br /><br /></p>
    //   <p>Salam pemuda Indonesia!</p>
    //   <p><br />Panitia FIM 21</p>
    //   <p><br /><br /></p>
    //   <p>NB: Jika kamu ingin update status kabar baik ini di sosial media, jangan lupa mention @fimnews di twitter dan IG, juga Forum Indonesia Muda di Fanspage FB ya :)</p>

    // </div>)
  }

  onChangeKehadiran = (value) => {
    this.setState({ kehadiran: value })
  }

  processKonfirmasi = () => {
    const { dataUser } = this.props;

    if (this.state.kehadiran == null) {
      alert("Mohon isi pilihan konfirmasi keikutsertaan")
    } else {

      try {
        this.setState({ isLoading: true })
        const response = fetch({
          url: '/participant/confirmation/update',
          method: 'post',
          headers: {
            'Authorization': `Bearer ${this.props.cookieLogin}`
          },
          data: {
            kehadiran: this.state.kehadiran,
            ktpNumber: dataUser.Identity.ktpNumber,
            idUser: dataUser.id
          }
        }).then(result => {
          const batchFim = result.data.data.batchFim;
          message.success('Sukses Update Konfirmasi');
          this.setState({ batchFim: batchFim });
        })

      } catch (error) {
        console.log(error)
      }
    }
  }

  processPembayaran = () => {
    const { dataUser } = this.props;

    if (this.state.tanggal_bayar == null || this.state.bank_transfer == null || this.state.urlTransferPhoto == null) {
      alert("Mohon isi semua form konfirmasi pembayaran")
    } else {

      try {
        this.setState({ isLoading: true })
        const response = fetch({
          url: '/participant/payment/confirmation',
          method: 'post',
          headers: {
            'Authorization': `Bearer ${this.props.cookieLogin}`
          },
          data: {
            paymentDate: this.state.tanggal_bayar,
            bankTransfer: this.state.bank_transfer,
            urlTransferPhoto: this.state.urlTransferPhoto,
            ktpNumber: dataUser.Identity.ktpNumber,
            idUser: dataUser.id
          }
        }).then(result => {
          if (result.data.status) {
            message.success('Sukses Update Pembayaran');
          } else {
            message.error(result.data.message);
          }

          this.setState({ isLoading: false })
        })

      } catch (error) {
        console.log(error)
      }
    }
  }

  updateMbti = () => {
    const { dataUser } = this.props;

    if (this.state.mbti == null) {
      alert("Mohon isi hasil MBTI")
    } else {

      try {
        this.setState({ isLoading: true })
        const response = fetch({
          url: '/participant/mbti/update',
          method: 'post',
          headers: {
            'Authorization': `Bearer ${this.props.cookieLogin}`
          },
          data: {
            mbti: this.state.mbti,
            ktpNumber: dataUser.Identity.ktpNumber,
            idUser: dataUser.id
          }
        }).then(result => {
          if (result.data.status) {
            message.success('Sukses Update MBTI');
          } else {
            message.error(result.data.message);
          }
          this.setState({ isLoading: false })
        })

      } catch (error) {
        console.log(error)
        message.error("Gagal Update");
      }
    }
  }

  onChangeMBTI = (value) => {
    this.setState({ mbti: value })
  }

  onChangeTimeTransfer = (value, dateString) => {
    this.setState({ tanggal_bayar: dateString })
  }


  onChangeBankName = (e) => {
    this.setState({ bank_transfer: e.target.value })
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('Image must smaller than 1MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange = info => {
    const { form } = this.props

    if (info.file.status === 'uploading') {
      this.setState({ isLoading: true });
      return;
    }
    if (info.file.status === 'error') {
      message.error('Gagal Upload');
      this.setState({ isLoading: false });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        urlTransferPhoto: info.file.response.secure_url,
        isLoading: false,
      })
      // message.success('Sukses Upload');
    }
  };

  renderLolosFim = () => {
    const { dataUser } = this.props;
    const data = [
      {
        title: 'Catatan Seputar FIM 22',
        description: 'File ini digunakan untuk diisi oleh perekomendasi kamu',
        urlFile: 'https://res.cloudinary.com/fim-indonesia/image/upload/v1602314284/document/Catatan_Seputar_Pelatihan_FIM_22.pdf'
      }
    ];

    const { Option } = Select;
    const { RangePicker } = DatePicker;

    let konfirmasiComponent = <div>
      <h3>Konfirmasi kehadiran di sini</h3>
      <Select
        showSearch
        size="large"
        style={{ width: '100%' }}
        placeholder="Pilih status konfirmasi"
        optionFilterProp="children"
        onChange={this.onChangeKehadiran}
      >
        <Option value="1">Saya KONFIRMASI kehadiran Saya di FIM 22</Option>
        <Option value="0">Saya TIDAK BISA mengikuti kegiatan FIM 22</Option>
      </Select>

      {this.state.kehadiran !== null && (
        (
          this.state.isLoading ? (
            <Button loading style={{ marginTop: '20px' }} type="primary" size="large" >Loading</Button>

          ) : (
              <Button onClick={() => this.processKonfirmasi()} style={{ marginTop: '20px' }} type="primary" size="large" >Submit</Button>
            )
        )
      )}
    </div>

    if (this.state.kehadiran !== null && this.state.batchFim !== null) {
      konfirmasiComponent = this.state.kehadiran == 1 ? (
        <>
          <p>Hasil Konfirmasi: </p>
          <h1 style={{ color: '#8bc34a' }}>Saya KONFIRMASI kehadiran Saya di FIM {this.state.batchFim}</h1>

          <p>Sedikit lagi. Kami membutuhkan data personality MBTI kamu. Update di kolom ini ya. Jika kamu belum pernah tes MBTI, kamu bisa menggunakan file ini<a href="https://drive.google.com/file/d/1Qy0_yxlLM3YtOYFbNZ7QUlkVDqSAk2oF/view?usp=sharing" target="_blank">di sini</a>  </p>
          <Select
            showSearch
            size="large"
            style={{ width: '100%' }}
            placeholder="Pilih hasil tes MBTI"
            optionFilterProp="children"
            onChange={this.onChangeMBTI}
            value={this.state.mbti}
          >
            <Option value="ISTJ">ISTJ</Option>
            <Option value="ISFJ">ISFJ</Option>
            <Option value="INFJ">INFJ</Option>
            <Option value="INTJ">INTJ</Option>
            <Option value="ISTP">ISTP</Option>
            <Option value="ISFP">ISFP</Option>
            <Option value="INFP">INFP</Option>
            <Option value="INTP">INTP</Option>
            <Option value="ESTP">ESTP</Option>
            <Option value="ESFP">ESFP</Option>
            <Option value="ENFP">ENFP</Option>
            <Option value="ENTP">ENTP</Option>
            <Option value="ESTJ">ESTJ</Option>
            <Option value="ESFJ">ESFJ</Option>
            <Option value="ENFJ">ENFJ</Option>
            <Option value="ENTJ">ENTJ</Option>
          </Select>

          {this.state.isLoading ? (
            <Button loading style={{ marginTop: '20px' }} type="primary" size="large" >Loading</Button>

          ) : (
              <Button onClick={() => this.updateMbti()} style={{ marginTop: '20px' }} type="primary" size="large" >Submit</Button>
            )
          }
        </>
      ) : (
          <>
            <p>Hasil Konfirmasi: </p>
            <h1 style={{ color: '#e11b26' }}>Saya TIDAK BISA mengikuti kegiatan FIM 22</h1>
          </>
        )
    }

    return <div className="pengumuman-lolos-wrapper">


      <p>
        Dear, <b> {dataUser.Identity.name} </b>
      </p>

      <p>
        Terima kasih atas partisipasi kamu dalam mengikuti proses pendaftaran Pelatihan Nasional FIM Angkatan ke-22.
      </p>

      <p>
        Menyeleksi 1.392 calon peserta membuat tim seleksi benar-benar harus bekerja ekstra untuk menentukan calon pemimpin bangsa yang ingin mengembangkan dirinya melalui Pelatihan Nasional FIM 22.
      </p>
      <br /><br />
      <h1 className="high-emphasis">
        Kami mengucapkan <b style={{ color: "#e11c26" }}>SELAMAT </b>  karena kamu terpilih menjadi peserta Forum Indonesia Muda 22!
      </h1>
      <br /><br />
      <p>
        Selanjutnya, ada beberapa langkah yang perlu kamu lakukan:
      </p>

      <ol>
        <li>
          Silakan untuk segera melakukan konfirmasi keikutsertaan pada rangkaian kegiatan Pelatihan Nasional Forum Indonesia Muda Angkatan ke-22, dengan mengupdate informasi di bawah ini:

          <ul>
            <li> Pelatihan Nasional FIM 22 dilaksanakan pada tanggal 28 Oktober – 1 November 2020 </li>
            <li> Peserta harus mengikuti seluruh rangkaian kegiatan Pelatihan Nasional FIM 22 secara penuh tanpa terkecuali. </li>
            <li> Konfirmasi keikutsertaan ditunggu sampai tanggal 12 Oktober 2020 pukul 23.59 WIB </li>
            <li> Jika telah melewati waktu tersebut, maka kamu dianggap mengundurkan diri dan status kepesertaan akan dicabut </li>
            <li> Peserta terpilih akan dikenakan biaya training kit sebesar Rp280.000, Training kit tersebut terdiri atas kaos, topi, masker, dan e-sertifikat. Training kit akan dikirimkan ke markas masing-masing regional.
            Pembayaran dilakukan paling lambat pada tanggal 18 Oktober 2020 pukul 23.59 WIB
            Status kepesertaan akan dibatalkan bagi peserta yang melewati tanggal maksimal pembayaran
            </li>
          </ul>

          <div className="wrapper-submit-kehadiran">
            {konfirmasiComponent}

          </div>


        </li>

        {this.state.kehadiran !== null && this.state.batchFim !== null ?
          (
            <>
              <li>
                Peserta terpilih harap membayar <b> biaya <i> training kit </i> </b> sebesar <b> Rp280.000,.</b> melalui Rekening <b> Bank Mandiri cabang Pulomas 0060007150786 </b> a.n. <b> Forum Indonesia Muda </b> dengan menyertakan 022 (kode unik). <b> Contoh: Rp.280.022 </b>
                <ul>
                  <li> Pembayaran dilakukan paling lambat pada tanggal <b> 18 Oktober 2020 pukul 23.59 WIB </b></li>
                  <li> <i> Training kit </i> tersebut terdiri atas kaos, topi, masker, dan e-sertifikat. <i> Training kit </i> akan dikirimkan ke markas masing-masing regional. </li>
                  <li> Setelah transfer, isi form konfirmasi pembayaran melalui Form Berikut dan informasikan ke narhubung jika telah mengisi form konfirmasi pembayaran
                    <div className="pembayaran-wrapper">
                      <h2>Form Konfirmasi Pembayaran</h2>

                      <span>Tanggal dan Waktu Transfer</span>
                      {
                        this.state.tanggal_bayar !== null ? <span><br /> <b> {this.state.tanggal_bayar}</b><br /></span> : (
                          <DatePicker style={{ width: '100%' }} size="large" showTime onChange={this.onChangeTimeTransfer} />
                        )
                      }
                      <span>Bank yang digunakan</span>
                      {this.state.bank_transfer !== null ? <span> <br /> <b>{this.state.bank_transfer}</b> <br /></span> : (
                        <Input onChange={this.onChangeBankName} size="large" placeholder="ketik nama Bank" />
                      )}
                      <span>Upload Bukti Transfer</span>
                      <Upload
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://api.cloudinary.com/v1_1/fim-indonesia/image/upload"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        data={(file) => {
                          return {
                            upload_preset: 'profile_photo',
                            file,
                            tags: 'browser_upload'
                          }
                        }}
                      >
                        {(this.state.urlTransferPhoto !== null && !this.state.isLoading) ? <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={this.state.urlTransferPhoto} alt="avatar" /> :
                          <div>
                            <Icon type={this.state.isLoading ? 'loading' : 'plus'} />
                            <div className="ant-upload-text">Upload</div>
                          </div>
                        }
                      </Upload>

                      {dataUser.Identity.urlTransferPhoto == null ? (
                        (this.state.isLoading ? (
                          <Button loading style={{ marginTop: '20px' }} type="primary" size="large" >Loading</Button>

                        ) : (
                            <Button onClick={() => this.processPembayaran()} style={{ marginTop: '20px' }} type="primary" size="large" >Submit</Button>
                          )
                        )
                      ) : null}


                    </div>
                  </li>
                  <li> <b> Status kepesertaan akan dibatalkan </b> bagi peserta yang melewati tanggal maksimal pembayaran </li>
                </ul>
              </li>
              <li>
                Peserta yang membutuhkan surat izin agar dapat menghadiri pelatihan, harap mengikuti alur permohonan pembuatan surat izin di bawah ini:
          <ul>
                  <li>
                    Pengajuan permohonan pembuatan surat izin dilakukan pada tanggal <b> 10-18 Oktober 2020</b> dengan mengisi tautan <a href="http://bit.ly/permohonan-izinpeserta" target="_blank">bit.ly/permohonan-izinpeserta</a>
                  </li>
                  <li> Surat akan dikirim ke email peserta </li>
                </ul>
              </li>
              <li>
                Demi kelancaran pelaksanaan Pelatihan Nasional FIM 22, peserta terpilih harap mengunduh, memahami, dan mematuhi catatan seputar pelatihan berikut.
          <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="file-word" />}
                        title={<a href={item.urlFile} target="_blank">{item.title}</a>}
                      // description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </li>
            </>
          ) : null}
      </ol>

      {/* {this.state.kehadiran !== null && this.state.batchFim !== null ? ( */}
      {/* <> */}
      <p>
        Kami yakin kamu dapat memanfaatkan kesempatan ini dengan sebaik-baiknya. Kami ingatkan kembali bahwa kesediaan untuk mengikuti pelatihan artinya kamu telah berkomitmen untuk hadir di Pelatihan Nasional Forum Indonesia Muda 22 dan mengikuti seluruh rangkaian kegiatan secara penuh tanpa terkecuali (dispensasi bagi kejadian darurat tiba-tiba, seperti bencana alam, kedukaan, dsb.) Konsekuensi dari pelanggaran komitmen tersebut adalah blacklist bagi peserta untuk pelatihan FIM selanjutnya, serta biaya training kit yang telah dibayarkan tidak dapat dikembalikan.
      </p>

      <p>
        Demikian informasi kali ini. Kami sungguh berharap dapat bertemu dan berbagi dengan para pemuda pilihan di bulan Oktober ini.
      </p>

      {/* </> */}
      {/* ) : null} */}

      <p>Salam pemuda Indonesia!</p>
      <p><br />Panitia FIM 22</p>



    </div >

  }

  renderOpenAnnounce = () => {
    const { dataUser } = this.props

    // const dataFiltered = DataLolosFix.filter((data) => {
    //   if (data['No. KTP'] !== '0') {
    //     return data['No. KTP'] === dataUser.Identity.ktpNumber
    //   } else {
    //     return data['E-mail'] === dataUser.Identity.email
    //   }
    // })

    const isLolos = dataUser.Identity.status_accept == 2;

    return isLolos ?
    this.renderLolosFim()
    : 
    <h1 style={{width:'100%', textAlign:'center'}}>Sedang menyiapkan pengumuman, silahkan kembali lagi beberapa saat lagi ya :)</h1>
      //  this.renderTidakLolos() 
  }

  render() {
    const { dataUser } = this.props

    // const dataFiltered = DataLolosFix.filter((data) => {
    //   if (data['No. KTP'] !== '0') {
    //     return data['No. KTP'] === dataUser.Identity.ktpNumber
    //   } else {
    //     return data['E-mail'] === dataUser.Identity.email
    //   }
    // })

    return (<Fragment>
      {this.isLaunch ? this.renderOpenAnnounce() : <h1>Sedang menyiapkan kejutan, silahkan kembali lagi pukul 20.00 WIB ya :)</h1>}
    </Fragment>)

  }
}

export default Pengumuman;