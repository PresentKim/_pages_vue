let containers = document.getElementsByClassName('container');

function pageChange(id) {
  Array.prototype.forEach.call(containers, function(container, index) {
    container.style.animation = "hide 1s forwards";
    container.style.display = "none";
  });

  let container = document.getElementById(id);
  container.style.animation = "show 1s forwards";
  container.style.display = "block";
}
