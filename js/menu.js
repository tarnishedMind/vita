class dynamicMenu {	
	constructor(menuItemsArr) {
		$('.menu-wr').append(this.formMenuItem(menuItemsArr));
		
		this.currentPage = 0;
		this.cntOnPage = this.getCntItemsForSingleMenuPage();
		
		var menuBtnH = $('vertical-menu > li > a').height();
		this.cntPages = parseInt((this.cntItemsInMenu()/this.cntOnPage));
		if(this.cntPages*this.cntOnPage < this.cntItemsInMenu())
			this.cntPages+=1;
		
		// Пересчет элементов на страницах меню
		this.cntOnPageArr = this.recalculatePagesCntToArr();
		
		//this.showFirstPage();
		this.showActivePage(this.currentPage, this.cntOnPageArr, this.cntPages);
	}

// ============================================================================ // 
// ========================== //  Public methods  // ========================== // 
// ============================================================================ // 
	showActivePage(currentPage, cntOnPageArr, cntPages){
		this.showPage(currentPage, cntOnPageArr)
		
		/*$(".menu-previous-btn").parent().removeClass('disabled');
		$(".menu-next-btn").parent().removeClass('disabled');
		
		switch (currentPage){
			case 0:
				$(".menu-previous-btn").parent().addClass('disabled');
				console.log('first')
			break;
			case (cntPages-1):
				$(".menu-next-btn").parent().addClass('disabled');
				console.log('last')
			break;
		};*/
	}
	
	formMenuItem(menuItemsArr){	// Формирует пункты меню из массива [['href','Имя'],['href','Имя']]
		console.log(menuItemsArr)
		var globalDiv = element('ul', null, {'margin-top':'9px'}, ["nav", "vertical-menu"], null);
		for(var i=0; i<menuItemsArr.length; i++){
			var li = element('li', null, {'display':'none'}, [menuItemsArr[i].header], null);
			
			var iconSpan = element('span', null, {'margin-right':'8px','width':'30px'}, [menuItemsArr[i].icon], null);
			//var nameSpan = element('span', null, {'font-size':'14px'}, null, [menuItemsArr[i].name]);
			$(li).append(element('a', {'id':menuItemsArr[i].tag,'href':((menuItemsArr[i].header != '')?'':('#'+menuItemsArr[i].tag))}, null, null, [iconSpan, menuItemsArr[i].name]));
			$(globalDiv).append($(li));
		}
		return $(globalDiv);
	}

	showFirstPage(){
		$(document.getElementsByClassName("menu-previous-btn")[0]).addClass('disabled');
		this.showPage(this.currentPage, this.cntOnPage)
	}

	setActiveElementMenu(pageTag){
		$('.vertical-menu > li > a').removeClass('active');
		$(pageTag).addClass('active');
	}
// ============================================================================ // 
// ============================================================================ // 
	
// ============================================================================ // 
// ========================== //  Private methods  // ========================= // 
// ============================================================================ // 
	recalculatePagesCntToArr(){
		var cntOnPageArr = Array();
		var liCnt = $('.menu-wr > .vertical-menu > li').size();
		for(var i=0; i<this.cntPages; i++){
			if(liCnt>this.cntOnPage){
				cntOnPageArr.push(this.cntOnPage);
				liCnt-=this.cntOnPage;
			}
			else cntOnPageArr.push(liCnt);
		}
		
		function getLiClassFromIndex(idx){
			var liClass = '';
			var menuWR = document.getElementsByClassName('menu-wr')[0];
			var verticalMenu = menuWR.getElementsByClassName('vertical-menu')[0];
			var liList = verticalMenu.getElementsByTagName('li');
			
			for(var index=0;index<liList.length; index++){
				if(parseInt(idx) == parseInt(index)){
					liClass = liList[index].className;
					break;
				}
			}
			
			return liClass;
		}
		
		var _cntOnPage = this.cntOnPage;		
		var elSum = null;
		var allMinCntOnPage = false;
		var cntArr = cntOnPageArr.length;
		var cntOnPageArrElPrev = null;
		var prevSum = null;
		for(var i=0; (elSum<$('.menu-wr > .vertical-menu > li').size() && i<cntArr); i++){
			if(i == 0) {
				elSum=cntOnPageArr[i]-1;
				prevSum=elSum;
			}
			
			if(getLiClassFromIndex(elSum).indexOf('nav-header')!=-1){//если заголовок
				cntOnPageArrElPrev = cntOnPageArr[i];
				cntOnPageArr[i]=_cntOnPage-1;
				cntOnPageArr[i+1]+=cntOnPageArrElPrev-cntOnPageArr[i];				
			}
			else {
				cntOnPageArrElPrev = cntOnPageArr[i];
				cntOnPageArr[i+1]+=cntOnPageArrElPrev-_cntOnPage;
				cntOnPageArr[i]=_cntOnPage;	
			}

			elSum = prevSum;
			for(var j=0; j<=i; j++)
				elSum+=cntOnPageArr[j];
		}
	
		if(isNaN(parseInt(cntOnPageArr[cntOnPageArr.length-1])))
			cntOnPageArr.splice(cntOnPageArr.length-1, 1);
		//console.log(cntOnPageArr)
		return cntOnPageArr;
	}


	setActivePage(pageTag){
		var liIdx = -1;
		console.log(pageTag)
		$('.menu-wr > .vertical-menu > li').each(function(index, element){
			if($(element).children().attr('href') == pageTag)
				liIdx = index;
		});
		
		var liSum = 0;
		var currentPage=-1;
		for(var i=0; i<this.cntOnPageArr.length; i++){
			if(liIdx >= liSum && liIdx <= liSum+this.cntOnPageArr[i])
				currentPage=i;
			liSum+=this.cntOnPageArr[i];
		}
		
		this.showActivePage(currentPage, this.cntOnPageArr, this.cntPages);
	}

	//Отображение пунктов меню в соответствии со страницей
	showPage(currentPage, cntOnPageArr){
		var sumPrev = 0;
		for(var t=0; t<currentPage; t++)
			sumPrev+=cntOnPageArr[t]
		console.log(sumPrev)
		var begin = sumPrev;
		sumPrev+=cntOnPageArr[currentPage];
		var end = sumPrev;
		this.showItemsMenu(begin, end-1);
	}
	
	// Получение кол-ва пунктов меню
	cntItemsInMenu(){ 
		var menuParent = document.getElementsByClassName('menu-wr')[0];
		var ulMenu = menuParent.getElementsByTagName('ul')[0];
		var liArr = ulMenu.getElementsByTagName('li');
		return liArr.length;
	}
	
	// Получение кол-ва пунктов меню на стр
	getCntItemsForSingleMenuPage(){
		var body = $('.parent-block').height();
		var menuPager = $('.pager').height();
		var menuBtnH = 44;
		return parseInt(((body-menuPager)/menuBtnH)-0.2);
	}

	// Скрытие элементов массива. Видимыми остаются пункты меню с индексами от begin до end включительно
	showItemsMenu(begin, end){ 
		var menuParent = document.getElementsByClassName('menu-wr')[0];
		var ulMenu = menuParent.getElementsByTagName('ul')[0];
		var liArr = ulMenu.getElementsByTagName('li');
		for(var i=0; i<liArr.length; i++){
			liArr[i].style.display = 'block';
			if(i < begin || i > end)
				liArr[i].style.display = 'none';
		}
		
	}
// ============================================================================ // 
// ============================================================================ // 
}