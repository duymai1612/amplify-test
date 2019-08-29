import React from 'react';
import './App.css';

import Amplify, { Analytics, Storage, API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, S3Album } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsconfig);

class App extends React.Component {
  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }

  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }

  post = async () => {
    console.log('calling api');
    const response = await API.post('duymaiApi', '/items', {
      body: {
        id: '1',
        name: 'hello amplify!'
      }
    });
    alert(JSON.stringify(response, null, 2));
  }
  get = async () => {
    console.log('calling api');
    const response = await API.get('duymaiApi', '/items/object/1');
    alert(JSON.stringify(response, null, 2));
  }
  list = async () => {
    console.log('calling api');
    const response = await API.get('duymaiApi', '/items/1');
    alert(JSON.stringify(response, null, 2));
  }

  render() {
    return (
      <div className="App">
        Hello world!
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <button onClick={this.post}>POST</button>
        <button onClick={this.get}>GET</button>
        <button onClick={this.list}>LIST</button>

        <S3Album path='' />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
