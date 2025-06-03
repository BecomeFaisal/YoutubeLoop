console.log("kam kr rha hai");

// Function to convert time string (e.g., "02:15") to seconds
function msgToSec(msg) {
    let array = msg.split(':');
    return parseInt(array[0]) * 60 + parseInt(array[1]);
}

// Function to get the video element
function getPlayer() {
    return document.querySelector("video");
}

let Interid; // Declare Interid variable to use in different places

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.status === "kamkro") {
        let player2 = getPlayer(); // Get the video player

        if (player2) {
            let time1 = msgToSec(message.loopStart);
            let time2 = msgToSec(message.loopEnd);
            let loopDuration = time2 - time1;

            // Set the video player to the loop start time immediately
            player2.currentTime = time1;

            // Set up a shorter interval for more precise looping
            Interid = setInterval(() => {
                player2 = getPlayer(); // Re-select the video player
                if (player2) {
                    // Check if the video has reached or exceeded the end time
                    if (player2.currentTime >= time2 - 1) {
                        player2.currentTime = time1; // Reset to start time
                    }
                } else {
                    console.log("Player not found.");
                }
            }, 500); // Interval set to 500ms for more precise looping

            sendResponse("balle balle");
        } else {
            console.log("Video player not found.");
        }
    }

    if (message.status === "bandkro") {
        clearInterval(Interid);
    }

    if (message === "Time Btao") {
        let currentTimeElement = window.document.querySelector(".ytp-time-current");
        let durationTimeElement = window.document.querySelector(".ytp-time-duration");

        if (currentTimeElement && durationTimeElement) {
            let Time = currentTimeElement.innerText;
            let end = durationTimeElement.innerText;
            let Timeindex = {
                startTime: Time,
                endTime: end
            };
            sendResponse(Timeindex);
        } else {
            sendResponse({ startTime: "N/A", endTime: "N/A" });
        }
    }
});
