
function checkExist() {
    var allDots = document.querySelectorAll('[class="entity-result__item"]');
    if (allDots.length > 0) {
        return true;
    }
    return false;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function unlcickAllUnsave() {
    
    var allDots = document.querySelectorAll('[class="entity-result__item"]');
    for (let i = 0; i < allDots.length ; i++) {
        if (checkExist() == true) {
            allDots[i].children[2].children[0].children[0].children[0].click()
            console.log("starting -> ", i)
        }
    }
    await sleep(1000);
    var allpopupDot = document.querySelectorAll('[class="entry-point"]')
    if (UnsavefinishCheck(allpopupDot) == false) {
        for (let i = 0; i < allpopupDot.length; i++) {
            allpopupDot[i].nextElementSibling.nextElementSibling.click();
            console.log("closed -> ", i)
        }
    } else {
        return;
    }
    await sleep(1000);
    window.location.reload()
}




chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
    if (msg.type === 'unsave') {
        await unlcickAllUnsave()
    }
});






function UnsavefinishCheck(AllDotsElements) {
    if (AllDotsElements[0].nextElementSibling.nextElementSibling == null) {
        chrome.storage.sync.set({ "status": false }, function () {
            console.log('Value is set to ' + false);
        });
        EnableStart();
        return true
    }
    return false
}

function pagerefresh() {
    window.location.reload();
}





// Initialize button
let startBTN = document.getElementById("startBTN");
let stopBTN = document.getElementById("stopBTN");
try {


    if (startBTN !== undefined) {
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

    }
} catch (error) {

}
chrome.storage.sync.get("status").then(function (statusButtons) {
    if (statusButtons.status == true) {
        EnableStop();
    } else {
        EnableStart();
    }
})



//Disable Button code
function DisableStart() {
    try {
        startBTN.setAttribute("disabled", "")
    } catch (error) {}
    
}
function DisableStop() {
    try {
        stopBTN.setAttribute("disabled", "")
    } catch (error) {}
    
}

//Enable Button code
function EnableStart() {
    try {
        startBTN.removeAttribute("disabled")//enable Start
        DisableStop();
    } catch (error) {}

}

function EnableStop() {
    try {
           stopBTN.removeAttribute("disabled")  //enable Stop
    } catch (error) {    }
 
    DisableStart()

}

