class postInfoPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.user = linkObjectsArr[0];
		this.post = linkObjectsArr[1];
	}

	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Витальянец','Текст поста', 'Изображение поста', 'Дата публикации', "Количество лайков"];
		
		var postsData = getRequest(this.post.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++){
			for(var j=0; j<postsData.length; j++)
			if(dataArr[i].postId == postsData[j].id){
				dataArr[i].postId = (dataArr[i].id+'='+postsData[j].id);//postsData[j].postText;
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
	}
}