class likePage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.user = linkObjectsArr[0];
		this.post = linkObjectsArr[1];
	}
	
	formTableBlock() {
		var dataArr = getRequest(this.serverPageUrl,{});
		var nameArr = ['ID','Витальянец','Дата оценки'];
		
		var postsData = getRequest(this.post.serverPageUrl,{});		
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
			
		var tt = super.formTableBlock(nameArr, dataArr, Array('delete'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
	
	/*setSearchClicker(searchString){
		var foundDataArr = super.setSearchClicker(searchString);
		var nameArr = ['ID','Название', 'ID санатория'];		
		var tt = super.formTableBlock(nameArr, foundDataArr);
		$(tt).addClass("table table-bordered");

		return $(tt);
	}*/
}