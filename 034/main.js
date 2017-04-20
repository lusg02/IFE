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
  var row = col_list.getElementsByTagName('p');
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

// 设置方向
function setDirection(degree) {
  var pre_degree = parseInt((target.style.transform).match(/[-]?\d+/g)[0]);
  target.style.transform = 'rotateZ(' + (degree + pre_degree) + 'deg';
}

function rotateZ(degree) {
  target.style.transform = 'rotateZ(' + degree + 'deg)';
}

// 指令控制
var command = {
  forward: function (num) {
    var degree = parseInt((target.style.transform).match(/[-]?\d+/g)[0]);
    if (num !== 233) {
      degree = num;
    }
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
  },
  tra_top: function () {
    this.forward(0);
  },
  tra_left: function () {
    this.forward(270);
  },
  tra_right: function () {
    this.forward(90);
  },
  tra_bot: function () {
    this.forward(180);
  },
  mov_top: function () {
    rotateZ(0);
    this.forward(233);
  },
  mov_left: function () {
    rotateZ(270);
    this.forward(233);
  },
  mov_right: function () {
    rotateZ(90);
    this.forward(233);
  },
  mov_bottom: function () {
    rotateZ(180);
    this.forward(233);
  }
};

(function () {
  addEvent(ctrl_btn, 'click', function () {
    var input = ctrl_cont.value.toUpperCase();
    switch (input) {
      case 'GO':
        return command.forward(233);
      case 'TUN LEF':
        return command.to_left();
      case 'TUN RIG':
        return command.to_right();
      case 'TUN BAC':
        return command.backward();
      case 'TRA TOP':
        return command.tra_top();
      case 'TRA RIG':
        return command.tra_right();
      case 'TRA LEF':
        return command.tra_left();
      case 'TRA BOT':
        return command.tra_bot();
      case 'MOV TOP':
        return command.mov_top();
      case 'MOV LEF':
        return command.mov_left();
      case 'MOV RIG':
        return command.mov_right();
      case 'MOV BOT':
        return command.mov_bottom();
    }
    alert('请按要求输入指令！');
  });

  addEvent(document, 'keyup', function (e) {
    var event = e || window.event;
    switch (event.keyCode) {
      case 37:
        return command.to_left();
      case 38:
        return command.forward(233);
      case 39:
        return command.to_right();
      case 40:
        return command.backward();
    }
  });

  initGrid();
})();