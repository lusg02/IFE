/**
* aqiData，存储用户输入的空气指数数据
* 示例格式：
* aqiData = {
*    "北京": 90,
*    "上海": 40
* };
*/
var aqiData = {};

var $ = function (id) {
  return document.getElementById(id);
};

var cr = function (tag) {
  return document.createElement(tag);
};

/**
* 从用户输入中获取数据，向aqiData中增加一条数据
* 然后渲染aqi-list列表，增加新增的数据
*/
function addAqiData() {
  var city = $('aqi-city-input').value.trim();
  var value = $('aqi-value-input').value.trim();

  if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
    alert('城市名必须为中文或者英文');
  return;
  }
  if (!value.match(/^\d+$/)) {
    alert('请输入数字！');
    return;
  }

  aqiData[city] = value;

}

/**
* 渲染aqi-table表格
*/
function renderAqiList() {
  var table = $('aqi-table');
  table.innerHTML = '';
  for (var city in aqiData) {
    if (table.children.length === 0) {
    table.innerHTML = '<tr><td城市</td><td>空气质量</td><td>操作</td></tr>';
  }

    var tr = cr('tr');

    var td_city = cr('td');
    td_city.innerHTML = city;
    tr.appendChild(td_city);

    var td_num = cr('td');
    td_num.innerHTML = aqiData[city];
    tr.appendChild(td_num);
  
    var td_del = cr('td');
    td_del.innerHTML = '<button class="del-btn">删除</button>';
    tr.appendChild(td_del);
  
    table.appendChild(tr);
  }
}

/**
* 点击add-btn时的处理逻辑
* 获取用户输入，更新数据，并进行页面呈现的更新
*/
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
* 点击各个删除按钮的时候的处理逻辑
* 获取哪个城市数据被删，删除数据，更新表格显示
*/
function delBtnHandle(target) {
  // do sth.
  var tr = target.parentNode.parentNode;
  var city = tr.children[0].innerHTML;
  delete aqiData[city];
  renderAqiList();
}

function init() {

// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $('add-btn').addEventListener('click', function () {
  addBtnHandle();
  });

// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = $('aqi-table');

  table.addEventListener('click', function (e) {
  if (e.target && e.target.nodeName === 'BUTTON') {
    delBtnHandle(e.target);
  }
  });

}

init();
