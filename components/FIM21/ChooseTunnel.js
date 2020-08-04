import React, { Fragment, useState, useEffect } from 'react';
import {
  BackTop,
  Divider,
  Skeleton,
  Empty,
  message,
  List,
  Card,
  Select,
  Button
} from 'antd';
import { fetch } from '@helper/fetch';
import { sendPageview } from '@tracker';
import "./ChooseTunnel.css";

const { Option } = Select;


function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

function Content({ loading, tunnels, setTunnel, tunnel }) {

  const fallbackImage = "https://res.cloudinary.com/fim-indonesia/image/upload/v1563240716/fallback-jalur.jpg"

  if (loading) {
    return <Skeleton active />
  } else if (!tunnels || tunnels.length === 0) {
    return <Empty />
  } else {
    return <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={tunnels}
      renderItem={(item) => {
        const styleObj = {
          ...item.id === tunnel.id && {
            border: '2px solid red',
            borderRadius: '11px',
            padding: '11px'
          }
        }

        return <List.Item>
          <Card style={styleObj} cover={<img alt="example" src={item.urlPicture || fallbackImage} />} hoverable onClick={() => {
            message.info(`Kamu memilih jalur ${item.name}`)
            setTunnel(item)
            window.scrollTo(0, 0)
          }} title={item.name}>{item.description || 'Wait Input'}
          </Card>
        </List.Item>
      }}
    />
  }
}

function ChooseTunnel({ refetchStep, cookieLogin, dataUser }) {
  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [tunnels, setTunnels] = useState([])
  const [tunnel, setTunnel] = useState({})
  const [regionals, setRegionals] = useState([])
  const [subRegionals, setSubRegionals] = useState([])
  const [regional, setRegional] = useState(null)

  useEffect(() => {
    sendPageview({ pathName: '/chooseTunnel' })
  }, [])

  useEffect(() => {
    fetchTunnel();
    fetchRegional();
  }, [dataUser])

  const fetchTunnel = async () => {
    setLoading(true)
    try {
      const response = await fetch({
        url: '/tunnel/list',
        method: 'get',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`
        },
      })

      const status = (response.data.status || false)

      if (!status) {
        message.error("Server Error")
        setTunnels(null)
        setLoading(false)
      } else {
        const responseData = response.data.data || []
        setTunnels(responseData)
        setLoading(false)

        if (dataUser.TunnelId) {
          const findData = responseData.find(item => item.id === dataUser.TunnelId)
          findData && setTunnel(findData)
        }

      }

    } catch (error) {
      message.error("Server Error")
      setTunnels(null)
      setLoading(false)
    }
  }

  const fetchRegional = async () => {
    setLoading(true)
    try {
      const response = await fetch({
        url: '/regional/list',
        method: 'get',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`
        },
      })

      const status = (response.data.status || false)

      if (!status) {
        message.error("Server Error")
        setRegionals(null)
        setLoading(false)
      } else {
        const responseData = response.data.data || []
        setRegionals(responseData)
        setLoading(false)

        if (dataUser.RegionalId) {

          const listAllRegional = []
          responseData.map((value) => {
            value.data.map((subdata) => {
              listAllRegional.push(subdata)
            })
          })

          const findRegional = listAllRegional.find((item)=> item.id === dataUser.RegionalId)
          findRegional && setRegional({
            province:findRegional.province,
            RegionalId:findRegional.id
          })

          //set sub regional
          const findSubRegional = findRegional && listAllRegional.filter((it)=> it.province === findRegional.province);
          findSubRegional && setSubRegionals(findSubRegional)        
        }


      }

    } catch (error) {
      message.error("Server Error")
      setRegionals(null)
      setLoading(false)
    }
  }

  const submitEvent = async () => {
    if (isEmptyObject(tunnel)) {
      message.error("Pilih Jalur dahulu!")
    }
    else if (regional == null) {
      message.error("Pilih Regional terlebih dahulu")
    }
    else {
      setLoadingButton(true)

      try {
        const response = await fetch({
          url: '/auth/save-tunnel',
          method: 'post',
          headers: {
            'Authorization': `Bearer ${cookieLogin}`
          },
          data: {
            TunnelId: tunnel.id,
            RegionalId: regional.RegionalId
          }
        })

        const status = (response.data.status || false)

        if (!status) {
          message.error("Server Error")
          setLoadingButton(false)
        } else {
          message.success("Sukses")
          refetchStep();
          setLoadingButton(false)
        }
      } catch (error) {
        setLoadingButton(false)
      }

      // setTimeout(() => {
      //   setLoadingButton(false)
      // }, 3000)
    }
  }

  const buttonSubmitProps = () => {
    return {
      loading: loadingButton,
      onClick: submitEvent,
      type: 'primary',
      size: 'large'
    }
  }

  const handleChangeRegional = (value) => {
    const nameReg = regionals.filter((region) => {
      return region.province == value
    })

    const listRegional = nameReg[0].data;
    setSubRegionals(listRegional)

    setRegional({
      province: value
    })

  }

  const handleChangeSubRegional = (selectvalue) => {
    setRegional({
      ...regional,
      RegionalId:selectvalue
    })
  }

  return (<Fragment>

    {!isEmptyObject(tunnel) && (
      <div className="you-choose">
        <Divider />
        Pilihan mu:
        <h1>{tunnel.name}</h1>

        <div className="choose-regional-wrapper">
          <span style={{ marginBottom: '10px' }}>Rencana kamu setelah mengikuti Pelatihan FIM 22</span>
          <Select size="large" value={regional && regional.province} placeholder="Pilih Provinsi" onChange={(e) => handleChangeRegional(e)} style={{ width: '100%', textAlign: 'center' }}>
            {regionals.map((value) => {
              return <Option value={value.province}>{value.province}</Option>
            })}
          </Select>

          {subRegionals.length > 0 && (
            <Select size="large" value={regional && regional.RegionalId} placeholder="Pilih Regional" onChange={(e) => handleChangeSubRegional(e)} style={{ width: '100%', textAlign: 'center' }}>
              {subRegionals.map((value) => {
                return <Option value={value.id}>{value.name} ({value.city})</Option>
              })}
            </Select>
          )}
        </div>


      </div>
    )}
    <Divider>Tentukan Pilihan mu</Divider>
    <div className="tunnel-wrapper">
      <Content tunnel={tunnel} setTunnel={setTunnel} loading={loading} tunnels={tunnels} />
    </div>
    <div className="you-choose" style={{ marginTop: '40px' }}>
      <Button {...buttonSubmitProps()} size="large" >Submit</Button>
    </div >
    <BackTop />

  </Fragment>)
}

export default ChooseTunnel;