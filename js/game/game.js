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
            if(showProperties[i]=='role') continue;
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
            for(var i=0;i<config.length;i++)
                for(var j = 0 ; j <dataArray.length ; j++)
                    if(dataArray[j]["role"] == config[i]["role"])
                        JsonUtil.push(config[i],dataArray[j]);


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
        for (var i=0; i<config.roles.length;i++) {
            rolesArray.push(config.roles[i].name);
            rolesNumArray.push(config.roles[i].num);
        }

            while (flag) {
                roleChooser = Math.floor(Math.random() * rolesArray.length);
                if (rolesNumArray[roleChooser] > 0) {
                    str = str + "{id:" + count + ",role:'" + rolesArray[roleChooser] + "'},";
                    console.log(str);
                    rolesNumArray[roleChooser]--;
                    count++;
                }
                if (count == playerNum + 1) break;
            }
        returnData = "[" + str.substring(0, str.length - 1) + "]";
        console.log("roleMaker complete"+returnData);
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
    var gc = dataService.getConfig(gameid);
    var gameConfig={};
    gameConfig.gameid=gc.gameid;
    gameConfig.playerNumDefault=gc.playerNumDefault;
    console.log(JsonUtil.returnItem(gc.rolesVersion,"playerNum",gc.playerNumDefault));
    gameConfig.roles = JsonUtil.returnItem(gc.rolesVersion,"playerNum",gc.playerNumDefault).roles;
    gameConfig.showProperties =gc.showProperties;
    $scope.peopleNumList=[2,3,4,5,6,7,8,9,10];
    $scope.peopleNum=gameConfig.playerNumDefault;
    $scope.gameConfig=gameConfig;
    $scope.gameChange=function(num){

        gameConfig.playerNumDefault=num;
        gameConfig.roles = JsonUtil.returnItem(gc.rolesVersion,"playerNum",gameConfig.playerNumDefault).roles;
        gameConfig.showProperties =gc.showProperties;
        //console.log(gameConfig.playerNumDefault);
        $scope.gameConfig=gameConfig;

    }
    $scope.gameInit = function(){
        //
        // 获取整个表单的input
        //  roleMaker
        //     |
        //  bindData
        //     |
        //  setGameDetail
        //
        var startBtn = document.getElementById("startButton");
        if(domUtil.hasClass(startBtn,"disabled")){
            return false;
        }

        var temp={};
        var rolesArray=[];
        var formData=document.getElementsByTagName('input');
        //var playerNum=document.getElementsByName('maxPeople')[0].value;
        //console.log(playerNum);

            for(var i=0;i<formData.length;i++){
                if(domUtil.hasClass(formData[i],"roleItem")&&formData[i].style.display!='none'){
                   var itemStr= "{'name':'"+formData[i].name+"','num':'"+formData[i].value+"'}";
                    if(!JsonUtil.inArray(rolesArray,itemStr))
                    rolesArray.push(itemStr);
                }
            }
         var roleMakeData=JsonUtil.toJSON("{'playerNum':"+gameConfig.playerNumDefault+",'roles':["+rolesArray+"]}");
            //正则表达式来判断
            //name字段 {{role}}<-->{{properties}}
            //{"properties":[{"role":"水民","card":"value"},{"role":"鬼","card":"value"}]}
                for(var j =0;j<$scope.gameConfig.showProperties.length;j++){
                    if($scope.gameConfig.showProperties[j]=='role') continue;
                    var tempArr=[];
                    var reg=new RegExp(".*"+$scope.gameConfig.showProperties[j]+".*");
                    var reg2=new RegExp(/.*<-->.*/);
                    for(var index=0;index<formData.length;index++){

                        if(reg.test(formData[index].name)&&reg2.test(formData[index].name)){
                            var arr=formData[index].name.split('<-->');
                            tempArr.push("{'role':'"+arr[0]+"','"+$scope.gameConfig.showProperties[j]+"':'"+formData[index].value+"'}");
                            // tempArr correct
                        }
                    }
                    var tmp = JsonUtil.toJSON("{'"+$scope.gameConfig.showProperties[j]+"':["+tempArr+"]}");
                     JsonUtil.push(temp,tmp);

                }


        console.log(roleMakeData);
        console.log($scope.gameConfig.showProperties);
        console.log(temp);
        dataService.setGameDetail(dataService.roleMaker(roleMakeData),$scope.gameConfig.showProperties,temp);
        console.log("set gameDetail complete");
    }

    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
})

app.controller("gamePlayCtrl",function($scope) {

    var gameid = getParameterFromUrl(location.href, "gameid");
    var gc=dataService.getConfig(gameid);
    gc.roleAssign=dataService.getGameDetail();
    gc.playerNum = dataService.getGameDetail().length;
    gc.roles=JsonUtil.returnItem(gc.rolesVersion,"playerNum",gc.playerNum).roles;
    //$scope.currentData=[role,card,other];
    $scope.currentData=[];
    $scope.gameConfig=gc;
    $scope.gamePlay=gc;
    $scope.currentId=1;
    $scope.currentData.push($scope.currentId);
    for(var i=0;i<gc.showProperties.length;i++){
       $scope.currentData.push(gc.roleAssign[0][gc.showProperties[i]]);
    }

    $scope.changeCurrentGamer=function(id){
        $scope.currentData=[];
        $scope.currentId=id+1;
        $scope.currentData.push($scope.currentId);
        for(var i=0;i<gc.showProperties.length;i++){
            $scope.currentData.push(gc.roleAssign[id][gc.showProperties[i]]);
        }
    }
    $scope.currentGamerEraser=function(id){
        $scope.currentData=[];
        $scope.currentId=id;
        $scope.currentData.push($scope.currentId);

       for(var i=0;i<gc.showProperties.length;i++){
           gc.roleAssign[id-1][gc.showProperties[i]]="QAQ";
           $scope.currentData.push(gc.roleAssign[id-1][gc.showProperties[i]]);
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

app.controller("introduceGameCtrl",function($scope) {
    var gameid = getParameterFromUrl(location.href, "gameid");
    var gc=dataService.getConfig(gameid);
    gc.roleAssign=dataService.getGameDetail();
    gc.gameid=gameid;
    $scope.gameConfig=gc;
    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
});
app.controller("gameTestCtrl",function($scope){
    $scope.gameTest=function(){
        alert("ngclick");
        console.log("ngclick");
    }
});