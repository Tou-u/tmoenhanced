const bg = document.getElementsByClassName("dark-mode")[0]

bg.style.backgroundColor = "red"

let chapters = document.getElementsByClassName("btn btn-default btn-sm")

const getChapters = () => {
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
          const cascade = stringurl.replace("paginated", "cascade")
          location.href = cascade.match(/'([^']+)'/)[1]
        })
    })
  }
}

getChapters()
