'use strict';

class dynamicPage {
  constructor(serverPageUrl, linkObjectsArr = Array()) {
    this.serverPageUrl = serverPageUrl;
	this.linkObjectsArr = linkObjectsArr;
  }

  formAddBlock() {}
  formEditBlock() {}
  
  setEditClicker(id){		
		var edit = this.formEditBlock();
		var recordArr = getRequest(this.serverPageUrl,{'id':id});

		// Пройти по всем input-ам и поставить их id в соответствии с БД
		var inputArr = $(edit).find("input")		
		for(var i=0; i<inputArr.length-1; i++)
			for(var j=0; j<Object.keys(recordArr[0]).length; j++) // по все ключам в recordArr
				if(Object.keys(recordArr[0])[j] == $(inputArr[i]).attr('name')){
					$(inputArr[i]).attr('value', recordArr[0][Object.keys(recordArr[0])[j]]);
					break;
				}
				
		// Пройти по всем textarea-ам и поставить их id в соответствии с БД
		var textareaArr = $(edit).find("textarea")
		for(var i=0; i<textareaArr.length; i++)
			for(var j=0; j<Object.keys(recordArr[0]).length; j++) {// по все ключам в recordArr
				if(Object.keys(recordArr[0])[j] == $(textareaArr[i]).attr('name')){
					$(textareaArr[i]).val(recordArr[0][Object.keys(recordArr[0])[j]]);
					break;
				}
			}
			
		// Пройти по всем select-ам и поставить их id в соответствии с БД
		var selectArr = $(edit).find("select")
		for(var i=0; i<selectArr.length; i++) //по всем select			
			for(var j=0; j<Object.keys(recordArr[0]).length; j++) // по все ключам в recordArr
				if(Object.keys(recordArr[0])[j] == $(selectArr[i]).attr('id')){					
					var sanatoriumId = recordArr[0][Object.keys(recordArr[0])[j]];
					var optArr = selectArr[i].getElementsByTagName('option');
					for(var t=0; t<optArr.length; t++)
						if($(optArr[t]).attr('Id') == sanatoriumId)
							selectArr[i].options.selectedIndex = t;
					break;
				}
		
		return edit;
	} 
  
  formTableBlock(nameArr, answer, operationsArr=Array()) {

	var table = element('table', null, null, null, null);
	if(answer != 0){		
		table.append(formTableHeader(nameArr,operationsArr));
		table.append(formTableBody(answer, operationsArr));
	}
  
	function formTableHeader(nameArr, operationsArr){
		var thead = document.createElement('tbody');
		var tr = document.createElement('tr');
		
		if(operationsArr.length != 0){
			if((operationsArr.indexOf('delete') != -1) || (operationsArr.indexOf('print') != -1)){
				var th = document.createElement('th');
				$(th).css('width','10px');
				var span = document.createElement('span');
				$(span).addClass('glyphicon glyphicon-list');
				$(th).append($(span));
				$(th).append(element('input',{'type':'checkbox','id':'checkAll'},{'margin-top':'5px'},null,null));
				$(tr).append($(th));
			}
		}
		
		for(i=0; i<nameArr.length; i++){
			var th = document.createElement('th');
			th.innerHTML = nameArr[i];
			$(tr).append($(th));
		}
		
		if(operationsArr.length != 0){
			var th = document.createElement('th');
			th.innerHTML = "Операции";		
			$(tr).append($(th));
		}
		
		$(thead).append($(tr));
		return $(thead);
	}
	
	function formTableBody(answer, operationsArr=Array('delete','edit')){				
		var tbody = document.createElement('tbody');
		
		for(i=0; i<answer.length; i++){
			var tr = document.createElement('tr');
			
			if(operationsArr.length != 0){
				if((operationsArr.indexOf('delete') != -1) || (operationsArr.indexOf('print') != -1)){
					var td = document.createElement('td');
					$(td).css('width','10px');
					var inp = document.createElement('input');
					$(inp).attr('type','checkbox');
					$(inp).addClass('table-chk');
					$(td).append($(inp));
					$(tr).append($(td));
				}
			}
			
			for(var j=0; j<Object.keys(answer[i]).length; j++){  
				var key = Object.keys(answer[i])[j];
				if(j==0) {
					var th = document.createElement('th');
					$(th).attr('scope',"row");
					th.innerHTML = answer[i][key];
					$(tr).append($(th));
				}
				else {
					var td = document.createElement('td');
					td.innerHTML = answer[i][key];
					$(tr).append($(td));
				}
			}
			if(operationsArr.length != 0){
				var td = document.createElement('td');
				$(td).css({'min-width':"150px",'width':"150px"});
							
				for(var u=0; u<operationsArr.length; u++){
					if(operationsArr[u] == 'delete'){
						var dltBtn = document.createElement('input');
						$(dltBtn).addClass("delete-btn btn btn-default btn-xs");
						$(dltBtn).attr({'type':'submit','value':'Удалить','id':answer[i][Object.keys(answer[i])[0]]});
						$(edtBtn).css({'margin':'2px','float':'left'})
						$(td).append($(dltBtn));
						continue;
					}
					if(operationsArr[u] == 'edit'){
						var edtBtn = document.createElement('input');
						$(edtBtn).addClass("edit-btn btn btn-primary btn-xs");
						$(edtBtn).attr({'type':'submit','value':'Изменить','id':answer[i][Object.keys(answer[i])[0]]});
						$(edtBtn).css({'margin':'2px','float':'left'})
						$(td).append($(edtBtn));
						continue;
					}
					if(operationsArr[u] == 'print'){
						var prntBtn = document.createElement('input');
						$(prntBtn).addClass("print-btn btn btn-warning btn-xs");
						$(prntBtn).attr({'type':'submit','value':'Печать','id':answer[i][Object.keys(answer[i])[0]]});
						$(prntBtn).css({'margin':'2px','float':'left'})
						$(td).append($(prntBtn));
						continue;
					}
					if(operationsArr[u] == 'show'){
						var shwBtn = document.createElement('input');
						$(shwBtn).addClass("show-btn btn btn-xs");
						$(shwBtn).attr({'type':'submit','value':'Показать','id':answer[i][Object.keys(answer[i])[0]]});
						$(shwBtn).css({'margin':'2px','float':'left'})
						$(td).append($(shwBtn));
						continue;
					}
				}
				$(tr).append($(td));
			}
			$(tbody).append($(tr));
		}
		return $(tbody);
	}	
	return $(table);
  }
  
