var testMode = false;
let menu;

$(function(){
  var href = (window.location.href == ('http://'+window.location.host+'/adminPanel/'))? 'http://'+window.location.host+'/#userCredentals' : window.location.href;
	if(!testMode) setPage(href);
	$(window).resize();
	formMenu();
});

$( window ).resize(
	function ff() {
		//Отображение 'верхушки' выпадающего блока
		$(".hidden-blocks").css('display','block');
		$("#toggle-li-text").css('display','block');
		// настройка высоты основных блоков при ресайзе окна
		$('.parent-block').css('height',(document.body.clientHeight-($('.header').height()+$('.footer').height())-5)+'px');
		$('.parent-body').css('height',(document.body.clientHeight-($('.header').height()+$('.footer').height())-5)+'px');
		
		formMenu();
		
		//Высота nav-bar-а (чтобы она оставалась постоянной после регистрации пользователя)
		if(document.body.clientWidth > 760)
			$("#nav-bar-block").css('height',"86px");
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
	var contentIsOpen = !!$(this).data('open');
	$(this).data('open', !$(this).data('open'));
	
	if(!contentIsOpen)
	{
		$("#toggle-frm").slideToggle("slow");
	} else {
		$("#toggle-frm").slideUp("slow");
		$("#show-frm").slideUp("slow");
	}
		
	$("#toggle-li-btn").css('display','none');
	$("#toggle-li-text").css('display','block');
});
	
$( ".preview" ).click(function() {
	$("#show-frm").slideToggle("slow");
});

window.addEventListener("hashchange", function(e) {
	if(!testMode) setPage(e.newURL);
	$("#toggle-frm").slideUp();
	$("#toggle-li-btn").css('display','block');
	$("#toggle-li-text").css('display','none');
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
	menu.showPage(menu.currentPage, menu.cntOnPage)
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
	menu.showPage(menu.currentPage, menu.cntOnPage)
});

function formMenu(){

	var menuItemsArr = Array();
	
	menuItemsArr.push({name:'Аккаунт пользователя', tag:'userCredentals', icon:''});
	//menuItemsArr.push({name:'Витальянцы', tag:'users', icon:''});
	menuItemsArr.push({name:'Отряды', tag:'teams', icon:''});
	menuItemsArr.push({name:'Санатории', tag:'sanatoriums', icon:''});
	menuItemsArr.push({name:'Подразделения', tag:'departments', icon:''});
	menuItemsArr.push({name:'Новости', tag:'news', icon:''});
	menuItemsArr.push({name:'Предмет оценки', tag:'slices', icon:''});
	menuItemsArr.push({name:'Оценки', tag:'values', icon:''});
	menuItemsArr.push({name:'Статистика подразделения', tag:'diagramMonth', icon:''});
	menuItemsArr.push({name:'Статистика по подразделениям', tag:'diagramDepartment', icon:''});
	menuItemsArr.push({name:'QR-коды', tag:'qr', icon:''});
	menuItemsArr.push({name:'Достижения', tag:'achievements', icon:''});
	menuItemsArr.push({name:'Звания', tag:'ranks', icon:''});
	menuItemsArr.push({name:'Прогресс', tag:'progress', icon:''});
	menuItemsArr.push({name:'Губерния', tag:'provinces', icon:''});
	menuItemsArr.push({name:'Задания', tag:'jobs', icon:''});
	menuItemsArr.push({name:'Посты пользователей', tag:'posts', icon:''});
	menuItemsArr.push({name:"Отметки постов", tag:'likes', icon:''});
	menuItemsArr.push({name:'Комментарии к постам', tag:'comments', icon:''});
	menuItemsArr.push({name:'Информация о постах', tag:'postInfo', icon:''});
	
	//menuItemsArr.push({name:'', tag:'', icon:''});
	
	menu = new dynamicMenu(menuItemsArr);
}