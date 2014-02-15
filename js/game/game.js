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
    console.log("test convent");
   var  CN=dataService.getConfigCN();//获取汉字列表
    return function(input){
        if(input in CN)
            return CN[input];
        else
            return input;
    }
});

app.filter('hint',function(){
   var ROLES=dataService.getGameDetail().role.obj;//获取细节
   var HINTCONFIG=gameService.getHintConfig();
    return function(id){
        var role=ROLES[id];
        if(role==undefined){
            return "";
        }
        return HINTCONFIG[role];
    }
});
app.filter('showCu',function(){
    var gameDetail=dataService.getGameDetail();
    var roles=gameDetail.role.obj;
    var properties=gameDetail.properties;
    return function(pro,id){
            switch (pro){
                case 'role':
                     return roles[id];
                default :
                     return properties[roles[id]][pro];
            }
    }
});
app.filter('showJu',function(){
    var gameDetail=dataService.getGameDetail();
    var properties=gameDetail.properties;
    return function(role,para){
        switch (para) {
            case 'role':
                return properties[role]['num'];
            default :
                return properties[role][para];
        }
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
        $scope.gameConfig=gameService.gameConfigMaker(gc,'init');
        $scope.peopleNum =gc.playerNumDefault;//init select
        $scope.gameChange=function(num){
            $scope.gameConfig.roles = gameService.buildGameConfigRoles(gc,num);
        }
        $scope.gameInit = function(){
            /*****  initVar => buildPropertiesList => roleMaker => setGameDetail ***/
           var formData=document.getElementsByTagName('input');
           var roleData=gameService.buildRoleMakeData(formData,gameConfig.playerNum);
           var propertiesData=gameService.buildProperties(formData,gc);
            dataService.setGameDetail(gameService.roleMaker(roleData),propertiesData);
        }
        $scope.gameExit = function(){
            dataService.deleteGameDetail();
        }
})

app.controller("gamePlayCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gc=dataService.getConfig(gameid);


    /********** scope properties bind *************/
    $scope.gameConfig=gameService.gameConfigMaker(gc,'play');
    $scope.flag=false;
    $scope.currentId=1;
    $scope.showCurrentGamer=function(){
        $scope.flag=true;
    }
    $scope.currentGamerEraser=function(id){
        $scope.currentId=id+1;
        if(id >= $scope.gameConfig.playerNum) return;
        $scope.flag=false;
    }
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
});

app.controller("judgeScanCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    var gameConfig=dataService.getConfig(gameid);
    $scope.gameConfig = gameService.gameConfigMaker(gameConfig,'play');
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