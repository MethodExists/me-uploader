# me-uploader

Describe me-uploader.

## Usage

Describe usage.

## Examples

Provide examples.

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
