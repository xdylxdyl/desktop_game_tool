/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-20
 * Time: 上午11:26
 * To change this template use File | Settings | File Templates.
 */
var constants = {
    listType:{
        "official":"official",
        "user":"user"
    },
    listUrl:{
        "official":"../json/list/list.json",
        "user":"../json/list/user.json"
    },
    listModel:{
        "official":gameList,
        "user":userList
    },
    version:{
        version:1,
        key:"dataVersion",
        debug:true
    }

}
var dataService = {
    getConfig:function (id) {
        var config= html5StorageService.get(id.toString(),  versionConfig[id.toString()]);
        console.log(config);
        return config;
    },
    getGameList:function (type) {

        return html5StorageService.get(type, constants.listModel[type]);

    },
    setGameDetail:function (data){
        html5StorageService.update("gameDetail",data);
    },
    getGameDetail:function(){
        return html5StorageService.get("gameDetail");
    },
    deleteGameDetail:function(){
        html5StorageService.delete("gameDetail");
    },
    /*
    setGamerProperties:function(dataArray){
        var roles=this.getGameDetail();
        console.log(dataArray[0].id);
        if(dataArray.length<=0 ) return;
        for(var i=0;i<roles.length;i++){
            if(dataArray[i].id == roles[i].id)
                JsonUtil.push(roles[i],dataArray[i]);
        }
        html5StorageService.update("gameDetail",roles);
    },
    deleteGamerProperties:function(id,key){
        var roles=this.getGameDetail();
        for(var role in roles)
            if(role.id=id)
                JsonUtil.pop(role,key);
        html5StorageService.update("gameDetail",roles);
    },
    */
    roleMaker : function (config,dataArray) {
        var playerNum = config.playerNum,
            rolesArray = [],
            rolesNumArray = [],
            roleChooser = 0,
            str = "",
            count = 1,
            returnData,
            flag = 1;
        var showList=config.showProperties;
        for (var i in config.roles) {
            rolesArray.push(config.roles[i].name);
            rolesNumArray.push(config.roles[i].num);
        }
        //var dataArray={"幽灵":"水果","水民":"苹果"};
            while (flag) {
                roleChooser = Math.floor(Math.random() * 4);
                if (rolesNumArray[roleChooser] > 0) {
                    if(JsonUtil.inArray(showList,"card")&&JsonUtil.inArray(showList,"role"))
                        str = str + "{id:" + count + ",role:'" + rolesArray[roleChooser] + "',card:'"+dataArray[rolesArray[roleChooser]]+"'},";
                    else if(JsonUtil.inArray(showList,"role"))
                        str = str + "{id:" + count + ",role:'" + rolesArray[roleChooser] + "'},";

                    rolesNumArray[roleChooser]--;
                    count++;
                }
                if (count == playerNum + 1) break;
            }

        returnData = "[" + str.substring(0, str.length - 1) + "]";
        return eval("(" + returnData + ")");

    }
}



var app = angular.module('gameTool', [], function ($compileProvider) {

  $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);

});




app.controller("gameModelList",function($scope) {

    $scope.officialList = dataService.getGameList(constants.listType.official);
    $scope.userList = dataService.getGameList(constants.listType.user);
})

app.controller("gameInitCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    $scope.gameid=gameid;
    $scope.gameConfig = dataService.getConfig(gameid);
    $scope.gameInit = function(){
        $scope.cardJSON="{'水民':'"+roleChooserForm.shuim.value+"','幽灵':'"+roleChooserForm.ulin.value+"'}";
        dataService.setGameDetail(dataService.roleMaker($scope.gameConfig,JsonUtil.toJSON($scope.cardJSON)));
    }
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
})

app.controller("gamePlayCtrl",function($scope) {

    var gameid = getParameterFromUrl(location.href, "gameid");
    var gc=dataService.getConfig(gameid);
    gc.roleAssign=dataService.getGameDetail();
    $scope.gameConfig=gc;
    $scope.gamePlay=gc;
    $scope.currentId=1;
    if(JsonUtil.inArray(gc.showProperties,"role"))
        $scope.currentGamer=gc.roleAssign[0].role;
    if(JsonUtil.inArray(gc.showProperties,"card"))
        $scope.currentCard=gc.roleAssign[0].card;
    $scope.changeCurrentGamer=function(id){
        if(JsonUtil.inArray(gc.showProperties,"role"))
            $scope.currentGamer=gc.roleAssign[id].role;
        $scope.currentId = id+1;
        if(JsonUtil.inArray(gc.showProperties,"card"))
            $scope.currentCard =gc.roleAssign[id].card;
    }
    $scope.currentGamerEraser=function(id){
        if(JsonUtil.inArray(gc.showProperties,"role")){
            gc.roleAssign[id-1].role="╮(╯_╰)╭";
            $scope.currentGamer=gc.roleAssign[id-1].role;
        }
        if(JsonUtil.inArray(gc.showProperties,"card")){
            gc.roleAssign[id-1].card="_(:з」∠)_";
            $scope.currentCard=gc.roleAssign[id-1].card;
        }
    }
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
});

app.controller("judgeScanCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    var gc=dataService.getConfig(gameid);
    gc.roleAssign=dataService.getGameDetail();
    gc.gameid=gameid;
    $scope.gameConfig=gc;
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
});