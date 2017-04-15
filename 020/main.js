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

/**
 * 处理输入的字符串，通过字符串split方法和数组filter方法返回数组
 * @returns {Array.<*>}
 */
var getContent = function () {
	return input_cont.value
			.trim()
			.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/)
			.filter(function (elem) {
				return elem !== '';
			});
};

var input_cont = $('input_cont'),
		result = $('result'),
		left_in = $('left-in'),
		left_out = $('left-out'),
		right_in = $('right-in'),
		right_out = $('right-out'),
		search_cont = $('search'),
		search_btn = $('search-btn');

var searchContent = function () {
	var searchCont = search_cont.value;
	Array.prototype.forEach.call(result.childNodes, function (elem) {
		elem.style.color = '#fff';
		elem.style.backgroundColor = 'orange';
		if (elem.innerHTML.indexOf(searchCont) !== -1) {
			elem.style.color = '#fcc';
			elem.style.backgroundColor = '#000';
		}
	});
};

var queue = {
	arr: [],
	isEmpty: function () {
		return (this.arr.length === 0);
	},
	leftIn: function (num) {
		this.arr.unshift(num);
		this.paint();
	},
	rightIn: function (num) {
		this.arr.push(num);
		this.paint();
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
			text += ('<div>' + item + '</div>');
		});
		result.innerHTML = text;
	},
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

addEventHandler(left_in, 'click', function () {

	var input = getContent();
	input.forEach(function (elem) {
		queue.leftIn(elem);
	});

	input_cont.value = '';
});

addEventHandler(right_in, 'click', function () {
	var input = getContent();
	input.forEach(function (elem) {
		queue.rightIn(elem);
	});

	input_cont.value = '';
});

addEventHandler(left_out, 'click', function () {
	queue.leftOut();
});

addEventHandler(right_out, 'click', function () {
	queue.rightOut();
});

addEventHandler(search_btn, 'click', function () {
	searchContent();
});
