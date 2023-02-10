console.log('BAckground running');

chrome.browserAction.onClicked.addListener(function (tab) {

  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    display: ""
    width: 800,
    height: 600
  });
});

chrome.runtime.onInstalled.addListener(async () => {
  for (let [tld, locale] of Object.entries(tldLocales)) {
    chrome.contextMenus.create({
      id: tld,
      title: "TBD Magic",
      type: 'normal',
      contexts: ['selection'],
    });
  }
});
; function buttonClicked(tab) {
  let msg = {
    txt: "how can I help you"
  }
  chrome.tabs.sendMessage(tab.id, msg)
  console.log(" Button clicked!")
};