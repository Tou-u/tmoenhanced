let cascadeMode = true
let darkMode = true
let hidePointer = false
let noRedirect = true
let changeChapter = true
let comentaries = true

chrome.action.disable()

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(() => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: chrome.runtime.getManifest().host_permissions.map((h) => {
          const [, sub, host] = h.match(/:\/\/(\*\.)?([^/]+)/)
          return new chrome.declarativeContent.PageStateMatcher({
            pageUrl: sub ? { hostSuffix: "." + host } : { hostEquals: host },
          })
        }),
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ])
  })

  chrome.storage.sync.set({ cascadeMode })
  chrome.storage.sync.set({ darkMode })
  chrome.storage.sync.set({ hidePointer })
  chrome.storage.sync.set({ noRedirect })
  chrome.storage.sync.set({ changeChapter })
  chrome.storage.sync.set({ comentaries })
})
