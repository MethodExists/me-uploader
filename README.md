# me-uploader

Describe me-uploader.

## Usage

### Setting up

Provide API Service into module using `init` method:

```
import { init as initUploader } from '@methodexists/me-uploader';

// ...

initUploader({ apiService: APIService });

```

Register file uploader model in the app:

```
import fileUploaderModel from '@methodexists/me-uploader/lib/model';

// ...

app.model(fileUploaderModel);
```

## API

### `getPresignedUrl(filename, path, customUrl)`
Low-level get presigned url method. Returns Promise that resolves with server response.
Params:
`filename` - name of the file to download
`path` - path to downloaded file
`customUrl` -  the request for presignedUrl is being sent to this relative path

Successful promise shall resolve with result: `{ url }  `

### `upload(dispatch, path, fileObject, customUrl)`
Low-level upload method. Returns Promise.
Params:
`dispatch` - dva/redux `dispatch` method
`path` - path to upload file
`fileObject` - file object from html input[type="file"]
`customUrl` - if defined, the request for presignedUrl is being sent to this relative path

Successful promise resolves with result: `{ url, id }  `

### `remove(filename, path, customUrl)`
Low-level remove file method. Returns Promise that resolves with server response.
Params:
`filename` - name of the file to remove
`path` - path to removed file
`customUrl` -  the request for file deletion is being sent to this relative path

Successful promise shall resolve with result: `{ url }  `

Usage example:

```
import { upload } from 'me-uploader';

// ...

upload(dispatch, 'files/images', file)
  .then((file) => console.log('File URL:', file.url));
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to develop a component.
