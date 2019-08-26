import { withRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
const { GOOGLE_CLIENT_ID } = process.env

class Post extends React.Component {
  static async getInitialProps({ query }) {
    console.log('SLUG initial', query.slug);
    return {};
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    const { router: { query } } = this.props
    console.log("process.env.API_HOST: ", GOOGLE_CLIENT_ID)
    return <React.Fragment>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        uxMode="popup"
      />,
      <h1>My blog post {query.slug}</h1>
    </React.Fragment>;
  }
}

export default withRouter(Post);