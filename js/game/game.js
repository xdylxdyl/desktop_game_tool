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

  $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);

});
app.filter('convent',function(){
    return function(input){
        var obj=dataService.getConfigCN();
        if(input in obj)
            return obj[input];
        else
            return input;
    }
});

app.filter('hint',function(){
    return function(id){
        var role=dataService.getGameDetail()[id];
        var config=gameService.getHintConfig();
        return config[role.role];
    }
});

app.controller("gameModelList",function($scope) {

    $scope.officialList = dataService.getGameList(constants.listType.official);
    $scope.userList = dataService.getGameList(constants.listType.user);

});

app.controller("gameInitCtrl",function($scope) {

   /***** init  ******/
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gameConfig={},
        gc=dataService.getConfig(gameid);
        $scope.gameid=gameid;
        $scope.gameConfig=dataService.gameConfigMaker(gc);
        $scope.peopleNum =gc.playerNumDefault;//init select
        $scope.gameChange=function(num){
            $scope.gameConfig.roles = dataService.buildGameConfigRoles(gc,num);
        }
        $scope.gameInit = function(){
            /*****  initVar => buildPropertiesList => roleMaker => setGameDetail ***/
            var startBtn = document.getElementById("startButton"),
                formData=document.getElementsByTagName('input');
            if(domUtil.hasClass(startBtn,"disabled"))return false;
           var roleData=dataService.buildRoleMakeData(formData,gameConfig.playerNum);
           var propertiesData=dataService.buildProperties(gc.showProperties,formData);
            dataService.saveData(roleData,propertiesData);
            dataService.setGameDetail(dataService.roleMaker(roleData),gc.showProperties,propertiesData);
        }
        $scope.gameExit = function(){
            dataService.deleteGameDetail();
        }
})

app.controller("gamePlayCtrl",function($scope) {
    /***** game play init *******/
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gc=dataService.getConfig(gameid),
        eraserArr=[],
        currentTempArr=[];
    /***************************/
    gc.roleAssign=dataService.getGameDetail();
    gc.playerNum = gc.roleAssign.length;
    gc.roles=dataService.buildGamePlayRoles(gc);
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

    //if($scope.currentId==9) $scope.currentId="";
    $scope.changeCurrentGamer=function(id){
        $scope.currentData=[];
        if(id > $scope.gameConfig.playerNum)
            return;
        $scope.currentId=id+1;
        for(var i=0;i<gc.showProperties.length;i++){
                    currentTempArr.push(JsonUtil.toJSON("{'name':'"+gc.showProperties[i]+"','value':'"+gc.roleAssign[id][gc.showProperties[i]]+"'}"));
        }
    }
    $scope.showCurrentGamer=function(){
        $scope.currentData=currentTempArr;
    }
    $scope.currentGamerEraser=function(id){
        currentTempArr=[];
        //$scope.currentId=id;
        $scope.changeCurrentGamer(id);
        eraserArr.push(id);
        if(id > $scope.gameConfig.playerNum) return;
        for(var i=0;i<gc.showProperties.length;i++){
           gc.roleAssign[id-1][gc.showProperties[i]]="QAQ"
           $scope.gameConfig.roleAssign=gc.roleAssign;
       }
       dataService.gameEraser=gc.roleAssign;
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
    gameConfig.roles=dataService.buildGamePlayRoles(gameConfig);
    gameConfig.propertiesList=dataService.getFormData();
    console.log(gameConfig.propertiesList);
    $scope.gameConfig = gameConfig;
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
});

app.controller("introduceGameCtrl",function($scope) {

    $scope.gameConfig=gameService.getGameConfig();


});
app.controller("gameTestCtrl",function($scope){
    $scope.gameTest=function(){
        alert("ngclick");
        console.log("ngclick");
    }
});