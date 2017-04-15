var $ = function (id) {
  return document.getElementById(id);
};

var addEventHandler = function (elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, handler);
  } else {
    elem['on' + type] = handler;
  }
};

var validate_num = function (num) {
  if ((/^[0-9]+$/).test(num)) {
    return (num >= 10 && num <= 100);
  }
}

var input_num = $('input_num'),
	result = $('result'),
	left_in = $('left-in'),
	left_out = $('left-out'),
	right_in = $('right-in'),
	right_out = $('right-out'),
	sort = $('sort');

var queue = {
  arr: [],
  isEmpty: function () {
    return (this.arr.length === 0);
  },
  isFull: function () {
    return (this.arr.length >= 60);
  },
  leftIn: function (num) {
    if (!this.isFull()) {
	this.arr.unshift(num);
	this.paint();
    } else {
	alert('满了满了!');
    }
  },
  rightIn: function (num) {
    if (!this.isFull()) {
      this.arr.push(num);
      this.paint();
      console.log(this.arr.length);
    } else {
      alert('满了满了!');
    }
  },
  leftOut: function () {
    if (!this.isEmpty()) {
      alert(this.arr.shift());
      this.paint();
    } else {
      alert('早就空了！');
    }
  },
  rightOut: function () {
    if (!this.isEmpty()) {
      alert(this.arr.pop());
      this.paint();
    } else {
      alert('早就空了！');
  }
  },
  paint: function () {
    var text = '';
    this.arr.forEach(function (item) {
      text += ('<div style="height:' + parseInt(item) * 2 + 'px">' + item + '</div>');
    });
    result.innerHTML = text;
    // addDelEvent();
  },
// delMember: function (id) { // 闭包方式删除
//   this.arr.slice(id, 1);
//   this.paint();
// }
  delMember: function (member) {
    var index = this.arr.indexOf(member);
    this.arr.splice(index, 1);
    this.paint();
  }
};

// 事件委托实现删除
addEventHandler(result, 'click', function (event) {
  if (event.target.nodeName.toLowerCase() === 'div') {
    result.removeChild(event.target);
    var deleteMember = parseInt(event.target.innerHTML);
    queue.delMember(deleteMember);
  }
});

// 冒泡排序
function bubbleSort() {
  var timer;
  var count = 0, i = 0;
  timer = setInterval(function () {
    if (count >= queue.arr.length) {
    clearInterval(timer);
  }
  if (i === queue.arr.length - 1 - count) {
    i = 0;
    count++;
  }
  if (queue.arr[i] > queue.arr[i + 1]) {
    var temp = queue.arr[i];
    queue.arr[i] = queue.arr[i + 1];
    queue.arr[i + 1] = temp;
    queue.paint();
  }
  i++;
  }, 100);
}


// 闭包实现删除(这时候queue.paint里要对其进行调用)
// function addDelEvent() {
//  for (var i = 0; i < result.childNodes.length; i++) {
//
//    // 这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的i值(length);
//    addEventHandler(result.childNodes[i], 'click', function (i) {
//      return function () {
//        return queue.delMember(i);
//      };
//    }(i));
//  }
// }

addEventHandler(left_in, 'click', function () {
  var input = parseInt(input_num.value);
  if (validate_num(input)) {
    queue.leftIn(input);
  } else {
    alert('请输入10到100之间的整数！');
  }
  input_num.value = '';
});

addEventHandler(right_in, 'click', function () {
  var input = parseInt(input_num.value);
  if (validate_num(input)) {
    queue.rightIn(input);
  } else {
    alert('请输入10到100之间的整数');
  }
  input_num.value = '';
});

addEventHandler(left_out, 'click', function () {
  queue.leftOut();
});

addEventHandler(right_out, 'click', function () {
  queue.rightOut();
});

addEventHandler(sort, 'click', function () {
  bubbleSort();
})
