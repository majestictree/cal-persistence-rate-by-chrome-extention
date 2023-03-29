calc();

let reset = function () {
    danger_counter = 0;
    warning_counter = 0;
    white_counter = 0;
    mind_a = 0;
    mind_b = 0;
    mind_c = 0;
    mind_n = 0;
    
    localStorage.setItem("danger", danger_counter);
    localStorage.setItem("warning", warning_counter);
    localStorage.setItem("white", white_counter);
    localStorage.setItem("mind_a", mind_a);
    localStorage.setItem("mind_b", mind_b);
    localStorage.setItem("mind_c", mind_c);
    localStorage.setItem("mind_n", mind_n);

    document.getElementById("danger").innerText = danger_counter;
    document.getElementById("warning").innerText = warning_counter;
    document.getElementById("white").innerText = white_counter;
    document.getElementById("mind_a").innerText = mind_a;
    document.getElementById("mind_b").innerText = mind_b;
    document.getElementById("mind_c").innerText = mind_c;
    document.getElementById("mind_n").innerText = mind_n;
}

async function calc() {
  let danger_counter = Number(localStorage.getItem("danger")) || 0;
  let warning_counter = Number(localStorage.getItem("warning")) || 0;
  let white_counter = Number(localStorage.getItem("white")) || 0;
  let mind_a = Number(localStorage.getItem("mind_a")) || 0;
  let mind_b = Number(localStorage.getItem("mind_b")) || 0;
  let mind_c = Number(localStorage.getItem("mind_c")) || 0;
  let mind_n = Number(localStorage.getItem("mind_n")) || 0;
    
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func:parseDOM
  }).then(function(r) {
    for (const {frameId, result} of r) {
      danger_counter += result.danger;
      warning_counter += result.warning;
      white_counter += result.white;
      mind_a += result.mind_a;
      mind_b += result.mind_b;
      mind_c += result.mind_c;
      mind_n += result.mind_n;
    }
    document.getElementById("danger").innerText = danger_counter;
    document.getElementById("warning").innerText = warning_counter;
    document.getElementById("white").innerText = white_counter;
    document.getElementById("mind_a").innerText = mind_a;
    document.getElementById("mind_b").innerText = mind_b;
    document.getElementById("mind_c").innerText = mind_c;
    document.getElementById("mind_n").innerText = mind_n;

    localStorage.setItem("danger", danger_counter);
    localStorage.setItem("warning", warning_counter);
    localStorage.setItem("white", white_counter);
    localStorage.setItem("mind_a", mind_a);
    localStorage.setItem("mind_b", mind_b);
    localStorage.setItem("mind_c", mind_c);
    localStorage.setItem("mind_n", mind_n);
  });
}

function parseDOM() {
  let arrayText = document.querySelector("tbody").innerText.split("\n");
  let mind_a = arrayText.filter((item) => item.includes("マインド: A")).length;
  let mind_b = arrayText.filter((item) => item.includes("マインド: B")).length;
  let mind_c = arrayText.filter((item) => item.includes("マインド: C")).length;
  let mind_n = arrayText.filter((item) => item.includes("マインド: 未登録")).length;
  let danger = document.querySelectorAll(".bg-danger").length;
  let warning = document.querySelectorAll(".bg-warning").length;
  let white = document.querySelectorAll("tbody>tr").length;
  return {danger, warning, white, mind_a, mind_b, mind_c, mind_n};
}

document.getElementById("reset").onclick = reset;
