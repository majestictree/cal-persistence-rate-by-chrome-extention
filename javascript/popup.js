calc();

let reset = function () {
    danger_counter = 0;
    warning_counter = 0;
    white_counter = 0;
    localStorage.setItem("danger", danger_counter);
    localStorage.setItem("warning", warning_counter);
    localStorage.setItem("white", white_counter);
    document.getElementById("danger").innerText = danger_counter;
    document.getElementById("warning").innerText = warning_counter;
    document.getElementById("white").innerText = white_counter;
}

async function calc() {
  let danger_counter = Number(localStorage.getItem("danger")) || 0;
  let warning_counter = Number(localStorage.getItem("warning")) || 0;
  let white_counter = Number(localStorage.getItem("white")) || 0;
    
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func:parseDOM
  }).then(function(r) {
    for (const {frameId, result} of r) {
      danger_counter += result.danger;
      warning_counter += result.warning;
      white_counter += result.white;
    }
    document.getElementById("danger").innerText = danger_counter;
    document.getElementById("warning").innerText = warning_counter;
    document.getElementById("white").innerText = white_counter;
    localStorage.setItem("danger", danger_counter);
    localStorage.setItem("warning", warning_counter);
    localStorage.setItem("white", white_counter);
  });
}

function parseDOM() {
  let danger = document.querySelectorAll(".bg-danger").length;
  let warning = document.querySelectorAll(".bg-warning").length;
  let white = document.querySelectorAll("tbody>tr").length;
  return {danger, warning, white};
}

document.getElementById("reset").onclick = reset;
