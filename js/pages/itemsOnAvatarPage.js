class itemsOnAvatarPage extends dynamicPage {
	constructor(serverPageUrl, linkObjectsArr) {
		super(serverPageUrl, linkObjectsArr)
		this.user = linkObjectsArr[0];
		this.item = linkObjectsArr[1];
	}
	
	formTableBlock() {
		var nameArr = ['ID','Предмет для аватара', 'Пользователь'];
		
		var dataArr = getRequest(this.serverPageUrl,{});
		
		var userData = getRequest(this.user.serverPageUrl,{});		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<userData.length; j++)
			if(dataArr[i].userId == userData[j].id){
				dataArr[i].userId = userData[j].firstName+' '+userData[j].lastName;
				break;
			}
		
		var itemsData = getRequest(this.item.serverPageUrl,{});
		
		for(var i=0; i<dataArr.length; i++)
			for(var j=0; j<itemsData.length; j++)
			if(dataArr[i].itemId == itemsData[j].id){
				dataArr[i].itemId = itemsData[j].itemText;
				break;
			}
			
		var tt = super.formTableBlock(nameArr, dataArr, Array('delete'));
		$(tt).addClass("table table-bordered");

		return $(tt);
	}
}