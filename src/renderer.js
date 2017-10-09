const { ipcRenderer } = require('electron');
const versionEl = document.querySelector('#version');
const saveBtn = document.querySelector('#saveBtn');

saveBtn.addEventListener('click', function () {
    let textBox = document.querySelector('#typedText')
    console.log(textBox.value );
    ipcRenderer.send('save-text', {
        typedText: textBox.value
    });
});

versionEl.innerText = process.versions.electron;
console.log(process.versions);