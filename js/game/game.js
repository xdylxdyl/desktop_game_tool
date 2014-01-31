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
    setGameDetail:function (data,showProperties,propertiesData){
        //propertiesData={
        //                  "card":
        //                          [{"role":"水民","card":"水果"},{"role":"鬼","card":"香蕉"}],
        //                  "example":
        //                          [{"role":"水民","example":"what"},{"role":"鬼"},"card":"why"]
        //               };
        for(var i= 0,max=showProperties.length;i<max;i++){
            this.setGamerProperties(data,propertiesData[showProperties[i]]);
        }
        html5StorageService.update("gameDetail",data);
    },
    getGameDetail:function(){
        return html5StorageService.get("gameDetail");
    },
    deleteGameDetail:function(){
        html5StorageService.delete("gameDetail");
    },

    setGamerProperties:function(config,dataArray){
        if(dataArray.length<=0 ) return;
        for(var i=0;i<config.length;i++){
            if(dataArray[i].role == config[i].role)
                JsonUtil.push(config[i],dataArray[i]);
        }
    },
    deleteGamerProperties:function(id,key){
        var roles=this.getGameDetail();
        for(var role in roles)
            if(role.id=id)
                JsonUtil.pop(role,key);
        html5StorageService.update("gameDetail",roles);
    },
    roleMaker : function (config) {
        var playerNum = config.playerNum,
            rolesArray = [],
            rolesNumArray = [],
            roleChooser = 0,
            str = "",
            count = 1,
            returnData,
            flag = 1;
        for (var i in config.roles) {
            rolesArray.push(config.roles[i].name);
            rolesNumArray.push(config.roles[i].num);
        }
            while (flag) {
                roleChooser = Math.floor(Math.random() * 4);
                if (rolesNumArray[roleChooser] > 0) {
                    str = str + "{id:" + count + ",role:'" + rolesArray[roleChooser] + "'},";
                    rolesNumArray[roleChooser]--;
                    count++;
                }
                if (count == playerNum + 1) break;
            }
        returnData = "[" + str.substring(0, str.length - 1) + "]";
        return eval("(" + returnData + ")");
    },
    propertiesMaker : function (properties,roles,values){
        //roles=["水民",“鬼"];
        //values=[role:card,role:card,role:card];
        //{"properties":[{"role":"水民","card":"value"},{"role":"鬼","card":"value"}]}
       var arr=[];
        for(var i=0;i<roles.length;i++){
           arr.push("{'role':'"+roles[i]+"','"+properties+"':'"+values[roles[i]]+"'}");
       }
       return JsonUtil.toJSON("{'"+properties+"':"+arr+"}");
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
        //values=[role:card,role:card,role:card];
        var temp={};
        var rolesArray=[];
        var values=new mapUtil();
        var index=0;
        var flag=1;
        for(var i =0;i<$scope.gameConfig.roles.length;i++)//获取角色
            rolesArray.push($scope.gameConfig.roles[i].name);

        while(flag){//数据绑定
            values.set();
        }
        for(var i=0;i<$scope.gameConfig.showProperties.length;i++)
            JsonUtil.push(temp,dataService.propertiesMaker($scope.gameConfig.showProperties[i],rolesArray,values));
        dataService.setGameDetail(dataService.roleMaker($scope.gameConfig),temp);
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