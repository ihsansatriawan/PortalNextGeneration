import React, { Component } from 'react';
import { fetch } from '@helper/fetch';
import { removeCookie } from '@helper/Cookie';
import CONSTANT from '@constant';
import { notification } from 'antd';
import Router from 'next/router';

// This function takes a component...
export default function requireLogin(WrappedComponent) {
  // ...and returns another component...
  return class HoCUser extends Component {
  
    openNotificationWithIcon = type => {
      notification[type]({
        message: 'Anda harus login terlenih dahulu'
      });
    }

    checkSession = async () => {
      const { cookieLogin } = this.props;

      try {
        const response = await fetch({
          url: '/auth/get-profile',
          method: 'post',
          data: {},
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookieLogin}s`
          }
        })

        const status = (response.data.status || false)

        if (!status) {
          this.redirectNonLogin();
        }
        
      } catch (error) {
        console.log("error: ", error);
        
        this.redirectNonLogin();
      }
    }

    redirectNonLogin = () => {
      removeCookie(CONSTANT.TOKEN_NAME)
      Router.push('/login');
      this.openNotificationWithIcon('error')
    }

    componentDidMount() {
      const { cookieLogin } = this.props;
      
      this.checkSession();
    }
  
    render() {
  
      return <WrappedComponent {...this.props} />;
    }
  
  }

}