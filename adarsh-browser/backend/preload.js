const { contextBridge, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openURL: (url) => ipcMain.invoke('open-url', url),
  closeApp: () => ipcMain.invoke('close-app')
});
