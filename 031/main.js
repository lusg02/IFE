var $ = function (id) {
  return document.getElementById(id);
};

var job = $('job'), school = $('school'), city = $('city'), company = $('company');

var job_radio = job.getElementsByTagName('input');
var school_company = document.getElementsByClassName('school_company')[0];

var jobRadioChange = function () {
  if (job_radio[0].checked) {
    school.style.display = 'block';
    company.style.display = 'none';
  } else {
    school.style.display = 'none';
    company.style.display = 'block';
  }
  if (!job_radio[0].checked && !job_radio[1].checked) {
    school_company.style.display = 'none';
  } else {
    school_company.style.display = 'block';
  }
};
for (var i=0; i<2; i++) {
  job_radio[i].addEventListener('change', function () {
    jobRadioChange();
  }, false);
}


var city_list = city.getElementsByTagName('option');
var school_list = school.getElementsByClassName('school');

var cityChange = function () {
  Array.prototype.forEach.call(city_list, function (elem, index) {
    if (elem.selected) {
      school_list[index].style.display = 'inline-block';
    } else {
      school_list[index].style.display = 'none';
    }
  });
};

city.addEventListener('click', function () {
  cityChange();
}, false);




