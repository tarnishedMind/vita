
function getPageName(href){
	if(href.indexOf('#') != (-1))
		href = href.substr(href.indexOf('#')+1);
	else href='undefine';
	return href;
}

function hide_calendar() {
  $('.date_picker').css('display','none');
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
	let rank = new rankPage("http://vitalandru.ru/jobs/ranks.php");
	let user = new userPage("http://vitalandru.ru/users/users.php", Array(team, rank));
	let department = new departmentPage("http://vitalandru.ru/values/departments.php");
	let slice = new slicePage("http://vitalandru.ru/values/valueSlices.php", Array(department));
	let news = new newsPage("http://vitalandru.ru/addProcs/news.php");
	let value = new valuePage("http://vitalandru.ru/values/values.php", Array(user, slice));
	let qr = new qrPage("http://vitalandru.ru/jobs/qrCodes.php");
	let achievement = new achievementPage("http://vitalandru.ru/jobs/achievements.php");
	let progress = new progressPage("http://vitalandru.ru/jobs/progress.php", Array(user));
	let diagramMonth = new diagramMonthPage("http://vitalandru.ru/values/values.php", Array(department, slice));
	let diagramDepartment = new diagramDepartmentPage("http://vitalandru.ru/values/values.php", Array(department, slice));
	let job = new jobPage("http://vitalandru.ru/jobs/jobs.php");
	let post = new postPage("http://vitalandru.ru/posts/posts.php",Array(user));
	let like = new likePage("http://vitalandru.ru/posts/likes.php",Array(user, post));
	let comment = new commentPage("http://vitalandru.ru/posts/comments.php",Array(user, post));
	let postInfo = new postInfoPage("http://vitalandru.ru/posts/postInfo.php",Array(user, post));
	let userCredental = new userCredentalPage("http://vitalandru.ru/users/userCredentals.php",Array(team, rank));
	
	//hide_calendar()

  let names = [ 
    'users', 
    'teams',
    'sanatoriums',
    'departments',
    'news',
    'slices',
    'values',
    'diagramMonth',
    'diagramDepartment',
    'qr',
    'achievements',
    'ranks',
    'progress',
    'provinces',
    'jobs',
    'posts',
    'likes',
    'comments',
    'postInfo',
    'userCredentals'];

  let do_obj = {};
  names.forEach((x) => do_obj[x] = []);
  
///////// добавить свойство для всех страниц //////////
  add_to_all(do_obj, 
  () => { 
	$('#editForm').empty(); //очистить блок с поля для добавления/редактирования
	$('#printBlock').css('display','none');
	$('#table-block').empty();
  });
///////////////////////////////////////////////////////

//// добавить свойство для всех страниц кроме этих ////
  add_to_all_exlist(do_obj,
  [
	'postInfo',
	'likes',
	'values',
	'diagramMonth',
	'diagramDepartment',
  ],
  () => {
	$('#pp').css('display','block');
	$('#diagram').css('display','none');
	$('#table-block').css('display','block');
	$('#table').css('display','block');
	$('.dropdown-search').css('display','none');
	$('.search-input').css('display','block');
	$('#ss').css('display','block');
	$('#reload-btn').css('display','block');
	//deleteClicker();
  });
///////////////////////////////////////////////////////

////// добавить свойство только для этих страниц //////
  add_to_list(do_obj,
  [
	'diagramMonth',
	'diagramDepartment',
  ],
  () => {
	$('#pp').css('display', 'none');
	$('#diagram').css('display','block');
	$('#table-block').css('display','none');
	//$('#table').css('display','none');
	$('.search-input').css('display','none');
	$('#ss').css('display','none');
	$('#reload-btn').css('display','none');
  });
  
  add_to_list(do_obj,
  [
	'achievements',
	'ranks',
	'progress',
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
  
	switch(pageName){
		case 'sanatoriums':
			var formData = sanatorium.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(sanatorium.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'teams':
			var formData = team.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(team.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'userCredentals':
			var formData = userCredental.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(userCredental.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'departments':
			var formData = department.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(department.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'news':
			$('#table-block').empty();
			$('#table-block').append(news.formTableBlock());
			$('#editForm').empty();
			var formData = news.formAddBlock();
			if(formData!=""){
				$('#editForm').append(formData);
				$('#toggle-loader').css('display','none');
				var hght = $('#toggle-frm').height();
				$('#show-frm').css({"height":hght+"px"});
			}
			else {
				$('#toggle-loader').css('display','block');
			}
			
			$( ".preview" ).click(function() {
				$('#toggle-frm').hide('slow');
				$("#show-frm").slideToggle("slow");
			});
			
			$( ".loadFileBtn" ).click(function() {
				$( ".toggle-btn" ).data('open',false);
				$('#toggle-frm').hide('slow');
				$("#show-frm").slideToggle("slow");
			});
			setloadFileAndUpdateClickerEvent(news, news.hideFileLoadBlockId);
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'slices':
			var formData = slice.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(slice.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'values':
			$('#pp').css('display','none');		
			$('#table-block').empty();
			$('#table-block').append(value.formTableBlock());
			setOperationsClicker(Array('delete'))
			tdResize();
		break;
		case 'diagramMonth':
			$('.dropdown-search').css('display','block');
			diagramMonth.formDiagram();
		break;
		case 'diagramDepartment':
			$('.dropdown-search').css('display','none');		
			diagramDepartment.formDiagram();
		break;
		case 'achievements':			
			var formData = achievement.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').empty();
			$('#table-block').append(achievement.formTableBlock());			
			setFormQRAndUpdateClickerEvent(achievement, qr, achievement.hideTokenIdStoreBlockName);
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'ranks':
			var formData = rank.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').empty();
			$('#table-block').append(rank.formTableBlock());
			setFormQRAndUpdateClickerEvent(rank, qr, rank.hideTokenIdStoreBlockName);
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'jobs':
			var formData = job.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').empty();
			$('#table-block').append(job.formTableBlock());
			setFormQRAndUpdateClickerEvent(job, qr, job.hideTokenIdStoreBlockName);
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'progress':
			var formData = progress.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').empty();
			$('#table-block').append(progress.formTableBlock());
			setFormQRAndUpdateClickerEvent(progress, qr, progress.hideTokenIdStoreBlockName);
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'provinces':
			var formData = province.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(province.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'posts':
			$('#table-block').empty();
			$('#table-block').append(post.formTableBlock());
			$('#editForm').empty();
			var formData = post.formAddBlock();
			if(formData!=""){
				$('#editForm').append(formData);
				$('#toggle-loader').css('display','none');
				var hght = $('#toggle-frm').height();
				$('#show-frm').css({"height":hght+"px"});
			}
			else {
				$('#toggle-loader').css('display','block');
			}
			
			$( ".preview" ).click(function() {
				$('#toggle-frm').hide('slow');
				$("#show-frm").slideToggle("slow");
			});
			
			$( ".loadFileBtn" ).click(function() {
				$('#toggle-frm').hide('slow');
				$("#show-frm").slideToggle("slow");
			});
			setloadFileAndUpdateClickerEvent(post, post.hideFileLoadBlockId);
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'likes':
			$('#pp').css('display','none');
			var formData = like.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(like.formTableBlock());
			setOperationsClicker(Array('delete'))
			tdResize();
		break;
		case 'comments':
			var formData = comment.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(comment.formTableBlock());
			setOperationsClicker(Array('CRUD'))
			tdResize();
		break;
		case 'postInfo':
			$('#pp').css('display','none');
			var formData = postInfo.formAddBlock();
			setFormToUpdateData(formData);
			$('#table-block').append(postInfo.formTableBlock());
			setOperationsClicker(Array('delete'))
			tdResize();
		break;
	}
	
	function editClicker(){
		$(".edit-btn").click(function() {
			switch(pageName){
				case 'sanatoriums':
					$('#editForm').empty();
					var formData = sanatorium.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'teams':
					$('#editForm').empty();
					var formData = team.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'userCredentals':
					$('#editForm').empty();
					var formData = userCredental.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'departments':
					$('#editForm').empty();
					var formData = department.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'news':
					$('#editForm').empty();
					var formData = news.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
					loadFileEvent();
				break;
				case 'slices':
					$('#editForm').empty();
					var formData = slice.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'achievements':
					$('#editForm').empty();
					var formData = achievement.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'ranks':
					$('#editForm').empty();
					var formData = rank.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'jobs':
					$('#editForm').empty();
					var formData = job.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'progress':
					$('#editForm').empty();
					var formData = progress.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'provinces':
					$('#editForm').empty();
					var formData = province.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'posts':
					$('#editForm').empty();
					var formData = post.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
				case 'comments':
					$('#editForm').empty();
					var formData = comment.setEditClicker($(this).attr('id'));
					setFormToUpdateData(formData);
					$( ".toggle-btn" ).data('open',true);
					$("#toggle-frm").slideDown();
					updateClicker();
				break;
			}
		});
	}
	
	function updateClicker(){
		$(".update-btn").click(function() {
			switch(pageName){
				case 'sanatoriums':
					sanatorium.setUpdateClicker();
					$('#editForm').empty();
					var formData = sanatorium.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(sanatorium.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'teams':
					team.setUpdateClicker();
					$('#editForm').empty();
					var formData = team.formAddBlock(team);
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(team.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'userCredentals':
					userCredental.setUpdateClicker();
					$('#editForm').empty();
					var formData = userCredental.formAddBlock(sanatorium);
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(userCredental.formTableBlock(sanatorium));
					setOperationsClicker(Array('CRUD'))
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'departments':
					department.setUpdateClicker();
					$('#editForm').empty();
					var formData = department.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(department.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'news':
					news.setUpdateClicker();
					$('#editForm').empty();
					var formData = news.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(news.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					loadFileEvent()
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'slices':
					slice.setUpdateClicker();
					$('#editForm').empty();
					var formData = slice.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(slice.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'achievements':
					achievement.setUpdateClicker();
					$('#editForm').empty();
					var formData = achievement.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(achievement.formTableBlock());
					setFormQRAndUpdateClickerEvent(achievement, qr, achievement.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('delete','edit','update','print','show'));
					lightPrintBtnClick();
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'ranks':
					rank.setUpdateClicker();
					$('#editForm').empty();
					var formData = rank.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(rank.formTableBlock());
					setFormQRAndUpdateClickerEvent(rank, qr, rank.hideTokenIdStoreBlockName);
					setOperationsClicker(Array('delete','edit','update','print','show'));
					lightPrintBtnClick();					
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'jobs':
					job.setUpdateClicker();
					$('#editForm').empty();
					var formData = job.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(job.formTableBlock());
					setFormQRAndUpdateClickerEvent(job, qr, job.hideTokenIdStoreBlockName);
					lightPrintBtnClick();
					setOperationsClicker(Array('delete','edit','update','print','show'));
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'progress':
					progress.setUpdateClicker();
					$('#editForm').empty();
					var formData = progress.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(progress.formTableBlock());
					setFormQRAndUpdateClickerEvent(progress, qr, progress.hideTokenIdStoreBlockName);
					lightPrintBtnClick();
					setOperationsClicker(Array('delete','edit','update','print','show'));
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'provinces':
					province.setUpdateClicker();
					$('#editForm').empty();
					var formData = province.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(province.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'posts':
					post.setUpdateClicker();
					$('#editForm').empty();
					var formData = post.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(post.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					loadFileEvent()
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
				case 'comments':
					comment.setUpdateClicker();
					var formData = comment.formAddBlock();
					setFormToUpdateData(formData);
					$('#table-block').empty();
					$('#table-block').append(comment.formTableBlock());
					setOperationsClicker(Array('CRUD'))
					tdResize();
					$( ".toggle-btn" ).data('open',false);
					$("#toggle-frm").slideUp();
				break;
			};
		});
	}
	
	function printClicker(){
		$(".print-btn").click(function() {
			switch(pageName){
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
				break;
			}
		})
	}
	
	function showClicker(){
		$(".show-btn").click(function() {
			switch(pageName){
				case 'qr':
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
				break;
			}
		})
	}
	
	function deleteClicker(){
		$(".delete-btn").click(function() {
			switch(pageName){
				case 'provinces':
					province.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(province.formTableBlock());
					updateClicker()
					deleteClicker();
					editClicker();
				break;
				/*case 'sanatoriums':
					sanatorium.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(sanatorium.formTableBlock());
					updateClicker()
				break;
				case 'teams':
					team.setDeleteClicker($(this).attr('id'));
					$('#table-block').empty();
					$('#table-block').append(team.formTableBlock(sanatorium));
					updateClicker()						
				break;
				case 'userCredentals':
					userCredental.setDeleteClicker($(this).attr('id'));
					$('#table-block').empty();
					$('#table-block').append(userCredental.formTableBlock(sanatorium));
					updateClicker()						
				break;				
				case 'departments':
					department.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(department.formTableBlock());
					updateClicker()
				break;
				case 'news':
					news.setDeleteClicker($(this).attr('id'));
					$('#table-block').empty();
					$('#table-block').append(news.formTableBlock());
					updateClicker()
					loadFileEvent()
				break;
				case 'slices':
					slice.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(slice.formTableBlock());
					updateClicker()
				break;
				case 'jobs':
					job.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(job.formTableBlock());
					updateClicker()
				break;
				case 'achievements':
					achievement.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(achievement.formTableBlock());
					updateClicker()
				break;
				case 'ranks':
					rank.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(rank.formTableBlock());
					updateClicker()
				break;
				case 'progress':
					progress.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(progress.formTableBlock());
					updateClicker()
				break;
				case 'likes':
					like.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(like.formTableBlock());
					updateClicker()
				break;				
				case 'values':
					$('#pp').css('display','none');
					value.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(value.formTableBlock());
					deleteClicker()
					searchClicker();
					reloadClicker();
				break;
				case 'news':
					$('#pp').css('display','none');
					news.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(news.formTableBlock());
					editClicker()
					deleteClicker()
					searchClicker();
					reloadClicker();
				break;
				case 'qr':
					rank.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(rank.formTableBlock());
					updateClicker()
				break;
				case 'comments':
					comment.setDeleteClicker($(this).attr('id'));				
					$('#table-block').empty();
					$('#table-block').append(comment.formTableBlock());
					updateClicker()
				break;*/
			};
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
	
	function setOperationsClicker(operationsArr){
		if(operationsArr.indexOf('edit') != -1)
			deleteClicker();
		if(operationsArr.indexOf('delete') != -1)
			editClicker();
		if(operationsArr.indexOf('update') != -1)
			updateClicker();
		if(operationsArr.indexOf('CRUD') != -1){
			updateClicker();
			deleteClicker();
			editClicker();
		}
		/*if(operationsArr.indexOf('show') != -1)
			deleteClicker();
		if(operationsArr.indexOf('print') != -1)
			deleteClicker();*/
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