'use strict';
var path = require('path')

var opts = {
	dir: __dirname,
	icon: path.join(__dirname, 'images', 'unconfigured.png'),
	width: 200,
	height: 225,
	preloadWindow: true
}
var menubar = require('menubar')
const ipcMain = require('ipc-main')
const player = require('play-sound')();

var mb = menubar(opts)

var time = 0;
var running = false;

mb.on('ready', function ready () {
})

ipcMain.on('save-time', function save_time (event, arg) {
	time = arg;
	mb.tray.setImage(path.join(__dirname, 'images', 'untriggered.png'));
	mb.hideWindow();
	start_timer(time);
})

ipcMain.on('quit', function quit_app (event, arg) {
	mb.app.quit()
})

function expire_timer() {
	running = false;
	player.play(path.join(__dirname, 'notification.mp3'), function (err) {
		if (err) console.log(`Could not play sound: ${err}`);
	});
	mb.tray.setImage(path.join(__dirname, 'images', 'triggered.png'));
}

function start_timer(time) {
	if (!running) {
		running = true;
		mb.tray.setImage(path.join(__dirname, 'images', 'untriggered.png'));		
		console.log("Running timer for " + time + " minutes...");
		setTimeout(expire_timer, time * 1000 * 60);
	}
}

mb.on('show', function () {
	if ( !running ) {
		mb.tray.setImage(path.join(__dirname, 'images', 'unconfigured.png'));
	}
})

