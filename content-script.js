chrome.storage.sync.get("cascadeMode", ({ cascadeMode }) => {
  if (cascadeMode) {
    const url = document.URL
    if (url.match("paginated")) {
      window.location.href = url.replace("paginated", "cascade")
    }
  }
})

chrome.storage.sync.get("darkMode", ({ darkMode }) => {
  if (darkMode) {
    const bg = document.getElementsByClassName("dark-mode")[0]
    bg.style.backgroundColor = "#000"
  }
})

chrome.storage.sync.get("hidePointer", ({ hidePointer }) => {
  if (hidePointer)
    document.getElementById("main-container").style.cursor = "none"
})

chrome.storage.sync.get("changeChapter", ({ changeChapter }) => {
  if (changeChapter) {
    document.onkeydown = checkKey

    function checkKey(e) {
      e = e || window.event

      if (e.keyCode == "37")
        document.getElementsByClassName("fas fa-backward fa-2x")[0].click()
      if (e.keyCode == "39")
        document.getElementsByClassName("fas fa-forward fa-2x")[0].click()
    }
  }
})
