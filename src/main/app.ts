import { WebSocket } from "ws";

const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron/main");
const path = require("node:path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    require("./menu")();

    win.loadFile("public/console.html");
};

app.whenReady().then(() => {
    createWindow();
    require("../minecraft/connect")();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = "light";
    } else {
        nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
});
