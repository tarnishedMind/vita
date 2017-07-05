'use strict';

function str_to_time(str) {
  //let a = '5/1/2017'.split('/');
  let dt = str.split(' ');
  let a = dt[0].split('-');
  let t = dt[1].split(':');

  a[1]--;
  if (dt[0] == "0001-01-01" || dt[0] == "0000-00-00") {
    let d = new Date();
    a = [ d.getYear(), d.getMonth(), d.getDate() ];
  }
  return new Date(a[0], a[1], a[2], t[0], t[1], t[2]);
}

function one_department_plot(data, start_time, end_time) {
  let chart_data = new google.visualization.DataTable();

  chart_data.addColumn('date', 'Дата');
  chart_data.addColumn('number', 'Оценка');

  var options = {
    title : 'Оценки пользователей за период',
    hAxis : {
      title : 'Дата',
      viewWindow : {
        min : start_time,
        max : end_time
      }
    },
    vAxis : {
      title : 'Оценка',
      minValue : 0,
      maxValue : 5,
      ticks : [ 1, 2, 3, 4, 5 ]
    },
    legend : {position : 'none'}
  };

  let transformed_data = data.date.map((d, i) => [str_to_time(d), data.value[i]]);
  chart_data.addRows(transformed_data);

  var chart =
      new google.visualization.LineChart(document.getElementById('diagram'));
  chart.draw(chart_data, options);
}

function many_departments_plot(data) {
  let chart_data = new google.visualization.DataTable();
  chart_data.addColumn('string', 'Название подразделения');
  chart_data.addColumn('number', 'Оценка');
  chart_data.addColumn({type: 'string', role: 'style'});

  var options = {
    title : 'Оценки пользователей за последний месяц',
    hAxis : {title : 'Подразделение'},
    vAxis : {
      title : 'Оценка',
      minValue : 0,
      maxValue : 5,
      ticks : [ 1, 2, 3, 4, 5 ]
    },
    legend: {position: 'none'}
  };

  let colors =
    ['#73d216', '#3465a4', '#75507b',
    '#cc0000', '#c17d11', '#f57900'];
  let transformed_data = data.department.map((d, i) => [d, data.value[i], colors[i]]);
  chart_data.addRows(transformed_data);

  var chart =
      new google.visualization.ColumnChart(document.getElementById('diagram'));
  chart.draw(chart_data, options);
}

function show_data(num, real_data, time){
  if (num == 1)
    one_department_plot(real_data, time[0], time[1]);
  else
    many_departments_plot(real_data);
}

$(function() {
  google.charts.load('current', { packages : [ 'corechart', 'bar', 'line'], 'language' : 'ru'});
});
