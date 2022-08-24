let ckCascadeMode = document.getElementById("ckCascadeMode")
let ckDarkMode = document.getElementById("ckDarkMode")
let ckHidePointer = document.getElementById("cKHPointer")
let ckNoRedirect = document.getElementById("ckNoRedirect")
let ckChangeChapter = document.getElementById("ckChangeChapter")
let ckComentaries = document.getElementById("ckComentaries")

const InitializeToggles = () => {
  chrome.storage.sync.get("cascadeMode", ({ cascadeMode }) => {
    if (cascadeMode) {
      ckCascadeMode.checked = true
      return
    }
    ckCascadeMode.checked = false
  })
  chrome.storage.sync.get("darkMode", ({ darkMode }) => {
    if (darkMode) {
      ckDarkMode.checked = true
      return
    }
    ckDarkMode.checked = false
  })
  chrome.storage.sync.get("hidePointer", ({ hidePointer }) => {
    if (hidePointer) {
      ckHidePointer.checked = true
      return
    }
    ckHidePointer.checked = false
  })
  chrome.storage.sync.get("noRedirect", ({ noRedirect }) => {
    if (noRedirect) {
      ckNoRedirect.checked = true
      return
    }
    ckNoRedirect.checked = false
  })
  chrome.storage.sync.get("changeChapter", ({ changeChapter }) => {
    if (changeChapter) {
      ckChangeChapter.checked = true
      return
    }
    ckChangeChapter.checked = false
  })
  chrome.storage.sync.get("comentaries", ({ comentaries }) => {
    if (comentaries) {
      ckComentaries.checked = true
      return
    }
    ckComentaries.checked = false
  })
}

InitializeToggles()

// Cascade Mode
ckCascadeMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({ cascadeMode: true })
  } else {
    chrome.storage.sync.set({ cascadeMode: false })
  }
})

// Dark Mode
ckDarkMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({ darkMode: true })
  } else {
    chrome.storage.sync.set({ darkMode: false })
  }
})

// Hide Pointer
ckHidePointer.addEventListener("change", (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({ hidePointer: true })
  } else {
    chrome.storage.sync.set({ hidePointer: false })
  }
})

// No Redirect
ckNoRedirect.addEventListener("change", (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({ noRedirect: true })
  } else {
    chrome.storage.sync.set({ noRedirect: false })
  }
})

// Change Chapter
ckChangeChapter.addEventListener("change", (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({ changeChapter: true })
  } else {
    chrome.storage.sync.set({ changeChapter: false })
  }
})

// Precharge comentaries
ckComentaries.addEventListener("change", (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({ comentaries: true })
  } else {
    chrome.storage.sync.set({ comentaries: false })
  }
})
