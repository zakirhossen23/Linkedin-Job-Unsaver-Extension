

let statusPop = false;
chrome.tabs.onUpdated.addListener(async function (TabID, status, TabInfo) {
    let statusPop2 = await chrome.storage.sync.get("status")
    statusPop = statusPop2.status;
    try {
        if (statusPop == true && TabInfo.url.includes("linkedin.com/my-items/saved-jobs")) {
            if (status.status == "complete") {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    try {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            type: "unsave",
                        });
                    } catch (error) {

                    }

                });
            }
        }
    } catch { }


})

