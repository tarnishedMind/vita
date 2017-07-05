class userCredentalPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.team = linkObjectsArr[0];
		this.rank = linkObjectsArr[1];
	}

	formAddBlock() {
		super.formAddBlock();
		
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'0','id':'ack','name':'ack'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'0','id':'role','name':'role'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'0','id':'rankId','name':'rankId'}, null, null, null));
		
		var l1 = element('label', {'for':'firstName'}, null, ["control-label"], ['Имя:']);
		var i1 = element('input', {'name':'firstName','type':'text','id':'firstName'}, {'margin-top':'5px'}, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'lastName'}, null, ["control-label"], ['Фамилия:']);
		var i2 = element('input', {'name':'lastName','type':'text','id':'lastName'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));

		var l2 = element('label', {'for':'teamId'}, null, ["control-label"], ['Отряд:']);
		var teamData = getRequest(this.team.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<teamData.length; i++){
			var op = element('option', {'name':'teamId', 'id':teamData[i].id}, null, null, [teamData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'teamId', 'for':'team'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		var l2 = element('label', {'for':'gender'}, null, ["control-label"], ['Пол:']);
		var ops = Array();
		var ops = [
			element('option', {'name':'gender', 'id':0}, null, null, ["Мужской"]),
			element('option', {'name':'gender', 'id':1}, null, null, ["Женский"])
		];
		var s = element('select', {'id': 'gender', 'for':'gender'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		var l2 = element('label', {'for':'login'}, null, ["control-label"], ['Логин:']);
		var i2 = element('input', {'name':'login','type':'text','id':'login'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		var l2 = element('label', {'for':'password'}, null, ["control-label"], ['Пароль:']);
		var i2 = element('input', {'name':'password','type':'password','id':'password'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'firstName'}, null, ["control-label"], ['Имя:']);
		var i1 = element('input', {'name':'firstName','type':'text','id':'firstName'}, {'margin-top':'5px'}, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'lastName'}, null, ["control-label"], ['Фамилия:']);
		var i2 = element('input', {'name':'lastName','type':'text','id':'lastName'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		var l2 = element('label', {'for':'teamId'}, null, ["control-label"], ['Отряд:']);
		var teamData = getRequest(this.team.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<teamData.length; i++){
			var op = element('option', {'name':'teamId', 'id':teamData[i].id}, null, null, [teamData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'teamId', 'for':'team'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		var l2 = element('label', {'for':'gender'}, null, ["control-label"], ['Пол:']);
		var ops = Array();
		var ops = [
			element('option', {'name':'gender', 'id':0}, null, null, ["Мужской"]),
			element('option', {'name':'gender', 'id':1}, null, null, ["Женский"])
		];
		var s = element('select', {'id': 'gender', 'for':'gender'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		var genderSelect = element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]);
		var d2 = element('div', null, null, ["inner"], [genderSelect]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);
		
		var l2 = element('label', {'for':'rankId'}, null, ["control-label"], ['Звание:']);
		var rankData = getRequest(this.rank.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<rankData.length; i++){
			var op = element('option', {'name':'rankId', 'id':rankData[i].id}, null, null, [rankData[i].rankText]);
			ops.push(op);
		}
		var s = element('select', {'id': 'rankId', 'for':'rank'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		var rankSelect = element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]);
		var d2 = element('div', null, null, ["inner"], [rankSelect]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22]));
		
		var l2 = element('label', {'for':'login'}, null, ["control-label"], ['Логин:']);
		var i2 = element('input', {'name':'login','type':'text','id':'login'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		var l2 = element('label', {'for':'password'}, null, ["control-label"], ['Пароль:']);
		var i2 = element('input', {'name':'password','type':'password','id':'password'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22]));
		
		var l2 = element('label', {'for':'ack'}, null, ["control-label"], ['Подтверждение:']);
		var i2 = element('input', {'name':'ack','type':'text','id':'ack'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		var l2 = element('label', {'for':'role'}, null, ["control-label"], ['Роль:']);
		var i2 = element('input', {'name':'role','type':'text','id':'role'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Имя', 'Фамилия', 'Отряд', 'Пол', 'Подтверждение', 'Звание', 'Логин'/*, 'Дата регистрации'*/, 'Роль'];
		
		var teamsData = getRequest(this.team.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<teamsData.length; j++)
			if(dataArr[i].teamId == teamsData[j].id){
				dataArr[i].teamId = teamsData[j].name;
				break;
			}
			if(dataArr[i].ack.indexOf('1') != -1) dataArr[i].ack = 'Подтверждён';
			if(dataArr[i].ack.indexOf('0') != -1) dataArr[i].ack = 'Не подтверждён';
			
			if(dataArr[i].gender.indexOf('1') != -1) dataArr[i].gender = 'Ж';
			if(dataArr[i].gender.indexOf('0') != -1) dataArr[i].gender = 'М';
		}
		
		var ranksData = getRequest(this.rank.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<ranksData.length; j++)
			if(dataArr[i].rankId == ranksData[j].id){
				dataArr[i].rankId = ranksData[j].rankText;
				break;
			}
			
		for(var i=0; i<dataArr.length; i++){
			delete dataArr[i].password;
			//delete dataArr[i].role;
			delete dataArr[i].registrationDate;
		}
			
		var tt = super.formTableBlock(nameArr, dataArr, Array('edit','delete'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Название', 'ID санатория'];		
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
}