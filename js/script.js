var testMode = false;
let menu;

$(function(){
  var href = (window.location.href == ('http://'+window.location.host+'/developingAdmin/'))? 'http://'+window.location.host+'/#userCredentals' : window.location.href;
	if(!testMode) {
		$( ".toggle-btn" ).data('open',false);
		setPage(href);	
	}
	$(window).resize();
	
	if(!testMode){
		var href = (window.location.href == ('http://'+window.location.host+'/developingAdmin/'))? 'http://'+window.location.host+'/#userCredentals' : window.location.href;		
		var idOf = href.indexOf('#');			
		var linkHash = href.substring(idOf);		
		linkHash = (window.location.href == ('http://'+window.location.host+'/developingAdmin/'))? linkHash : window.location.href;
		menu.setActiveElementMenu(linkHash);
		menu.setActivePage(linkHash);
	}
	
	//let modal = new modalWindow();
	//modal.openWindow();
});

$( window ).resize(
	function ff() {
		//Отображение 'верхушки' выпадающего блока
		$(".hidden-blocks").css('display','block');
		//$("#toggle-li-text").css('display','block');
		$("#toggle-li-btn").css('display','block');
		// настройка высоты основных блоков при ресайзе окна
		$('.parent-block').css('height',(document.body.clientHeight-($('.header').height()+$('.footer').height())-5)+'px');
		$('.parent-body').css('height',(document.body.clientHeight-($('.header').height()+$('.footer').height())-5)+'px');
		
		formMenu();
		
		//Высота nav-bar-а (чтобы она оставалась постоянной после регистрации пользователя)
		if(document.body.clientWidth > 760)
			$("#nav-bar-block").css('height',"86px");
		
		// Подписи для графика подразделений
		if(document.body.clientWidth > 992){
			var pdiv = $("#diagram-line > button");
			pdiv.insertBefore(pdiv.prev());
			$('#dateDiaposon').css('margin-top','-3px');
		}
		else {
			if(document.body.clientWidth >= 975){
				var pdiv = $("#diagram-line > button");
				pdiv.insertBefore(pdiv.prev());
				$('#dateDiaposon').css('margin-top','-3px');
			}
			else {
				if(document.body.clientWidth != 992){
					var pdiv = $("#diagram-line > button");
					pdiv.insertAfter(pdiv.next());
					$('#dateDiaposon').css('margin-top','5px');
				}
			}
		}
		
		// Адаптив кнопок у менюшки
		if($(window).width() > 1160) {
			$('.menu-previous-btn').html('<span aria-hidden="true">←</span> Назад');
			$('.menu-next-btn').html('Вперед <span aria-hidden="true">→</span>');
		}
		else {
			$('.menu-previous-btn').html('<span aria-hidden="true">←</span>');
			$('.menu-next-btn').html('<span aria-hidden="true">→</span>');
		}
			
		//var body = $('.parent-block').height();
		//$('.menu-wrap').height(body);
	}
);

//Выделение активного блока меню в мобильной версии
$( ".vertical-menu-inverse>li>a" ).click(function() {
	$( ".vertical-menu-inverse>li" ).removeClass();
	$(this).parent().addClass('active');
});

//Выпадающая форма снизу рабочей области
$( ".toggle-btn" ).click(function() {
	//$("#toggle-frm").slideToggle("slow");
	//var contentIsOpen = !!$(this).data('open');
	console.log("prev:"+$(this).data('open'))
	$(this).data('open', !$(this).data('open'));
	console.log("post:"+$(this).data('open'))
	
	if($(this).data('open'))
		$("#toggle-frm").slideDown("slow");
	else {
		$("#toggle-frm").slideUp("slow");
		$("#show-frm").slideUp("slow");
		}
	/*if(!contentIsOpen)
	{
		$("#toggle-frm").slideToggle("slow");
	} else {
		$("#toggle-frm").slideUp("slow");
		$("#show-frm").slideUp("slow");
	}
		
	//$("#toggle-li-btn").css('display','none');
	//$("#toggle-li-text").css('display','block');*/
});

window.addEventListener("hashchange", function(e) {
	if(!testMode) {
		$( ".toggle-btn" ).data('open',false);
		setPage(e.newURL);
		menu.setActiveElementMenu(window.location.hash);
		menu.setActivePage(window.location.hash)
	}
	$("#toggle-frm").slideUp();
	$("#toggle-li-btn").css('display','block');
	//$("#toggle-li-text").css('display','none');
}, false);

