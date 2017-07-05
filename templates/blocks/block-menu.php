<div class="parent-block">
	<div class="menu-wrap">
	
		<div class="wr menu-wr"> <!-- Блок с пунктами меню -->
			<script>
			/* Здесь размещается динамиически формируемое меню
				// Пример js-кода формирующего эту меню
				formMenu();
				controlMenu();
			*/
			</script>
		</div>
		
		<nav aria-label="menu-page-btns" style="position:absolute; bottom:0; width:100%;">
		  <ul class="pager no-margin">
			<li><button class="menu-page-btn menu-previous-btn">&larr; Назад</button></li>
			<li><button class="menu-page-btn menu-next-btn">Вперед &rarr;</button></li>
		  </ul>
		</nav>
	</div>
</div>
<hr style="border-bottom: 1px solid #b7b7b7; width: 100%; height: 1px; margin: 0;">


<style>
.vertical-menu > li > a {
	border: 1px solid rgba(183, 183, 183, 0.15);
	background: rgba(232, 232, 232, 0.05);
}
	
.menu-page-btn {
	margin: 8px 25px;
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.parent-block {
    height: 80%;
}
.menu-wrap {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex; 
    -webkit-flex-flow: column wrap; 
    -ms-flex-flow: column wrap; 
    flex-flow: column wrap;  
    width: 100%;
    height: 100%;
    max-height: 600px;
}
.menu-wrap > .wr {
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
}

.pager li>button {
    display: inline-block;
    padding: 5px 14px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
}

.pager li>button:focus {
    outline: none;
}

.vertical-menu > li > .active {
	text-decoration: none;
    background-color: #eee;
}

.vertical-menu > li.nav-header > a {
    background: white;
    color: #333;
    margin: 0;
    padding: 0;
    padding-top: 5px;
    font-weight: bold;
    font-size: 16px;
	border: none;
	cursor: default;
	pointer-events: none;
}
</style>