class userPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.team = linkObjectsArr[0];
		this.rank = linkObjectsArr[1];
	}

	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Имя','Фамилия', 'Отряд', 'Пол', 'Подтверждение', 'Звание'];		
		
		var teamsData = getRequest(this.team.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<teamsData.length; j++)
			if(dataArr[i].teamId == teamsData[j].id){
				dataArr[i].teamId = teamsData[j].name;
				break;
			}
			if(dataArr[i].ack == 0) dataArr[i].ack = 'Подтверждён';
			if(dataArr[i].ack == 1) dataArr[i].ack = 'Не подтверждён';
		}
		
		var rankData = getRequest(this.rank.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<rankData.length; j++)
			if(dataArr[i].rankId == rankData[j].id){
				dataArr[i].rankId = rankData[j].rankText;
				break;
			}
		
		var tt = super.formTableBlock(nameArr, dataArr, Array());
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Имя','Фамилия', 'ID отряда', 'Пол', 'Подтверждение'];
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	/*formAddBlock() {
		super.formAddBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		var l1 = element('label', {'for':'firstName'}, null, null, ['Имя']);
		var i1 = element('input', {'name':'firstName','type':'text','placeholder':'Имя пользователя','id':'firstName'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));		
		var l2 = element('label', {'for':'lastName'}, null, null, 'Фамилия');
		var i2 = element('input', {'name':'lastName','type':'text','placeholder':'Фамилия','id':'lastName'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		var teamsData = getRequest(this.team.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<teamsData.length; i++){
			var op = element('option', {'name':'teamId', 'id':teamsData[i].id}, null, null, [teamsData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'teamId', 'for':'teamId'}, null, null, ops);		
		var l2 = element('label', {'for':'teamId'}, {'margin-right':'10px'}, null, 'Отряд:');
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,s]));
		
		var ranksData = getRequest(this.rank.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<ranksData.length; i++){
			var op = element('option', {'name':'rankId', 'id':ranksData[i].id}, null, null, [ranksData[i].rankText]);
			ops.push(op);
		}
		var s2 = element('select', {'id': 'rankId', 'for':'rankId'}, null, null, ops);		
		var l22 = element('label', {'for':'rankId'}, {'margin-right':'10px'}, null, 'Звание:');
		$(globalDiv).append(element('div', null, null, ["form-group"], [l22,s2]));
		
		var l4 = element('label', {'for':'gender'}, null, null, 'Пол');
		var i4 = element('input', {'name':'gender','type':'text','placeholder':'Пол','id':'gender'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l4,i4]));
		$(globalDiv).append(element('input', {'type':'hidden','value':'0','id':'ack'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		var l1 = element('label', {'for':'firstName'}, null, null, ['Имя']);
		var i1 = element('input', {'name':'firstName','type':'text','placeholder':'Имя пользователя','id':'firstName'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));		
		var l2 = element('label', {'for':'lastName'}, null, null, 'Фамилия');
		var i2 = element('input', {'name':'lastName','type':'text','placeholder':'Фамилия','id':'lastName'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		var teamsData = getRequest(this.team.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<teamsData.length; i++){
			var op = element('option', {'name':'teamId', 'id':teamsData[i].id}, null, null, [teamsData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'teamId', 'for':'teamId'}, null, null, ops);		
		var l2 = element('label', {'for':'teamId'}, {'margin-right':'10px'}, null, 'Отряд:');
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,s]));
		
		var ranksData = getRequest(this.rank.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<ranksData.length; i++){
			var op = element('option', {'name':'rankId', 'id':ranksData[i].id}, null, null, [ranksData[i].rankText]);
			ops.push(op);
		}
		var s2 = element('select', {'id': 'rankId', 'for':'rankId'}, null, null, ops);		
		var l22 = element('label', {'for':'rankId'}, {'margin-right':'10px'}, null, 'Звание:');
		$(globalDiv).append(element('div', null, null, ["form-group"], [l22,s2]));
		
		var l4 = element('label', {'for':'gender'}, null, null, 'Пол');
		var i4 = element('input', {'name':'gender','type':'text','placeholder':'Пол','id':'gender'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l4,i4]));
		$(globalDiv).append(element('input', {'type':'hidden','value':'0','id':'ack'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}*/
}