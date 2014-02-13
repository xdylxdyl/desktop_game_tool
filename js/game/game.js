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

var app = angular.module('gameTool', [], function ($compileProvider) {

});

app.filter('convent',function(){
   var  CN=dataService.getConfigCN();//获取汉字列表
    return function(input){
        if(input in CN)
            return CN[input];
        else
            return input;
    }
});

app.filter('hint',function(){
   var ROLES=dataService.getGameDetail();//获取细节
   var HINTCONFIG=gameService.getHintConfig();
    return function(id){
        var role=ROLES[id];
        if(role==undefined){
            return "";
        }
        return HINTCONFIG[role.role];
    }
});

app.controller("gameModelList",function($scope) {

    $scope.officialList = dataService.getGameList(constants.listType.official);
    $scope.userList = dataService.getGameList(constants.listType.user);

});

app.controller("gameInitCtrl",function($scope) {

   /***** init  ******/
        var gameConfig={},
        gc=gameService.getGameConfig();
        $scope.gameid=gc.gameid;
        $scope.gameConfig=gameService.gameConfigMaker(gc);
        $scope.peopleNum =gc.playerNumDefault;//init select
        $scope.gameChange=function(num){
            $scope.gameConfig.roles = gameService.buildGameConfigRoles(gc,num);
        }
        $scope.gameInit = function(){
            /*****  initVar => buildPropertiesList => roleMaker => setGameDetail ***/
           var formData=document.getElementsByTagName('input');
           var roleData=gameService.buildRoleMakeData(formData,gameConfig.playerNum);
           var propertiesData=gameService.buildProperties(gc.showProperties,formData);
            gameService.saveData(roleData,propertiesData);
            dataService.setGameDetail(gameService.roleMaker(roleData),gc.showProperties,propertiesData);
        }
        $scope.gameExit = function(){
            dataService.deleteGameDetail();
        }
})

app.controller("gamePlayCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gc=dataService.getConfig(gameid),
        currentTempArr=[];

    gc.roleAssign=dataService.getGameDetail();
    gc.playerNum = gc.roleAssign.length;
    gc.roles=gameService.buildGamePlayRoles(gc);
    /********** scope properties bind *************/
    $scope.currentData=[];
    $scope.gameConfig=gc;
    $scope.gamePlay=gc;
    $scope.currentId=1;
    for(var i=0;i<gc.showProperties.length;i++){
            currentTempArr.push(JsonUtil.toJSON("{'name':'"+gc.showProperties[i]+"','value':'"+gc.roleAssign[0][gc.showProperties[i]]+"'}"));
    }
    console.log(currentTempArr);
    /********************************************/

    $scope.showCurrentGamer=function(){
        $scope.currentData=currentTempArr;
    }
    $scope.currentGamerEraser=function(id){
        currentTempArr=[];
        $scope.currentData=[];
        $scope.currentId=id+1;
        if(id >= $scope.gameConfig.playerNum)
            return;

        for(var i=0;i<gc.showProperties.length;i++){
                    currentTempArr.push(JsonUtil.toJSON("{'name':'"+gc.showProperties[i]+"','value':'"+gc.roleAssign[id][gc.showProperties[i]]+"'}"));
        }

        if(id > $scope.gameConfig.playerNum) return;
        for(var i=0;i<gc.showProperties.length;i++){
           gc.roleAssign[id-1][gc.showProperties[i]]="";
           $scope.gameConfig.roleAssign=gc.roleAssign;
       }
    }
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
});

app.controller("judgeScanCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    var gameConfig=dataService.getConfig(gameid);
    var gameDetail=dataService.getGameDetail();

    gameConfig.gameid=gameid;
    gameConfig.playerNum = gameDetail.length;
    gameConfig.roleAssign=gameDetail;
    gameConfig.roles=gameService.buildGamePlayRoles(gameConfig);
    gameConfig.propertiesList=dataService.getFormData();

    $scope.gameConfig = gameConfig;
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
});


app.controller("gameTestCtrl",function($scope){

});


var introduceApp= angular.module('introduce', ["ngSanitize"], function ($compileProvider) {



});

introduceApp.controller("introduceGameCtrl",function($scope) {

    $scope.gameConfig=gameService.getGameConfig();


});