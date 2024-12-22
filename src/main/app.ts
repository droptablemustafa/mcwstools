import { WebSocket } from "ws";

const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron/main");
const path = require("node:path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "../preload.js"),
        },
    });

    require("./menu")();

    win.loadFile("public/index.html");
};

app.whenReady().then(() => {
    createWindow();
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

const ws = require("ws");
const uuid = require("uuid");

// Create a new websocket server on port 3000
console.log("Ready. On Minecraft chat, type /connect localhost:3000");
const wss = new ws.Server({ port: 3000 });

// On Minecraft, when you type "/connect localhost:3000" it creates a connection
wss.on("connection", (socket: WebSocket) => {
    console.log("Connected");
});
