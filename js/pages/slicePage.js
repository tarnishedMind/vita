class slicePage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.department = linkObjectsArr[0];
	}
	
	formAddBlock() {
		super.formAddBlock();
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'name'}, null, ["control-label"], ['Предмет оценки:']);
		var i1 = element('input', {'name':'name','type':'text','id':'name'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'departmentId'}, null, ["control-label"], ['Подразделение для оценивания:']);
		var teamData = getRequest(this.department.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<teamData.length; i++){
			var op = element('option', {'name':'departmentId', 'id':teamData[i].id}, null, null, [teamData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'departmentId', 'for':'department'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));

		
		var l2 = element('label', {'for':'timeSlice'}, {'margin-top':'5px'}, null, ['Временной срез:']);
		
		var a = element('a', {'id':'repeated'}, null, null, 'Периодическая');
		var li1 = element('li', null, null, null, [a]);
		var a = element('a', {'id':'no-repeated'}, null, null, 'Датированная');
		var li2 = element('li', null, null, null, [a]);
		var ul = element('ul', null, null, ["dropdown-menu"], [li1,li2]);
		var span = element('span', null, null, ["caret"], null);
		var btn = element('button', {'type':'button','data-toggle':'dropdown','aria-haspopup':'true','aria-expanded':'false'}, {'margin-bottom':'10px'}, ["btn","btn-default", "dropdown-toggle"], ['Периодическая ',span]);
		var dropdown = element('div', null, null, ["dropup input-group-btn"], [btn,ul]);
  
		var i2 = element('input', {'type':'text', 'name':'timeSlice', 'id':'timeSlice'}, {'border-radius':'0'}, ["form-control","sliceInput"], null);
		var glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var sp = element('span', null, null, ["input-group-addon"], [glyph]);		
		var dv = element('div', {'id':"timepicker"}, {'padding':'0 15px'}, ["input-group", "date"], [i2, sp]);
		
		var alt_i2 = element('input', {'type':'text', 'name':'timeSlice', 'id':'timeSlice'}, {'border-radius':'0'}, ["form-control","sliceInput"], null);
		var alt_glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var alt_sp = element('span', null, null, ["input-group-addon"], [alt_glyph]);		
		var alt_dv = element('div', {'id':"datetimepicker"}, {'padding':'0 15px'}, ["input-group", "date"], [alt_i2, alt_sp]);
		var alt_dd = element('div', null, {'display':'none'}, ["form-group","no-margin"], [alt_dv]);
		
		var dd = element('div', null, null, ["form-group","no-margin"], [dv,alt_dv]);
		var datepicker = element('div', null, null, ["inner"], [dd]);
		
		var ig = element('div', null, null, ["input-group"], [dropdown,datepicker]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin"], [l2,ig]);
		$(globalDiv).append(d11);
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Добавить запись",'id':'add'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}

/*<div class="col-lg-6">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div><!-- /btn-group -->
      <div class="form-group" style="margin:0;">
		<div class="input-group date" id="datetimepicker1">
		  <input type="text" class="form-control" style="border-radius:0;" />
		  <span class="input-group-addon">
			<span class="glyphicon-calendar glyphicon"></span>
		  </span>
		</div>
	  </div>
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->*/
	
	formEditBlock() {
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		
		var l1 = element('label', {'for':'name'}, null, ["control-label"], ['Предмет оценки:']);
		var i1 = element('input', {'name':'name','type':'text','id':'name'}, null, ["form-control"], null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,d1]));
		
		var l2 = element('label', {'for':'departmentId'}, null, ["control-label"], ['Подразделение для оценивания:']);
		var teamData = getRequest(this.department.serverPageUrl,{});
		var ops = Array();
		for(var i=0; i<teamData.length; i++){
			var op = element('option', {'name':'departmentId', 'id':teamData[i].id}, null, null, [teamData[i].name]);
			ops.push(op);
		}
		var s = element('select', {'id': 'departmentId', 'for':'department'}, null, ["form-control"], ops);		
		var d2 = element('div', null, null, ["inner"], [s]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l2,d2]));

		
		var l2 = element('label', {'for':'timeSlice'}, {'margin-top':'5px'}, null, ['Временной срез:']);
		
		var a = element('a', {'id':'repeated'}, null, null, 'Периодическая');
		var li1 = element('li', null, null, null, [a]);
		var a = element('a', {'id':'no-repeated'}, null, null, 'Датированная');
		var li2 = element('li', null, null, null, [a]);
		var ul = element('ul', null, null, ["dropdown-menu"], [li1,li2]);
		var span = element('span', null, null, ["caret"], null);
		var btn = element('button', {'type':'button','data-toggle':'dropdown','aria-haspopup':'true','aria-expanded':'false'}, {'margin-bottom':'10px'}, ["btn","btn-default", "dropdown-toggle"], ['Периодическая ',span]);
		var dropdown = element('div', null, null, ["dropup input-group-btn"], [btn,ul]);
  
		var i2 = element('input', {'type':'text', 'name':'timeSlice', 'id':'timeSlice'}, {'border-radius':'0'}, ["form-control","sliceInput"], null);
		var glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var sp = element('span', null, null, ["input-group-addon"], [glyph]);		
		var dv = element('div', {'id':"timepicker"}, {'padding':'0 15px'}, ["input-group", "date"], [i2, sp]);
		
		var alt_i2 = element('input', {'type':'text', 'name':'timeSlice', 'id':'timeSlice'}, {'border-radius':'0'}, ["form-control","sliceInput"], null);
		var alt_glyph = element('span', null, null, ["glyphicon-calendar", "glyphicon"], null);
		var alt_sp = element('span', null, null, ["input-group-addon"], [alt_glyph]);		
		var alt_dv = element('div', {'id':"datetimepicker"}, {'padding':'0 15px'}, ["input-group", "date"], [alt_i2, alt_sp]);
		var alt_dd = element('div', null, {'display':'none'}, ["form-group","no-margin"], [alt_dv]);
		
		var dd = element('div', null, null, ["form-group","no-margin"], [dv,alt_dv]);
		var datepicker = element('div', null, null, ["inner"], [dd]);
		
		var ig = element('div', null, null, ["input-group"], [dropdown,datepicker]);
		var d11 = element('div', null, null, ["myInput", "form-horizontal","no-margin"], [l2,ig]);
		$(globalDiv).append(d11);
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Название','Подразделение','Дата и время активации'];
		
		var departmentData = getRequest(this.department.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<departmentData.length; j++)
			if(dataArr[i].departmentId == departmentData[j].id){
				dataArr[i].departmentId = departmentData[j].name;
				break;
			}
			
			if(dataArr[i].timeSlice.indexOf('0001-01-01') != -1){
				var datetimeStr=dataArr[i].timeSlice;
				//var dateStr = datetimeStr.substr(0, datetimeStr.indexOf(' '));
				var timeStr = datetimeStr.substr(datetimeStr.indexOf(' ')+1);
				dataArr[i].timeSlice = 'Каждый день в '+timeStr;
			}
		}
		
		var tt = super.formTableBlock(nameArr, dataArr, Array('edit','delete'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Название','Подразделение','Временной срез'];
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");
		//$(tt).attr('id','getShowTable');
		return $(tt);
	}
}