export function sendReadyConnection() {
    const { Notification } = require("electron");

    const NOTIFICATION_TITLE = "Connection Ready";
    const NOTIFICATION_BODY = "Run: /connect localhost:3000";

    new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
    }).show();
}

export function sendConnected() {
    const { Notification } = require("electron");

    const NOTIFICATION_TITLE = "Connected";
    const NOTIFICATION_BODY = "Your Minecraft World is connected";

    new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
    }).show();
}
