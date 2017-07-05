// Формируем событие загрузки файла и добавления полного блока записей из формы добавления в массив для передачи. Отправляем данные на сервер.
function setFormQRAndAddClickerEvent(page, qr=null, hideTokenStoreBlockName) {
	$('#add').click(function( event ){
		event.stopPropagation(); // Остановка происходящего
		event.preventDefault();  // Полная остановка происходящего

		// Отправляем запрос
		$.ajax({
        type:'POST',
        url:'./php/qrGenerator.php',
        data:{'req':'getToken'},
        response:'text',
			success: function(token){
				var xp = (($('#xp').length && $('#xp').val() != "")?$('#xp').val():'0');
				var stars = (($('#stars').length && $('#stars').val() != "")?$('#stars').val():'0');
				var coins = (($('#coins').length && $('#coins').val() != "")?$('#coins').val():'0');
			
				if(qr != null){
					$('#xp').remove();
					$('#stars').remove();
					$('#coins').remove();
					
					var response = postRequest(qr.serverPageUrl, {'id':'', 'data':token, 'xp':xp, 'stars':stars, 'coins':coins});
					
					if(response.status == 'ok'){
						$('input[name="'+hideTokenStoreBlockName+'"]').val(response.data.id);
						console.log($('input[name="'+hideTokenStoreBlockName+'"]'))
						console.log($('input[name="'+hideTokenStoreBlockName+'"]').val())
						}
					else $('input[name="'+hideTokenStoreBlockName+'"]').val('-1');
					
					
				}
				else {
					$('#xp').val(xp);
					$('#stars').val(stars);
					$('#coins').val(coins);
					
					$('input[name="'+hideTokenStoreBlockName+'"]').val(token);
				}

				page.setUpdateClicker();
				$("#reload-btn").trigger('click');
			}
		});
	});
}

function setFormQRAndEditClickerEvent(page, id, qrPage) {
	var dataArr = getRequest(page.serverPageUrl,{'id':id});
	var qrDataArr = getRequest(qrPage.serverPageUrl,{'id':dataArr[0].qrCodeId});
	var dataRequest = dataArr[0];
	var qrRequest = qrDataArr[0]; 
	
	$('#editForm').find('input').each(function(index,element){
		if($(element).attr('id') != 'id' && $(element).attr('id') != 'edit')
			for(var j=1; j<Object.keys(qrRequest).length; j++)
				if($(element).attr('id') == Object.keys(qrRequest)[j]){
					$(element).val(qrRequest[Object.keys(qrRequest)[j]]);
					break;
				}
	});

	$('#edit').click(function( event ){
		event.stopPropagation(); // Остановка происходящего
		event.preventDefault();  // Полная остановка происходящего

		$('#editForm').find('input').each(function(index,element){
			if($(element).attr('id') != 'id' && $(element).attr('id') != 'edit'){
				for(var j=1; j<Object.keys(dataRequest).length; j++){
					if($(element).attr('id') == Object.keys(dataRequest)[j]){
						dataRequest[Object.keys(dataRequest)[j]]=$(element).val();
						break;
					}
				}
				
				for(var j=1; j<Object.keys(qrRequest).length; j++){
					if($(element).attr('id') == Object.keys(qrRequest)[j]){
						qrRequest[Object.keys(qrRequest)[j]]= (($(element).val()!="")? $(element).val():0);
						break;
					}
				}
			}
		});
		putRequest(qrPage.serverPageUrl, qrRequest);
		putRequest(page.serverPageUrl, dataRequest);
		//page.setUpdateClicker();
		$("#reload-btn").trigger('click');
	});
}

function multipleQREditClicker(qrPage){
	$('#setQrData').click(function() {
		var inpts = $(this).parent().find('input[type=text]');
		var updateData = {};
		$(inpts).each(function(index, element){
			updateData[$(element).attr('id')] = ($(element).val() == "")? "0" : $(element).val();
		});
	
		var ops = $(this.parentNode).find('select > option');
		$(ops).each(function(index, element){
			updateData['id'] = $(element).attr('name');
			var qrDataArr = getRequest(qrPage.serverPageUrl,{'id':updateData['id']});
			updateData['data'] = qrDataArr[0].data;
			putRequest(qrPage.serverPageUrl, updateData);
		});
		
		$("#reload-btn").trigger('click');
	});
}