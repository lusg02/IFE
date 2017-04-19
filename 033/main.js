var $ = function (id) {
  return document.getElementById(id);
};

var addEvent = function (elem, event, listener) {
  if (elem.addEventListener) {
    elem.addEventListener(event, listener, false);
  }
  else if (elem.attachEvent) {
    elem.attachEvent('on' + event, listener);
  }
  else {
    elem['on' + event] = listener;
  }
};

var target = $('target');
var col_list = $('col_list');
var ctrl_cont = $('ctrl_cont');
var ctrl_btn = $('ctrl_btn');

// 初始化网格
function initGrid() {
  var row = col_list.getElementsByTagName('li');
  for (var i = 0; i < row.length; i++) {
    for (var j = 0; j < row.length; j++) {
      var child = document.createElement('div');
      row[i].appendChild(child);
    }
  }
  target.style.left = Math.ceil(Math.random() * 9) * 40 + 'px';
  target.style.top = Math.ceil(Math.random() * 9) * 40 + 'px';
  target.style.transform = 'rotateZ(0deg)';
}

// 设置旋转方向
function setDirection(degree) {
  var pre_degree = parseInt((target.style.transform).match(/[-]?\d+/g)[0]);
  target.style.transform = 'rotateZ(' + (degree + pre_degree) + 'deg';
}

// 指令控制
var command = {
  forward: function () {
    var degree = parseInt((target.style.transform).match(/[-]?\d+/g)[0]);
    switch (degree % 360) {
      case -0:
      case 0: {
        if (target.style.top === '40px') {
          alert('到头了！');
          return false;
        }
        target.style.top = (parseInt(target.style.top) - 40) + 'px';
        break;
      }
      case -270:
      case 90: {
        if (target.style.left === '360px') {
          alert('到头了！');
          return false;
        }
        target.style.left = (parseInt(target.style.left) + 40) + 'px';
        break;
      }
      case -180:
      case 180: {
        if (target.style.top === '400px') {
          alert('到头了！');
          return false;
        }
        target.style.top = (parseInt(target.style.top) + 40) + 'px';
        break;
      }
      case -90:
      case 270: {
        if (target.style.left === '0px') {
          alert('到头了！');
          return false;
        }
        target.style.left = (parseInt(target.style.left) - 40) + 'px';
        break;
      }
    }
  },
  to_left: function () {
    setDirection(-90);
  },
  to_right: function () {
    setDirection(90);
  },
  backward: function () {
    setDirection(180);
  }
};

(function () {
  addEvent(ctrl_btn, 'click', function () {
    var input = ctrl_cont.value.toUpperCase();
    switch (input) {
      case 'GO': return command.forward();
      case 'TUN LEF': return command.to_left();
      case 'TUN RIG': return command.to_right();
      case 'TUN BAC': return command.backward();
    }
    alert('请按要求输入指令！');
  });

  addEvent(document, 'keyup', function (e) {
    var event = e || window.event;
    switch (event.keyCode) {
      case 37: return command.to_left();
      case 38: return command.forward();
      case 39: return command.to_right();
      case 40: return command.backward();
    }
  });

  initGrid();
})();