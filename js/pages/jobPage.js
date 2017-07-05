class jobPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.qr = linkObjectsArr[0];
		this.hideTokenIdStoreBlockName = 'qrCodeId';
	}

	formAddBlock() {
		super.formAddBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':this.hideTokenIdStoreBlockName,'name':this.hideTokenIdStoreBlockName}, null, null, null));
		
		var l1 = element('label', {'for':'jobText'}, null, ["control-label"], ['Задание:']);
		var i1 = element('input', {'name':'jobText','type':'text','id':'jobText'}, {'margin-top':'5px'}, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'dateFrom'}, {'margin-top':'5px'}, null, ['Дата начала:']);
		var i2 = element('input', {'type':'text', 'name':'dateFrom', 'id':'dateFrom'}, null, ["form-control"], null);
		var glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var sp = element('span', null, null, ["input-group-addon"], [glyph]);		
		var dv = element('div', null, {'padding':'0 15px'}, ["input-group", "date", "datetimepicker"], [i2, sp]);
		var dd = element('div', null, null, ["form-group"], [dv]);
		var d2 = element('div', null, null, ["inner"], [dd]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		var l2 = element('label', {'for':'dateTo'}, {'margin-top':'5px'}, null, ['Дата окончания:']);
		var i2 = element('input', {'type':'text', 'name':'dateTo', 'id':'dateTo'}, null, ["form-control"], null);
		var glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var sp = element('span', null, null, ["input-group-addon"], [glyph]);		
		var dv = element('div', null, {'padding':'0 15px'}, ["input-group", "date", "datetimepicker"], [i2, sp]);
		var dd = element('div', null, null, ["form-group"], [dv]);
		var d2 = element('div', null, null, ["inner"], [dd]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22]));
		
		var l2 = element('label', {'for':'xp'}, null, ["control-label"], ['XP:']);
		var i2 = element('input', {'name':'xp','type':'text','id':'xp','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		var l2 = element('label', {'for':'stars'}, null, ["control-label"], ['Звёзды:']);
		var i2 = element('input', {'name':'stars','type':'text','id':'stars','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		var l2 = element('label', {'for':'coins'}, null, ["control-label"], ['Монеты:']);
		var i2 = element('input', {'name':'coins','type':'text','id':'coins','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d33 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22,d33]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':this.hideTokenIdStoreBlockName,'name':this.hideTokenIdStoreBlockName}, null, null, null));
		
		var l1 = element('label', {'for':'jobText'}, null, ["control-label"], ['Задание:']);
		var i1 = element('input', {'name':'jobText','type':'text','id':'jobText'}, {'margin-top':'5px'}, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'dateFrom'}, {'margin-top':'5px'}, null, ['Дата начала:']);
		var i2 = element('input', {'type':'text', 'name':'dateFrom', 'id':'dateFrom'}, null, ["form-control"], null);
		var glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var sp = element('span', null, null, ["input-group-addon"], [glyph]);		
		var dv = element('div', null, {'padding':'0 15px'}, ["input-group", "date", "datetimepicker"], [i2, sp]);
		var dd = element('div', null, null, ["form-group"], [dv]);
		var d2 = element('div', null, null, ["inner"], [dd]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		var l2 = element('label', {'for':'dateTo'}, {'margin-top':'5px'}, null, ['Дата окончания:']);
		var i2 = element('input', {'type':'text', 'name':'dateTo', 'id':'dateTo'}, null, ["form-control"], null);
		var glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var sp = element('span', null, null, ["input-group-addon"], [glyph]);		
		var dv = element('div', null, {'padding':'0 15px'}, ["input-group", "date", "datetimepicker"], [i2, sp]);
		var dd = element('div', null, null, ["form-group"], [dv]);
		var d2 = element('div', null, null, ["inner"], [dd]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-6"], [l2,d2]);		
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22]));
		
		var l2 = element('label', {'for':'xp'}, null, ["control-label"], ['XP:']);
		var i2 = element('input', {'name':'xp','type':'text','id':'xp','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		var l2 = element('label', {'for':'stars'}, null, ["control-label"], ['Звёзды:']);
		var i2 = element('input', {'name':'stars','type':'text','id':'stars','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		var l2 = element('label', {'for':'coins'}, null, ["control-label"], ['Монеты:']);
		var i2 = element('input', {'name':'coins','type':'text','id':'coins','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d33 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22,d33]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		
		return globalDiv;
	}
	
	setEditMultipleClicker(idArr) {
	
		var globalDiv = element();		
		var dataArr = getRequest(this.serverPageUrl,{'dateFilter':'all'});
		
		var l2 = element('label', null, null, ["control-label"], ['Просмотр заданий:']);
		var ops = Array();
		for(var j=0; j<idArr.length; j++){
			for(var i=0; i<dataArr.length; i++)			
				if(dataArr[i].id == idArr[j]){
					var name = "";
					switch(this.serverPageUrl){
						case "http://vitalandru.ru/jobs/ranks.php":
							name = dataArr[i].rankText;
						break;
						case "http://vitalandru.ru/jobs/achievements.php":
							name = dataArr[i].achText;
						break;
						case "http://vitalandru.ru/jobs/jobs.php":
							name = dataArr[i].jobText;
						break;
					};				
					var op = element('option', {'name':dataArr[i].qrCodeId}, null, null, [name]);
					ops.push(op);
				}
			}
		var s = element('select', {'for':'ranks'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, {'margin-top':'10px'}, ["myInput", "form-horizontal"], [l2,d2]));
		
		var l2 = element('label', {'for':'xp'}, null, ["control-label"], ['XP:']);
		var i2 = element('input', {'name':'xp','type':'text','id':'xp','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		var l2 = element('label', {'for':'stars'}, null, ["control-label"], ['Звёзды:']);
		var i2 = element('input', {'name':'stars','type':'text','id':'stars','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d22 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		var l2 = element('label', {'for':'coins'}, null, ["control-label"], ['Монеты:']);
		var i2 = element('input', {'name':'coins','type':'text','id':'coins','placeholder':'0'}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["inner"], [i2]);
		var d33 = element('div', null, null, ["myInput", "form-horizontal","no-margin", "col-md-4"], [l2,d2]);
		$(globalDiv).append(element('div', null, null, ["form-horizontal","no-margin"], [d11,d22,d33]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Применить к выбранным записям", 'id':'setQrData'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		
		return globalDiv;
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{'dateFilter':'all'});
		console.log(dataArr)
		var nameArr = ['ID','Задание','Дата начала','Дата окончания', 'Текст QR-кода','XP','Звезды','Монеты'];
		
		var qrData = getRequest(this.qr.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<qrData.length; j++)
			if(dataArr[i].qrCodeId == qrData[j].id){
				dataArr[i].qrCodeId = qrData[j].data;
				dataArr[i].xp = qrData[j].xp;
				dataArr[i].stars = qrData[j].stars;
				dataArr[i].coins = qrData[j].coins;
				break;
			}
		
		var tt = super.formTableBlock(nameArr, dataArr, Array('edit','delete','show','print'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	formPrintBlock(id) {
		super.formPrintBlock(id, this, true);
	}
	
	formShowBlock(id) {
		super.formPrintBlock(id, this, false);
	}
}