// document.getElementById("btn").addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: onRun,
//   });
// });

chrome.tabs.query({ active: true, currentWindow: true},
  (tab) => {
    chrome.scripting.executeScript({
    target: { tabId: tab[0].id },
    function: reddenPage
    })
  }
);

function reddenPage() {
  document.body.style.backgroundColor = 'red';
}
// function onRun() {
//   chrome.storage.sync.get(null, (options) => {
//     document.body.style.backgroundColor = options.colorValue;
//   });
// }
