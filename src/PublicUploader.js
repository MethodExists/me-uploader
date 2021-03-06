import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import { upload } from './index.js';
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
    upload(dispatch, path, handlingProps.file)
      .then((res) => {
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
    const { deleteButton, addButton, value } = this.props;

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
          { addButton || (
            <a><Icon type={value ? 'upload' : 'plus'} className="me-uploader_buttonUpload" /></a>
          )}
        </Upload>
        { value && <Popconfirm
          title="Are you sure to clear this file?"
          onConfirm={this.clearFile}
          okText="Clear"
          okType="danger"
          cancelText="Cancel"
        >
          { deleteButton || (
            <a><Icon type="delete" className="me-uploader_buttonUpload" /></a>
          )}
        </Popconfirm>}
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
  addButton: PropTypes.element, // eslint-disable-line react/require-default-props
  deleteButton: PropTypes.element, // eslint-disable-line react/require-default-props
};

export default connect()(PublicUploader);
