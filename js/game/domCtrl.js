/**
 * Created by orphira on 14-2-10.
 */

/************ list dom ctrl **********************/
$('#topTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

function linkClick(obj){
    var id = null;//这个是要的id
    if(obj){
        id=obj.id;
        id=id.replace("h4-","");
        document.getElementById("link" + id).click();
    }
}

function checkForm(){
    var items = document.getElementsByClassName("roleItem"),
    sum   = 0,
    max   = document.getElementById("hidPeopleNum"),
    gameid = getParameterFromUrl(location.href, "gameid"),
    hidBtn = document.getElementById("startButton");

    for(var i= 0,ii=items.length;i<ii;i++){
        if(items[i].style.display=='none')continue;
            sum=sum+parseInt(items[i].value);
    }

    if(sum!=max.value){
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

var buttonMedia = function(){
    var media=document.getElementById("buttonAudio");
    media.play();
}

$(".btn").on('click',buttonMedia);
$("#fakeButton").on('click',checkForm);

$('#showRoleButton').click(function(){
   var btn=$("#eraserButton");
    if(btn.hasClass('disabled')){
        btn.removeClass('disabled');
    }
});
$('#eraserButton').click(function(){
   $(this).addClass('disabled');
});