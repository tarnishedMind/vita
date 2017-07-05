<div class="parent-body">
	<div class="wrap"> <!-- блок-граница от которого отталкиваются резиновые элементы -->
		
		
		<div class="wr" style="width: 100%;">
		<div class='search-block' style="width:100%;"> <!-- Область для формы поиска -->
			<div id="search-line" class='search-form'>
				<input id='ss' type="submit" name="action" class="srch-btn btn btn-default" value="Найти" style="float:right; margin-left: 5px;"/>
				<div class="myInput input" style="width:100%;">
				  <button id='reload-btn' type="submit" name="action" class="srch-btn glyphicon glyphicon-refresh btn btn-default" style="float:left; margin-right:5px;"></button>
				  <div class="inner">
					<input type="text" class="form-control search-input" id="search-inpt" name="find-text" placeholder="Search" style="margin:0;">
				  </div>
				</div>				
			</div>
				<div id="diagram-line" class='row graphic-form no-margin' style="display:none;">
					<div class="col-md-2 col-xs-12 no-margin col-lg-2" style="float:left;">
						<select class="dropdown-search form-control" style="display:block;"></select>						
					</div>
					
					<button class="btn btn-default col-md-2 col-xs-12 col-lg-2" style="float:right;" id="graphic_show">Отобразить данные</button>
					
					<div id="dateDiaposon" class="col-md-7 col-lg-7" style="margin: -3px 10px; float:right;">
						<div class="myInput input" style="width:50%; float:left;">
							<label id="showWith" for='from' style="float:left; margin-top:5px;  margin-right:5px;">C</label>
							<div class="inner" style="margin: 0 5px;">
								<div class="input-group date" id="datetimepicker-from">
								  <input type="text" id="from_field" name='from' class="form-control" style="border-radius:0;" />
								  <span class="input-group-addon">
									<span class="glyphicon-calendar glyphicon"></span>
								  </span>
								</div>
							</div>
						</div>
						<div class="myInput input" style="width:50%; float:right;">
							<label for='to' style="float:left; margin-top:5px; margin-right:5px;">по</label>
							<div class="inner" style="margin: 0 5px;">
								<div class="input-group date" id="datetimepicker-to">
								  <input type="text" id="to_field" name='to' class="form-control" style="border-radius:0;" />
								  <span class="input-group-addon">
									<span class="glyphicon-calendar glyphicon"></span>
								  </span>
								</div>
							</div>
						</div>						
					</div>
				</div>
			<div id="search-block-line"></div>
		</div> 
		
			<div id="printBlock"></div>
			<div id="table" class="row no-margin" style="height: 0px; //Магическое число!">	
				<div id='table-block' class="row no-margin" style="padding: 0 10px 25px 10px;">
					<script>
					/* Здесь размещается динамиически формируемая область ввода данных
						// Пример js-кода формирующего эту форму
						let team = new teamPage("http:\\localhost");
						team.formTableBlock();
					*/
					</script>
				</div>
			</div>
			<div id="diagram" style="width: 100%; height: 80%; display:none; margin: 0 auto;"></div>
		</div> <!-- Область для таблицы -->
		
		<div id="pp">
			<!--<div class="block inline hidden-blocks" style='background:white;'>-->
			<div class="block inline hidden-blocks" style='background:white;background-clip:content-box'>
				<div class="inner">
					<ul class="nav vertical-menu">
						<li class="active"><button id="toggle-li-btn" class="toggle-btn">Добавить новую запись</button></li>
						<li class="active"><button id="toggle-li-text" class="toggle-btn">Форма добавления новой записи</button></li>
					</ul>
				</div>	
			</div>
			<div class="row dynamic-form2 no-margin" id="toggle-frm" style='display:none; background:white; padding-bottom: 10px;'>
				<div id="toggle-loader" style="margin: 0 auto; width: 64px;"><img src="./imgs/35.gif" alt="loader"></div>
				<div id="editForm" class="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
					<script>
					/* Здесь размещается динамиически формируемая область ввода данных
						// Пример js-кода формирующего эту форму
						let team = new teamPage("http:\\localhost");
						$('#editForm').empty();
						$('#editForm').append(team.formAddBlock());
					*/
					</script>
				</div>
			</div>
			<div class=" dynamic-form2 no-margin" id="show-frm" style='display:none; background:white;'>
		</div> <!-- Выдвигашка -->
	</div>
</div>
<hr style="border-bottom: 1px solid #b7b7b7; width: 100%; height: 1px; margin: 0;">

<style>
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.parent-body {
    height: 80%;
}
.wrap {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex; 
    -webkit-flex-flow: column wrap; 
    -ms-flex-flow: column wrap; 
    flex-flow: column wrap;  
    width: 100%;
    height: 100%;
    max-height: 600px;
    //border: 1px solid #900;
}
.wrap > .wr {
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    border: 1px solid #ccc;
	overflow: scroll;
	overflow-x: hidden;
}

.img_container {
  display: inline-block;
  margin:10px;
}

.img_txt {
  margin: 0;
  text-align: center;
}
</style>

<!--<div class="row toggle-div no-margin">
	<div class="wrapper no-margin">
		<div style='margin: 7px auto; float:left;'>
			<div class="btn-toolbar" role="toolbar">
				<button id='reload-btn' type="submit" name="action" class="srch-btn glyphicon glyphicon-refresh btn btn-default" style="float:left;"></button>
				<input type="text" class="form-control search-input" id="search-inpt" name="find-text" placeholder="Search">
				<input id='ss' type="submit" name="action" class="srch-btn btn btn-default" value="Найти"/>
			</div>
		</div>
		<div id="search-block-line"></div>
			
		<div class="row no-margin hidden-blocks" style="height: 0px; //Магическое число!">	
			<div id='table-block' class="row no-margin" style="padding: 0 10px;">
				<script>
				/* Здесь размещается динамиически формируемая область ввода данных
					// Пример js-кода формирующего эту форму
					let team = new teamPage("http:\\localhost");
					team.formTableBlock();
				*/
				</script>
			</div>
		</div>
		<div style='position:absolute; bottom:0; width:100%;'>
		<div class="block inline hidden-blocks" style='background:white;'>
			<div class="inner">
				<ul class="nav vertical-menu">
					<li class="active"><button id="toggle-li-btn" class="toggle-btn">Добавить новую запись</button></li>
					<li class="active"><button id="toggle-li-text" class="toggle-btn">Форма добавления новой записи</button></li>
				</ul>
			</div>	
		</div>

		<div class="row dynamic-form2" id="toggle-frm" style='display:none; background:white;'>
			<div id="toggle-loader" style="margin: 0 auto; width: 64px;"><img src="./imgs/35.gif" alt="loader"></div>
			<div id="editForm" class="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
				<script>
				/* Здесь размещается динамиически формируемая область ввода данных
					// Пример js-кода формирующего эту форму
					let team = new teamPage("http:\\localhost");
					$('#editForm').empty();
					$('#editForm').append(team.formAddBlock());
				*/
				</script>
			</div>
		</div>
		<div class=" dynamic-form2" id="show-frm" style='display:none; background:red;'>
		</div>
		</div>
	</div>
</div>-->
