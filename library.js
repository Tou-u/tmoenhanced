let newChapters = document.querySelectorAll('[class="chapter-viewed-icon"]')
let viewedChapters = document.querySelectorAll(
  '[class="chapter-viewed-icon viewed"]'
)

let newChapter = newChapters[newChapters.length - 1]
let lastviewed = viewedChapters[0]

const newButton = () => {
  if (window.location.href.indexOf("orderDir=ASC") > -1) {
    return
  }

  if (lastviewed) {
    document.getElementsByClassName(
      "col-12 col-md-9 element-header-content-text"
    )[0].innerHTML += `<h4 class="element-title my-2">Último capítulo leído: ${
      lastviewed.parentElement.parentElement.getElementsByTagName("div")[0]
        .innerText
    }</h4>`
  }

  if (!lastviewed) {
    document.getElementsByClassName(
      "col-12 col-md-9 element-header-content-text"
    )[0].innerHTML += `<button id="golastchapter" class="badge-primary py-2 px-4 mx-1 my-2 btn">Empezar a leer</button>`
  } else {
    try {
      document.getElementsByClassName(
        "col-12 col-md-9 element-header-content-text"
      )[0].innerHTML += `<button id="golastchapter" class="badge-primary py-2 px-4 mx-1 my-2 btn">Continuar con el ${
        newChapter.parentElement.parentElement.getElementsByTagName("div")[0]
          .innerText
      }</button>`
    } catch (error) {
      return
    }
  }

  newChapter.parentElement.parentElement
    .getElementsByTagName("div")[0]
    .setAttribute("tabindex", "-1")

  try {
    document.getElementById("show-chapters").style.display = "none"
    document.getElementById("chapters-collapsed").style.display = "block"
  } catch (error) {
    return
  }
}

newButton()

let golastchapter = document.getElementById("golastchapter")

golastchapter?.addEventListener("click", () => {
  newChapter.parentElement.parentElement.getElementsByTagName("div")[0].focus()
})

chrome.storage.sync.get("noRedirect", ({ noRedirect }) => {
  if (noRedirect) {
    let chapters = document.getElementsByClassName("btn btn-default btn-sm")
    for (let i = 0; i < chapters.length; i++) {
      const element = chapters[i]
      element.addEventListener("click", (e) => {
        e.preventDefault()
        fetch(element.href)
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
      })
    }
  }
})
