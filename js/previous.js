var google_chart_loaded = false;
var do_after_google_chart_loads_list = [];
function do_after_google_chart_loads(func) {
  if (google_chart_loaded) func();
  else do_after_google_chart_loads_list.push(func);
}


$(function(){
  google.charts.load('current',{packages : [ 'corechart', 'bar', 'line'], 'language' : 'ru'});
  google.charts.setOnLoadCallback(()=> {
    google_chart_loaded = true;
    do_after_google_chart_loads_list.forEach((x) => x());
    do_after_google_chart_loads_list = [];
  });
});