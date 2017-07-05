class newsPage extends dynamicPage {
	constructor(serverPageUrl) {
		super(serverPageUrl)
		this.hideFileLoadBlockId = '';
		this.fileLoadBlockId = '';
	}

	formAddBlock() {
		super.formAddBlock();
		
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'newsHeader'}, {'margin-left':'0'}, ["control-label"], ['Заголовок новости:']);
		var i1 = element('input', {'name':'newsHeader','type':'text','id':'newsHeader'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'newsText'}, {'margin':'5px 0'}, null, 'Текст новости:');
		var i2 = element('textarea', {'name':'newsText','type':'text','placeholder':'Текст новости','id':'newsText','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		this.hideFileLoadBlockId = 'newsPicture';
		var l1 = element('label', {'for':this.hideFileLoadBlockId}, {'margin-left':'0'}, ["control-label"], ['Изображение:']);
		var i1 = element('input', {'type':'file'}, null, ["form-control"], null);
		var h3 = element('input', {'type':'hidden','id':this.hideFileLoadBlockId,'name':this.hideFileLoadBlockId}, null, null, null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,h3,d1]));
		
		$(globalDiv).append(element('button', {'type':'submit'}, {"float":"left"}, ["btn", "btn-default", 'preview'], ["Предварительный просмотр"]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));

		return globalDiv;
	}
	
	formPreviewBlock(){
		var dataArr = getRequest(this.serverPageUrl,{'days':'365'});

		var globalDiv = element('div',{'id':'newsPreview'},{'padding':'15px','height':'100%'},["col-md-10","col-md-offset-1"],null);
		
		var newsArr = Array();
		for(var i=0; i<dataArr.length; i++){			
			var b = element('b',null,null,null,dataArr[i].newsHeader);
			var sp1 = element('span',{'id':'prTitle'},{'float':'left'},null,[b]);			
			var sp2 = element('span',{'id':'prDate'},{'float':'right'},null,dataArr[i].newsDateTime);
			var headerDiv = element('div',null,{'float':'left','margin-top':'5px','width':'100%'},null,[sp1,sp2]);
			var bodyDiv = element('div',null,{'margin':'2px 0','float':'left', 'width':'100%'},null,dataArr[i].newsText);
			var imgDiv = element('img',{'src':dataArr[i].newsPicture,'alt':dataArr[i].newsPicture},{'max-width':'100%','float':'left','margin-bottom':'15px'},null,null);
			newsArr.push(element('div',null,{'margin':'5px 15px'},null,[headerDiv,bodyDiv,imgDiv]));
		}
		$(globalDiv).append(element('div',null,{'border':'1px solid #b7b7b7','overflow':'auto','height':'100%'},null,newsArr));
		
		$('#show-frm').html('');
		$('#show-frm').append(globalDiv);
	}
	
	formEditBlock() {
		super.formEditBlock();

		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'newsHeader'}, {'margin-left':'0'}, ["control-label"], ['Заголовок новости:']);
		var i1 = element('input', {'name':'newsHeader','type':'text','id':'newsHeader'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'newsText'}, {'margin':'5px 0'}, null, 'Текст новости:');
		var i2 = element('textarea', {'name':'newsText','type':'text','placeholder':'Текст новости','id':'newsText','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		this.hideFileLoadBlockId = 'newsPicture';
		var l1 = element('label', {'for':this.hideFileLoadBlockId}, {'margin-left':'0'}, ["control-label"], ['Изображение:']);
		var i1 = element('input', {'type':'file'}, null, ["form-control"], null);
		var h3 = element('input', {'type':'hidden','id':this.hideFileLoadBlockId,'name':this.hideFileLoadBlockId}, null, null, null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,h3,d1]));
		
		$(globalDiv).append(element('button', {'type':'submit'}, {"float":"left"}, ["btn", "btn-default", 'preview'], ["Предварительный просмотр"]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{'days':'365'});
		var nameArr = ['ID','Заголовок','Текст новости', 'Адрес изображения', 'Дата публикации'];		
		var tt = super.formTableBlock(nameArr, dataArr, Array('edit','delete'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	setSearchClicker(searchString){
		/*var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Имя','Фамилия', 'ID отряда', 'Пол', 'Подтверждение'];
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");
		//$(tt).attr('id','getShowTable');
		return $(tt);*/
	}
}