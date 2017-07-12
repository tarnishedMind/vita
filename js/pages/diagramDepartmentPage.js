function average(a) {
  if (a.length == 0)
    throw "try to find average in empty array";
  let y = 0;
  a.forEach((x) => y += +x);
  return y / a.length;
}

class diagramDepartmentPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.department = linkObjectsArr[0];
		this.slice = linkObjectsArr[1];
	}
	
	formDiagram() {
    // Данные в том виде, в котором их надо
    // передать в функцию отрисовки графиков
		let graphicData = {
      id : [],
      department : [],
      value : []
    };		

		let departmentsData = getRequest(this.department.serverPageUrl, {});
		let slicesData = getRequest(this.slice.serverPageUrl, {});

    departmentsData.forEach((cur) => {
			graphicData.id.push(cur.id);
			graphicData.department.push(cur.name);
      let tmp = getRequest(this.serverPageUrl, { "departmentId" : cur.id });
      let values = tmp.map((x) => x.userValue);

      // Найдем среднюю оценку, которую пользователи поставили
      // (или 0, если никто еще не оценивал)
      let value = 0;
			if (values.length != 0)
        value = average(values);

      graphicData.value.push(value);
    });

		do_after_google_chart_loads(() => {
      show_data(2, graphicData)
    });;
	
	function resizeDiag(){// позволяет масштабировать график при изменении размеров окна
		window.onresize = function(){// Ловим изменение окна
		//alert('Размер окна был изменен!');
		do_after_google_chart_loads(() => {show_data(2, graphicData)}); // Рисуем график
		}
	}	
	resizeDiag();
	
	
	}
}
