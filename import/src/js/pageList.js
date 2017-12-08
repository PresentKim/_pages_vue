// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

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

function addButton(innerHTML = '', href = '') {
  var button = document.createElement('a');
  button.setAttribute('class', 'panel bordered');
  button.setAttribute('href', href);
  button.innerText = innerHTML;
  document.getElementById('pannels').appendChild(button);
  return button;
}
