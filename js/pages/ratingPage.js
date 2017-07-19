class ratingPage  extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.sanatorium = linkObjectsArr[0];
		this.province = linkObjectsArr[1];
		this.rank = linkObjectsArr[2];
		this.team = linkObjectsArr[3];
	}
	

	
	formTableBlock(){
		
	var rating = this; // будет необходимо дальше для объектного обращения

	/* 
	!!!
	!!!	Итак, первым действием мы осуществляем вставку таблички с переключаемыми вкладками.
	!!!	
	*/
	var insertTag = document.getElementById("table"); // мы получаем в переменную элемент по тегу table для дальнейшей вставки	
	var ul = document.createElement('ul'); // создаем элемент ul записывая в переменную
	ul.className = 'nav nav-pills';	// присваиваем класс
	ul.style.background = 'lightgrey';
	//ul.style.backgroundimage = 'linear-gradient(270deg, azure, paleturquoise, lightskyblue, azure)';
	ul.style.height = '35px';	
	//заполняем его внутренности
	ul.innerHTML = '<li id="li1" style="width:33%; text-align:center;"><span style="margin-top: 6px; cursor: pointer" class="badge">Пользователи</span></li><li id="li2" style="width:33%; text-align:center"><span style="margin-top: 6px;cursor: pointer" class="badge">Отряды</span></li><li id="li3" style="width:33%; text-align:center"><span style="margin-top: 6px;cursor: pointer" class="badge">Губернии</span></li>';		
	//insertTag.appendChild(ul);	
	insertTag.insertBefore(ul, insertTag.firstChild); //осуществляем вставку по полученному тегу до первого элемента данного тега
	
	/* 
	!!!
	!!!	Далее мы создаём три div элемента, первый имеет стандартное свойство display, два других - скрыты.
	!!! Каждй div получает свой номер а затем вставляется в ранее созданную таблицу.
	!!!
	*/
	var div1 = document.createElement("div");
	//div1.style.display = 'none';	
	div1.style.height = '100px';
	//div1.style.background = 'red';
	$(div1).attr('id','div1');// присваиваем идентификатор 'div1' для элемента который хранится в переменной div1
	insertTag.appendChild(div1);// вставляем наш div1 в ранее созданную табличку
	
	// мы уже вставляем в тег данные, чтобы они были открыты  
	$('#div1').append(rating.formTableForDiv1()); // данные открытые ПО УМОЛЧАНИЮ
	
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
	
	
	/* 
	!!!
	!!!	События кликов для каждого li-элемента
	!!!	1 - Кликаем по нашей вкладке.
	!!! 2 - Запускается функция отображения div элемента
	!!! 3 - div очищается чтобы не допустить наложения таблиц (выгруз таблицы ведь производится в сам div)
	!!! 4 - производится вставка таблицы которая строится соответствующим методом formTableForDiv, обращаемся через rating которому передано this вне тела функции
	!!! 
	!!! li элементы задаются еще при создании вкладок куском через innerHTML 
	*/
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
	}
	*/
	
	/* 
	!!!
	!!!	Функции
	!!!	1 - Кликаем по нашей вкладке.
	!!! 2 - Запускается функция отображения div элемента
	!!! 3 - div очищается чтобы не допустить наложения таблиц (выгруз таблицы ведь производится в сам div)
	!!! 4 - производится вставка таблицы которая строится соответствующим методом formTableForDiv, обращаемся через rating которому передано this вне тела функции
	!!! 
	!!! li элементы задаются еще при создании вкладок куском через innerHTML 
	*/
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
	}	
    /*
	!!	Таблица пользователи
	!!	?type=users
	!!	Строится в объект tt
	*/
	formTableForDiv1(){
				
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
		
		var tt = super.formTableBlock(nameArr, dataArr);
		$(tt).addClass("table table-bordered");
		
		return $(tt);
	}
	
	/*
	!!	Таблица отряды
	!!	Строится в объект tt
	!!	?type=users
	*/
	formTableForDiv2(){
		
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
		
		var tt = super.formTableBlock(nameArr, dataArr);
		$(tt).addClass("table table-bordered");	

		return $(tt);
	}
	
	/*
	!!	Таблица губернии
	!!	?type=provinces 
	!!	Строится в объект tt
	*/
	formTableForDiv3(){
		
		var dataArr = getRequest(this.serverPageUrl,{'type':'provinces'});
		var nameArr = ['ID','Название','XP','Звёзды','Монеты'];
				
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