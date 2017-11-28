import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { message, Button, Icon, Card, Layout } from 'antd';
import dva, { connect } from 'dva';
import { Router, browserHistory } from 'dva/router';
import fileModel from '~/model';
import { init, PublicUploader, upload } from '~';
import fakeApiService from './apiService';

class Demo extends Component {
  state = {
    value: undefined,
    isUploading: false,
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
          <Card title="Low-level upload method">
            <input ref={(el) => { this.file = el; }} type="file" />
            <Button
              loading={this.state.isUploading}
              onClick={() => {
                this.setState({ isUploading: true });
                upload(this.props.dispatch, 'files/images', this.file.files[0])
                  .then((file) => {
                    this.setState({ isUploading: false });
                    message.success(`Uploaded ${file.url}`);
                  })
                  .catch(() => this.setState({ isUploading: false }));
              }}
            >
              Upload
            </Button>
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}

Demo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// -----

function router({ history }) { // eslint-disable-line react/prop-types
  const routes = [{
    path: '/',
    component: connect()(Demo),
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
