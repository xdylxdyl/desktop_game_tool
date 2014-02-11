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

app.controller("gameModelList",function($scope) {

    $scope.officialList = dataService.getGameList(constants.listType.official);
    $scope.userList = dataService.getGameList(constants.listType.user);

});

app.controller("gameInitCtrl",function($scope) {

   /***** init  ******/
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gameConfig={},
        roleArr=[];
    var gc=dataService.getConfig(gameid);
    /******************/
    /************  scope properties bind  ******************/
    $scope.gameid=gameid;
    $scope.gameConfig=dataService.gameConfigMaker(gc);
    $scope.peopleNum =gc.playerNumDefault;//init select
    /*******************************************/
    //{properties:{"role1":"properties1","role2":"properties2"}}
    /**   method   ***/
    //  gameChange()
    //  gameInit()
    //  gameExit()
    /*****************/

    $scope.gameChange=function(num){
        $scope.gameConfig.roles = dataService.buildGameConfigRoles(gc,num);
    }
    $scope.gameInit = function(){
        /*****  initVar => buildPropertiesList => roleMaker => setGameDetail ***/

        /******* init **********/
        var startBtn = document.getElementById("startButton"),
            temp={},
            formData=document.getElementsByTagName('input'),
            tempa=[];
        tempa.push(formData[0].value);
        console.log('in');
        roleArr=gc.rolesConfig.roleSort.split(",");
        for(var i=1;i<formData.length;i++){
                if(JsonUtil.inArray(roleArr,formData[i].name)&&formData[i].value!=""&&formData[i].style.display!="none")
                    tempa.push(formData[i].value);
        }
        /*********************/

        if(domUtil.hasClass(startBtn,"disabled"))return false;
        var roleMakeData=dataService.buildRoleMakeData(formData,gameConfig.playerNumDefault);
        /********************************** build properties list ***************************************/
            //{"properties":[{"role":"水民","card":"value"},{"role":"鬼","card":"value"}]}
                console.log("build properties list start");
                console.log(gc.showProperties);
                for(var j =0;j<gc.showProperties.length;j++){
                    if(gc.showProperties[j]=='role')
                        continue;
                       var tempArr=[],
                        reg=new RegExp(".*"+gc.showProperties[j]+".*"),
                        reg2=new RegExp(/.*<-->.*/),
                        index= 0,
                        max=formData.length,
                        tmp;
                    for(;index<max;index++){
                        if(reg.test(formData[index].name)&&reg2.test(formData[index].name)){
                            var arr=formData[index].name.split('<-->');
                            tempArr.push("{'role':'"+arr[0]+"','"+gc.showProperties[j]+"':'"+formData[index].value+"'}");
                        }
                    }
                     tmp = JsonUtil.toJSON("{'"+gc.showProperties[j]+"':["+tempArr+"]}");
                    console.log("one properties list:");
                    console.log(tmp);
                     JsonUtil.push(temp,tmp);
                }
                console.log("all properties list:");
                console.log(temp);
                console.log("build properties list complete");
        gc.rolesConfig.saved=tempa.toString();
        gc.properties=temp;
        dataService.updateConfig(gameid,gc);
        /************************************************************************************************/
        dataService.setGameDetail(dataService.roleMaker(roleMakeData),gc.showProperties,temp);
    }

    $scope.gameExit = function(){
        dataService.deleteGameDetail();
    }
})

app.controller("gamePlayCtrl",function($scope) {
    /***** game play init *******/
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gc=dataService.getConfig(gameid),
        roleArr=[],
        arr=[],
        eraserArr=[],
        currentTempArr=[];
    /***************************/
    console.log(dataService.getGameDetail());
    gc.roleAssign=dataService.getGameDetail();
    console.log(gc.roleAssign);
    gc.playerNum = gc.roleAssign.length;
    /********** get game roles array *****************/
    for(var i=0;i<gc.playerNum;i++){
            if(!JsonUtil.inArray(roleArr,gc.roleAssign[i].role))
                  roleArr.push(gc.roleAssign[i].role);
    }
    /************************************************/

    console.log(roleArr);
    console.log(gc.roleAssign);
    for(var i=0;i<roleArr.length;i++){
        var count=0;
        for(var j=0;j<gc.playerNum;j++)
            if(roleArr[i]==gc.roleAssign[j].role)
                count++;
        arr.push(JsonUtil.toJSON("{'name':'"+dataService.getCN(gc,roleArr[i])+"','num':"+count+"}"));
    }

    gc.roles=arr;
    /********** scope properties bind *************/
    $scope.currentData=[];
    $scope.gameConfig=gc;
    $scope.gamePlay=gc;
    $scope.currentId=1;
    currentTempArr.push($scope.currentId);
    for(var i=0;i<gc.showProperties.length;i++){
        if(gc.showProperties[i]=="role")
            currentTempArr.push(dataService.getCN(gc,gc.showProperties[i])+"："+dataService.getCN(gc,gc.roleAssign[0][gc.showProperties[i]]));
        else
            currentTempArr.push(dataService.getCN(gc,gc.showProperties[i])+"："+gc.roleAssign[0][gc.showProperties[i]]);
    }
    /********************************************/

   /***** method *******/
   /**   changeCurrentGamer()    **/
   /**   currentGamerEraser()    **/
   /**   gameExit()
    *    showCurrentGamer()      **/
   /********************/
    $scope.changeCurrentGamer=function(id){
        $scope.currentData=[];
        if(id > $scope.gameConfig.playerNum) return;
        $scope.currentId=id+1;
        if(id == $scope.gameConfig.playerNum) return;
        currentTempArr.push($scope.currentId);
        for(var i=0;i<gc.showProperties.length;i++){
            if(gc.showProperties[i]=="role"&&!JsonUtil.inArray(eraserArr,id+1))
                    currentTempArr.push(dataService.getCN(gc,gc.showProperties[i])+"："+dataService.getCN(gc,gc.roleAssign[id][gc.showProperties[i]]));
            else
                    currentTempArr.push(dataService.getCN(gc,gc.showProperties[i])+"："+gc.roleAssign[id][gc.showProperties[i]]);
        }
    }
    $scope.showCurrentGamer=function(){
        $scope.currentData=currentTempArr;
    }
    $scope.currentGamerEraser=function(id){
        currentTempArr=[];
        $scope.currentId=id;
        $scope.changeCurrentGamer($scope.currentId);
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
    var gc=dataService.getConfig(gameid);
    var gameConfig={};
    var gameDetail=dataService.getGameDetail();
    gameConfig.gameid=gameid;
    gameConfig.gameDetail=gameDetail;
    gameConfig.showProperties=gc.showProperties;
    $scope.gameConfig = gameConfig;
    console.log(gameConfig);
    $scope.getCN =function(i){
        return gc.CN[i];
    }
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