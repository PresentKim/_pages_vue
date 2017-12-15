// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

// Forked from https://www.w3schools.com/lib/w3.js
function includeHTML(callback, targets) {
  var elements = document.getElementsByTagName("*");

  if (targets) {
    if (targets.length) {
      var target = targets.shift();
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200)
            target.innerHTML = this.responseText;
          if (this.status == 404)
            target.innerHTML = "Page not found.";

          target.removeAttribute("include-html");
          includeHTML(callback, targets);
        }
      }
      xhttp.open("GET", target.getAttribute("include-html", true));
      xhttp.send();
    } else if (callback) callback();
  } else {
    targets = [];
    for (var i = 0; i < elements.length; i++)
      if (elements[i].getAttribute("include-html"))
        targets.push(elements[i]);
    includeHTML(callback, targets);
  }
};

var Page = function(name, link, tags) {
  this.name = name;
  this.link = link;
  this.tags = tags;
}

var pageList = [];

function addCell(pages) {
  for (var index in pages)
    pageList[index] = new Page(pages[index][0], pages[index][1], pages[index][2]);
}

function renderCell() {
  var gridContainer = document.getElementById('grid-container');
  for (var index in pageList) {
    var gridCell = document.createElement('div');
    gridCell.setAttribute('id', 'cell-' + index);
    gridCell.setAttribute('class', 'grid-cell');
    gridCell.addEventListener('click', clickCell.bind(null, index), false);
    gridCell.innerHTML = pageList[index].name + (pageList[index].tags ? pageList[index].tags : '');
    gridContainer.appendChild(gridCell);
  }
}

function clickCell(index) {
  var page = pageList[index];
  if (page != undefined) {
    location.href = page.link;
  }
}

function addButton(innerHTML, href) {
  var button = document.createElement('a');
  button.setAttribute('class', 'panel bordered');
  if (href)
    button.setAttribute('href', href);
  if (innerHTML)
    button.innerText = innerHTML;
  document.getElementById('pannels').appendChild(button);
  return button;
}
