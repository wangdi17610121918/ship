// JavaScript Document
(function(win,doc){
	win.onload=win.onresize=function(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth*20/320+'px';
	};
})(window,document);