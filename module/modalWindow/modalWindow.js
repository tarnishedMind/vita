'use strict';

class modalWindow {
	constructor(/*параметры создания окна*/) {
		this.previousHref = '';
		//$('.modalDialog > div').css('width',width);
	}
	
	openWindow(){
		this.previousHref = window.location.href;			
		window.location.href = this.getLinkWithoutHash()+'#openModal'
	}
	
	closeWindow(){
		window.location.href = this.previousHref;			
	}
	
	getLinkWithoutHash(){
		var fullLink = window.location.href;
		var hashLink = window.location.hash;
		var idOf = fullLink.indexOf(hashLink);			
		var linkWithoutHash = fullLink.substring(0, idOf);
		
		return linkWithoutHash;
	}
}