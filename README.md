# react-firebase-firestore

> a connection library for react and firebase

this works similar to react-firebase but it works for firestore (i tried to PR this in and got ignored.)

this library includes logic to do the path setting for you, so `docs/lskdl2lk322l4j/abc` gets parsed into `document('docs').collection('lskdl2lk322l4j').document('abc')` and so on.

The full API of Firestore is available to you in a `ref` variable, so you will have to use their preferred method names. see below example.

[![NPM](https://img.shields.io/npm/v/react-firebase-firestore.svg)](https://www.npmjs.com/package/react-firebase-firestore) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-firebase-firestore
```

## Usage

`secrets.js`:

```jsx
var firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var config = {
  // copy from firebase console https://console.firebase.google.com/
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
export const firestore = firebase.firestore();
export default firebase;
```

`index.js`:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./ui/layouts/App/App";
import { Provider } from "react-firebase";

import { firebase, firestore } from "./secrets";

ReactDOM.render(
  <Provider firebaseApp={firebase} firestore={firestore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

any given container:

```jsx
import React from "react";
import { connect } from "react-firebase-firestore";

class DocumentEditor extends React.Component {
  // ...
}

const mapFirebaseToProps = (props, ref) => ({
  upsertDocument: document =>
    props.doc
      ? ref(`documents/${props.doc._id}`).set(document)
      : ref("documents").add(document)
});

export default connect(mapFirebaseToProps)(DocumentEditor);
```

alternative example showing a reactive query as well as a delete operation:

```jsx
// as above

const mapFirebaseToProps = (props, ref) => ({
  rawdocs: "documents",
  removeDocument: id => {
    if (confirm("Are you sure? This is permanent!"))
      ref(`documents/${id}`)
        .delete()
        .then(() => alert("Deletion successful!"))
        .catch(err => alert(err.message));
  }
});

export default connect(mapFirebaseToProps)(Documents);
```

# converting codebases from `react-firebase` to `react-firebase-firestore`

from Firebase to Firestore, simply rename:

* `remove` to `delete`
* `push` to `add`
* `update` is still `update`

## License

MIT © [sw-yx](https://github.com/sw-yx)
