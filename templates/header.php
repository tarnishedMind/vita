
<div id="header-layer" class='no-margin'>
<nav class="navbar navbar-inverse no-margin navbar-shadows">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
	  <a class="navbar-brand visible-xs" href="#">Brand</a>
    </div>
	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		<ul class="nav vertical-menu vertical-menu-inverse visible-xs navbar-nav ">
			<li class="active"><a href="#users">Витальянцы</a></li>
			<li><a href="#teams">Отряды</a></li>
			<li><a href="#sanatoriums">Санатории</a></li>			
			<li><a href="#departments">Подразделения</a></li>
			<li><a href="#news">Новости</a></li>
			<li><a href="#slices">Предмет оценки</a></li>
			<li><a href="#values">Оценки</a></li>
			<li><a href="#diagramMonth">Статистика подразделения</a></li>
			<li><a href="#diagramDepartment">Статистика по подразделениям</a></li>
			<li><a href="#qr">QR-коды</a></li>
			<li><a href="#achievements">Достижения</a></li>
			<li><a href="#ranks">Звания</a></li>
			<li><a href="#progress">Прогресс</a></li>
			<script>
				/*menuItemsArr.push(Array("users","Витальянцы"));
				menuItemsArr.push(Array("teams","Отряды"));
				menuItemsArr.push(Array("sanatoriums","Санатории"));
				menuItemsArr.push(Array("departments","Подразделения"));
				menuItemsArr.push(Array("news","Новости"));
				menuItemsArr.push(Array("slices","Предмет оценки"));
				menuItemsArr.push(Array("values","Оценки"));
				menuItemsArr.push(Array("diagramMonth","Статистика подразделения"));
				menuItemsArr.push(Array("diagramDepartment","Статистика по подразделениям"));
				menuItemsArr.push(Array("qr","QR-коды"));
				menuItemsArr.push(Array("achievements","Достижения"));
				menuItemsArr.push(Array("ranks","Звания"));
				menuItemsArr.push(Array("progress","Прогресс"));*/
			</script>
		</ul>
	</div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <div id='nav-bar-block' class="nav navbar-nav navbar-right col-md-2" style='color:white;'>	
			<? $answer=json_decode($jsonAnswer); ?>
			<?if(isset($answer->token)):?>
				<div style='color:white; margin-top:5px;'>Пользователь: </div>
				<a href="#registration" style='color:#64abfb;'>
					<div class="size"><?=$answer->name?></div>
				</a>
				<div class="col-md-12" style="width:100%; padding: 2px;">				
					<form class="bs-example">
						<div style="width: 110px; margin: 0 auto;">
						<a href="#" name='action' class="btn btn-default btn-xs glyphicon glyphicon-list-alt" role="button"></a>
						<a href="#" name='action' class="btn btn-default btn-xs glyphicon glyphicon-list-alt" role="button"></a>
						<a href="#" name='action' class="btn btn-default btn-xs glyphicon glyphicon-list-alt" role="button"></a>
						<a href="#" name='action' class="btn btn-default btn-xs glyphicon glyphicon-list-alt" role="button"></a>
						</div>
					</form>
					</div>
				</div>
			<? else : ?>
				<div id="registration-form" class="form-inline navbar-right disabled">
				  <input name="page" hidden value="signIn"/>
				  <div class="frm-group clear-both mrgn-xs">
					<input class="btn-xs" name='login' type="text" class="form-control disabled" id="login" placeholder="Login">
				  </div>
				  <div class="frm-group clear-both mrgn-xs">
					<input class="btn-xs" name="password" type="password" class="form-control disabled" id="password" placeholder="Password">
				  </div>
				  <div class="frm-group clear-both">
					  <!--<a href="#registration" class='disabled'>Регистрация</a>-->
					  <span style="color:white;">Регистрация</span>
				  </div>
				  <button type="submit" name='action' class="btn btn-default btn-xs disabled" style="float:right">Войти</button>
				</div>
			<?endif?>
      </div>
    </div>
  </div>
</nav>
</div> 
<!-- Логотип должен быть ниже чем nav-bar (иначе стили упадут) -->
<div id="logo-layer" class='hidden-xs'>
	<div class="logo-text2">
		<img src="./imgs/logo3.png" alt="logo"/>
	</div>
	<div class="logo-img2">
		<img src="./imgs/logo2.png" alt="logo"/>
	</div>	
</div> 