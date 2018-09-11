import { getApiService } from '~';

function fetch({ path, filters }) {
  return getApiService().get('/file', { path, filters });
}

function fetchOne({ id }) {
  return getApiService().get(`/table/files/${id}`);
}

function upload({ filename, path, isPublic, customUrl }) {
  if (customUrl) {
    return getApiService().put(customUrl, { filename, path });
  }
  if (isPublic) {
    return getApiService().put('/filePublic', { filename, path });
  }
  return getApiService().put('/file', { filename, path });
}

function getUrlToDownload({ filename, path, customUrl }) {
  return getApiService().get(customUrl, { filename, path });
}

function del({ id }) {
  return getApiService().del(`/file/${id}`);
}

function xhrRequest({ url, file, method }) {
  return new Promise((resolve, reject) => {
    const signedUrl = url;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return resolve();
        } else {
          return reject(`File not uploaded: ${xhr.responseText}`);
        }
      }
    };

    xhr.open(method, signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

export default {
  fetch,
  fetchOne,
  upload,
  del,
  xhrRequest,
  getUrlToDownload,
};
