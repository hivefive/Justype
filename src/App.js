import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function saveText () {
  let pageTitle = document.querySelector('#typed-title');
  let textBox = document.querySelector('#typed-text');
  ipcRenderer.send('save-text', {
      typedTitle: pageTitle.value, 
      typedText: textBox.value,
  });
}

function openText () {
  ipcRenderer.send('open-text');
}

function exportPDF () {
  let pageTitle = document.querySelector("#typed-title");
	let textBox = document.querySelector("#typed-text");
	ipcRenderer.send('save-pdf', {
		typedTitle: pageTitle.value,
		typedText: textBox.value
	});
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textTitle: '',
      textContent: ''
    }

    this.updateContent = this.updateContent.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  handleFileContent(content) {
    let title = content.substring(0, content.indexOf("\n"));
    let text = content.substring(content.indexOf("\n") + 1);
    this.setState({ textTitle: title, textContent: text });
  }

  componentDidMount() {
    ipcRenderer.on("file-content", (event, args) => {
      this.handleFileContent(args);
    });
    ipcRenderer.on("save-file", (event, args) => {
      saveText();
    });
    ipcRenderer.on("export-pdf", (event, args) => {
      exportPDF();
    });
  }

  updateContent(e) {
    this.setState({
      textContent: e.target.value
    });
  }

  updateTitle(e) {
    this.setState({
      textTitle: e.target.value
    })
  }
  

  render() {
    return <div className="App">
			<textarea name="pageTitle" id="typed-title" placeholder="Title" 
      value={this.state.textTitle} 
      onInput={this.updateTitle} />
			<textarea name="typedText" id="typed-text" cols="30" rows="10" placeholder="Text" 
      value={this.state.textContent} 
      onInput={this.updateContent} />
			<button onClick={saveText} id="save-btn">
				Save
			</button>
		</div>;
  }
}

export default App;
