import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Icon, Card, Layout } from 'antd';
import dva from 'dva';
import { Router, browserHistory } from 'dva/router';
import fileModel from '~/model';
import { init, PublicUploader } from '~';
import fakeApiService from './apiService';

class Demo extends Component {
  state = {
    value: undefined,
  }

  render() {
    const { value } = this.state;
    return (
      <Layout>
        <Layout.Header>
          <h1 style={{ color: '#ccc' }}>me-uploader Demo</h1>
        </Layout.Header>
        <Layout.Content style={{ padding: 32 }}>
          <Card style={{ padding: 30, marginBottom: 32 }}>
            <PublicUploader
              path="files/videos"
              value={value}
              onChange={value => this.setState({ value })} // eslint-disable-line no-shadow
            />
          </Card>
          <Card style={{ padding: 30, marginBottom: 32 }}>
            <PublicUploader
              path="files/videos"
              value={value}
              onChange={value => this.setState({ value })} // eslint-disable-line no-shadow
              addButton={<Button><Icon type="upload" />{value ? 'Reupload' : 'Upload'}</Button>}
              deleteButton={<Button><Icon type="delete" />Delete</Button>}
            />
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}

// -----

function router({ history }) { // eslint-disable-line react/prop-types
  const routes = [{
    path: '/',
    component: Demo,
    childRoutes: [],
  }];

  return <Router history={history} routes={routes} />;
}

// -----
init({
  apiService: fakeApiService,
});

const app = dva({ history: browserHistory });
app.router(router);
app.model(fileModel);
const App = app.start();

render(
  <App />,
  document.querySelector('#demo'),
);
