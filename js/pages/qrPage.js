class qrPage extends dynamicPage {
	constructor(serverPageUrl) {
		super(serverPageUrl)
		this.hideTokenStoreBlockName = '';
	}

	formAddBlock() {
		super.formAddBlock();
		
		var globalDiv = element();		
		this.hideTokenStoreBlockName = 'token';
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'data','name':this.hideTokenStoreBlockName}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		$(globalDiv).append(element('label', null, null, null, ['Дополнительные параметры:']));
		//var l1 = element('label', {'for':'xp'}, null, null, ['XP']);
		var i1 = element('input', {'name':'xp','type':'text','placeholder':'XP','id':'xp','value':''}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["col-md-4"], [i1])
		//var l2 = element('label', {'for':'stars'}, null, null, ['Звезды']);
		var i2 = element('input', {'name':'stars','type':'text','placeholder':'Звезды','id':'stars','value':''}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["col-md-4"], [i2])
		//var l3 = element('label', {'for':'coins'}, null, null, ['Монетки']);
		var i3 = element('input', {'name':'coins','type':'text','placeholder':'Монетки','id':'coins','value':''}, null, ["form-control"], null);
		var d3 = element('div', null, null, ["col-md-4"], [i3])
		$(globalDiv).append(element('div', null, null, ['row'], [d1,d2,d3]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Сгенерировать QR-код",'id':'add'}, {"float":"right", "margin-top":"8px"}, ["update-btn", "btn", "btn-default","disabled"], null));
		return globalDiv;
	}
	
	
	formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element();		
		this.hideTokenStoreBlockName = 'token';
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'data','name':''}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		$(globalDiv).append(element('label', null, null, null, ['Дополнительные параметры:']));
		//var l1 = element('label', {'for':'xp'}, null, null, ['XP']);
		var i1 = element('input', {'name':'xp','type':'text','placeholder':'XP','id':'xp','value':''}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["col-md-4"], [i1])
		//var l2 = element('label', {'for':'stars'}, null, null, ['Звезды']);
		var i2 = element('input', {'name':'stars','type':'text','placeholder':'Звезды','id':'stars','value':''}, null, ["form-control"], null);
		var d2 = element('div', null, null, ["col-md-4"], [i2])
		//var l3 = element('label', {'for':'coins'}, null, null, ['Монетки']);
		var i3 = element('input', {'name':'coins','type':'text','placeholder':'Монетки','id':'coins','value':''}, null, ["form-control"], null);
		var d3 = element('div', null, null, ["col-md-4"], [i3])
		$(globalDiv).append(element('div', null, null, ['row'], [d1,d2,d3]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	/*formEditBlock() {
		super.formEditBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		var l1 = element('label', {'for':'name'}, null, null, ['Название подразделения для оценок']);
		var i1 = element('input', {'name':'name','type':'text','placeholder':'Название подразделения','id':'name'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}*/
	
	/*formPrintBlock(eventHandler) { 
		var trOfBtn = eventHandler.parentNode.parentNode;
		var chkBoxInTr = trOfBtn.getElementsByTagName('input')[0];
		
		var url = "/adminPanel/php/qrImgGenerator.php"
		var request = {"data":Array(),"level":"L","size":"6"};
		var qrStrings = Array();
		
		if(chkBoxInTr.checked == true){
			qrStrings = Array();
			$("input:checkbox:checked").each(function(indx, element){
				var tr = element.parentNode.parentNode;
				var tdArr = tr.getElementsByTagName('td');
				var qrString = tdArr[1].innerHTML;
				qrStrings.push(qrString);
			});
			request.data = qrStrings;
			
			$.ajax({
				type: 'POST',
				url: url,
				data: request,
				async: false,
				success: function(data){		
				
					var obj = JSON.parse(data);
					for(var i=0; i<obj.length; i++){
						var p = element('p', null, null, ["img_txt"], 'Qr code number '+i);
						var img = element('img', {'src':(obj[i].substring(obj[i].lastIndexOf('php'),obj[i].length))}, {'border':'1px solid #f3f3f3'}, ["img_img"], 'Qr code number '+i);
						$('#printBlock').append(element('div', null, {'border':'1px solid #fff'}, ["img_container"], [img,p]));
					}
					
					$('#table').css('display','none');
					$('#printBlock').css('display','block');
					
					let loadedCount = 0;
					let totalCount = obj.length;
					function printIfLoaded() {
						if (loadedCount == totalCount) {
							if($(eventHandler).hasClass('print-btn'))
								$(window).ready(function(){window.print();});
						}
					}
					
					$('.img_img').each(function(image) {
						$(this).on('load', function() {
							loadedCount++; 
							printIfLoaded();
						});
					});
				}
			});
		}
		else {			
			qrStrings = Array();
			var tdArr = trOfBtn.getElementsByTagName('td');
			var qrString = tdArr[1].innerHTML;
			qrStrings.push(qrString);
			request.data = qrStrings;
			//console.log(request)
      
			$.ajax({
				type: 'POST',
				url: url,
				data: request,
				async: false,
				success: function(data){
					//console.log(data);
					var obj = JSON.parse(data);
					var p = element('p', null, null, ["img_txt"], 'Qr code number '+i);
					var img = element('img', {'src':(obj[0].substring(obj[0].lastIndexOf('php'),obj[0].length))}, {'border':'1px solid #f3f3f3'}, ["img_img"], 'Qr code number '+i);						
					
					$('#printBlock').append(element('div', null, {'border':'1px solid #fff'}, ["img_container"], [img,p]));					
					$('#table').css('display','none');
					$('#printBlock').css('display','block');
					
					let loadedCount = 0;
					let totalCount = 1;
					function printIfLoaded() {
						if (loadedCount == totalCount) {
							if($(eventHandler).hasClass('print-btn'))
								$(window).ready(function(){window.print();});
						}
					}
					
					$('.img_img').each(function(image) {
						$(this).on('load', function() {
							loadedCount++; 
							printIfLoaded();
						});
					});
				}
			});
		}
	}*/
	formPrintBlock(eventHandler, tdWithId) {		
		super.formPrintBlock(eventHandler, tdWithId);
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Определяющая строка',"XP","Звёзды","Монетки"];		
		var tt = super.formTableBlock(nameArr, dataArr, Array(/*'print','show',*/'delete','edit'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	/*setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Название'];		
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");

		return $(tt);
	}*/
}
