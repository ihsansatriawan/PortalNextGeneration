
import { Fragment } from 'react';
import { Collapse, Divider, Steps, Popover, BackTop } from 'antd';

const { Step } = Steps;
const { Panel } = Collapse;

const dataFaqFIM = [
  {
    header: 'Apakah FIM memiliki afiliasi dengan ormas/partai politik?',
    body: 'FIM adalah forum independen yang beranggotakan pemuda-pemudi Indonesia dari berbagai latar belakang minat dan aktivitas, universitas maupun lembaga kepemudaan, baik di Indonesia maupun di luar negeri. FIM merupakan organisasi kepemudaan yang tidak berafiliasi dengan ormas atau partai politik manapun.'
  },
  {
    header: 'Apa itu pelatihan nasional?',
    body: 'Pelatihan nasional adalah aktivitas yang bertujuan untuk meningkatkan kapasitas peserta FIM 22 mulai dari softskill, internalisasi nilai-nilai FIM, serta memperluas dan menguatkan jaringan pemuda Indonesia.'
  },
  {
    header: 'Seperti apa model pelatihan nasional?',
    body: 'Pada Pelatihan FIM 22 ini, pelatihan nasional berupa online training (pelatihan intensif) selama 5 hari yang dilaksanakan setiap akhir pekan, dan akan diikuti oleh peserta dari seluruh wilayah di Indonesia.'
  },
  {
    header: 'Apa itu FIM regional?',
    body: 'Setelah 6 tahun bergerak, FIM mulai membangun model gerakan yang berbasis <b>regional tingkat Kabupaten/Kota</b> agar visi pemberdayaan dimulai tidak hanya dari Jakarta. Sejak 2017, para penggerak regional disebut Kader Next-Gen. Program regional berbasis pada pemberdayaan masyarakat di daerah masing-masing.Calon peserta bisa mencari tahu lebih detail tentang regional melalui sosial media FIM regional '
  },
  {
    header: 'Kader Next-Gen itu siapa dan apa tugasnya?',
    body: 'Di pelatihan FIM 22 ini, peserta dari seluruh jalur (Alumni FIM 20, Volunteer FIM, & Sahabat FIM) yang telah mengikuti seluruh rangkaian FIM 22  akan menjadi Kader Next-Gen untuk regionalnya dan bertugas membangun kegiatan di regionalnya serta berkomitmen untuk meningkatkan potensi regional melalui pelatihan nasional.'
  },  
  {
    header: 'Bagaimana cara menentukan pilihan regional?',
    body: 'Silahkan memilih regional sesuai domisili saat ini atau rencana domisili satu tahun kedepan. Jika tidak ada kota domisili saat ini silahkan pilih regional terdekat dari domisili saat ini.'
  },  
  {
    header: 'Apakah calon peserta yang berasal dari alumni FIM 20 dapat memilih jalur Volunteer FIM atau Sahabat FIM?',
    body: '<b>Tidak</b>, alumni FIM 20 hanya dapat mendaftar di jalur alumni FIM 20 sesuai deskripsi jalur pendaftaran di atas.'
  },
  {
    header: 'Jalur apa saja di FIM 22 dan apa deskripsinya?',
    body: `<ul>
      <li><i>Alumni FIM 20</i> adalah calon peserta FIM yang telah mengikuti Rangkaian Pelatihan FIM Wilayah angkatan 20 pada 2018 lalu untuk meningkatkan kapasitas dan memperluas jejaring dalam skala nasional</li>
      <li><i>Volunteer FIM</i> adalah calon peserta FIM yang menjadi anggota relawan FIM Regional dan ditetapkan dalam SK Keanggotaan dari FIM Regional.</li>
      <li><i>Sahabat FIM</i> adalah calon peserta FIM yang merupakan pemuda, mahasiswa, dan
      profesional dengan berbagai latar belakang (Non Alumni FIM) dan pernah memiliki
      pengalaman mengikuti kegiatan FIM baik di FIM Pusat, FIM Regional, maupun kegiatan
      FIM Club (misal: pernah mengikuti Public Seminar, Webinar FIM, kerjasama komunitas, atau kegiatan lain yang diselenggarakan oleh FIM)</li>
    </ul>`
  },
  {
    header: 'Bagaimana alur pendaftarannya ?',
    body: `<ol>
      <li>Login dengan google account (gmail) di portal.forumindonesiamuda.org</li>
      <li>Unduh format dokumen yang dibutuhkan sesuai jalurnya untuk diisi, di-scan, lalu diunggah di bagian akhir formulir pendaftaran.</li>
      <li>Dokumen yang dibutuhkan berdasarkan jalurnya adalah sebagai berikut:
        <ul>
          <li>Jalur Volunteer FIM : Surat Pernyataan Komitmen dan SK Volunteer</li>
          <li>Alumni FIM 20 & Sahabat FIM : Surat Pernyataan Komitmen & Surat Rekomendasi</li>
        </ul>
      </li>
      <li>Pilih jalur yang sesuai dengan profil kamu.</li>
      <li>Isi data diri.</li>
      <li>Pastikan kamu mengisi seluruh data pada formulir pendaftaran dengan benar.</li>
      <li>Klik submit setelah semua data lengkap.</li>
      <li>Ingat setelah submit, semua data akan tersimpan oleh sistem dan tidak bisa diubah lagi.</li>
    </ol>`
  },
]

