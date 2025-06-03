
let FromBtun = document.querySelector("#startbtum");
let toBtun = document.querySelector("#endbtum");
let switchBtun = document.querySelector('#toggle');
let statusVal = document.querySelector("#status");
let offbtun = document.querySelector("#StopLoop");
let currentBtn = document.querySelector("#current");
// Handle Current button click to get current video time
currentBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage("getTabInfo");
});

// Listen for messages from background to update the input
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.startTime) {
        FromBtun.value = message.startTime;
        saveSettings();
    }
});

// Load settings from chrome.storage when the extension is loaded
chrome.storage.local.get('loopSettings', (result) => {
    if (result.loopSettings) {
        FromBtun.value = result.loopSettings.startTime;
        toBtun.value = result.loopSettings.endTime;
        switchBtun.checked = true;
        statusVal.innerText = "ON";
    } else {
        statusVal.innerText = "OFF";
    }
});

FromBtun.addEventListener('change', () => saveSettings());
toBtun.addEventListener('change', () => saveSettings());

function saveSettings() {
    chrome.storage.local.set({
        loopSettings: {
            startTime: FromBtun.value,
            endTime: toBtun.value
        }
    });
}

switchBtun.addEventListener("change", (e) => {
    if (switchBtun.checked) {
        statusVal.innerText = "ON";
        chrome.runtime.sendMessage({
            status: "kamkro",
            loopStart: FromBtun.value,
            loopEnd: toBtun.value
        });
    } else {
        statusVal.innerText = "OFF";
        chrome.runtime.sendMessage({ status: "bandkro" });
    }
});

offbtun.addEventListener('click', () => {
    chrome.runtime.sendMessage({ status: "bandkro" });
});
