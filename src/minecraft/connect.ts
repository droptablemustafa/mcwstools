import {
    sendConnected,
    sendReadyConnection,
} from "../main/utils/notifications/connection";
const { ipcMain, webContents } = require("electron/main");

// List of events that can be subscribed to
// Source: https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c
const eventNames = [
    "AdditionalContentLoaded",
    "AgentCommand",
    "AgentCreated",
    "ApiInit",
    "AppPaused",
    "AppResumed",
    "AppSuspended",
    "AwardAchievement",
    "BlockBroken",
    "BlockPlaced",
    "BoardTextUpdated",
    "BossKilled",
    "CameraUsed",
    "CauldronUsed",
    "ChunkChanged",
    "ChunkLoaded",
    "ChunkUnloaded",
    "ConfigurationChanged",
    "ConnectionFailed",
    "CraftingSessionCompleted",
    "EndOfDay",
    "EntitySpawned",
    "FileTransmissionCancelled",
    "FileTransmissionCompleted",
    "FileTransmissionStarted",
    "FirstTimeClientOpen",
    "FocusGained",
    "FocusLost",
    "GameSessionComplete",
    "GameSessionStart",
    "HardwareInfo",
    "HasNewContent",
    "ItemAcquired",
    "ItemCrafted",
    "ItemDestroyed",
    "ItemDropped",
    "ItemEnchanted",
    "ItemSmelted",
    "ItemUsed",
    "JoinCanceled",
    "JukeboxUsed",
    "LicenseCensus",
    "MascotCreated",
    "MenuShown",
    "MobInteracted",
    "MobKilled",
    "MultiplayerConnectionStateChanged",
    "MultiplayerRoundEnd",
    "MultiplayerRoundStart",
    "NpcPropertiesUpdated",
    "OptionsUpdated",
    "performanceMetrics",
    "PackImportStage",
    "PlayerBounced",
    "PlayerDied",
    "PlayerJoin",
    "PlayerLeave",
    "PlayerMessage",
    "PlayerTeleported",
    "PlayerTransform",
    "PlayerTravelled",
    "PortalBuilt",
    "PortalUsed",
    "PortfolioExported",
    "PotionBrewed",
    "PurchaseAttempt",
    "PurchaseResolved",
    "RegionalPopup",
    "RespondedToAcceptContent",
    "ScreenChanged",
    "ScreenHeartbeat",
    "SignInToEdu",
    "SignInToXboxLive",
    "SignOutOfXboxLive",
    "SpecialMobBuilt",
    "StartClient",
    "StartWorld",
    "TextToSpeechToggled",
    "UgcDownloadCompleted",
    "UgcDownloadStarted",
    "UploadSkin",
    "VehicleExited",
    "WorldExported",
    "WorldFilesListed",
    "WorldGenerated",
    "WorldLoaded",
];

module.exports = () => {
    const ws = require("ws");
    const uuid = require("uuid");

    // Create a new websocket server on port 3000
    console.log("Ready. On Minecraft chat, type /connect localhost:3000");
    const wss = new ws.Server({ port: 3000 });
    sendReadyConnection();

    // On Minecraft, when you type "/connect localhost:3000" it creates a connection
    wss.on("connection", (socket: WebSocket) => {
        console.log("Connected to Minecraft");
        sendConnected();

        for (const eventName of eventNames) {
            socket.send(
                JSON.stringify({
                    header: {
                        version: 1,
                        requestId: uuid.v4(),
                        messageType: "commandRequest",
                        messagePurpose: "subscribe",
                    },
                    body: {
                        eventName: eventName,
                    },
                })
            );
        }
    });
};
