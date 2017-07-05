class progressPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.user = linkObjectsArr[0];
		this.hideTokenIdStoreBlockName = 'qrCodeId';
	}
	
	formAddBlock() {
		super.formAddBlock();
		var globalDiv = element();		
		$(globalDiv).append(element('input', {'name':'xp','type':'hidden','id':'xp','value':''}, null, null, null));
		$(globalDiv).append(element('input', {'name':'stars','type':'hidden','id':'stars','value':''}, null, null, null));
		$(globalDiv).append(element('input', {'name':'coins','type':'hidden','id':'coins','value':''}, null, null, null));
		
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':this.hideTokenIdStoreBlockName,'name':this.hideTokenIdStoreBlockName}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var usersData = getRequest(this.user.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<usersData.length; i++){
			var op = element('option', {'name':'userId', 'id':usersData[i].id}, null, null, [usersData[i].firstName]);
			ops.push(op);
		}
		var s = element('select', {'id': 'userId', 'for':'users'}, null, null, ops);		
		var l2 = element('label', {'for':'users'}, {'margin-right':'10px'}, null, 'Витальянец:');
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,s]));
		
		var l1 = element('label', {'for':'dateTimeScanned'}, null, null, ['Дата сканирования']);
		var i1 = element('input', {'name':'dateTimeScanned','type':'text','placeholder':'Дата сканирования','id':'dateTimeScanned'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':this.hideTokenIdStoreBlockName,'name':this.hideTokenIdStoreBlockName}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var usersData = getRequest(this.user.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<usersData.length; i++){
			var op = element('option', {'name':'userId', 'id':usersData[i].id}, null, null, [usersData[i].firstName]);
			ops.push(op);
		}
		var s = element('select', {'id': 'userId', 'for':'sanatoriums'}, null, null, ops);		
		var l2 = element('label', {'for':'sanatoriums'}, {'margin-right':'10px'}, null, 'Витальянец:');
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,s]));
		
		var l1 = element('label', {'for':'dateTimeScanned'}, null, null, ['Дата сканирования']);
		var i1 = element('input', {'name':'dateTimeScanned','type':'text','placeholder':'Дата сканирования','id':'dateTimeScanned'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}

	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','QR-код','Пользователь','Дата сканирования'];		
		
		var usersData = getRequest(this.user.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<usersData.length; j++)
			if(dataArr[i].userId == usersData[j].id){
				dataArr[i].userId = usersData[j].firstName;
				break;
			}
		}
		
		var tt = super.formTableBlock(nameArr, dataArr, Array('edit','delete','show'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	formPrintBlock(eventHandler, tdWithId, tdWithName) {		
		super.formPrintBlock(eventHandler, tdWithId, tdWithName);
	}
	
	/*setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Название'];		
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");

		return $(tt);
	}*/
}