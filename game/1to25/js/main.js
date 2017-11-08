(function() {
  var CELL_COUNT = 25;

  var ElementControl = function(elementId, data) {
    this.element = document.getElementById(elementId);
    this.data = data;
  };

  ElementControl.prototype = {
    set: function(data) {
      this.data = data;
      this.element.innerHTML = data == 0 ? '' : data;
    }
  };

  var TimeElementControl = function(elementId, data) {
    this.element = document.getElementById(elementId);
    this.data = data;
  };

  TimeElementControl.prototype = {
    set: function(data, apply) {
      function toText(time) {
        function pad2(number) {
          for (result = number + ''; 2 > result.length; result = '0' + result);
          return result;
        }
        return pad2(Math.floor(time % (1000 * 60 * 60) / (1000 * 60))) + ':' + pad2(Math.floor(time % (1000 * 60) / 1000)) + ':' + pad2(Math.floor(time % 1000 / 10));
      }
      this.element.innerHTML = toText(data);
      if (apply)
        this.data = data;
    }
  };

  var playTime = new TimeElementControl('play-time-text', 0);
  var bestTime = new TimeElementControl('best-time-text', 0);
  var target = new ElementControl('target-text', 0);
  var goal = new ElementControl('target-before-num', 25);
  var restartButton = new ElementControl('restart-button', 0);
  var gobackButton = new ElementControl('goback-button', 0);

  var cellList = (function() {
    var Cell = function Cell(index, number) {
      this.index = index;
      this.number = new ElementControl('cell-' + index, number);
      this.number.element.addEventListener('click', clickCell.bind(null, i), false);
    };
    var cellList = [];
    for (i = 0; i < CELL_COUNT; i++)
      cellList[i] = new Cell(i, 0);
    return cellList;
  })();

  var started = false;
  var intervalId = null;
  var countDownDate = new Date().getTime();
  var pre_goal = 25;

  var i, rand, pre_target, time, result, nums;
  var cellNumber, cellData, cellElement, targetData, goalData;

  target.element.addEventListener('click', function() {
    goalData = goal.data;
    if (!started)
      goal.set(goalData >= 100 ? 25 : goalData + 25);
  }, false);

  restartButton.element.addEventListener('click', function() {
    if (started) stop();
    else start();
  }, false);

  gobackButton.element.addEventListener('click', function() {
    location.href = 'http://web.present.kim';
  }, false);

  function clickCell(index) {
    if (started) {
      cellNumber = cellList[index].number;
      cellData = cellNumber.data;
      targetData = target.data;
      if (targetData == cellData) {

        cellElement = cellNumber.element;
        goalData = goal.data;
        if (goalData == pre_goal && cellData <= pre_goal) {
          cellElement.disabled = 'true';
          cellElement.style.animation = 'cell-remove 2s forwards';
        } else {
          replace: while (true) {
            rand = Math.ceil(Math.random() * 25) + pre_goal;
            for (i = 0; i < CELL_COUNT; i++)
              if (cellList[i].number.data == rand)
                continue replace;
            cellNumber.set(rand);
            cellElement.disabled = 'true';
            cellElement.style.animation = '';
            setTimeout(function() {
              cellElement.style.animation = 'cell-change 2s forwards';
            }, 10);
            break replace;
          }
        }

        target.set(targetData + 1);
        if (targetData == pre_goal)
          pre_goal += 25;
        if (targetData == goalData) {
          if (bestTime.data == 0 || bestTime.data > playTime.data)
            bestTime.set(time, true);
          stop();
        }
      }
    }
  }

  function start() {
    if (intervalId == null)
      intervalId = setInterval(function() {
        if (started) {
          time = new Date().getTime() - countDownDate;
          playTime.set(time, true);
          if (bestTime.data == 0)
            bestTime.set(time, false);
        }
      }, 10);
    target.set(1);
    started = true;
    countDownDate = new Date().getTime();
    nums = [];
    while (nums.length < CELL_COUNT) {
      rand = Math.ceil(Math.random() * 25);
      if (nums.indexOf(rand) == -1)
        nums[nums.length] = rand;
    }
    for (i = 0; i < CELL_COUNT; i++) {
      cellNumber = cellList[i].number;
      cellElement = cellNumber.element;
      cellNumber.set(nums[i]);
      cellElement.setAttribute('style', 'color: #777777; background: #' + (i % 2 ? 'e4dad0' : 'eee4da') + ';');
      cellElement.disabled = 'false';
    }
  }

  function stop() {
    if (intervalId != null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    started = false;
    pre_goal = 25;
    target.set(0);
    restartButton.set('NewGame');
    target.set('Stop!');
    for (i = 0; i < CELL_COUNT; i++)
      cellList[i].number.set(0);
  }


  document.getElementById('cheat-panel').addEventListener('click', function() {
    targetData = target.data;
    for (i = 0; i < CELL_COUNT; i++) {
      cellData = cellList[i].number.data;
      if (targetData == cellData) {
        clickCell(i);
      }
    }
  }, false);
})();