  setUpdateClicker(){
	var requestArr = getDataFromInputEditForm();
	console.log(requestArr)
	
	var edtForm = document.getElementById('editForm');
	var inputsArr = edtForm.getElementsByTagName('input');
	var operationType = $(inputsArr[inputsArr.length-1]).attr('id');// 'add' or 'edit'

	if(operationType == 'add')
		return postRequest(this.serverPageUrl,requestArr);
	else if(operationType == 'edit')
		return putRequest(this.serverPageUrl,requestArr);
		
	function getDataFromInputEditForm(){
		var edtForm = document.getElementById('editForm');
		var inputsArr = edtForm.getElementsByTagName('input');
		var dataArr = {};
		for(var i=0; i<inputsArr.length-1; i++)
			if($(inputsArr[i]).attr('type')!='file')
				dataArr[$(inputsArr[i]).attr('id')]=$(inputsArr[i]).val();
		
		var selectArr = edtForm.getElementsByTagName('select');
		for(var i=0; i<selectArr.length; i++){
			var n = selectArr[i].options.selectedIndex;
			var optionArr = selectArr[i].getElementsByTagName('option');
			dataArr[$(optionArr[n]).attr('name')]=$(optionArr[n]).attr('id');
		}
		
		var textArr = edtForm.getElementsByTagName('textarea');
		for(var i=0; i<textArr.length; i++)
			dataArr[$(textArr[i]).attr('id')]=$(textArr[i]).val();
		return dataArr;
	}
  }
  
  setDeleteClicker(idArr){
	var answer = '';
	for(var i=0; i<idArr.length; i++)
		answer = deleteRequest(this.serverPageUrl+'?id='+idArr[i],{});
	return answer;
  }
 
  setSearchClicker(searchString){
	var dataArr = getRequest(this.serverPageUrl,{});
	
	var resArr = Array();
	for(var i=0; i<dataArr.length; i++){
		var keys = Object.keys(dataArr[i]);
		for(var j=1; j<keys.length; j++){
			var recVal = dataArr[i][Object.keys(dataArr[i])[j]];
			if(recVal.indexOf(searchString) != -1)
				//if(find(recVal, dataArr[i]) != -1)
					resArr.push(dataArr[i]);
		}
	}
	
	return resArr;
	
	function find(array, value) {
	  for (var i = 0; i < array.length; i++) {
		if (array[i] == value) return i;
	  }

	  return -1;
	}
  }
  
