const ipcRenderer = require('ipc-renderer');

const con = require('electron').remote.getGlobal('console');

document.getElementById('save').addEventListener('click', () => {
	time = document.getElementById('time').value;
	ipcRenderer.send('save-time',time);
})

document.getElementById('quit').addEventListener('click', () => {
	ipcRenderer.send('quit');
})
