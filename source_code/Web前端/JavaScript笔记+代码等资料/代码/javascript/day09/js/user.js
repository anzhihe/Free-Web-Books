/**
 *  简化根据id获取元素
 */
function $(id){
    return document.getElementById(id);
}


/**
 *  添加用户
 */
function addUser(){
    // 创建tr
    var tr=document.createElement('tr');
    // 创建td
    var tdChk=document.createElement('td');
    var tdName=document.createElement('td');
    var tdAge=document.createElement('td');
    var tdSex=document.createElement('td');
    var tdPhone=document.createElement('td');
    var tdDelete=document.createElement('td');
    // 将数据添加到td中
    var chkDelete=document.createElement('input');
    chkDelete.type='checkbox';
    chkDelete.name='item';
    chkDelete.onchange=function(){
        $('all').checked=true;

        var items=document.getElementsByName('item');
        for(var item of items){
            if(!item.checked){
                $('all').checked=false;
                break;
            }
        }
    }
    tdChk.appendChild(chkDelete);
    tdName.innerHTML=$('name').value;
    tdAge.innerHTML=$('age').value;
    tdSex.innerHTML=$('m').checked?$('m').value:$('f').value;
    tdPhone.innerHTML=$('phone').value;
    var btnDelete=document.createElement('button');
    btnDelete.innerHTML='删除';
    btnDelete.onclick=function(){ // 为按钮绑定点击事件
        this.parentNode.parentNode.remove();
    }
    tdDelete.appendChild(btnDelete);
    // 将td添加到tr中
    tr.appendChild(tdChk);
    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdSex);
    tr.appendChild(tdPhone);
    tr.appendChild(tdDelete);
    // 将tr添加到tbody中
    $('tb').appendChild(tr);

    // 清空表单数据
    $('btnReset').click(); // 立即执行点击
}


/**
 *  删除用户
 */
function deleteUser(btn){
   btn.parentNode.parentNode.remove();
}


/**
 *  从首行删除
 */
function deleteFirst(){
    $('tb').firstElementChild.remove();    
}


/**
 *  从末行删除
 */
function deleteLast(){
    $('tb').lastElementChild.remove();    
}


/**
 *  实现全选
 */
function checkAll(){
    var items=document.getElementsByName('item');
    for(var item of items){
        item.checked=$('all').checked;
    }
}


/**
 *  实现当选中下面所有复选框时自动选中全选
 */
function checkItem(){
    $('all').checked=true;

    var items=document.getElementsByName('item');
    for(var item of items){
        if(!item.checked){
            $('all').checked=false;
            break;
        }
    }
}


/**
 *  删除多个
 */
function deleteMultiple(){
    var items=document.getElementsByName('item');
    for(var i=0;i<items.length;i++){
        if(items[i].checked){
            items[i].parentNode.parentNode.remove();
            i--;
        }
    }
}