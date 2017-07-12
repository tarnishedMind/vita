function get_date(element) {
  let date;
  try {
    date = $.datepicker.parseDate(dateFormat, element.value);
  } catch( error ) {
    date = null;
  }

  return date;
}

class diagramMonthPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.department = linkObjectsArr[0];
		this.slice = linkObjectsArr[1];
	}

  bad_interval_message() {
    alert('Введите корректный интервал');
  }

  buildForDepartment(departmentData){
    let id = this.current_id;
    function reformateDate(date) {
      let b = date.split('.');
      return b[2] + '-' + b[1] + '-' + b[0];
    }

    function toTime(date) {
      let b = date.split('-');
      return new Date(b[0], b[1] - 1, b[2]);
    }	
	
	

    let time_begin = reformateDate(this.begin_date);
    let time_end   = reformateDate(this.end_date);

    if (toTime(time_begin) > toTime(time_end)) {
      this.bad_interval_message();
      return;
    }
    console.log(time_begin, time_end);

    //console.log(getRequest(this.slice.serverPageUrl, {}));
    let name = "";
    departmentData.forEach((x) => {
      if (id == x.id)
        name = x.name;
    });

    let g_data = { date : [], value : [] };	

    // Информация о временных периодах, когда производилась оценка
    // timeSlice -- момент времени
    // id -- id слайса
    
		//let slicesData = getRequest(this.slice.serverPageUrl, { "departmentId" : id });
    let options = {
      "departmentId" : id,
      "beginPeriod" : time_begin,
      "endPeriod" : time_end
    };

    console.log(options);

    let marks = getRequest(this.serverPageUrl, options);

    marks.sort((a, b) => {
      let time_a = str_to_time(a.userValueDate);
      let time_b = str_to_time(b.userValueDate);
      if (time_a > time_b) return +1;
      else if (time_a < time_b) return -1;
      return 0;
    });

    marks.forEach((x) => console.log(x.userValueDate, x.userValue));

    let trunc_date = (date) => date.split(' ')[0] + ' 00:00:00';
    marks.forEach((a) => { a.userValueDate = trunc_date(a.userValueDate); });
    //marks.forEach((x) => console.log(x.userValueDate));

    let avg = {};
    marks.forEach((a) => { avg[a.userValueDate] = []; });
    marks.forEach((a) => { avg[a.userValueDate].push(a.userValue); });
    for (let key in avg) {
      g_data.date.push(key);
      g_data.value.push(average(avg[key]));
    }

    let time_interval = [toTime(time_begin), toTime(time_end)];
    console.log(time_interval);
	do_after_google_chart_loads(() => show_data(1, g_data, time_interval)); //отрисовка!!!!!!!!!!	
	
	
	function resizeDiag(){// позволяет масштабировать график при изменении размеров окна
		window.onresize = function(){// Ловим изменение окна
		//alert('Размер окна был изменен!');
		do_after_google_chart_loads(() => show_data(1, g_data, time_interval)); // Рисуем график
		}
	}	
	resizeDiag();
}


  
  
  init_calendar() {
    let dateFormat = "dd.mm.yy";

    let it = this;
	var today = new Date();
	today.setMonth(today.getMonth()-3)
    it.begin_date = $('#from_field')[0].value = today.toString('dd.MM.yyyy');
	today = new Date();
	today.setMonth(today.getMonth()+3)
    it.end_date   = $('#to_field')[0].value = today.toString('dd.MM.yyyy');

    $("#graphic_show").click(function() {
	  it.begin_date = $('#from_field')[0].value;
	  it.end_date   = $('#to_field')[0].value;
	  
      it.buildForDepartment(it.departmentData);
    })
  }

	formDiagram() {
		

		let departmentData = getRequest(this.department.serverPageUrl, {});		
		this.departmentData = departmentData;

		$('.dropdown-search').empty();
		departmentData.forEach((x) => {
		  $('.dropdown-search').append($("<option value='" + x.id + "'>" + x.name + "</option>"));
		});

    this.init_calendar();
    this.current_id = departmentData[0].id;
    this.buildForDepartment(departmentData);
    let it = this;

		$(".dropdown-search").change(function() { 
      let departmentId = $(this).val();
      it.current_id = departmentId;
      it.buildForDepartment(it.departmentData);
    });
	}	
	
	
	
}



/*
// Ловим изменение размера окна
window.onresize = function (){    
alert('Размер окна был изменен!');

}


while (true) {
  
}
*/

