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
    version:{version:1, key:"dataVersion",debug:true
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
    setGameDetail:function(data){
        html5StorageService.update("gameDetail",data);
    },
    getGameDetail:function(){
        return html5StorageService.get("gameDetail");
    },
    deleteGameDetail:function(){
        html5StorageService.delete("gameDetail");
    }
}



var app = angular.module('gameTool', [], function ($compileProvider) {

  $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);

});




app.controller("gameModelList",function($scope) {

    $scope.officialList = dataService.getGameList(constants.listType.official);
    $scope.userList = dataService.getGameList(constants.listType.user)
})

app.controller("gameInitCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    $scope.gameid=gameid;
    $scope.gameConfig = dataService.getConfig(gameid);
    $scope.gameInit = function(){
        dataService.setGameDetail(roleMaker($scope.gameConfig));
    }
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
})

app.controller("gamePlayCtrl",function($scope) {
    $scope.currentId=1;
    var gameid = getParameterFromUrl(location.href, "gameid");
    var gc=dataService.getConfig(gameid);
    gc.roleAssign=dataService.getGameDetail();
    $scope.gameConfig=gc;
    $scope.gamePlay=gc;
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
    $scope.currentGamer=gc.roleAssign[0].role;
    $scope.changeCurrentGamer=function(id){
        $scope.currentGamer=gc.roleAssign[id].role;
        $scope.currentId = id+1;
    }
    $scope.currentGamerEraser=function(id){
       gc.roleAssign[id-1].role="╮(╯_╰)╭";
       $scope.currentGamer=gc.roleAssign[id-1].role;
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