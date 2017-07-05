class productsPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.hideFileLoadBlockId = '';
		this.fileLoadBlockId = '';
	}
	
	formTableBlock() {
		var globalUl = element('ul',null,null,['thumbnails'],null);		
		var dataArr = getRequest(this.serverPageUrl,{});
			
		for(var i=0; i<dataArr.length; i++){
			var pCost = element('p',null,null,['cost'],('Стоимость: '+dataArr[i].cost+' руб.'));
			var img = element('img',{'src':'./imgs/box.jpg'},null,['imgSize'],null);
				
			var i1 = element('input', {'type':'submit', 'id':dataArr[i].id}, null, ["edit-btn", "btn", "btn-default", 'btn-xs', 'editProduct'], null);
			var i2 = element('input', {'type':'submit', 'id':dataArr[i].id}, null, ["delete-btn", "btn", "btn-default", 'btn-xs', 'deleteProduct'], null);			
			
			var db = element('div',null,{'width':'52px','height':'20px','float':'right'},null,[i1,i2]);
			var d23 = element('span',null,{'width':'140px','height':'20px','float':'left'},['size'],dataArr[i].nameProduct);			
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
		
		var l1 = element('label', {'for':'nameProduct'}, {'margin-left':'0'}, ["control-label"], ['Название товара:']);
		var i1 = element('input', {'name':'nameProduct','type':'text','id':'nameProduct'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'descrProduct'}, {'margin':'5px 0'}, null, 'Описание товара:');
		var i2 = element('textarea', {'name':'descrProduct','type':'text','placeholder':'Описание товара','id':'descrProduct','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));

		$(globalDiv).append(element('input', {'type':'hidden','id':'pictureURL','name':'pictureURL'}, null, ["form-control"], null));
		
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		
		/*!!!!!!!!!!!!!!!!
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		var i1 = element('input', {'name':'cost','type':'text','id':'cost'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		!!!!!!!!!!!!!!!!!!*/		
		
		var span = element('span', {'id':'basic-addon2'}, null, ["input-group-addon"], ['руб.']);
		var i1 = element('input', {'name':'cost','type':'number','id':'cost','placeholder':'стоимость товара','aria-describedby':'basic-addon2'}, null, ["form-control"], null);		
		var divRub = element('div', null, null, ["input-group"], [i1,span]); 		
		
		var d1 = element('div', null, null, ["inner"], [divRub]);
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}	

	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'nameProduct'}, {'margin-left':'0'}, ["control-label"], ['Название товара:']);
		var i1 = element('input', {'name':'nameProduct','type':'text','id':'nameProduct'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'descrProduct'}, {'margin':'5px 0'}, null, 'Описание товара:');
		var i2 = element('textarea', {'name':'descrProduct','type':'text','placeholder':'Описание товара','id':'descrProduct','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		$(globalDiv).append(element('input', {'type':'hidden','id':'pictureURL','name':'pictureURL'}, null, ["form-control"], null));
		
		var span = element('span', {'id':'basic-addon2'}, null, ["input-group-addon"], ['руб.']);
		var i1 = element('input', {'name':'cost','type':'number','id':'cost','placeholder':'стоимость товара','aria-describedby':'basic-addon2'}, null, ["form-control"], null);		
		var divRub = element('div', null, null, ["input-group"], [i1,span]); 		
		
		var d1 = element('div', null, null, ["inner"], [divRub]);
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
}

/*
class productsPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.hideFileLoadBlockId = '';
		this.fileLoadBlockId = '';
	}
	
	formTableBlock() {		
		var globalDiv = element('ul',null,null,['thumbnails'],null);
		
		var dataArr = getRequest(this.serverPageUrl,{});
		var error = this.formStandardErrorModalIfErrorExist(dataArr);
		if(error != false)
			return error;
			
		for(var i=0; i<dataArr.length; i++){
			var pCost = element('p',null,null,['cost'],('Стоимость: '+dataArr[i].cost+'руб.'));
			var img = element('img',{'src':'./imgs/box.jpg',},{'width':'190px','height':'180px'},['imgSize'],null);
			
			var i1 = element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right",'width':'10px','height':'10px'}, ["update-btn", "btn", "btn-default", 'itemDelete'], null);
			var i2 = element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right",'width':'10px','height':'10px'}, ["update-btn", "btn", "btn-default", 'itemDelete'], null);			
			var pTitle = element('p',null,null,['size'],(dataArr[i].nameProduct));			
			var d1 = element('div',null,null,null,[pTitle, i1, i2]);
			
			
			var edtBtn = document.createElement('input', {'type':'submit','value':'Изменить'},{'margin':'2px','float':'left'}, );
			$(edtBtn).addClass("edit-btn btn btn-primary btn-xs");
			$(edtBtn).attr({'type':'submit','value':'Изменить','id':answer[i][Object.keys(answer[i])[0]]});
			$(edtBtn).css({'margin':'2px','float':'left'})
			$(td).append($(edtBtn));
			
			var d2 = element('div',null,null,['thumbnail'],[d1, img, pCost]);
			var li1 = element('li',null,null,['span3'],[d2]);
			$(globalDiv).append(element('div',null,{'width':'190px','height':'180px','background':'red', 'margin':'5px'},['col-xs-12', 'col-sm-6', 'col-md-3', 'col-lg-2','no-margin'],[li1]));
		}
		
		return globalDiv;
	}
	
	formAddBlock() {
		super.formAddBlock();
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'nameProduct'}, {'margin-left':'0'}, ["control-label"], ['Название товара:']);
		var i1 = element('input', {'name':'nameProduct','type':'text','id':'nameProduct'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'descrProduct'}, {'margin':'5px 0'}, null, 'Описание товара:');
		var i2 = element('textarea', {'name':'descrProduct','type':'text','placeholder':'Описание товара','id':'descrProduct','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		this.hideFileLoadBlockId = 'pictureURL';
		var l1 = element('label', {'for':this.hideFileLoadBlockId}, {'margin-left':'0'}, ["control-label"], ['Изображение:']);
		var i1 = element('input', {'type':'file'}, null, ["form-control"], null);
		var h3 = element('input', {'type':'hidden','id':this.hideFileLoadBlockId,'name':this.hideFileLoadBlockId}, null, null, null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,h3,d1]));
		
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		var i1 = element('input', {'name':'cost','type':'text','id':'cost'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}

	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'nameProduct'}, {'margin-left':'0'}, ["control-label"], ['Название товара:']);
		var i1 = element('input', {'name':'nameProduct','type':'text','id':'nameProduct'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'descrProduct'}, {'margin':'5px 0'}, null, 'Описание товара:');
		var i2 = element('textarea', {'name':'descrProduct','type':'text','placeholder':'Описание товара','id':'descrProduct','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		this.hideFileLoadBlockId = 'pictureURL';
		var l1 = element('label', {'for':this.hideFileLoadBlockId}, {'margin-left':'0'}, ["control-label"], ['Изображение:']);
		var i1 = element('input', {'type':'file'}, null, ["form-control"], null);
		var h3 = element('input', {'type':'hidden','id':this.hideFileLoadBlockId,'name':this.hideFileLoadBlockId}, null, null, null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,h3,d1]));
		
		var l1 = element('label', {'for':'cost'}, {'margin-left':'0'}, ["control-label"], ['Стоимость:']);
		var i1 = element('input', {'name':'cost','type':'text','id':'cost'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
}
*/