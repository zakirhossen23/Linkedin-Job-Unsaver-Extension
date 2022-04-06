
function checkExist() {
    var allDots = document.querySelectorAll('[type="ellipsis-horizontal-icon"]');
    if (allDots.length > 1) {
        return true;
    }
    return false;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function unlcickAllUnsave() {
    var allDots = document.querySelectorAll('[type="ellipsis-horizontal-icon"]');
    for (let i = 0; i < allDots.length-1 ; i++) {
        if (checkExist() == true) {
            allDots[i].click();           
            console.log("starting -> ", i)       
        } 
    }
    await sleep(1000);
    var allpopupDot = document.querySelectorAll('[class="entry-point"]')
    for (let i = 0; i < allpopupDot.length ; i++) {      
            allpopupDot[i].nextElementSibling.nextElementSibling.click();
            console.log("closed -> ", i)
    }
    await sleep(1000);
    window.location.reload()
}




chrome.runtime.onMessage.addListener( async function(msg, sender, sendResponse) {
    if (msg.type === 'unsave') {
        await unlcickAllUnsave()
    }
});








function pagerefresh(){
 window.location.reload();
}

// Initialize button
let startBTN = document.getElementById("startBTN");
let stopBTN = document.getElementById("stopBTN");

stopBTN.addEventListener("click", async () => {
    chrome.storage.sync.set({ "status": false }, function () {
        console.log('Value is set to ' + false);
    });
    EnableStart();
})

// When the button is clicked, inject setPageBackgroundColor into current page
startBTN.addEventListener("click", async () => {
    EnableStop();
    chrome.storage.sync.set({ "status": true }, function () {
        console.log('Value is set to ' + true);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: pagerefresh,
    });
    
});

//Disable Button color
function DisableStart(){
    startBTN.setAttribute("disabled","")    
}
function DisableStop(){
    stopBTN.setAttribute("disabled","")
}

//Enable Button color
function EnableStart(){
    startBTN.removeAttribute("disabled")
    DisableStop();
}

function EnableStop(){
    startBTN.removeAttribute("disabled")
    DisableStart()

}
