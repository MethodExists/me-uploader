import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import './style.css';

class PublicUploader extends React.Component {
  state = {
    loading: false,
  }

  handleUpload = (handlingProps) => {
    const { onChange, path, dispatch } = this.props;
    this.setState({
      loading: true,
    });
    new Promise((resolve, reject) => {
      dispatch({
        type: 'files/uploadSingle',
        payload: {
          file: handlingProps.file,
          path,
          isPublic: true,
          resolve,
          reject,
        },
      });
    }).then((res) => {
      message.success('Uploaded!');
      handlingProps.onSuccess();
      onChange(res.url);
      this.setState({
        loading: false,
      });
    }).catch((err) => {
      message.error(err.message);
      handlingProps.onError(err);
      this.setState({
        loading: false,
      });
    });
  }

  clearFile = () => {
    this.props.onChange('');
  }

  render() {
    const { value } = this.props;

    return (
      <div>
        { this.state.loading ?
          <Icon type="loading" /> :
          value &&
            <div>
              <a href={value} target="_blank" rel="noopener noreferrer">
                { value } <Icon type="export" />
              </a>
            </div>

        }
        <Upload
          showUploadList={false}
          customRequest={this.handleUpload}
        >
          <a><Icon type={value ? 'upload' : 'plus'} className="me-uploader_buttonUpload" /></a>
        </Upload>
        { value &&
          <Popconfirm title="Are you sure to clear this file?" onConfirm={this.clearFile} okText="Yes" cancelText="No">
            <a><Icon type="delete" className="me-uploader_buttonUpload" /></a>
          </Popconfirm>
        }
      </div>
    );
  }
}

PublicUploader.defaultProps = {
  value: undefined,
  onChange: () => {},
};

PublicUploader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default connect()(PublicUploader);
