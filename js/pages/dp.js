function myLogger(x) {
  console.log("---> " + x);
}

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

			let sliceArr = [];
			for (let i = 0; i < slicesData.length; i++)
				if (slicesData[i].departmentId == cur.id)
					sliceArr.push(slicesData[i].id);

			let valueArr = [];
			let valuesData = getRequest(this.serverPageUrl, {});		
			for (let i = 0; i < sliceArr.length; i++)
				for (let j = 0; j < valuesData.length; j++)
					if (valuesData[j].userValueSliceId == sliceArr[i])
						valueArr.push(valuesData[j].userValue);
		
			graphicData.value.push(average(valueArr));
    })

    console.log("OLOLO!");
    console.log(graphicData);
		do_after_google_chart_loads(() => show_data(2, graphicData));;
	}
}
