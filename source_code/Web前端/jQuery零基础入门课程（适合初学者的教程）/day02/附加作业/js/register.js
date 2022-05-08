// 添加Person
function doAdd () {
	if(!doCheck()){
		return;
	} 
	var p=new Person(
				$("#txtName").val(),
				$("#txtPass").val(),
				$("#txtAge").val()*1,
				$("form :radio:checked").val(),
				$("#txtEmail").val());
	
	// 在localStorage中获取自定义的用户存储数量
	var cnt=localStorage.getItem("__user__count__");
	if(cnt==null){
		cnt=0;
	}
	else{
		cnt=parseInt(cnt);
	}
	// 用户信息的存储名为：__user__INDEX__
	for(var i=0;i<cnt;i++){
		// 将用户格式字符串转为JSON
		var person=$.parseJSON(
			localStorage.getItem("__user__"+i+"__"));
		if(person.name==p.name){
			console.log('用户名已存在');
			return;
		}
	}
	// JSON转格式字符串，如果浏览器不支持stringify方法，需使用jquery.json插件
	var str=JSON.stringify(p);
	localStorage.setItem("__user__"+cnt+"__",str);
	localStorage.setItem("__user__count__",cnt+1);
	console.log('注册成功');
	clearInput();
}

function clearInput(){
	$("form :reset").click();
	$("form span").empty();
}


// 用于验证表单数据的有效性
// true-验证通过
// false-验证不通过
function doCheck () {
	return doCheckName() &&
		doCheckAge() &&
		doCheckEmail();
}
// 验证用户名
function doCheckName () {
	 var str=$.trim($("#txtName").val());
	 $("#txtName").val(str);

	 var rx=/^[a-z\u4e00-\u9fa5]{2,10}$/i;
	 if(rx.test(str)){
	 	$("#txtName").next().html("姓名通过验证").css("color","green");
	 	return true;
	 }
	 $("#txtName").next().html("姓名未通过验证").css("color","red");
	 return false;
}
// 验证年龄
function doCheckAge () {
	 var str=$.trim($("#txtAge").val());
	 $("#txtAge").val(str);
	 var rx=/^\d+$/;
	 if(rx.test(str)){
	 	if(str>=16 && str<=40){
	 		$("#txtAge").next().html("年龄通过验证").css("color","green");
	 		return true;
	 	}
	 }
	 $("#txtAge").next().html("年龄未通过验证").css("color","red");
	 return false;
}
// 验证Email 
function doCheckEmail () {
	 var str=$.trim($("#txtEmail").val());
	 $("#txtEmail").val(str);
	 var rx=/^\w+@\w+\.\w+$/;
	 if(rx.test(str)){
	 	$("#txtEmail").next().html("Email通过验证").css("color","green");
	 	return true;
	 }
	 $("#txtEmail").next().html("Email未通过验证").css("color","red");
	 return false;
}
