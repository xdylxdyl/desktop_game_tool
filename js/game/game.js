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


    }
}



var app = angular.module('gameTool', [], function ($compileProvider) {

  $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);

});




app.controller("gameModelList",function($scope) {

    $scope.officialList = dataService.getGameList(constants.listType.official);
    $scope.userList = dataService.getGameList(constants.listType.user)
})

app.controller("gameInitCtrl",function($scope, $routeParams, $http) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    $scope.gameConfig = dataService.getConfig(gameid);

})

app.controller("gamePlayCtrl",function($scope, $routeParams, $http) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    var gc=dataService.getConfig(gameid);
    gc.roleAssign=roleMaker(gc);
    $scope.gameConfig=gc;

})