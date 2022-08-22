var url = document.URL

if (url.match("paginated")) {
  window.location.href = url.replace("paginated", "cascade")
}

const bg = document.getElementsByClassName("dark-mode")[0]

chrome.storage.sync.get("color", ({ color }) => {
  bg.style.backgroundColor = color
})

document.getElementById("main-container").style.cursor = "none"

document.onkeydown = checkKey

function checkKey(e) {
  e = e || window.event

  if (e.keyCode == "38") {
    // up arrow
  } else if (e.keyCode == "40") {
    // down arrow
  } else if (e.keyCode == "37") {
    document.getElementsByClassName("fas fa-backward fa-2x")[0].click()
  } else if (e.keyCode == "39") {
    document.getElementsByClassName("fas fa-forward fa-2x")[0].click()
  }
}
