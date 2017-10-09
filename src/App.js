import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function saveText () {
  let textBox = document.querySelector('#typed-text')
    console.log(textBox.value);
    ipcRenderer.send('save-text', {
        typedText: textBox.value
    });
}

class App extends Component {
  render() {
    return <div className="App">
      <textarea name="pageTitle" id="typed-title" placeholder="Title" />
			<textarea name="typedText" id="typed-text" cols="30" rows="10" placeholder="Text" />
			<button onClick={saveText} id="save-btn">Save</button>
		</div>;
  }
}

export default App;
