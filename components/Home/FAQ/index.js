import React from 'react';
import { Collapse } from 'antd';
import { styWrapper, styDownloadWrapper } from '../DownloadDoc/style';
const { Panel } = Collapse;

const faq23 = () => {
  return (
    <div css={styWrapper}>
      <h2>FAQ FIM 23</h2>
      <div css={styDownloadWrapper}>
        <Collapse bordered={false}>
          <Panel
            header='Apakah pelatihan Forum Indonesia Muda berbayar?'
            key='1'
          >
            Biaya kegiatan selama pelatihan akan ditanggung oleh panitia.
            Peserta harus menanggung{' '}
            <b>
              biaya paket data dan device yang dibutuhkan untuk menunjang
              seluruh kegiatan pelatihan FIM{' '}
            </b>
            . Selain itu, peserta yang lolos seleksi akan{' '}
            <b>
              {' '}
              dikenai biaya penggantian training kit yang akan dikirimkan ke
              alamat masing-masing
            </b>
            , juga sebagai jaminan komitmen untuk hadir secara online di
            pelatihan​ sehingga tidak melalaikan amanah setelah terpilih dari
            ribuan calon peserta.
          </Panel>

          <Panel
            header='Bagaimana jika peserta mengalami kendala teknis seperti koneksi internet?'
            key='2'
          >
            Untuk menjaga kelancaran dan efektivitas pelatihan, peserta
            diharapkan dapat menyiapkan paket data yang memadai dan berada di
            tempat yang memiliki jaringan baik selama mengikuti pelatihan.
          </Panel>

          <Panel
            header='Bagaimana jika peserta mengalami kendala dalam hal biaya penunjang pelatihan FIM?'
            key='3'
          >
            Pengalaman dari para peserta sebelumnya, peserta dapat mengajukan
            proposal ke pihak terkait yang dapat menjadi donatur. Panitia akan
            membantu dengan mengirimkan surat keterangan mengikuti acara dan
            proposal kegiatan. Permohonan surat keterangan tersebut bisa
            diajukan kepada panitia paling lambat 1 (satu) pekan setelah
            pengumuman daftar nama peserta fix dari panitia.
          </Panel>

          <Panel
            header='Bagaimana bila jadwal acara bersamaan dengan jadwal kuliah dan ujian, tetapi calon peserta ingin sekali mengikuti acara ini?'
            key='4'
          >
            Pengalaman dari para peserta sebelumnya, peserta dapat mengajukan
            proposal ke pihak terkait yang dapat menjadi donatur. Panitia akan
            membantu dengan mengirimkan surat keterangan mengikuti acara dan
            proposal kegiatan. Permohonan surat keterangan tersebut bisa
            diajukan kepada panitia paling lambat 1 (satu) pekan setelah
            pengumuman daftar nama peserta fix dari panitia.
          </Panel>

          <Panel header='Surat rekomendasi itu seperti apa?' key='5'>
            Surat rekomendasi adalah salah satu berkas pendaftaran yang berisi
            rekomendasi untuk mengikuti pelatihan FIM 23.
            <b> Surat rekomendasi dapat diberikan oleh siapapun</b>, namun
            direkomendasikan kepada orang yang kenal baik dengan calon peserta.
            Setiap calon peserta hanya diperkenankan untuk melampirkan ​​satu
            rekomendasi saja. Format surat rekomendasi telah dibuat oleh panitia
            dan calon peserta dapat mengunduhnya saat mengisi isian pendaftaran.
          </Panel>

          <Panel
            header='Bagaimana memasukkan surat rekomendasi bertanda tangan?'
            key='6'
          >
            Sebelumnya, surat rekomendasi bertanda tangan dapat di-scan atau
            difoto terlebih dahulu, atau pada softcopy dapat dimasukkan gambar
            tanda tangan (asli ditandatangani oleh pemberi rekomendasi) dalam
            format gambar atau dokumen. Setelah itu, file softcopy diunggah ke
            dalam formulir pendaftaran. Mekanisme yang sama untuk surat
            pernyataan komitmen bertanda tangan.
          </Panel>

          <Panel
            header='Apakah surat rekomendasi boleh lebih dari satu?'
            key='7'
          >
            <b>Tidak</b>. Cukup lampirkan satu surat rekomendasi terbaik, sesuai
            dengan format yang telah disediakan di portal pendaftaran.
          </Panel>

          <Panel
            header='Siapakah yang dimaksud dengan pemberi referensi?'
            key='8'
          >
            Pemberi Referensi adalah alumni FIM yang dapat memberikan informasi
            tentang pribadi calon peserta kepada panitia seleksi FIM 23.
          </Panel>

          <Panel
            header='Apakah calon peserta boleh mencantumkan referensi/rekomendasi yang sama dengan calon peserta lain?'
            key='9'
          >
            Boleh. Selama pemberi referensi/rekomendasi dapat
            mempertanggungjawabkan referensi yang diberikan.
          </Panel>

          <Panel
            header='Saya sudah login, namun tertulis KTP / alamat email sudah pernah digunakan, padahal saya belum mendaftar di FIM 23. Apa yang harus saya lakukan?'
            key='10'
          >
            Sistem pendaftaran FIM 23 menggunakan single ID identification, jika
            tidak bisa login karena KTP/alamat email yang sudah terdaftar, maka
            ada kemungkinan berikut:
            <ul>
              <li>
                Apabila KTP/alamat email sudah digunakan maka akan muncul
                pemberitahuan dalam web nama pengguna nomor KTP sekaligus
                emailnya. Calon peserta bisa menggunakan email yang tertulis
                dalam notifikasi untuk Log-In; atau
              </li>
              <li>Alumni FIM 20.</li>
              <li>
                Jika kedua hal di atas sudah dilakukan namun tetap belum bisa
                log in maka hubungi CP Pendaftaran untuk segera kami tindak
                lanjuti.
              </li>
            </ul>
          </Panel>

          <Panel
            header='Jalur apa saja di FIM 23 dan apa deskripsinya?'
            key='11'
          >
            Pada Pelatihan Nasional FIM 23 hanya terdapat 1 jalur yaitu Alumni
            FIM 20 / Umum.
            <ul>
              <li>
                Alumni FIM 20 adalah calon peserta FIM yang telah mengikuti
                Rangkaian Pelatihan FIM Wilayah angkatan 20 pada 2018 lalu untuk
                meningkatkan kapasitas dan memperluas jejaring dalam skala
                nasional;
              </li>
              <li>Alumni FIM 20.</li>
              <li>
                Umum adalah calon peserta FIM yang merupakan pemuda, mahasiswa,
                dan professional dengan berbagai latar belakang (Non Alumni
                FIM).
              </li>
            </ul>
          </Panel>

          <Panel header='Bagaimana alur pendaftarannya?' key='12'>
            <ol>
              <li>
                Login dengan google account (gmail) di
                portal.forumindonesiamuda.org.
              </li>
              <li>
                Unduh format dokumen yang dibutuhkan sesuai jalurnya untuk
                diisi, di-scan, lalu diunggah di bagian akhir formulir
                pendaftaran.
              </li>
              <li>
                <b>
                  Dokumen Surat Pernyataan Komitmen Diri dan Surat Rekomendasi
                  adalah Dokumen Wajib diisi.
                </b>
              </li>
              <li>Isi data diri</li>
              <li>
                Pastikan kamu mengisi seluruh data pada formulir pendaftaran
                dengan benar;
              </li>
              <li>Klik submit setelah semua data lengkap; dan</li>
              <li>
                Ingat setelah submit, semua data akan tersimpan oleh sistem dan
                tidak bisa diubah lagi.
              </li>
            </ol>
          </Panel>
        </Collapse>
      </div>

      <h2 style={{ marginTop: '40px' }}>FAQ SEPUTAR FIM</h2>
      <div css={styDownloadWrapper}>
        <Collapse bordered={false}>
          <Panel
            header='Apakah FIM memiliki afilisasi dengan ormas / partai politik?'
            key='1'
          >
            FIM adalah forum independen yang beranggotakan pemuda-pemudi
            Indonesia dari berbagai latar belakang minat dan aktivitas,
            universitas maupun lembaga kepemudaan, baik di Indonesia maupun di
            luar negeri. FIM merupakan organisasi kepemudaan yang tidak
            berafiliasi dengan ormas atau partai politik manapun.
          </Panel>
          <Panel header='Apa itu pelatihan nasional?' key='2'>
            Pelatihan nasional adalah aktivitas yang bertujuan untuk
            meningkatkan kapasitas peserta FIM 23 mulai dari softskill,
            internalisasi nilai-nilai FIM, serta memperluas dan menguatkan
            jaringan pemuda Indonesia.
          </Panel>
          <Panel header='Seperti apa model pelatihan nasional?' key='3'>
            Pada Pelatihan FIM 23 ini, pelatihan nasional berupa online training
            (pelatihan intensif) selama 4 hari di akhir pekan dan akan diikuti
            oleh peserta dari seluruh wilayah di Indonesia.
          </Panel>
          <Panel header='Apa itu FIM regional?' key='4'>
            Setelah 6 tahun bergerak, FIM mulai membangun model gerakan yang
            berbasis regional tingkat Kabupaten/Kota agar visi pemberdayaan
            dimulai tidak hanya dari Jakarta. Sejak 2017, para penggerak
            regional disebut Kader Next-Gen. Program regional berbasis pada
            pemberdayaan masyarakat di daerah masing-masing.Calon peserta bisa
            mencari tahu lebih detail tentang regional melalui sosial media FIM
            regional
          </Panel>
          <Panel header='Kader Next-Gen itu siapa dan apa tugasnya?' key='5'>
            Di pelatihan FIM 23 ini, peserta yang telah mengikuti seluruh
            rangkaian FIM 23 akan menjadi Kader Next-Gen untuk regional /
            domisilinya nya dan bertugas membangun kegiatan di regional/
            domisilinya serta berkomitmen untuk meningkatkan potensi regional /
            domisilinya melalui pelatihan nasional.
          </Panel>

          <Panel header='Bagaimana cara menentukan pilihan regional?' key='6'>
            Silahkan memilih regional sesuai domisili saat ini atau rencana
            domisili satu tahun kedepan. Jika tidak ada kota domisili saat ini
            silahkan pilih regional terdekat dari domisili saat ini.
          </Panel>
        </Collapse>
        ,
      </div>
    </div>
  );
};

export default faq23;
