let nextchap = ""
let nextchaplink = ""
let previuschap = ""
let prevchaplink = ""

const getNextChapter = () => {
  nextchap = document.getElementsByClassName(
    "col-6 col-sm-2 order-2 order-sm-3 chapter-arrow chapter-next"
  )[0]

  try {
    nextchaplink = nextchap.getElementsByTagName("a")[0].href
  } catch (error) {
    return
  }
}

getNextChapter()

const getPrevChapter = () => {
  previuschap = document.getElementsByClassName(
    "col-6 col-sm-2 order-1 order-sm-1 chapter-arrow chapter-prev"
  )[0]

  try {
    prevchaplink = previuschap.getElementsByTagName("a")[0].href
  } catch (error) {
    return
  }
}

getPrevChapter()

nextchap.addEventListener("click", (e) => {
  e.preventDefault()

  chrome.storage.sync.get("noRedirect", ({ noRedirect }) => {
    if (noRedirect) {
      fetch(nextchaplink)
        .then((res) => res.text())
        .then((data) => {
          const parser = new DOMParser()
          const doc = parser.parseFromString(data, "text/html")
          const stringurl = doc.getElementsByClassName(
            "btn btn-xs btn-social btn-primary"
          )[0].attributes.onclick.value
          chrome.storage.sync.get("cascadeMode", ({ cascadeMode }) => {
            if (cascadeMode) {
              const cascade = stringurl.replace("paginated", "cascade")
              location.href = cascade.match(/'([^']+)'/)[1]
            }
          })
          location.href = stringurl.match(/'([^']+)'/)[1]
        })
      return
    }
    location.href = nextchaplink
  })
})

previuschap.addEventListener("click", (e) => {
  e.preventDefault()

  chrome.storage.sync.get("noRedirect", ({ noRedirect }) => {
    try {
      if (noRedirect) {
        fetch(prevchaplink)
          .then((res) => res.text())
          .then((data) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(data, "text/html")
            const stringurl = doc.getElementsByClassName(
              "btn btn-xs btn-social btn-primary"
            )[0].attributes.onclick.value
            chrome.storage.sync.get("cascadeMode", ({ cascadeMode }) => {
              if (cascadeMode) {
                const cascade = stringurl.replace("paginated", "cascade")
                location.href = cascade.match(/'([^']+)'/)[1]
              }
            })
            location.href = stringurl.match(/'([^']+)'/)[1]
          })
        return
      }
      location.href = prevchaplink
    } catch (error) {
      return
    }
  })
})

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
  try {
    if (changeChapter) {
      document.onkeydown = checkKey

      function checkKey(e) {
        e = e || window.event

        chrome.storage.sync.get("noRedirect", ({ noRedirect }) => {
          if (noRedirect) {
            if (e.keyCode == "37") {
              e.preventDefault()
              const previuschapter = document.getElementsByClassName(
                "col-6 col-sm-2 order-1 order-sm-1 chapter-arrow chapter-prev"
              )[0]
              const linkprevchapter =
                previuschapter.getElementsByTagName("a")[0].href

              fetch(linkprevchapter)
                .then((res) => res.text())
                .then((data) => {
                  const parser = new DOMParser()
                  const doc = parser.parseFromString(data, "text/html")
                  const stringurl = doc.getElementsByClassName(
                    "btn btn-xs btn-social btn-primary"
                  )[0].attributes.onclick.value
                  chrome.storage.sync.get("cascadeMode", ({ cascadeMode }) => {
                    if (cascadeMode) {
                      const cascade = stringurl.replace("paginated", "cascade")
                      location.href = cascade.match(/'([^']+)'/)[1]
                    }
                  })
                  location.href = stringurl.match(/'([^']+)'/)[1]
                })
              return
            }

            if (e.keyCode == "39") {
              e.preventDefault()
              const nextchapter = document.getElementsByClassName(
                "col-6 col-sm-2 order-2 order-sm-3 chapter-arrow chapter-next"
              )[0]
              const linknextchapter =
                nextchapter.getElementsByTagName("a")[0].href

              fetch(linknextchapter)
                .then((res) => res.text())
                .then((data) => {
                  const parser = new DOMParser()
                  const doc = parser.parseFromString(data, "text/html")
                  const stringurl = doc.getElementsByClassName(
                    "btn btn-xs btn-social btn-primary"
                  )[0].attributes.onclick.value
                  chrome.storage.sync.get("cascadeMode", ({ cascadeMode }) => {
                    if (cascadeMode) {
                      const cascade = stringurl.replace("paginated", "cascade")
                      location.href = cascade.match(/'([^']+)'/)[1]
                    }
                  })
                  location.href = stringurl.match(/'([^']+)'/)[1]
                })
              return
            }
          }

          if (e.keyCode == "37")
            document.getElementsByClassName("fas fa-backward fa-2x")[0].click()

          if (e.keyCode == "39")
            document.getElementsByClassName("fas fa-forward fa-2x")[0].click()
        })
      }
    }
  } catch (error) {
    return
  }
})
