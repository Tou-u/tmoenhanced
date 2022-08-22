let changeColorBlack = document.getElementById("changeColorBlack")
let changeColorWhite = document.getElementById("changeColorWhite")

changeColorBlack.addEventListener("click", async () => {
  chrome.storage.sync.set({ color: "#000" })

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  })
})

changeColorWhite.addEventListener("click", async () => {
  chrome.storage.sync.set({ color: "#fff" })

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  })
})

function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color
  })
}
