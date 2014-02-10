/**
 * Created by orphira on 14-2-10.
 */
/*function checkRoleNum(role){
    var reg=new RegExp(/^\d{1,2}$/);
var obj=document.getElementById(role.name);
var num=parseInt(role.value);
if(role){
    if(num >= role.min && num <= role.max && reg.test(role.value) ){
    obj.style.visibility = 'hidden';
    var items = document.getElementsByClassName("roleItem");
    var max = document.getElementById("hidPeopleNum");
    var maxError=document.getElementById("maxPeople");
    var sum=0;
    if(role.name!="maxPeople"){
    for(var i=0;i<items.length;i++){
    if(items[i].style.display=='none')continue;
    sum=sum+parseInt(items[i].value);
    }
console.log(sum);
console.log(max.value);
if(sum!=max.value){
    maxError.style.visibility='visible';
    }else{
    maxError.style.visibility='hidden';
    }
}

}else{
    obj.style.visibility ='visible';
    }
checkStartBtn();
}
}

function checkStartBtn(){
    var errorObj=document.getElementsByClassName("error");
    var startBtn = document.getElementById("startButton");
    for(var i=0;i<errorObj.length;i++){
    if(errorObj[i].style.visibility != "hidden" ){
    domUtil.addClass(startBtn,"disabled");
    break;
    }
domUtil.removeClass(startBtn,"disabled");
}
}
*/
function checkForm(){
    var items = document.getElementsByClassName("roleItem"),
    sum   = 0,
    max   = document.getElementById("hidPeopleNum"),
    gameid = getParameterFromUrl(location.href, "gameid"),
    hidBtn = document.getElementById("startButton");


    // btn   = document.getElementById('startButton');

    for(var i= 0,ii=items.length;i<ii;i++){
    if(items[i].style.display=='none')continue;
    sum=sum+parseInt(items[i].value);
    }

if(sum!=max.value){
    console.log(isReq());
    bootbox.alert("请检查输入的数据或者游戏数据不完整！");

    }else{
    hidBtn.click();
    }
}
function isReq(){
    var items = document.getElementsByTagName("input");
    for(var i=0;i<items.length;i++){
    if(items[i].style.display!="none"&&items[i].style.visibility!="hidden"&&items[i].type!='hidden'){
    console.log(items[i]);
    if(!items[i].value) return false;
    }
}
return true;
}

