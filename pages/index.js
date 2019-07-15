import { Result, Icon, Button } from 'antd';
import { Fragment } from 'react';
import { withRouter } from 'next/router';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Router from 'next/router';
import '../static/css/carousel.css';

function Index(props) {
  const { cookieLogin } = props

  useEffect(() => {
    props.router.prefetch('/login')
    props.router.prefetch('/fim21')
  }, [])

  let decode = {}

  try {
    decode = jwtDecode(cookieLogin)
  } catch (error) {
    console.log("err: ", error)
  }

  let extraButton = [
    <Button key={1} onClick={() => { Router.push('/fim21') }} type="primary">Daftar FIM 21</Button>
  ]

  return (
    <div>
      <Result
        icon={<Icon type="smile" theme="twoTone" />}
        title="Halo Pemuda Indonesia!"
        subTitle={`Hi ${decode.email || ''} Mari Bergabung ke Keluarga Besar Forum Indonesia Muda`}
        extra={extraButton}
      />
    </div>
  )
}

export default withRouter(Index);