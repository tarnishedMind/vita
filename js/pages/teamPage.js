class teamPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.sanatorium = linkObjectsArr[0];
		this.province = linkObjectsArr[1];
	}

	formAddBlock() {
		super.formAddBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'name'}, null, ["control-label"], ['Название отряда:']);
		var i1 = element('input', {'name':'name','type':'text','placeholder':'Название отряда','id':'name'}, {'margin-top':'5px'}, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'sanatoriumId'}, null, ["control-label"], ['Cанаторий:']);
		var sanatoriumData = getRequest(this.sanatorium.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<sanatoriumData.length; i++){
			var op = element('option', {'name':'sanatoriumId', 'id':sanatoriumData[i].id}, null, null, [sanatoriumData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'sanatoriumId', 'for':'sanatoriums'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		var l2 = element('label', {'for':'provinceId'}, null, ["control-label"], ['Губерния:']);
		var provincesData = getRequest(this.province.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<provincesData.length; i++){
			var op = element('option', {'name':'provinceId', 'id':provincesData[i].id}, null, null, [provincesData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'provinceId', 'for':'sanatoriums'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		var l1 = element('label', {'for':'name'}, null, ["control-label"], ['Название отряда:']);
		var i1 = element('input', {'name':'name','type':'text','placeholder':'Название отряда','id':'name'}, {'margin-top':'5px'}, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'sanatoriumId'}, null, ["control-label"], ['Cанаторий:']);
		var sanatoriumData = getRequest(this.sanatorium.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<sanatoriumData.length; i++){
			var op = element('option', {'name':'sanatoriumId', 'id':sanatoriumData[i].id}, null, null, [sanatoriumData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'sanatoriumId', 'for':'sanatoriums'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		var l2 = element('label', {'for':'provinceId'}, null, ["control-label"], ['Губерния:']);
		var provincesData = getRequest(this.province.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<provincesData.length; i++){
			var op = element('option', {'name':'provinceId', 'id':provincesData[i].id}, null, null, [provincesData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'provinceId', 'for':'sanatoriums'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Название', 'Санаторий', 'Губерния'];
		
		var sanatoriumData = getRequest(this.sanatorium.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<sanatoriumData.length; j++)
			if(dataArr[i].sanatoriumId == sanatoriumData[j].id){
				dataArr[i].sanatoriumId = sanatoriumData[j].name;
				break;
			}
		
		var provincesData = getRequest(this.province.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<provincesData.length; j++)
			if(dataArr[i].provinceId == provincesData[j].id){
				dataArr[i].provinceId = provincesData[j].name;
				break;
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