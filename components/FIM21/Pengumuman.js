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

    return (<div>
      <p>Halo, {dataUser.Identity.name}.</p>
      <p>Terima kasih atas partisipasi kamu dalam mengikuti proses pendaftaran Pelatihan FIM 21.</p>
      <p>Menyeleksi dari 3733 calon peserta membuat tim seleksi benar-benar harus bekerja ekstra untuk menentukan calon pemimpin bangsa yang ingin mengembangkan dirinya melalui pelatihan FIM 21 ini. Kami ucapkan <strong>SELAMAT</strong> karena <strong>kamu telah terpilih menjadi peserta Forum Indonesia Muda 21</strong>!</p>
      <p>Selanjutnya, ada beberapa langkah yang perlu kamu lakukan:</p>
      <ol>
      <li>Silakan untuk segera melakukan konfirmasi keikutsertaan pada rangkaian kegiatan FIM 21 pada tanggal 23-27 Oktober 2019 bertempat di Taman Wiladatika Cibubur, Jakarta Timur. Peserta diharapkan tiba di lokasi sebelum pukul 08.00 WIB di tanggal 23 Oktober 2019.<br />Bagi peserta yang karena satu dan lain hal khawatir tidak bisa datang tepat waktu dan bagi peserta yang datang dari luar kota, panitia menyiapkan penginapan di Wiladatika pada tanggal 22 Oktober 2019 dengan biaya tambahan.<br />Konfirmasi dilakukan dengan mengirimkan pesan via whatsapp/sms ke narahubung Pelatihan FIM 21 <strong>Rifa (0852-1655-9005)</strong> dengan format: Nama_No KTP_Bersedia/Tidak Bersedia mengikuti seluruh rangkaian kegiatan Pelatihan FIM 21 (23-27 Oktober 2019) secara penuh tanpa terkecuali.<br />Konfirmasi ditunggu sampai tanggal <strong>23 September 2019 pukul 21.00 WIB</strong>. Jika telah melewati waktu tersebut maka kamu dianggap mengundurkan diri dan status kesertaan akan dicabut.</li>
      <li>Peserta terpilih harap membayar uang pengganti training kit sebesar <strong>Rp450.000</strong> ke nomor rekening a.n. <strong>Forum Indonesia Muda di 0060007150786, Bank Mandiri cabang Pulomas, Jakarta</strong>. Pembayaran dilakukan paling lambat tanggal <strong>30 September pukul 23.59 WIB</strong>.<br />Adapun training kit pelatihan terdiri dari: Name tag, sertifikat, topi, buku FIM, pin, dan t-shirt.<br />Selanjutnya, silakan melakukan konfirmasi pembayaran kepada narahubung Rifa ke 0852-1655-9005, bukti pembayaran harap dibawa pada saat pelatihan. Diimbau agar bukti pembayaran segera di fotokopi untuk menghindari lunturnya tulisan di bukti pembayaran.</li>
      <li>Bagi peserta yang membutuhkan surat izin atau proposal untuk menghadiri pelatihan, harap mengikuti alur permohonan surat izin di bawah ini:<br />-Permohonan surat izin dilakukan pada tanggal <strong>18-30 September 2019</strong>.<br />-Surat akan dikirim ke e-mail peserta.<br />-Permohonan pembuatan surat dilakukan dengan mengisi tautan <strong>bit.ly/suratizinpesertafim21</strong></li>
      <li>Peserta harap melakukan konfirmasi waktu kedatangan di lokasi pelatihan. Konfirmasi dilakukan via sms/whatsapp kepada narahubung Rifa (0852-1655-9005). Konfirmasi kedatangan ditunggu sampai tanggal <strong>30 September 2019</strong>.</li>
      </ol>
      <p><br /><br /></p>
      <p>Kami yakin kamu dapat memanfaatkan kesempatan ini dengan sebaik-baiknya. Kami ingatkan kembali bahwa kesediaan untuk mengikuti pelatihan berarti bahwa kamu telah berkomitmen untuk hadir di Pelatihan Forum Indonesia Muda 21 dan mengikuti seluruh rangkaian kegiatan secara penuh tanpa terkecuali (dispensasi bagi kejadian darurat tiba-tiba seperti bencana alam, kedukaan, dsb). Konsekuensi dari pelanggaran komitmen tersebut adalah blacklist bagi peserta untuk pelatihan FIM selanjutnya, serta pengganti training kit yang telah dibayarkan tidak dapat dikembalikan.</p>
      <p>Demikian informasi kali ini. Kami sungguh berharap dapat bertemu dan berbagi dengan para pemuda pilihan di bulan Oktober nanti.</p>
      <p><br /><br /></p>
      <p>Salam pemuda Indonesia!</p>
      <p><br />Panitia FIM 21</p>
      <p><br /><br /></p>
      <p>NB: Jika kamu ingin update status kabar baik ini di sosial media, jangan lupa mention @fimnews di twitter dan IG, juga Forum Indonesia Muda di Fanspage FB ya :)</p>

    </div>)
  }

  render() {
    const { dataUser } = this.props

    const dataFiltered = DataLolosFix.filter((data) => {
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