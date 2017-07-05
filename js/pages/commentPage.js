class commentPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.user = linkObjectsArr[0];
		this.post = linkObjectsArr[1];
	}
	
	formEditBlock() {
		super.formEditBlock();
				
		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'postId','name':'postId'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'userId','name':'userId'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'commentDateTime','name':'commentDateTime'}, null, null, null));

		var l2 = element('label', {'for':'commentText'}, null, null, 'Комментарий пользователя');
		var i2 = element('textarea', {'name':'commentText','type':'text','placeholder':'Комментарий пользователя','id':'commentText','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Пост пользователя','Витальянец','Текст комментария', 'Дата комментирования'];		
		
		var postsData = getRequest(this.post.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<postsData.length; j++)
			if(dataArr[i].postId == postsData[j].id){
				dataArr[i].postId = postsData[j].postText+' [ID: '+postsData[j].id+']';
				break;
			}
		}
		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<Object.keys(dataArr[i]).length; j++){
			
			}			
		}
		
		var usersData = getRequest(this.user.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<usersData.length; j++)
			if(dataArr[i].userId == usersData[j].id){
				dataArr[i].userId = usersData[j].firstName;
				break;
			}
		}
		
		var tt = super.formTableBlock(nameArr, dataArr, Array('edit','delete'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
}