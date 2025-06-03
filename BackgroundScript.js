console.log("Peet peeche chal rha");

chrome.runtime.onMessage.addListener((order, sender, sendResponse) => {
    if (order === "getTabInfo") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, "Time Btao", (response) => {
                const object = {
                    startTime: response.startTime,
                    endTime: response.endTime
                };
                chrome.storage.local.set({ loopSettings: object }, () => {
                    chrome.runtime.sendMessage(object);
                });
            });
        });
    }

    if (order.status === "kamkro") {
        chrome.storage.local.set({ loopSettings: { startTime: order.loopStart, endTime: order.loopEnd } });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, order, (res) => {
                console.log(res);
            });
        });
    }

    if (order.status === "bandkro") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, order, (res) => {
                console.log(res);
            });
        });
        chrome.storage.local.remove('loopSettings');
    }
});