const dataFaqFIM21 = [
  {
    header: 'Apakah pelatihan Forum Indonesia Muda berbayar?',
    body: '​Biaya kegiatan selama pelatihan akan ditanggung oleh panitia. Peserta harus menanggung <b> biaya paket data dan device yang dibutuhkan untuk menunjang seluruh kegiatan pelatihan FIM </b>. Selain itu, peserta yang lolos seleksi akan dikenai <b> biaya penggantian training kit yang akan dikirimkan ke alamat masing-masing </b>, juga sebagai jaminan komitmen untuk hadir secara online di pelatihan​ sehingga tidak melalaikan amanah setelah terpilih dari ribuan calon peserta.'
  },
  {
    header: 'Bagaimana jika peserta mengalami kendala teknis seperti koneksi internet?',
    body: 'Untuk menjaga kelancaran dan efektivitas pelatihan, peserta diharapkan dapat menyiapkan paket data yang memadai dan berada di tempat yang memiliki jaringan baik selama mengikuti pelatihan.'
  },
  {
    header: 'Bagaimana jika peserta mengalami kendala dalam hal biaya penunjang pelatihan FIM?',
    body: 'Pengalaman dari para peserta sebelumnya, peserta dapat mengajukan proposal ke pihak terkait yang dapat menjadi donatur. Panitia akan membantu dengan mengirimkan surat keterangan mengikuti acara dan proposal kegiatan. Permohonan surat keterangan tersebut bisa diajukan kepada panitia paling lambat 1 (satu) pekan setelah pengumuman daftar nama peserta fiks dari panitia.'
  },
  {
    header: 'Bagaimana bila jadwal acara bersamaan dengan jadwal kuliah dan ujian, tetapi calon peserta ingin sekali mengikuti acara ini?',
    body: 'Panitia akan membantu dengan mengirimkan surat keterangan lolos seleksi yang ditujukan kepada dekan atau dosen yang bersangkutan. Materi pelatihan FIM disusun sedemikian rupa dan saling berkaitan. Peserta wajib mengikuti keseluruhan rangkaian acara dengan mengaktifkan video. Tidak ada toleransi izin untuk keluar masuk room pelatihan.'
  },
  {
    header: 'Surat rekomendasi itu seperti apa?',
    body: 'Surat rekomendasi adalah salah satu berkas pendaftaran yang berisi rekomendasi untuk mengikuti pelatihan FIM 22. Surat rekomendasi ini hanya boleh diberikan oleh alumni FIM. Rekomendasi diminta kepada orang yang kenal baik dengan calon peserta. Setiap calon peserta hanya diperkenankan untuk melampirkan ​​satu rekomendasi saja. Format surat rekomendasi telah dibuat oleh panitia dan calon peserta dapat mengunduhnya saat mengisi isian pendaftaran.'
  },
  {
    header: 'Bagaimana memasukkan surat rekomendasi bertanda tangan?',
    body: 'Sebelumnya, surat rekomendasi bertanda tangan dapat di-scan atau difoto terlebih dahulu, atau pada softcopy dapat dimasukkan gambar tanda tangan (asli ditandatangani oleh pemberi rekomendasi) dalam format gambar atau dokumen. Setelah itu, file softcopy diunggah ke dalam formulir pendaftaran. Mekanisme yang sama untuk surat pernyataan komitmen bertanda tangan.'
  },
  {
    header: 'Apakah surat rekomendasi boleh lebih dari satu?',
    body: 'Tidak. Cukup lampirkan satu surat rekomendasi terbaik, sesuai dengan format yang telah disediakan di portal pendaftaran.'
  },
  {
    header: 'Apakah surat rekomendasi boleh lebih dari satu?',
    body: 'Tidak. Cukup lampirkan satu surat rekomendasi terbaik, sesuai dengan format yang telah disediakan di portal pendaftaran.'
  },
  {
    header: 'Siapakah yang dimaksud dengan pemberi Referensi?',
    body: 'Pemberi Referensi adalah alumni FIM yang dapat memberikan informasi tentang pribadi calon peserta kepada panitia seleksi FIM 22.'
  },
  {
    header: 'Apakah calon peserta boleh mencantumkan referensi/rekomendasi yang sama dengan calon peserta yang lain?',
    body: 'Boleh. Selama pemberi referensi/rekomendasi dapat mempertanggungjawabkan referensi yang diberikan.'
  },
  {
    header: 'Saya terdaftar sebagai Volunteer di Regional A, namun saat ini berdomisili di Regional B, regional mana yang saya pilih saat mendaftar?',
    body: 'Regional dipilih berdasarkan domisili saat ini atau rencana domisili satu tahun kedepan. Dalam hal kasus di atas, kamu dapat mendaftar melalui Regional B. Namun, jangan lupa untuk mencari tahu informasi mengenai Regional yang kamu tuju melalui sosial media Regional FIM & berkenalan dengan pengurus regionalnya.'
  },
  {
    header: 'Saya sudah login, namun tertulis KTP/alamat email sudah pernah digunakan, padahal saya belum mendaftar di FIM 22. Apa yang harus saya lakukan?',
    body: `Sistem pendaftaran FIM 22 menggunakan single ID identification, jika tidak bisa login karena KTP/alamat email yang sudah terdaftar, maka ada kemungkinan berikut:
    <ul>
      <li>Apabila KTP/alamat email sudah digunakan maka akan muncul pemberitahuan dalam web nama pengguna nomor KTP sekaligus emailnya. Calon peserta bisa menggunakan email yang tertulis dalam notifikasi untuk Log-In</li>
      <li>Alumni FIM 20, sehingga akan otomatis masuk ke jalur Alumni FIM 20.</li>
      <li>Jika kedua hal di atas sudah dilakukan namun tetap belum bisa log in maka hubungi CP Pendaftaran untuk segera kami tindak lanjuti.</li>
    </ul>
    `
  },

]

