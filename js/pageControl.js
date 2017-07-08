
function getPageName(href){
	if(href.indexOf('#') != (-1))
		href = href.substr(href.indexOf('#')+1);
	else href='undefine';
	return href;
}

function add_to_all(pages, func) {
  for (let key in pages)
    pages[key].push(func);
}

function add_to_list(pages, n_pages, func) {
  n_pages.forEach((x) => pages[x].push(func));
}

function add_to_all_exlist(pages, n_pages, func) {
  add_to_all(pages, func);
  n_pages.forEach((x) => pages[x].pop());
}

function setPage(fullPageUrl){
	var pageName = getPageName(fullPageUrl);

	let sanatorium = new sanatoriumPage("http://vitalandru.ru/addProcs/sanatoriums.php");
	let province = new provincesPage("http://vitalandru.ru/addProcs/provincess.php");
	let team = new teamPage("http://vitalandru.ru/addProcs/teams.php", Array(sanatorium, province));
	let qr = new qrPage("http://vitalandru.ru/jobs/qrCodes.php");
	let rank = new rankPage("http://vitalandru.ru/jobs/ranks.php", Array(qr));
	let achievement = new achievementPage("http://vitalandru.ru/jobs/achievements.php", Array(qr));
	let job = new jobPage("http://vitalandru.ru/jobs/jobs.php", Array(qr));
	let department = new departmentPage("http://vitalandru.ru/values/departments.php");
	let slice = new slicePage("http://vitalandru.ru/values/valueSlices.php", Array(department));
	let news = new newsPage("http://vitalandru.ru/addProcs/news.php");
	let userCredental = new userCredentalPage("http://vitalandru.ru/users/userCredentals.php",Array(team, rank));
	let diagramMonth = new diagramMonthPage("http://vitalandru.ru/values/values.php", Array(department, slice));
	let diagramDepartment = new diagramDepartmentPage("http://vitalandru.ru/values/values.php", Array(department, slice));
	let value = new valuePage("http://vitalandru.ru/values/values.php", Array(userCredental, slice));	
	let post = new postPage("http://vitalandru.ru/posts/posts.php",Array(userCredental));
	let postInfo = new postInfoPage("http://vitalandru.ru/posts/postInfo.php",Array(userCredental, post));
	let comment = new commentPage("http://vitalandru.ru/posts/comments.php",Array(userCredental, post));
	let product = new productsPage("http://vitalandru.ru/avatar/products.php",Array());
	let item = new itemsPage("http://vitalandru.ru/avatar/items.php",Array());
	let itemsOnAvatar = new itemsOnAvatarPage("http://vitalandru.ru/avatar/itemsOnAvatar.php",Array(userCredental, item));
	let purchase = new purchasePage("http://vitalandru.ru/avatar/purchase.php",Array(userCredental, item));
	let rating = new ratingPage("http://vitalandru.ru/jobs/rating.php",Array(sanatorium, province, rank));// 6. Последний параметр это подключаемые сущности, если они нужны. В твоем случае возможно понадобятся сущности team, sanatorium и userCerdental (но это не точно, пишу по памяти)  

  window.names = [ 
    'teams',
    'sanatoriums',
    'departments',
    'news',
    'slices',
    'values',
    'diagramMonth',
    'diagramDepartment',
    'achievements',
    'ranks',
    'provinces',
    'jobs',
    'posts',
    'likes',
    'comments',
    'userCredentals',
	'items',
	'products',
	'purchases',
	'itemsOnAvatar',
	'rating',
  ];
	
  window.notAdderPages = [ 
	'posts',
	'likes',
	'values',
	'diagramMonth',
	'diagramDepartment',
	'itemsOnAvatar',
	'purchases',
	'rating',
  ];
  
  window.graphicsPages = [ 
	'diagramMonth',
	'diagramDepartment',
  ];

  let do_obj = {};
  window.names.forEach((x) => do_obj[x] = []);
  
///////// добавить свойство для всех страниц //////////
  add_to_all(do_obj, 
  () => { 
	$('#editForm').empty(); //очистить блок с поля для добавления/редактирования
	$('#printBlock').css('display','none');
	$('#table-block').empty();
	$('.date_picker').css('display','none');
  });
///////////////////////////////////////////////////////

//// добавить свойство для всех страниц кроме этих ////
  add_to_all_exlist(do_obj,
  window.notAdderPages,
  () => {
	$('#pp').css('display','block');
  });
  
  add_to_all_exlist(do_obj,
  window.graphicsPages,
  () => {
	$('#diagram').css('display','none');
	$('#table-block').css('display','block');
	$('#table').css('display','block');
	$('#search-line').css('display','block');
	$('#diagram-line').css('display','none');
  });
///////////////////////////////////////////////////////

////// добавить свойство только для этих страниц //////
  add_to_list(do_obj,
  window.graphicsPages,
  () => {
	$('#pp').css('display', 'none');
	$('#diagram').css('display','block');
	$('#table-block').css('display','none');
	$('#search-line').css('display','none');
  });
  
  add_to_list(do_obj,
  [
	'achievements',
	'ranks',
	'jobs',
  ],
  () => {
	//Обработка checkbox
	lightPrintBtnClick();
	printClicker();
	showClicker();
  });
///////////////////////////////////////////////////////

  do_obj[pageName].forEach((x) => x());

  pageLoad(pageName);
  
function pageLoad(pageName){
	switch(pageName){
		
		case 'provinces':
			var formData = province.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(province.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'sanatoriums':
			var formData = sanatorium.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(sanatorium.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'teams':
			var formData = team.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(team.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'ranks':
			var formData = rank.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(rank.formTableBlock());
			setFormQRAndAddClickerEvent(rank, qr, rank.hideTokenIdStoreBlockName);
			setOperationsClicker(Array('add','edit','delete','reload','print','show'))
		break;
		case 'achievements':
			var formData = achievement.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(achievement.formTableBlock());
			setFormQRAndAddClickerEvent(achievement, qr, achievement.hideTokenIdStoreBlockName);
			setOperationsClicker(Array('add','edit','delete','reload','print','show'))
		break;
		case 'jobs':
			var formData = job.formAddBlock();
			setFormToUpdateData(formData);
			$('.datetimepicker').datetimepicker({
				language: 'ru',
				minuteStepping:10,
				useSeconds:true,
				showToday:true,
				defaultDate:(new Date()).toString('yyyy-MM-dd HH:MM:ss'),
				
				format: 'YYYY-MM-DD HH:mm:ss'
			});
			$('#table-block').append(job.formTableBlock());
			setFormQRAndAddClickerEvent(job, qr, job.hideTokenIdStoreBlockName);
			setOperationsClicker(Array('add','edit','delete','reload','print','show'))
		break;
		case 'departments':
			var formData = department.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(department.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'slices':
			var formData = slice.formAddBlock();
			setFormToUpdateData(formData);
			
			$('.dropdown-menu > li > a').first().addClass('active');			
			$('.dropdown-menu > li > a').click(function(){
				$('.dropdown-menu > li > a').each(function(index,element){
					$(element).removeClass('active');
				});
				$(this).addClass('active');
				$('button[data-toggle=dropdown]').html($(this).html()+' <span class="caret"></span>');
				
				if($(this).attr('id') == 'repeated') // repeated
					showDatePicker(false);
				else // no-repeated
					showDatePicker(true);
			});
			$('#timepicker').datetimepicker({
				language: 'ru',
				minuteStepping:10,
				useSeconds:true,
				showToday:true,
				pickDate: false,
				defaultDate:(new Date()).toString('HH:MM:ss'),
				format: 'HH:mm:ss'
			});
			
			$('#datetimepicker').datetimepicker({
				language: 'ru',
				minuteStepping:10,
				useSeconds:true,
				showToday:true,
				pickDate: true,
				defaultDate:(new Date()).toString('yyyy-MM-dd HH:MM:ss'),
				
				format: 'YYYY-MM-DD HH:mm:ss'
			});
			showDatePicker(false);

			$('#table-block').append(slice.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			
			function showDatePicker(isShow){
				var sliceInput = $(".sliceInput").first();
				var notSliceInput = $(".sliceInput").last();
				
				if(isShow) {
					$('#timepicker').hide();
					$('#datetimepicker').show();					
					notSliceInput = $(".sliceInput").first();
					sliceInput = $(".sliceInput").last();
					$('.input-group-addon > span').attr('class','glyphicon-calendar glyphicon');
				}
				else {
					$('#timepicker').show();
					$('#datetimepicker').hide();
					sliceInput = $(".sliceInput").first();
					notSliceInput = $(".sliceInput").last();
					$('.input-group-addon > span').attr('class','glyphicon-time glyphicon');
				}
				
				$(sliceInput).attr('id','timeSlice');
				$(notSliceInput).removeAttr('id');
				$(sliceInput).attr('name','timeSlice');
				$(notSliceInput).removeAttr('name');
			}
		break;
		case 'news':
			$('#table-block').append(news.formTableBlock());
			var formData = news.formAddBlock();
			setFormToUpdateData(formData);
			if(formData!=""){
				var hght = $('#toggle-frm').height();
				$('#show-frm').css({"height":hght+"px"});
			}			
			var formData = news.formPreviewBlock();
			setloadFileAndUpdateClickerEvent(news, news.hideFileLoadBlockId);
			setOperationsClicker(Array('CRUD','reload','preview'))
		break;
		case 'userCredentals':
			console.log('1234567')
			var formData = userCredental.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(userCredental.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'diagramMonth':
			diagramMonth.formDiagram();
			$('#diagram-line').css('display','block');
			$('#datetimepicker-from').datetimepicker({
				language: 'ru',
				minuteStepping:10,
				useSeconds:true,
				showToday:true,
				pickTime: true,
				pickTime: false,
				format: 'DD.MM.YYYY'
			});
			$('#datetimepicker-to').datetimepicker({
				language: 'ru',
				minuteStepping:10,
				useSeconds:true,
				showToday:true,
				pickTime: true,
				pickTime: false,
				format: 'DD.MM.YYYY'
			});
		break;
		case 'diagramDepartment':
			diagramDepartment.formDiagram();
			$('#diagram-line').css('display','none');
			$('.date_picker').css('display','none');
		break;
		case 'values':
			$('#pp').css('display','none');
			$( ".toggle-btn" ).data('open',false);
			$('#table-block').append(value.formTableBlock());
			setOperationsClicker(Array('delete'))
		break;
		case 'posts':
			$('#pp').css('display','none');
			$('#table-block').append(postInfo.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'comments':
			$('#pp').css('display','none');
			$('#table-block').append(comment.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;		
		case 'products':
			var formData = product.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(product.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'items':
			var formData = item.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(item.formTableBlock());
			setOperationsClicker(Array('CRUD'))
		break;
		case 'itemsOnAvatar':
			$('#pp').css('display','none');
			$( ".toggle-btn" ).data('open',false);
			$('#table-block').append(itemsOnAvatar.formTableBlock());
			setOperationsClicker(Array('delete','reload'))
		break;
		case 'purchases':
			$('#pp').css('display','none');
			$( ".toggle-btn" ).data('open',false);
			$('#table-block').append(purchase.formTableBlock());
			setOperationsClicker(Array('delete','reload'))
		break;
		/*case 'show':
			alert('QR-коды генерируются заново каждый раз, Вы не можете посмотреть предыдущий. Пожалуйста, сгенерируйте новый.');
		break;*/
		case 'rating':
			$('#pp').css('display','none');
			$( ".toggle-btn" ).data('open',false);
			$('#table-block').append(rating.formTableBlock());
			setOperationsClicker(Array('delete'))
		break;
	}
	
	// кусок кода ниже должен ОБЯЗАТЕЛЬНО лежать после switch-а
	do_obj = {};
	window.names.forEach((x) => do_obj[x] = []);
	// Добавить свойство для всех страниц кроме этих
	add_to_all_exlist(do_obj,
	window.graphicsPages,
	() => {
		tdResize();
	});
	do_obj[pageName].forEach((x) => x());
	}
	
	function editClicker(){
		$(".edit-btn").click(function() {
			console.log("editClicker")
			let do_obj = {};
			var idArr = Array();
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.notAdderPages,
			() => {
				$('#editForm').empty();
				$( ".toggle-btn" ).data('open',true);
				$("#toggle-frm").slideDown();
			});						
			add_to_list(do_obj,
			[
				'achievements',
				'ranks',
				'jobs',
			],
			() => {
				$("input:checkbox:checked").each(function(indx, element){
					var tr = element.parentNode.parentNode;
					var thArr = tr.getElementsByTagName('th');
					var id = thArr[0].innerHTML;
					idArr.push(id);
				});
				if(idArr.length == 0)
					idArr.push($(this).attr('id'));
			});
			do_obj[pageName].forEach((x) => x());
			// кусок кода выше должен ОБЯЗАТЕЛЬНО лежать перед switch-ом
			
			switch(pageName){
				case 'provinces':
					var formData = province.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'sanatoriums':
					var formData = sanatorium.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'teams':
					var formData = team.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'ranks':
					if(idArr <= 1){
						var formData = rank.setEditClicker($(this).attr('id'));
						setFormToUpdateData(formData);
						setFormQRAndEditClickerEvent(rank, $(this).attr('id'), qr)
						setOperationsClicker(Array('add','edit','delete','reload','print','show'))
					}
					else {
						var formData = rank.setEditMultipleClicker(idArr);
						setFormToUpdateData(formData);
						multipleQREditClicker(qr);
					}
					$('.datetimepicker').datetimepicker({language: 'ru',minuteStepping:10,defaultDate:"09.01.2015",});
				break;
				case 'achievements':
					if(idArr <= 1){
						var formData = achievement.setEditClicker($(this).attr('id'));
						setFormToUpdateData(formData);
						setFormQRAndEditClickerEvent(achievement, $(this).attr('id'), qr)
						setOperationsClicker(Array('add','edit','delete','reload','print','show'))
					}
					else {
						var formData = achievement.setEditMultipleClicker(idArr);
						setFormToUpdateData(formData);
						multipleQREditClicker(qr);
					}
					$('.datetimepicker').datetimepicker({language: 'ru',minuteStepping:10,defaultDate:"09.01.2015",});
				break;
				case 'jobs':
					if(idArr <= 1){
						var formData = job.setEditClicker($(this).attr('id'));
						setFormToUpdateData(formData);
						setFormQRAndEditClickerEvent(job, $(this).attr('id'), qr)
						setOperationsClicker(Array('add','edit','delete','reload','print','show'))
					}
					else {
						var formData = job.setEditMultipleClicker(idArr);
						setFormToUpdateData(formData);
						multipleQREditClicker(qr);
					}
					$('.datetimepicker').datetimepicker({language: 'ru',minuteStepping:10,defaultDate:"09.01.2015",});
				break;
				case 'departments':
					var formData = department.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'slices':
					var formData = slice.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);

					var datetimeStr=$('#datetimepicker > input').val();
					var dateStr = datetimeStr.substr(0, datetimeStr.indexOf(' '));
					var timeStr = datetimeStr.substr(datetimeStr.indexOf(' ')+1);
					
					$('#timepicker > input').val(timeStr);
					if(dateStr == '0001-01-01'){					
						$('.dropdown-menu > li > a').first().addClass('active');
						showDatePicker(false);
						$('#datetimepicker > input').val((new Date()).toString('yyyy-MM-dd HH:MM:ss'));
					}
					else {
						$('.dropdown-menu > li > a').last().addClass('active');
						showDatePicker(true);
						$('#datetimepicker > input').val(datetimeStr);
						$('button[data-toggle=dropdown]').html('Датированная '+' <span class="caret"></span>');
					}
					
					$('.dropdown-menu > li > a').click(function(){
						$('.dropdown-menu > li > a').each(function(index,element){
							$(element).removeClass('active');
						});
						$(this).addClass('active');
						$('button[data-toggle=dropdown]').html($(this).html()+' <span class="caret"></span>');
						
						if($(this).attr('id') == 'repeated') // repeated
							showDatePicker(false);
						else // no-repeated
							showDatePicker(true);
					});
					$('#timepicker').datetimepicker({
						language: 'ru',
						minuteStepping:10,
						useSeconds:true,
						showToday:true,
						pickDate: false,
						defaultDate:timeStr,
						format: 'HH:mm:ss'
					});
					
					$('#datetimepicker').datetimepicker({
						language: 'ru',
						minuteStepping:10,
						useSeconds:true,
						showToday:true,
						pickDate: true,
						defaultDate:datetimeStr,
						
						format: 'YYYY-MM-DD HH:mm:ss'
					});
					setOperationsClicker(Array('CRUD'))
			
					function showDatePicker(isShow){
						var sliceInput = $(".sliceInput").first();
						var notSliceInput = $(".sliceInput").last();
						
						if(isShow) {
							$('#timepicker').hide();
							$('#datetimepicker').show();					
							notSliceInput = $(".sliceInput").first();
							sliceInput = $(".sliceInput").last();
							$('.input-group-addon > span').attr('class','glyphicon-calendar glyphicon');							
						}
						else {
							$('#timepicker').show();
							$('#datetimepicker').hide();
							sliceInput = $(".sliceInput").first();
							notSliceInput = $(".sliceInput").last();
							$('.input-group-addon > span').attr('class','glyphicon-time glyphicon');
						}
						
						$(sliceInput).attr('id','timeSlice');
						$(notSliceInput).removeAttr('id');
						$(sliceInput).attr('name','timeSlice');
						$(notSliceInput).removeAttr('name');
					}
				break;
				case 'news':
					var formData = news.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);					
					setloadFileAndUpdateClickerEvent(news, news.hideFileLoadBlockId);
					setOperationsClicker(Array('CRUD','reload','preview'))
				break;
				case 'userCredentals':
					var formData = userCredental.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'posts':
					$('#pp').css('display','block');
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					var formData = post.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'comments':
					$('#pp').css('display','block');
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					var formData = comment.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'products':
					var formData = product.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
				case 'items':
					var formData = item.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
				break;
			}
		});
	}
	
	function updateClicker(){
		console.log("updateClicker")
		$(".update-btn").click(function() {
			console.log("updateClicker")
			let do_obj = {};
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.graphicsPages,
			() => {
				$('#table-block').empty();
				$( ".toggle-btn" ).data('open',false);
				$("#toggle-frm").slideUp();
			});
			do_obj[pageName].forEach((x) => x());
			// кусок кода выше должен ОБЯЗАТЕЛЬНО лежать перед switch-ом
			
			
			switch(pageName){
				case 'provinces':
					province.setUpdateClicker();
					$('#editForm').empty();
					var formData = province.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(province.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'sanatoriums':
					sanatorium.setUpdateClicker();
					$('#editForm').empty();
					var formData = sanatorium.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(sanatorium.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'teams':
					team.setUpdateClicker();
					$('#editForm').empty();
					var formData = team.formAddBlock(team);
					setFormToUpdateData(formData);
					$('#table-block').append(team.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'departments':
					department.setUpdateClicker();
					$('#editForm').empty();
					var formData = department.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(department.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'slices':
					$('.dropdown-menu > li > a').each(function(index,element){
						//корректируем добавляемые данные для периодической оценки. Прибавляем к input-у 0001-01-01
						if($(element).hasClass('active')){
							if(index == 0){
								var timeStr = $(".sliceInput").first().val();
								$(".sliceInput").first().val('0001-01-01 '+timeStr);								
								$(".sliceInput").last().remove();// чтоб не добавлять undefined поле
							}
							else $(".sliceInput").first().remove();// чтоб не добавлять undefined поле
						}
					});

					slice.setUpdateClicker();					
					$('#table-block').append(slice.formTableBlock());
					$('#editForm').empty();
					var formData = slice.formAddBlock();
					setFormToUpdateData(formData);
					setOperationsClicker(Array('CRUD'))
					
					$('.dropdown-menu > li > a').first().addClass('active');			
					$('.dropdown-menu > li > a').click(function(){
						$('.dropdown-menu > li > a').each(function(index,element){
							$(element).removeClass('active');
						});
						$(this).addClass('active');
						$('button[data-toggle=dropdown]').html($(this).html()+' <span class="caret"></span>');
						
						if($(this).attr('id') == 'repeated') // repeated
							showDatePicker(false);
						else // no-repeated
							showDatePicker(true);
					});
					$('#timepicker').datetimepicker({
						language: 'ru',
						minuteStepping:10,
						useSeconds:true,
						showToday:true,
						pickDate: false,
						defaultDate:(new Date()).toString('HH:MM:ss'),
						format: 'HH:mm:ss'
					});
					
					$('#datetimepicker').datetimepicker({
						language: 'ru',
						minuteStepping:10,
						useSeconds:true,
						showToday:true,
						pickDate: true,
						defaultDate:(new Date()).toString('yyyy-MM-dd HH:MM:ss'),
						
						format: 'YYYY-MM-DD HH:mm:ss'
					});
					showDatePicker(false);
				break;
				case 'userCredentals':
					userCredental.setUpdateClicker();
					$('#editForm').empty();
					var formData = userCredental.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(userCredental.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'posts':
					post.setUpdateClicker();
					$('#pp').css('display','none');
					$('#editForm').empty();
					var formData = post.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(postInfo.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'comments':
					comment.setUpdateClicker();
					$('#pp').css('display','none');
					$('#editForm').empty();
					var formData = comment.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(comment.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'products':
					product.setUpdateClicker();
					$('#editForm').empty();
					var formData = product.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(product.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'items':
					item.setUpdateClicker();
					$('#editForm').empty();
					var formData = item.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(item.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
			};
			
			// кусок кода ниже должен ОБЯЗАТЕЛЬНО лежать после switch-а
			do_obj = {};
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.graphicsPages,
			() => {
				tdResize();	
			});
			do_obj[pageName].forEach((x) => x());
		});
	}

	function deleteClicker(){
		$(".delete-btn").click(function() {

			let do_obj = {};
			var idArr = Array();
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.graphicsPages,
			() => {
				$("input:checkbox:checked").each(function(indx, element){
					var tr = element.parentNode.parentNode;
					var thArr = tr.getElementsByTagName('th');
					var id = thArr[0].innerHTML;
					idArr.push(id);
				});
				if(idArr.length == 0)
					idArr.push($(this).attr('id'));
			});
			do_obj[pageName].forEach((x) => x());
			// кусок кода выше должен ОБЯЗАТЕЛЬНО лежать перед switch-ом
			
			switch(pageName){
				case 'provinces':
					province.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(province.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'sanatoriums':
					sanatorium.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(sanatorium.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'teams':
					team.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(team.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'ranks':
					var qrArr = Array();
					for(var i=0; i<idArr.length; i++){
						var dataArr = getRequest(rank.serverPageUrl,{'id':idArr[i]});
						qrArr.push(dataArr[0].qrCodeId);
					}
					rank.setDeleteClicker(idArr);					
					qr.setDeleteClicker(qrArr);
					$('#table-block').empty();
					$('#table-block').append(rank.formTableBlock());
					setFormQRAndAddClickerEvent(rank, qr, rank.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('add','edit','delete','reload','print','show'))
					$('.datetimepicker').datetimepicker({language: 'ru',minuteStepping:10,defaultDate:"09.01.2015",});
				break;
				case 'achievements':
					var qrArr = Array();
					for(var i=0; i<idArr.length; i++){
						var dataArr = getRequest(achievement.serverPageUrl,{'id':idArr[i]});
						qrArr.push(dataArr[0].qrCodeId);
					}
					achievement.setDeleteClicker(idArr);
					qr.setDeleteClicker(qrArr);
					
					$('#table-block').empty();
					$('#table-block').append(achievement.formTableBlock());
					setFormQRAndAddClickerEvent(achievement, qr, achievement.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('add','edit','delete','reload','print','show'))
					$('.datetimepicker').datetimepicker({language: 'ru',minuteStepping:10,defaultDate:"09.01.2015",});
				break;
				case 'jobs':
					var qrArr = Array();
					for(var i=0; i<idArr.length; i++){
						var dataArr = getRequest(job.serverPageUrl,{'id':idArr[i]});
						qrArr.push(dataArr[0].qrCodeId);
					}
					job.setDeleteClicker(idArr);
					qr.setDeleteClicker(qrArr);
					
					$('#table-block').empty();
					$('#table-block').append(job.formTableBlock());
					setFormQRAndAddClickerEvent(job, qr, job.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('add','edit','delete','reload','print','show'))
					$('.datetimepicker').datetimepicker({language: 'ru',minuteStepping:10,defaultDate:"09.01.2015",});
				break;
				case 'departments':
					department.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(department.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'slices':
					slice.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(slice.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'news':
					news.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(news.formTableBlock());
					setOperationsClicker(Array('CRUD','reload','preview'))
				break;
				case 'userCredentals':
					userCredental.setDeleteClicker(idArr);
					$('#table-block').append(userCredental.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'values':
					console.log(idArr)
					$('#pp').css('display','none');
					$( ".toggle-btn" ).data('open',false);
					value.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(value.formTableBlock());
					setOperationsClicker(Array('delete'))
				break;
				case 'posts':
					post.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(postInfo.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					// Удалить связаные postInfo, likes и comments
				break;
				case 'comments':
					post.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(comment.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;				
				case 'products':
					product.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(product.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'items':
					item.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(item.formTableBlock());
					setOperationsClicker(Array('CRUD'))
				break;
				case 'itemsOnAvatar':
					console.log(idArr)
					$('#pp').css('display','none');
					$( ".toggle-btn" ).data('open',false);
					itemsOnAvatar.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(itemsOnAvatar.formTableBlock());
					setOperationsClicker(Array('delete','reload'))
				break;
				case 'purchases':
					console.log(idArr)
					$('#pp').css('display','none');
					$( ".toggle-btn" ).data('open',false);
					purchase.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(purchase.formTableBlock());
					setOperationsClicker(Array('delete','reload'))
				break;
				case 'rating':
					console.log(idArr)
					$('#pp').css('display','none');
					$( ".toggle-btn" ).data('open',false);
					rating.setDeleteClicker(idArr);
					$('#table-block').empty();
					$('#table-block').append(rating.formTableBlock());
					setOperationsClicker(Array('delete'))
				break;
			};
		});
	}
	
	function reloadClicker(){
		$("#reload-btn").click(function() {
			console.log('reload')
			let do_obj = {};
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.notAdderPages,
			() => {
				$('#table-block').empty();
				$('#editForm').empty();
				$( ".toggle-btn" ).data('open',false);
				$("#toggle-frm").slideUp();
			});
			do_obj[pageName].forEach((x) => x());
			// кусок кода выше должен ОБЯЗАТЕЛЬНО лежать перед switch-ом
		
			document.getElementById('search-inpt').value = '';
			switch(pageName){
				case 'ranks':
					var formData = rank.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(rank.formTableBlock());
					setFormQRAndAddClickerEvent(rank, qr, rank.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('CRUD','reload','print','show'))
				break;
				case 'achievements':
					var formData = achievement.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(achievement.formTableBlock());
					setFormQRAndAddClickerEvent(achievement, qr, achievement.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('CRUD','reload','print','show'))
				break;
				case 'jobs':
					var formData = job.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').append(job.formTableBlock());
					setFormQRAndAddClickerEvent(job, qr, job.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('CRUD','reload','print','show'))
				break;
				case 'news':
					$('#table-block').append(news.formTableBlock());
					var formData = news.formAddBlock();
					setFormToUpdateData(formData);
					if(formData!=""){
						var hght = $('#toggle-frm').height();
						$('#show-frm').css({"height":hght+"px"});
					}			
					var formData = news.formPreviewBlock();
					setloadFileAndUpdateClickerEvent(news, news.hideFileLoadBlockId);
					setOperationsClicker(Array('CRUD','reload','preview'))
				break;
			};
			
			// кусок кода ниже должен ОБЯЗАТЕЛЬНО лежать после switch-а
			do_obj = {};
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.notAdderPages,
			() => {
				tdResize();	
				$('.datetimepicker').datetimepicker({language: 'ru',minuteStepping:10,defaultDate:"09.01.2015",});
			});
			do_obj[pageName].forEach((x) => x());
			console.log('reload-end')
		});
	}
	
	function lightPrintBtnClick(){
		$(":checkbox").change(function(){
			var td = this.parentNode.parentNode;
			//var id = td.getElementsByTagName('th')[0].innerHTML;
			
			var printBtn = td.getElementsByClassName('print-btn')[0];
			if($(this).is(':checked')){
				$(printBtn).removeClass('btn-warning');
				$(printBtn).addClass('btn-success');
			}
			else {
				$(printBtn).removeClass('btn-success');
				$(printBtn).addClass('btn-warning');
			}				
		});
	}
	
	function printClicker(){
		$(".print-btn").click(function() {
			let do_obj = {};
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.notAdderPages,
			() => {
				$('#pp').css('display','none');
			});
			do_obj[pageName].forEach((x) => x());
			// кусок кода выше должен ОБЯЗАТЕЛЬНО лежать перед switch-ом
		
			switch(pageName){
				case 'ranks':
					rank.formPrintBlock($(this).attr('id'));
				break;
				case 'achievements':
					achievement.formPrintBlock($(this).attr('id'));
				break;
				case 'jobs':
					job.formPrintBlock($(this).attr('id'));
				break;
				/*case 'achievements':
					$('#pp').css('display','none');
					achievement.formPrintBlock(this,2,1);
				break;
				case 'jobs':
					$('#pp').css('display','none');
					rank.formPrintBlock(this,4,1);
				break;
				case 'ranks':
					$('#pp').css('display','none');
					rank.formPrintBlock(this,2,1);
				break;
				case 'progress':
					$('#pp').css('display','none');
					progress.formPrintBlock(this,1,0);
				break;*/
			}
		})
	}
	
	function showClicker(){
		$(".show-btn").click(function() {
			let do_obj = {};
			window.names.forEach((x) => do_obj[x] = []);
			// Добавить свойство для всех страниц кроме этих
			add_to_all_exlist(do_obj,
			window.notAdderPages,
			() => {
				$('#pp').css('display','none');
			});
			do_obj[pageName].forEach((x) => x());
			// кусок кода выше должен ОБЯЗАТЕЛЬНО лежать перед switch-ом

			switch(pageName){
				case 'ranks':
					rank.formShowBlock($(this).attr('id'));
				break;
				case 'achievements':
					achievement.formShowBlock($(this).attr('id'));
				break;
				case 'jobs':
					job.formShowBlock($(this).attr('id'));
				break;
				/*case 'qr':
					$('#pp').css('display','none');
					qr.formPrintBlock(this,1,0);
				break;
				case 'achievements':
					$('#pp').css('display','none');
					achievement.formPrintBlock(this,2,1);
				break;
				case 'jobs':
					$('#pp').css('display','none');
					rank.formPrintBlock(this,4,1);
				break;
				case 'ranks':
					$('#pp').css('display','none');
					rank.formPrintBlock(this,2,1);
				break;
				case 'progress':
					$('#pp').css('display','none');
					progress.formPrintBlock(this,1,0);
				break;*/
			}
		})
	}
	
	function allCheckClicker(){
		$('#checkAll').change(function(){
			var state = $(this).prop("checked")	
			$("td > input:checkbox").each(function(indx, element){
				$(element).prop("checked",state);
			});
		});
	}
	
	function setOperationsClicker(operationsArr){
		if(operationsArr.indexOf('edit') != -1)
			editClicker();
		if(operationsArr.indexOf('delete') != -1)
			deleteClicker();
		if(operationsArr.indexOf('update') != -1)
			updateClicker();
		if(operationsArr.indexOf('CRUD') != -1){
			updateClicker();
			deleteClicker();
			editClicker();
		}
		if(operationsArr.indexOf('show') != -1)
			showClicker();
		if(operationsArr.indexOf('print') != -1)
			printClicker();
		if(operationsArr.indexOf('reload') != -1)
			reloadClicker();
		if(operationsArr.indexOf('preview') != -1){
			$( ".preview" ).click(function() {
				$('#toggle-frm').hide('slow');
				$("#show-frm").slideToggle("slow");
			});
		}
			
		allCheckClicker();
	}
}

function setFormToUpdateData(formData) {
	if(formData!=""){
		$('#editForm').append(formData);
		$('#toggle-loader').css('display','none');
	}
	else $('#toggle-loader').css('display','block');
}

function tdResize(){
console.log('tdResize')
	var tablePadding = 10;
	var tdPadding = 9;
	console.log($('.search-block').width()-2*tablePadding);
	var realTableWidth = $('.table').width();
	var allowableTableWidth = $('.search-block').width()-2*tablePadding;
	if(realTableWidth > allowableTableWidth){
		window.thWidthArr = Array();
		window.addSum = 0;
		$('#table-block').find('tr').each(function(index,element){
			if(index == 0) {					
				$(element).find('th').each(function(index,element){
					window.thWidthArr.push($(element).width()-(2*tdPadding));
				});
			}
			else {
				if(index == 1){
					if($(element).find('th').length != 0){
						window.addSum = $(element).find('th').width();
						window.thWidthArr[index]=0;
					}
					
					$(element).find('td').each(function(index,element){
						if($(element).find('input').length != 0){
							window.addSum +=$(element).width();
							var idx = ($(element).find('input[type="checkbox"]').length != 0)? index : (index+1);
							window.thWidthArr[idx]=0;
						}
					});
				}
				
				//console.log(window.thWidthArr)
				do{
					window.tableSum = window.addSum;
					for(var i=0; i<window.thWidthArr.length; i++){
						if(window.thWidthArr[i]!=0){
							window.thWidthArr[i]-=2;
							window.tableSum+=window.thWidthArr[i];
						}
					}
				}while(window.tableSum > allowableTableWidth);
				//console.log(window.thWidthArr)
			}
		});
		
		console.log(window.thWidthArr)
		$('#table-block').find('tr').each(function(index,element){
				$(element).children().each(function(index,element){
				if(window.thWidthArr[index] != 0){
					var tmp = '<div class="size" style="width:'+window.thWidthArr[index]+'px">'+$(element).html()+'</div>';
					$(element).html(tmp)
				}
			});
		});
	}
}