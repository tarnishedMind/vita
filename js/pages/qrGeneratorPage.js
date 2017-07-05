class qrGeneratorPage extends dynamicPage {

	formAddBlock() {
		super.formAddBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id'}, null, null, null));
		var l1 = element('label', {'for':'name'}, null, null, ['Название подразделения для оценок']);
		var i1 = element('input', {'name':'name','type':'text','placeholder':'Название подразделения','id':'name'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id'}, null, null, null));
		var l1 = element('label', {'for':'name'}, null, null, ['Название подразделения для оценок']);
		var i1 = element('input', {'name':'name','type':'text','placeholder':'Название подразделения','id':'name'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Определяющий текст'];
		var tt = super.formTableBlock(nameArr, dataArr);
		$(tt).addClass("table table-bordered");
		//$(tt).attr('id','getShowTable');
		return $(tt);
	}
	
	setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Название'];		
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");
		//$(tt).attr('id','getShowTable');
		return $(tt);
	}
}