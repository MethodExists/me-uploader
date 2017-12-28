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

### `upload(dispatch, path, fileObject)`
Low-level upload method. Returns Promise.  
Params:  
`dispatch` - dva/redux `dispatch` method  
`path` - path to upload file  
`fileObject` - file object from html input[type="file"]  

Successful promise resolves with result: `{ url, id }  `

Usage example:

```
import { upload } from 'me-uploader';

// ...

upload(dispatch, 'files/images', file)
  .then((file) => console.log('File URL:', file.url));
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to develop a component.
