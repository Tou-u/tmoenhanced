let cascadeMode = true
let darkMode = true
let hidePointer = false
let noRedirect = true
let changeChapter = true

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ cascadeMode })
  chrome.storage.sync.set({ darkMode })
  chrome.storage.sync.set({ hidePointer })
  chrome.storage.sync.set({ noRedirect })
  chrome.storage.sync.set({ changeChapter })
})
