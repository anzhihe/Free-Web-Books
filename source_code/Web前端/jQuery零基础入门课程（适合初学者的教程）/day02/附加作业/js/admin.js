// 用于存放所有Person对象的数组
var persons=[];

$(function(){
	var cnt=localStorage.getItem("__user__count__");
	for(var i=0;i<cnt;i++){
		var p=$.parseJSON(localStorage.getItem("__user__"+i+"__"));
		persons.push(p);
	}
	
	$.each(persons,function(idx,item){
		addPerson2Table(item);
	});

	window.addEventListener("storage", callback ,false);
});

function callback(se){
	if(se.key=="__user__count__"){
		var n=se.newValue;
		var p=$.parseJSON(localStorage.getItem("__user__"+(n-1)+"__"));
		persons.push(p);
		addPerson2Table(p);
	}
}

var ascending=true;
function doSort(){
	persons.sort(function(a,b){
		return a.age-b.age;
	});
	if(!ascending){
		persons.reverse();
	}
	$("#tb").empty();
	$.each(persons,function(idx,item){
		addPerson2Table(item);
	});
	ascending=!ascending;
}

// 添加单个Person对象到表格中
function addPerson2Table (person) {		
	var tr=$("<tr>").appendTo("#tb");
	$("<td>").html(person.name).appendTo(tr);
	tr.append(createAgeTd(person));
	$("<td>").html(person.gender).appendTo(tr);
	$("<td>").html(person.email).appendTo(tr);
	tr.append(createModifyTd(person));
}

function createAgeTd (person) {
	var td=$("<td>");
	$("<span>").html(person.age).appendTo(td);
	$("<span>").append($("<input>").attr("size","2")).hide().appendTo(td);
	return td;
}

function createModifyTd () {
	var td=$("<td>");
	$("<span>").append(
		$("<input>").attr("type","button").val("修改").click(doModify)).appendTo(td);
	$("<span>").append(
			$("<input>").attr("type","button").val("确定").click(doConfirm)
		).append(
			$("<input>").attr("type","button").val("取消").click(doCancel)
		).hide().appendTo(td);
	return td;
}

function doModify(){
	var td=$(this).parent().parent().parent().children(':nth-child(2)');	
	td.find("input").val(td.find("span:first").html());
	doToggle($(this));
}

function doConfirm () {
	var td=$(this).parent().parent().parent().children(':nth-child(2)');
	var age=td.find("input").val();
	if(doCheckAge(age)){
		td.find("span:first").html(td.find("input").val());
		doToggle($(this));
		// 还应该修改persons中以及localStorage中的用户数据
	}
	else{
		alert("年龄必须在16-40之间");
	}
}

function doToggle(current){
	var td=current.parent().parent().parent().children(':nth-child(2)');
	td.find('span').toggle();
	td=current.parent().parent();
	td.find('span').toggle();
}

function doCancel () {
	doToggle($(this));
}
// 验证年龄
function doCheckAge (age) { 
	 var rx=/^\d+$/;
	 if(rx.test(age)){
	 	if(age>=16 && age<=40){
	 		return true;
	 	}
	 }
	 return false;
}

