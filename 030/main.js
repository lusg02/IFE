var $ = function (el) {
  return document.querySelector(el);
};
var $$ = function (el) {
  return document.querySelectorAll(el);
};

var addHandler = function (elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, handler);
  } else {
    elem['on' + type] = handler;
  }
};

var hint_data = [
  {
    hint: '必填，长度为4-16个字符',
    empty: '名称不能为空',
    success: '名称格式正确',
    fail: '长度为4-16个字符',
    isPassed: false
  },
  {
    hint: '必填，长度为6-16，包含字母和数字',
    empty: '密码不能为空',
    success: '密码可用',
    fail: '密码应为包含字母和数字，长度为6-16位',
    isPassed: false
  },
  {
    hint: '再次输入相同密码',
    empty: '请再次输入密码',
    success: '通过',
    fail: '两次密码输入不一致，请重新输入',
    isPassed: false
  },
  {
    hint: '请填写电子邮件',
    empty: '邮箱不能为空',
    success: '通过',
    fail: '邮箱格式有误',
    isPassed: false
  },
  {
    hint: '请输入手机号码',
    empty: '手机不能为空',
    success: '可用',
    fail: '请输入正确的号码！',
    isPassed: false
  }
];


/**
 * 计算输入内容的长度
 * @param str 输入内容
 * @returns {number} 返回长度
 */
var get_length = function (str) {
  var inputLength = 0;
  for (var i = 0; i < str.length; i++) {
    var unicode_num = str.charCodeAt(i);
    if (unicode_num >= 0 && unicode_num <= 128) {
      inputLength += 1;
    } else {
      inputLength += 2;
    }
  }
  return inputLength;
};

var rules = {
  input_name: {
    isPassed: function (input) {
      return (get_length(input) >= 4 && get_length(input) <= 16);
    }
  },
  password: {
    isPassed: function (input) {
      return /^[a-zA-Z0-9]{6,16}$/.test(input);
    }
  },
  confirm_pass: {
    isPassed: function (input) {
      return (input === $('#password').value.trim());
    }
  },
  e_mail: {
    isPassed: function (input) {
      return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(input);
    }
  },
  phone: {
    isPassed: function (input) {
      return /^[1][0-9]{10}$/.test(input);
    }
  },
  isEmpty: function (input) {
    return (get_length(input) === 0);
  }
};

var input_name = $('#name'),
    password = $('#password'),
    confirm_pass = $('#confirm_pass'),
    phone = $('#phone'),
    confirm = $('#confirm'),
    info = $$('p'),
    e_mail = $('#e_mail');

var arr = [];
var arr2 = [];
arr.push(input_name, password, confirm_pass, e_mail, phone);
arr2.push('input_name', 'password', 'confirm_pass', 'e_mail', 'phone');

// 获得焦点
arr.forEach(function (elem, index) {
  addHandler(elem, 'focus', function () {
    info[index].innerHTML = hint_data[index].hint;
  });
});

// 失去焦点
arr.forEach(function (elem, index) {

  addHandler(elem, 'blur', function () {
    var input = this.value.trim();
    if (rules.isEmpty(input)) {
      this.style.borderColor = 'red';
      info[index].innerHTML = hint_data[index].empty;
      info[index].style.color = 'red';
      hint_data[index].isPassed = false;
    } else if (rules[arr2[index]].isPassed(input)) {
      info[index].innerHTML = hint_data[index].success;
      info[index].style.color = 'green';
      this.style.borderColor = 'green';
      hint_data[index].isPassed = true;
    } else {
      info[index].innerHTML = hint_data[index].fail;
      info[index].style.color = 'red';
      this.style.borderColor = 'red';
      hint_data[index].isPassed = false;
    }
  });
});

var isFormPassed = false;

// 提交表单
addHandler(confirm, 'click', function () {

  for (var i=0; i<hint_data.length; i++) {
    if (hint_data[i].isPassed) {
      isFormPassed = true;
    } else {
      isFormPassed = false;
      break;
    }
  }
  if (isFormPassed) {
    alert('提交成功');
  } else {
    alert('输入有误！');
  }
});







