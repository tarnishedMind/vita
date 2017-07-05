/*var tagName = 'div';
var attrArr = {'name':'tt','alt':'Текст'};
var styleArr = {'width':'100px','height':'100px'};
var classArr = ['er','we'];
element(tagName, attrArr, styleArr,classArr, '<a href="#sd">dsfdfs</a>');*/

function element(tagName = 'div', attrArr = Array(), styleArr = Array(), classArr = Array(), jqInner = Array()){
	var el = document.createElement(tagName);
	if(jqInner == null) jqInner = Array();
	for(i=0; i<jqInner.length; i++){
		var innEl = jqInner[i];
		$(el).append(innEl);
	}
	
	if(attrArr == null) attrArr = Array();
	for(i=0; i<Object.keys(attrArr).length; i++){
		var attrKey = Object.keys(attrArr)[i];
		var attrValue = attrArr[attrKey];
		$(el).attr(attrKey,attrValue);
	}
	
	if(styleArr == null) styleArr = Array();
	for(i=0; i<Object.keys(styleArr).length; i++){
		var cssKey = Object.keys(styleArr)[i];
		var cssValue = styleArr[cssKey];
		$(el).css(cssKey,cssValue);
	}
	
	if(classArr == null) classArr = Array();
	for(i=0; i<classArr.length; i++){
		var classValue = classArr[i];
		$(el).addClass(classValue);
	}
	
	return $(el);
}