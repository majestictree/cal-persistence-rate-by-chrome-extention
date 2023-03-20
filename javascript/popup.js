document.getElementById("btn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: onRun,
  });
});

let onRun = function() {
  let count = document.getElementsByTagName('li').length;
  console.log(count);
};
