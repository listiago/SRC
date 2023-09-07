const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  autoHideMenuBar: true,
  webPreferences: {
  nodeIntegration: true,
  hardwareAcceleration: false,
  
}

  });

  win.loadFile('index.html');

  win.on('closed', () => {
    win = null;
  });
}



app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

