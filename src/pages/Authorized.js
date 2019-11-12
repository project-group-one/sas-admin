import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'dva';
import { render } from 'react-dom';
// import RenderAuthorized from '@/components/Authorized';
// import { getAuthority } from '@/utils/authority';
// import Redirect from 'umi/redirect';

// const Authority = getAuthority();
// const Authorized = RenderAuthorized(Authority);

// export default ({ children }) => (
//   <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
//     {children}
//   </Authorized>
// );

class Authorized extends React.Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.props.dispatch(push('/user/login'));
    }
  }

  render() {
    const { children, dispatch } = this.props;
    return children;
  }
}

export default connect()(Authorized);
