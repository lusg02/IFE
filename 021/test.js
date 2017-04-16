// 公共方法
/**
 * 通过id获取DOM元素
 * @param id
 * @returns {Element}
 */
var $ = function (id) {
  return document.getElementById(id);
};

// 事件处理函数
var addEventHandler = function (elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, handler);
  } else {
    elem['on' + type] = handler;
  }
};

/**
 * 数组去重
 * @param arr 需要去重的数组
 * @returns {Array} 去重后的数组
 */
var uniqueArr = function (arr) {
  var ret = [];
  arr.forEach(function (elem) {
    if (ret.indexOf(elem) === -1) {
      ret.push(elem);
    }
  });
  return ret;
};

// 封装删除函数
var deleteEvent = function (parent, childNode,event) {
  if (event.target.nodeName.toLowerCase() === childNode) {
    parent.removeChild(event.target);
    var deleteMember = event.target.innerHTML;
    queue.delMember(deleteMember);
  }
};

/**
 * 处理输入的字符串，通过字符串split方法和数组filter方法返回数组
 * @returns {Array.<*>}
 */
var getContent = function (target, regex) {
  return target.value
      .trim()
      .split(regex)
      .filter(function (elem) {
        return elem !== '';
      });
};

var addElem = function (target, regex, parent) {
  var input = getContent(target, regex);
  uniqueArr(input).forEach(function (elem) {
    queue.rightIn(elem, parent);
    if (queue.isFull()) {
      queue.leftOut();
    }
  });

  target.value = '';
};

var input_tag = $('input_tag'),
    result_tag = $('result_tag'),
    input_love = $('input_love'),
    confirm = $('confirm'),
    result_love = $('result_love'),
    regex_tag = /[\s\n,，]/,
    regex_love = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;


var queue = {
  arr: [],
  rightIn: function (input, target) {
    if (!this.isDuplicate(input)) {
      this.arr.push(input);
      this.render(target);
    }
	  console.log(this.isDuplicate(input));
  },
  isFull: function () {
    return (this.arr.length > 10);
  },
  isEmpty: function () {
    return (this.arr.length === 0);
  },
  isDuplicate: function (input) {
    return (this.arr.indexOf(input) !== -1);
  },
  leftOut: function () {
    this.arr.shift();
    this.render();
  },
  render: function (target) {
    var text = '';
    this.arr.forEach(function (elem) {
      text += ('<span>' + elem + '</span>');
    });
    target.innerHTML = text;
  },
  delMember: function (elem) {
    var index = this.arr.indexOf(elem);
    this.arr.splice(index, 1);
    this.render();
  }
};

addEventHandler(input_tag, 'keyup', function (event) {
  if (event.keyCode === 13 || event.keyCode === 32 || event.keyCode === 188) {
    addElem(input_tag, regex_tag, result_tag);
  }
});

addEventHandler(result_love, 'click', function () {
  deleteEvent(this, 'span', event);
});


// addEventHandler(left_out, 'click', function () {
//   queue.leftOut();
// });

addEventHandler(confirm, 'click', function () {
  addElem(input_love, regex_love, result_love);
});

