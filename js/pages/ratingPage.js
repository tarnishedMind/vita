class ratingPage  extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.user = linkObjectsArr[0];
		this.department = linkObjectsArr[1];
	}
	
	formTableBlock() {
		var now = new Date();
		var formatedNow = now.format("yyyy-mm-dd");
		var lastMonth = new Date();
		lastMonth.setYear(lastMonth.getYear()-1);
		var formatedLast = lastMonth.format("yyyy-mm-dd");
		
		var dataArr = getRequest(this.serverPageUrl,{'beginPeriod':'2016-05-25','endPeriod':formatedNow});
		var nameArr = ['ID','Оценка','Дата оценивания', 'Комментарий', 'Пользователь', 'Предмет оценки'];
		
		var userData = getRequest(this.user.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<userData.length; j++)
			if(dataArr[i].userId == userData[j].id){
				dataArr[i].userId = userData[j].firstName+' '+userData[j].lastName;
				break;
			}
		
		var departmentData = getRequest(this.department.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<departmentData.length; j++)
			if(dataArr[i].userValueSliceId == departmentData[j].id){
				dataArr[i].userValueSliceId = departmentData[j].name;
				break;
			}
		
		var tt = super.formTableBlock(nameArr, dataArr, Array('delete'));
		$(tt).addClass("table table-bordered");
		
		return $(tt);
	}
	
	setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Оценка','Дата оценивания', 'Комментарий', 'Пользователь', 'Предмет оценки'];
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
}