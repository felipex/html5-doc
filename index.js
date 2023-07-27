const loads = document.getElementsByClassName("dload");

function fillDiv(content) {
  const div = document.querySelector("#content");
  div.innerHTML = content;
}

function loadPage(el) {

  const page = el.target.dataset["ref"];
  fetch(page).then(resp => {
    return resp.text();
  })
    .then(text => {
      fillDiv(text);
    });
}

Array.from(loads).forEach(el => {
  el.addEventListener("click", loadPage);
  console.log(el);
})

function getE(id) {
  return document.getElementById(id)
}
function tag(tagName) {
  const tag_ = document.createElement(tagName);
  return tag_;
}
  
function show_sumary(pages) {
  const sumary = getE("sumary");
  const ul = tag("ul");
  pages.forEach(
     page => {
       const li = tag("li");
       const href = tag("a");
       href.dataset["ref"] = page.url;
       href.textContent = page.title;
       li.appendChild(href);
       ul.appendChild(li);
     }
  )
  sumary.appendChild(ul);
}


fetch("/enabled-pages.json")
  .then(
    response => response.json()
  )
  .then(
    json => {
      json.pages.forEach(
        page => console.log(page)
      )
      show_sumary(json.pages);
    }
  )