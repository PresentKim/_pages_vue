(function() {
  const CELL_COUNT = 25;

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

  var i, rand, pre_target, complete, time, result, nums;
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
        pre_target = targetData - targetData % 25 + 25;
        if (targetData != goalData - 25 && goalData == pre_target || goalData == cellData) {
          cellElement.setAttribute('style', 'color: #e4dad0; background: #b2a89e;');
          cellElement.disabled = 'true';
          cellElement.style.animation = 'cell-remove 2s forwards';
        } else {
          complete = false;
          replace: while (!complete) {
            rand = (targetData != goalData - 25 ? pre_target : pre_target - 25) + Math.ceil(Math.random() * 25);
            for (i = 0; i < CELL_COUNT; i++)
              if (cellList[i].number.data == rand)
                continue replace;
            cellNumber.set(rand);
            cellElement.disabled = 'true';
            cellElement.style.animation = 'cell-change 2s forwards';
            complete = true;
          }
        }
        if (targetData < goalData)
          target.set(targetData + 1);
        else {
          if (bestTime.date == 0 || bestTime.date > playTime.data)
            bestTime.set(time, true);
          stop();
        }
      }
    }
  }

  function start() {
    if (intervalId == null) intervalId = setInterval(function() {
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
    target.set(0);
    restartButton.set('NewGame');
    target.set('Stop!');
    for (i = 0; i < CELL_COUNT; i++)
      cellList[i].number.set(0);
  }
})();
