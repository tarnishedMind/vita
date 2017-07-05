class postPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.user = linkObjectsArr[0];
		this.hideFileLoadBlockId = '';
		this.fileLoadBlockId = '';
	}

	formEditBlock() {
		super.formEditBlock();

		var globalDiv = element('div',null,{'margin-top':'10px'},null,null);
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'id','name':'id'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'userId','name':'userId'}, null, null, null));
		$(globalDiv).append(element('input', {'type':'hidden','value':'','id':'postDateTime','name':'postDateTime'}, null, null, null));
		
		var l2 = element('label', {'for':'postText'}, {'margin':'5px 0'}, null, 'Текст поста:');
		var i2 = element('textarea', {'name':'postText','type':'text','placeholder':'Текст поста','id':'postText','rows':'5'}, null, ["form-control"], null);
		$(globalDiv).append(element('div', null, null, ["form-group"], [l2,i2]));
		
		this.hideFileLoadBlockId = 'postPicture';
		var l1 = element('label', {'for':this.hideFileLoadBlockId}, {'margin-left':'0'}, ["control-label"], ['Изображение:']);
		var i1 = element('input', {'type':'file'}, null, ["form-control"], null);
		var h3 = element('input', {'type':'hidden','id':this.hideFileLoadBlockId,'name':this.hideFileLoadBlockId}, null, null, null);
		var d1 = element('div', null, null, ["inner"], [i1]);
		$(globalDiv).append(element('div', null, null, ["myInput", "form-horizontal"], [l1,h3,d1]));
		
		$(globalDiv).append(element('input', {'type':'submit', 'value':"Изменить запись", 'id':'edit'}, {"float":"right"}, ["update-btn", "btn", "btn-default"], null));
		return globalDiv;
	}
	
	/*formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Витальянец','Текст поста', 'Изображение поста', 'Дата публикации', "Количество лайков"];
		
		var postsData = getRequest(this.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<postsData.length; j++)
			if(dataArr[i].postId == postsData[j].id){
				dataArr[i].postId = postsData[j].postText;
				break;
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
		
		for(var i=0; i<dataArr.length; i++)
			delete dataArr[i].numComments;
		
		var tt = super.formTableBlock(nameArr, dataArr, Array('edit','delete'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}*/
}