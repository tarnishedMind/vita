class ratingPage  extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.sanatorium = linkObjectsArr[0];
		this.province = linkObjectsArr[1];
		this.rank = linkObjectsArr[2];
		this.team = linkObjectsArr[3];
	}
	
	formTableBlock() {
		//var now = new Date();
		//var formatedNow = now.format("yyyy-mm-dd");
		//var lastMonth = new Date();
		//lastMonth.setYear(lastMonth.getYear()-1);
		//var formatedLast = lastMonth.format("yyyy-mm-dd");
		
		//var dataArr = getRequest(this.serverPageUrl,{'beginPeriod':'2016-05-25','endPeriod':formatedNow});
		
		
		// НАЧАЛО 1 ТАБЛИЦА!!!!!!!! пользователи - ?type=users
		var dataArr = getRequest(this.serverPageUrl,{'type':'users'});
		var nameArr = ['ID','Отряд','Звание','Имя','Фамилия','Пол','Статус подтверждения','XP','Звёзды','Монеты'];				
		
		
		var teamData = getRequest(this.team.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<teamData.length; j++)
			if(dataArr[i].teamId == teamData[j].id){
				dataArr[i].teamId = teamData[j].name;
				break;
			}
			
		var rankData = getRequest(this.rank.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<rankData.length; j++)
			if(dataArr[i].rankId == rankData[j].id){
				dataArr[i].rankId = rankData[j].rankText;
				break;
			}	
		// КОНЕЦ 1 ТАБЛИЦА!!!!!!!! пользователи - ?type=users
		
		
		
		/*
		// НАЧАЛО 2 ТАБЛИЦА!!!!!!!!!!!!отряды - ?type=teams
		var dataArr = getRequest(this.serverPageUrl,{'type':'teams'});
		var nameArr = ['ID','Название','Санаторий','Губерния','XP','Звёзды','Монеты'];
		
		
		var provinceData = getRequest(this.province.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<provinceData.length; j++)
			if(dataArr[i].provinceId == provinceData[j].id){
				dataArr[i].provinceId = provinceData[j].name;
				break;
			}
			
		var sanatoriumData = getRequest(this.province.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<provinceData.length; j++)
			if(dataArr[i].sanatoriumId == sanatoriumData[j].id){
				dataArr[i].sanatoriumId = sanatoriumData[j].name;
				break;
			}
			
		// КОНЕЦ 2 ТАБЛИЦА!!!!!!!!!!!!отряды - ?type=teams		
		*/
		
		
		/*
		// НАЧАЛО 3 ТАБЛИЦЫ!!!!!!!!!!!!!!! ?type=provinces 
		var dataArr = getRequest(this.serverPageUrl,{'type':'provinces'});
		var nameArr = ['ID','Название','XP','Звёзды','Монеты'];
		*/
		
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