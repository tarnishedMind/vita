function getRequest(_url, _request){
	var response='Error';
	$.ajax({
	  type: 'POST',
	  url: './php/requestAdapter.php',
	  data: {'type':'GET', 'url':_url, 'header':'Authorization: 3 21232f297a57a5a743894a0e4a801fc3', 'request':_request},
	  async: false,
	  success: function(data){
		response = data;
	  }
	});
	
	var JSONresponse = JSON.parse(response);
	if(JSONresponse.status == 'error'){
		JSONresponse = JSONresponse.data.message;
		JSONresponse = {};
	}
	else 
		JSONresponse = JSONresponse.data.objects;
	
	return JSONresponse;
}

function postRequest(_url, _request){
	console.log(_request)
	var response='Error';
	$.ajax({
	  type: 'POST',
	  url: './php/requestAdapter.php',
	  data: {'type':'POST', 'url':_url, 'header':'Authorization: 3 21232f297a57a5a743894a0e4a801fc3', 'request':_request},
	  async: false,
	  success: function(data){
		response = data;
		console.log(data)
	  }
	});
	return JSON.parse(response);
}

function putRequest(_url, _request){
	console.log(_request)
	var response='Error';
	$.ajax({
	  type: 'POST',
	  url: './php/requestAdapter.php',
	  data: {'type':'PUT', 'url':_url, 'header':'Authorization: 3 21232f297a57a5a743894a0e4a801fc3', 'request':_request},
	  async: false,
	  success: function(data){
		response = data;
		console.log(data)
	  }
	});
	return JSON.parse(response);
}

function deleteRequest(_url, _request){
	var response='Error';
	$.ajax({
	  type: 'POST',
	  url: './php/requestAdapter.php',
	  data: {'type':'DELETE', 'url':_url, 'header':'Authorization: 3 21232f297a57a5a743894a0e4a801fc3', 'request':_request},
	  async: false,
	  success: function(data){
		response = data;
		console.log(data)
	  }
	});
	return JSON.parse(response);
}

/*$.post('./php/requestAdapter.php',{type:'GET',url:'http://localhost',request:{'id':'24'}},function(data,status){
	  if( status=='success' ){
		console.log(data)
	  }else{
		alert('В процессе отправки произошла ошибка :(')
	  }
	});*/