function FaqFIM() {
  return (<Fragment>
    <Divider orientation="left">FAQ Seputar FIM</Divider>
    <Collapse accordion>
      {
        dataFaqFIM.map((data, index) => {
          return <Panel header={data.header} key={index}>
            <p dangerouslySetInnerHTML={{ __html: data.body }} />
          </Panel>
        })
      }
    </Collapse>
  </Fragment>)
}

function FaqFIM21() {
  return (<Fragment>
    <Divider orientation="left">FAQ Seputar Pelatihan Fim 22</Divider>
    <Collapse accordion>
      {
        dataFaqFIM21.map((data, index) => {
          return <Panel header={data.header} key={index}>
            <p dangerouslySetInnerHTML={{ __html: data.body }} />
          </Panel>
        })
      }
    </Collapse>
  </Fragment>)
}

function StepRegis() {
  return (<Fragment>
    <Divider>Tahapan Pendaftaran</Divider>
    <Steps current={0}>
      <Step title="Pendaftaran Jalur Alumni FIM 20 &amp; Volunteer FIM" description="17 Agustus – 31 Agustus 2020" />
      <Step title="Pendaftaran Jalur Sahabat FIM" description="17 Agustus – 10 September 2020" />
      <Step title="Pengumuman lolos tahap 1" description="21 September 2020" />
      <Step title="Seleksi tahap 2 (wawancara)" description="22 – 30 September 2020" />
      <Step title="Pengumuman lolos tahap 2" description="3 Oktober 2020" />      
    </Steps>
  </Fragment>)
}

function Faq() {
  return (<Fragment>
    {StepRegis()}
    {FaqFIM()}
    {FaqFIM21()}
    <BackTop />
  </Fragment>)
}

export default Faq;