$(".menu-previous-btn").click(function() {
	menu.currentPage--;
	if(menu.currentPage>0){
		
		$(document.getElementsByClassName("menu-next-btn")[0]).removeClass('disabled');
	}
	if(menu.currentPage<=0) {
		menu.currentPage=0;
		$(this).addClass('disabled');
	}
	menu.showActivePage(menu.currentPage,menu.cntOnPageArr, menu.cntPages)
});

$(".menu-next-btn").click(function() {
	menu.currentPage++;
	if(menu.currentPage < menu.cntPages) {
		
		$(document.getElementsByClassName("menu-previous-btn")[0]).removeClass('disabled');
	}
	if(menu.currentPage >= (menu.cntPages-1)) {
		menu.currentPage=menu.cntPages-1;
		$(this).addClass('disabled');
	}
	menu.showActivePage(menu.currentPage,menu.cntOnPageArr, menu.cntPages)
});

function formMenu(){

	var menuItemsArr = Array();
	//nav-header
	menuItemsArr.push({name:'Структура лагеря', tag:'', icon:'', header:'nav-header'});
	menuItemsArr.push({name:'Аккаунт пользователя', tag:'userCredentals', icon:'fa fa-user', header:''});
	menuItemsArr.push({name:'Отряды', tag:'teams', icon:'fa fa-users', header:''});
	menuItemsArr.push({name:'Санатории', tag:'sanatoriums', icon:'fa fa-life-ring', header:''});
	menuItemsArr.push({name:'Губернии', tag:'provinces', icon:'fa fa-shield', header:''});
	
	menuItemsArr.push({name:'Задания и награды', tag:'', icon:'', header:'nav-header'});
	menuItemsArr.push({name:'Задания', tag:'jobs', icon:'fa fa-check-square-o', header:''});
	menuItemsArr.push({name:'Звания', tag:'ranks', icon:'fa fa-tags', header:''});
	menuItemsArr.push({name:'Достижения', tag:'achievements', icon:'fa fa-star', header:''});
	
	menuItemsArr.push({name:'Оповещения пользователей', tag:'', icon:'', header:'nav-header'});
	menuItemsArr.push({name:'Новости', tag:'news', icon:'fa fa-newspaper-o', header:''});
	
	menuItemsArr.push({name:'Оценки', tag:'', icon:'', icon:'', header:'nav-header'});
	menuItemsArr.push({name:'Подразделения для оценивания', tag:'departments', icon:'fa fa-level-up', header:''});
	menuItemsArr.push({name:'Предмет оценки', tag:'slices', icon:'fa fa-tasks', header:''});
	menuItemsArr.push({name:'Оценки', tag:'values', icon:'fa fa-thumbs-up', header:''});
	
	menuItemsArr.push({name:'Информация пользователей', tag:'', icon:'', header:'nav-header'});
	menuItemsArr.push({name:'Посты пользователей', tag:'posts', icon:'fa fa-commenting-o', header:''});
	menuItemsArr.push({name:'Комментарии к постам', tag:'comments', icon:'fa fa-commenting', header:''});
	
	menuItemsArr.push({name:'Статистика', tag:'', icon:'', header:'nav-header'});
	menuItemsArr.push({name:'Статистика подразделения', tag:'diagramMonth', icon:'fa fa-bar-chart', header:''});
	menuItemsArr.push({name:'Статистика по подразделениям', tag:'diagramDepartment', icon:'fa fa-pie-chart', header:''});
	
	menuItemsArr.push({name:'Товары и предметы (в разработке)', tag:'', icon:'', header:'nav-header'});
	menuItemsArr.push({name:'Товары', tag:'products', icon:'', header:''});	
	menuItemsArr.push({name:'Предметы для аватара', tag:'items', icon:'', header:''});	
	menuItemsArr.push({name:'Предметы пользователя', tag:'itemsOnAvatar', icon:'', header:''});	
	menuItemsArr.push({name:'Купля-продажа предметов', tag:'purchases', icon:'', header:''});	
//	menuItemsArr.push({name:'Прогресс', tag:'progress', icon:''});
//	menuItemsArr.push({name:"Отметки постов", tag:'likes', icon:''});	
//	menuItemsArr.push({name:'Информация о постах', tag:'postInfo', icon:''});	
//  menuItemsArr.push({name:'', tag:'', icon:''});
	
	menu = new dynamicMenu(menuItemsArr);
}