  formPrintBlock(id, page, mode) {
		var test = "http://vitalandru.ru/adminPanel/";
  
		var idArr = Array();
		$("input:checkbox:checked").each(function(indx, element){
			var tr = element.parentNode.parentNode;
			var thArr = tr.getElementsByTagName('th');
			var id = thArr[0].innerHTML;
			idArr.push(id);
		});
		
		$('#printBlock').html('');
		var url = "/adminPanel/php/qrImgGenerator.php"
		var request = {"data":Array(),"level":"L","size":"6"};
		var qrStrings = Array();
		var nameArr = Array();
		
		if(idArr.length){ // Для всех элементов с нажатым checkbox
			
			for(var i=0; i<idArr.length; i++){
				var dataArr = getRequest(page.serverPageUrl,{'id':idArr[i]});				
				var qrDataArr = getRequest("http://vitalandru.ru/jobs/qrCodes.php",{'id':dataArr[0].qrCodeId});
				var qrString = (typeof(qrDataArr[0].data) !== "undefined")?qrDataArr[0].data:'Error code';
				qrStrings.push(qrString);
				
				var name = "";
				switch(page.serverPageUrl){
					case "http://vitalandru.ru/jobs/ranks.php":
						name = dataArr[0].rankText;
					break;
					case "http://vitalandru.ru/jobs/achievements.php":
						name = dataArr[0].achText;
					break;
					case "http://vitalandru.ru/jobs/jobs.php":
						name = dataArr[0].jobText;
					break;
				};
				nameArr.push(name);
			}
			request.data = qrStrings;
			
			$.ajax({
				type: 'POST',
				url: url,
				data: request,
				async: false,
				success: function(data){		
				
					var obj = JSON.parse(data);
					for(var i=0; i<obj.length; i++){
						var p = element('p', null, {'width':'200px'}, ["size","img_txt"], nameArr[i]);
						var img = element('img', {'src':(test+obj[i].substring(obj[i].lastIndexOf('php'),obj[i].length))}, {'border':'1px solid #f3f3f3',"height":'200px','width':'200px'}, ["img_img"], nameArr[i]);
						$('#printBlock').append(element('div', null, {'border':'1px solid #fff'}, ["img_container"], [img,p]));
					}
					
					$('#table').css('display','none');
					$('#printBlock').css('display','block');
					
					let loadedCount = 0;
					let totalCount = obj.length;
					function printIfLoaded() {
						if (loadedCount == totalCount) {
							if(mode)
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
		else { // если выбран один элемент без нажатия checkbox - по кнопке
			var dataArr = getRequest(page.serverPageUrl,{'id':id});
			var qrDataArr = getRequest("http://vitalandru.ru/jobs/qrCodes.php",{'id':dataArr[0].qrCodeId});
			var qrString = (typeof(qrDataArr[0].data) !== "undefined")?qrDataArr[0].data:'Error code';
			qrStrings.push(qrString);
			
			var name = "";
			switch(page.serverPageUrl){
				case "http://vitalandru.ru/jobs/ranks.php":
					name = dataArr[0].rankText;
				break;
				case "http://vitalandru.ru/jobs/achievements.php":
					name = dataArr[0].achText;
				break;
				case "http://vitalandru.ru/jobs/jobs.php":
					name = dataArr[0].jobText;
				break;
			};			
			nameArr.push(name);
			
			request.data = qrStrings;
			console.log(dataArr)
			console.log(nameArr)
		
			$.ajax({
				type: 'POST',
				url: url,
				data: request,
				async: false,
				success: function(data){
					
					var obj = JSON.parse(data);
					var p = element('p', null, {'width':'200px'}, ["size","img_txt"], nameArr[0]);
					console.log(obj[0])
					var img = element('img', {'src':(test+obj[0].substring(obj[0].lastIndexOf('php'),obj[0].length))}, {'border':'1px solid #f3f3f3',"height":'200px','width':'200px'}, ["img_img"], nameArr[0]);
					
					$('#printBlock').append(element('div', null, {'border':'1px solid #fff'}, ["img_container"], [img,p]));					
					$('#table').css('display','none');
					$('#printBlock').css('display','block');
					
					let loadedCount = 0;
					let totalCount = 1;
					function printIfLoaded() {
						if (loadedCount == totalCount) {
							if(mode)
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
	}
}