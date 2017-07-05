class itemsPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.hideFileLoadBlockId = '';
		this.fileLoadBlockId = '';
	}
	
	formTableBlock() {
		var globalUl = element('ul',null,null,['thumbnails'],null);		
		var dataArr = getRequest(this.serverPageUrl,{});
			
		for(var i=0; i<dataArr.length; i++){
			var coinsCntStr = 'монет';
			var cc = dataArr[i].coins%10;
			if(cc == 1)
				coinsCntStr = 'монета';
			else if(((cc == 2) || (cc == 3) || (cc == 4)) && ((dataArr[i].coins != 11) && (dataArr[i].coins != 12)&& (dataArr[i].coins != 13)))
				coinsCntStr = 'монеты';
			else coinsCntStr = 'монет';
		
			var pCost = element('p',null,null,['cost'],('Стоимость: '+dataArr[i].coins+' '+coinsCntStr+'.'));
			var img = element('img',{'src':'./imgs/box.jpg'},null,['imgSize'],null);
				
			var i1 = element('input', {'type':'submit', 'id':dataArr[i].id}, null, ["edit-btn", "btn", "btn-default", 'btn-xs', 'editProduct'], null);
			var i2 = element('input', {'type':'submit', 'id':dataArr[i].id}, null, ["delete-btn", "btn", "btn-default", 'btn-xs', 'deleteProduct'], null);			
			
			var db = element('div',null,{'width':'52px','height':'20px','float':'right'},null,[i1,i2]);
			var d23 = element('span',null,{'width':'140px','height':'20px','float':'left'},['size'],dataArr[i].itemText);			
			var d2 = element('div',null,{'margin':'5px 2px','height':'20px'},null,[d23, db]);
			
			var d1 = element('div',null,null,['thumbnail'],[d2, img, pCost]);
			var li = element('li',null,null,['span3'],[d1]);
			$(globalUl).append(element('div',null,null,['correctIndent'],[li]));
		}
		
		return globalUl;
	}
	
	formAddBlock() {
		super.formAddBlock();
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'itemText'}, {'margin-left':'0'}, ["control-label"], ['Название предмета:']);
		var i1 = element('input', {'name':'itemText','type':'text','id':'itemText'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		$(globalDiv).append(element('input', {'type':'hidden','id':'pictureURL','name':'pictureURL'}, null, null, null));
		
		var span = element('span', {'id':'basic-addon2'}, null, ["input-group-addon"], ['руб.']);
		var i1 = element('input', {'name':'cost','type':'number','id':'cost','placeholder':'стоимость товара','aria-describedby':'basic-addon2'}, null, ["form-control"], null);		
		var divRub = element('div', null, null, ["input-group"], [i1,span]); 		
		
		var d1 = element('div', null, null, ["inner"], [divRub]);
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'layer'}, {'margin-left':'0'}, ["control-label"], ['Слой:']);
		var i2 = element('input', {'name':'layer','type':'text','id':'layer'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		var l2 = element('label', {'for':'place'}, null, ["control-label"], ['Расположение:']);
		var i2 = element('input', {'name':'place','type':'place','id':'place'}, null, ["form-control"], null);
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
		
		var l1 = element('label', {'for':'itemText'}, {'margin-left':'0'}, ["control-label"], ['Название предмета:']);
		var i1 = element('input', {'name':'itemText','type':'text','id':'itemText'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		$(globalDiv).append(element('input', {'type':'hidden','id':'pictureURL','name':'pictureURL'}, null, null, null));
		
		var span = element('span', {'id':'basic-addon2'}, null, ["input-group-addon"], ['руб.']);
		var i1 = element('input', {'name':'cost','type':'number','id':'cost','placeholder':'стоимость товара','aria-describedby':'basic-addon2'}, null, ["form-control"], null);		
		var divRub = element('div', null, null, ["input-group"], [i1,span]); 		
		
		var d1 = element('div', null, null, ["inner"], [divRub]);
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'layer'}, {'margin-left':'0'}, ["control-label"], ['Слой:']);
		var i2 = element('input', {'name':'layer','type':'text','id':'layer'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		var l2 = element('label', {'for':'place'}, null, ["control-label"], ['Расположение:']);
		var i2 = element('input', {'name':'place','type':'place','id':'place'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22]));		

		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
}