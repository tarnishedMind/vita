class ratingPage  extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.sanatorium = linkObjectsArr[0];
		this.province = linkObjectsArr[1];
		this.rank = linkObjectsArr[2];
		this.team = linkObjectsArr[3];
	}	
	
	
	formAddBlock() {
		
		function insertLiElems(){
	var insertTag = document.getElementById("table");// мы получаем в переменную элемент по тегу table для дальнейшей вставки	
	var ul = document.createElement('ul');// создаем элемент ul записывая в переменную
	ul.className = 'nav nav-pills';	// присваиваем класс
	//заполняем его внутренности
	ul.innerHTML = '<li style="width:33%; text-align:center"><a href="#">Пользователи</a></li><li style="width:33%; text-align:center"><a href="#">Отряды</a></li><li style="width:33%; text-align:center"><a href="#">Губернии</a></li>';		
	//insertTag.appendChild(ul);	
	insertTag.insertBefore(ul, insertTag.firstChild);//осуществляем вставку по полученному тегу до первого элемента данного тега
	return ul;
	}
		insertLiElems();
		/*
		super.formAddBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		var l1 = element('label', {'for':'name'}, null, null, ['Название губернии']);
		var i1 = element('input', {'name':'name','type':'text','placeholder':'Название губернии','id':'name'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		//return globalDiv;*/
	}
	
	formEditBlock() {
		/*
		super.formEditBlock();
		
		var globalDiv = element();
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		var l1 = element('label', {'for':'name'}, null, null, ['Название губернии']);
		var i1 = element('input', {'name':'name','type':'text','placeholder':'Название губернии','id':'name'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l1,i1]));
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		//return globalDiv;*/
	}
	
	
	formTableBlock(){
		
	var rating = this;
/*
!!! ВСТАВЛЯЕТСЯ ПОСЛЕ ОБЛАСТИ ФОРМЫ ПОИСКА
<ul class="nav nav-pills">
  <li style="width:33%; text-align:center"><a href="#">Пользователи</a></li>
  <li style="width:33%; text-align:center"><a href="#">Отряды</a></li>
  <li style="width:33%; text-align:center"><a href="#">Губернии</a></li>
</ul>
*/
	var insertTag = document.getElementById("table");// мы получаем в переменную элемент по тегу table для дальнейшей вставки	
	var ul = document.createElement('ul');// создаем элемент ul записывая в переменную
	ul.className = 'nav nav-pills';	// присваиваем класс
	//заполняем его внутренности
	ul.innerHTML = '<li id="li1" style="width:33%; text-align:center"><span>Пользователи</span></li><li id="li2" style="width:33%; text-align:center"><span>Отряды</span></li><li id="li3" style="width:33%; text-align:center"><span>Губернии</span></li>';		
	//insertTag.appendChild(ul);	
	insertTag.insertBefore(ul, insertTag.firstChild);//осуществляем вставку по полученному тегу до первого элемента данного тега
	
	var div1 = document.createElement("div");
	//div1.style.display = 'none';
	
	div1.style.height = '100px';
	//div1.style.background = 'red';
	$(div1).attr('id','div1');
	insertTag.appendChild(div1);
	$('#div1').append(rating.formTableForDiv3());
	
	var div2 = document.createElement("div");
	div2.style.display = 'none';
	div2.style.height = '100px';
	//div2.style.background = 'green';
	$(div2).attr('id','div2');
	insertTag.appendChild(div2);
	
	var div3 = document.createElement("div");
	div3.style.display = 'none';
	div3.style.height = '100px';
	//div3.style.background = 'blue';
	$(div3).attr('id','div3');
	insertTag.appendChild(div3);
	
	
	
	
	//var rating = this;
	$('#li1').click(function(){
		showDiv1();	
		$('#div1').empty();
		$('#div1').append(rating.formTableForDiv1());		
	});
	
	$('#li2').click(function(){
		showDiv2();
		$('#div2').empty();
		$('#div2').append(rating.formTableForDiv2());
		
	});
	
	$('#li3').click(function(){
		showDiv3();
		$('#div3').empty();
		$('#div3').append(rating.formTableForDiv3());		
	});
	
	/*
	var insertTag = document.getElementById("div1");
	insertTag.click = function(){
		
	}*/
	
	function showDiv1(){
		var id = document.getElementById("div1");
		id.style.display = 'block';
		var id1 = document.getElementById("div2");
		id1.style.display = 'none';
		var id2 = document.getElementById("div3");
		id2.style.display = 'none';			
	}	
	function showDiv2(){
		var id = document.getElementById("div1");
		id.style.display = 'none';
		var id1 = document.getElementById("div2");
		id1.style.display = 'block';
		var id2 = document.getElementById("div3");
		id2.style.display = 'none';		
	}	
	function showDiv3(){
		var id = document.getElementById("div1");
		id.style.display = 'none';
		var id1 = document.getElementById("div2");
		id1.style.display = 'none';
		var id2 = document.getElementById("div3");
		id2.style.display = 'block';		
	}
		
/*		
		var globalUl = element('ul',null,null,['thumbnails'],null);	
		// !!!!!!!!!!!!! НАЧАЛО 3 ТАБЛИЦЫ!!!!!!!!!!!!!!! ?type=provinces 
		var dataArr = getRequest(this.serverPageUrl,{'type':'provinces'});
		var nameArr = ['ID','Название','XP','Звёзды','Монеты'];
		// !!!!!!!!!!!!!! КОНЕЦ 3 ТАБЛИЦЫ!!!!!!!!!!!!!!! ?type=provinces		
		var tt = super.formTableBlock(nameArr, dataArr);
		$(tt).addClass("table table-bordered");	

		return $(tt);*/
		
			
				
		
	}

	formTableForDiv1(){
		// !!!!!!!!!!!!!!!!! НАЧАЛО 1 ТАБЛИЦА !!!!!!!! пользователи - ?type=users
		
		var dataArr = getRequest(this.serverPageUrl,{'type':'users'});
		var nameArr = ['ID','Отряд','Звание','Имя','Фамилия','Пол','Статус подтверждения','XP','Звёзды','Монеты'];				
		
		
		var teamData = getRequest(this.team.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<teamData.length; j++)
			if(dataArr[i].teamId == teamData[j].id){
				dataArr[i].teamId = teamData[j].name;
				break;
			}
			
		var rankData = getRequest(this.rank.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<rankData.length; j++)
			if(dataArr[i].rankId == rankData[j].id){
				dataArr[i].rankId = rankData[j].rankText;
				break;
			}	
		// !!!!!!!!!!!!!!! КОНЕЦ 1 ТАБЛИЦА!!!!!!!! пользователи - ?type=users
		var tt = super.formTableBlock(nameArr, dataArr);
		$(tt).addClass("table table-bordered");
		
		return $(tt);
	}
	
	formTableForDiv2(){
		// !!!!!!!!!!!! НАЧАЛО 2 ТАБЛИЦА!!!!!!!!!!!!отряды - ?type=teams
		var dataArr = getRequest(this.serverPageUrl,{'type':'teams'});
		var nameArr = ['ID','Название','Санаторий','Губерния','XP','Звёзды','Монеты'];
		
		
		var provinceData = getRequest(this.province.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<provinceData.length; j++)
			if(dataArr[i].provinceId == provinceData[j].id){
				dataArr[i].provinceId = provinceData[j].name;
				break;
			}
			
		var sanatoriumData = getRequest(this.province.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<provinceData.length; j++)
			if(dataArr[i].sanatoriumId == sanatoriumData[j].id){
				dataArr[i].sanatoriumId = sanatoriumData[j].name;
				break;
			}			
		// !!!!!!!!!!! КОНЕЦ 2 ТАБЛИЦА!!!!!!!!!!!!отряды - ?type=teams
		var tt = super.formTableBlock(nameArr, dataArr);
		$(tt).addClass("table table-bordered");	

		return $(tt);
	}
	
	formTableForDiv3(){
		// !!!!!!!!!!!!! НАЧАЛО 3 ТАБЛИЦЫ!!!!!!!!!!!!!!! ?type=provinces 
		var dataArr = getRequest(this.serverPageUrl,{'type':'provinces'});
		var nameArr = ['ID','Название','XP','Звёзды','Монеты'];
		// !!!!!!!!!!!!!! КОНЕЦ 3 ТАБЛИЦЫ!!!!!!!!!!!!!!! ?type=provinces		
		var tt = super.formTableBlock(nameArr, dataArr);
		$(tt).addClass("table table-bordered");	
		
		return $(tt);
	}
	
	setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Оценка','Дата оценивания', 'Комментарий', 'Пользователь', 'Предмет оценки'];
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");

		return $(tt);
	}	
}