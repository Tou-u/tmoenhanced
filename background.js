let cascadeMode = false
let darkMode = false
let hidePointer = false
let noRedirect = false
let changeChapter = false

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ cascadeMode })
  chrome.storage.sync.set({ darkMode })
  chrome.storage.sync.set({ hidePointer })
  chrome.storage.sync.set({ noRedirect })
  chrome.storage.sync.set({ changeChapter })
})
