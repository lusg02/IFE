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

var addElem = function (target, regex, obj) {
	var input = getContent(target, regex);
	uniqueArr(input).forEach(function (elem) {
		if (!obj.isDuplicate()) {
			obj.rightIn(elem);
		}

		if (obj.isFull()) {
			obj.leftOut();
		}
	});
	target.value = '';
};

/**
 * 队列构造函数
 * @param target 需要渲染的目标元素
 * @constructor
 */
function Queue(target) {
	this.arr = [];
	this.isFull = function () {
		return (this.arr.length >= 10 );
	};
	this.isDuplicate = function (input) {
		return (this.arr.indexOf(input) !== -1);
	};
	this.rightIn = function (input) {
		if (!this.isDuplicate(input)) {
			this.arr.push(input);
			this.render();
		}
	};
	this.leftOut = function () {
		this.arr.shift();
	};
	this.render = function () {
		var text = '';
		this.arr.forEach(function (elem) {
			text += ('<span>' + elem + '</span>');
		});
		target.innerHTML = text;
	};
	this.delMember = function (elem) {
		var index = this.arr.indexOf(elem);
		this.arr.splice(index, 1);
		this.render();
	};
}

var input_tag = $('input_tag'),
		result_tag = $('result_tag'),
		input_love = $('input_love'),
		confirm = $('confirm'),
		result_love = $('result_love'),
		regex_tag = /[\s\n,，]/,
		regex_love = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;

// 实例tag
var tag = new Queue(result_tag);

// 添加tag
addEventHandler(input_tag, 'keyup', function (event) {
	if (event.keyCode === 13 || event.keyCode === 32 || event.keyCode === 188) {
		addElem(input_tag, regex_love, tag);
	}
});

// 鼠标移入、移出、点击事件
addEventHandler(result_tag, 'mouseover', function (event) {
	if (event.target.nodeName.toLowerCase() === 'span') {
		event.target.style.backgroundColor = '#000';
		event.target.firstChild.insertData(0, '删除:');
	}
});

addEventHandler(result_tag, 'mouseout', function (event) {
	if (event.target.nodeName.toLowerCase() === 'span') {
		event.target.style.backgroundColor = 'orange';
		event.target.firstChild.deleteData(0, 3);
	}
});

addEventHandler(result_tag, 'click', function (event) {
	if (event.target.nodeName.toLowerCase() === 'span') {

		result_tag.removeChild(event.target);

		// 因为鼠标移入时已经改变了innerHTML(增加了"删除:"),鼠标离开时只是改变了innerHTML未改变队列,所以需要对其进行操作
		var deleteMember = event.target.innerHTML.split(':')[1];
		// console.log(deleteMember);
		tag.delMember(deleteMember);
	}
});

// 实例love
var love = new Queue(result_love);

// 添加兴趣
addEventHandler(confirm, 'click', function () {
	addElem(input_love, regex_love, love);
});




