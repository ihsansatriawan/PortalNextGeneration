import React, { Fragment, useState, useEffect } from 'react';
import { Divider, Skeleton, Empty, message, List, Card, Button } from 'antd';
import { fetch } from '@helper/fetch';

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

function Content({loading, tunnels, setTunnel}) {
  console.log("tunnels: ", tunnels)
  console.log("loading: ", loading)
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
        return <List.Item>
          <Card hoverable onClick={() => {
            message.info(`Kamu memilih jalur ${item.name}`)
            setTunnel(item)
          }} title={item.name}>{item.description || 'Wait Input'}</Card>
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

  useEffect(() => {
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
          setTunnels(response.data.data || [])
          setLoading(false)
        }

      } catch (error) {
        console.log("error: ", error);
        message.error("Server Error")
        setTunnels(null)
        setLoading(false)
      }
    }

    fetchTunnel();
  }, [])

  const submitEvent = () => {
    if (isEmptyObject(tunnel)) {
      message.error("Pilih Jalur dahulu!")
    } else {
      setLoadingButton(true)

      //DO Submit Choose Tunnel
      
      setTimeout(() => {
        setLoadingButton(false)
      }, 3000)
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

  return (<Fragment>
    {!isEmptyObject(tunnel) && <Divider>Pilihan mu: {tunnel.name}</Divider>}
    <Divider>Tentukan Pilihan mu</Divider>
    <Content setTunnel={setTunnel} loading={loading} tunnels={tunnels}  />
    <Button {...buttonSubmitProps()} >
      Submit
    </Button>
  </Fragment>)
}

export default ChooseTunnel;