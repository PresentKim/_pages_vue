if (pageList) {
  var Page = function(name, link, tags) {
    this.name = name;
    this.link = link;
    this.tags = tags;
  }
  for (var index in pageList)
    pageList[index] = new Page(...pageList[index]);
} else {
  var pageList = [];
}
var Cell = function(index, page) {
  this.index = index;
  this.element = document.getElementById('cell-' + index);
  this.element.addEventListener('click', clickCell.bind(null, index), false);
  this.element.innerHTML = page.name + (page.tags ? page.tags : '');
};

var gridContainer = document.getElementById('grid-container');
for (var index in pageList) {
  var gridCell = document.createElement('div');
  gridCell.setAttribute('id', 'cell-' + index);
  gridCell.setAttribute('class', 'grid-cell');
  gridContainer.appendChild(gridCell);
  new Cell(index, pageList[index]);
}

function clickCell(index) {
  var page = pageList[index];
  if (page != undefined) {
    location.href = page.link;
  }
}
