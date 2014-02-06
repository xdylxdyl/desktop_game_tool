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
        console.log("roleMaker start");
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
                    rolesNumArray[roleChooser]--;
                    count++;
                }
                if (count == playerNum + 1) break;
            }
        returnData = "[" + str.substring(0, str.length - 1) + "]";
        console.log(returnData+"\nroleMaker complete");
        return eval("(" + returnData + ")");
    },
    buildGameConfigRoles : function(gameConfig,players){
        var playerNum=gameConfig.playerNumDefault;
        if(players) playerNum=players;
        var rolesArr=gameConfig.rolesConfig.roleSort.split(',');
        var rolesNumArr=[];
        if(playerNum > gameConfig.peopleNumList[0] && playerNum < gameConfig.peopleNumList[1])
              rolesNumArr=gameConfig.rolesConfig[playerNum].split(",");
        else
              rolesNumArr=gameConfig.rolesConfig["default"].split(",");
        var rolesCN = gameConfig.CN;
        var rolesNum=rolesArr.length;
        var returnData=[];
        for(var i=0;i<rolesNum;i++){
            returnData.push(JsonUtil.toJSON("{'name':'"+rolesArr[i]+"','CN':'"+rolesCN[rolesArr[i]]+"','num':'"+rolesNumArr[i]+"'}"));
        }
        return returnData;
    },
    buildGameConfigPeopleNumList : function(data){
        var returnData=[];
        for(var i=data[0];i<data[1];i++){
            returnData.push(i);
        }
        return returnData;
    },
    buildGameConfigProperties : function(gc){
        var returnData=[];
        for(var i=0;i<gc.showProperties.length;i++){
            returnData.push(JsonUtil.toJSON("{'name':'"+gc.showProperties[i]+"','CN':'"+gc.CN[gc.showProperties[i]]+"'}"));
        }
        return returnData;
    },
    buildRoleMakeData :function(formData,playerNum){
        var rolesArray=[];
        for(var i=0;i<formData.length;i++){
            if(domUtil.hasClass(formData[i],"roleItem")&&formData[i].style.display!='none'){
                var itemStr= "{'name':'"+formData[i].name+"','num':'"+formData[i].value+"'}";
                if(!JsonUtil.inArray(rolesArray,itemStr))
                    rolesArray.push(itemStr);
            }
        }

        return JsonUtil.toJSON("{'playerNum':"+playerNum+",'roles':["+rolesArray+"]}");
    },
    getCN : function(gc,EN){
        return gc.CN[EN];
    },
    gameEraser : []
}



var app = angular.module('gameTool', [], function ($compileProvider) {

  $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);

});



app.controller("gameModelList",function($scope) {

    $scope.officialList = dataService.getGameList(constants.listType.official);
    $scope.userList = dataService.getGameList(constants.listType.user);
})

app.controller("gameInitCtrl",function($scope) {

   /***** init  ******/
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gc = dataService.getConfig(gameid),
        gameConfig={};
    /******************/

    /****************  gameConfig init start  **********************/
    gameConfig.gameid=gc.gameid;
    gameConfig.playerNumDefault=gc.playerNumDefault;
    gameConfig.roles =dataService.buildGameConfigRoles(gc);
    gameConfig.showProperties =dataService.buildGameConfigProperties(gc);
    gameConfig.peopleNumList=dataService.buildGameConfigPeopleNumList(gc.peopleNumList);
    /**************************************************************/

    /************  scope properties bind  ******************/
    $scope.gameid=gameid;
    $scope.gameConfig=gameConfig;
    $scope.peopleNum =gc.playerNumDefault;//init select
    /*******************************************/

    /**   method   ***/
    //  gameChange()
    //  gameInit()
    //  gameExit()
    /*****************/

    $scope.gameChange=function(num){
        gameConfig.roles = dataService.buildGameConfigRoles(gc,num);
        $scope.gameConfig=gameConfig;
    }
    $scope.gameInit = function(){
        /*****  initVar => buildPropertiesList => roleMaker => setGameDetail ***/

        /******* init **********/
        var startBtn = document.getElementById("startButton"),
            temp={},
            formData=document.getElementsByTagName('input');
        /*********************/

        if(domUtil.hasClass(startBtn,"disabled"))return false;
        var roleMakeData=dataService.buildRoleMakeData(formData,gameConfig.playerNumDefault);
        /********************************** build properties list ***************************************/
            //{"properties":[{"role":"水民","card":"value"},{"role":"鬼","card":"value"}]}
                console.log("build properties list start");
                for(var j =0;j<gc.showProperties.length;j++){
                    if(gc.showProperties[j]=='role') continue;
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
                    console.log("one properties list:"+tmp);
                     JsonUtil.push(temp,tmp);
                }
                console.log("all properties list:"+temp);
                console.log("build properties list complete");
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
        eraserArr=[];
    /***************************/
    console.log(dataService.gameEraser);
    console.log(dataService.getGameDetail());
    if(dataService.gameEraser.length==0)
        gc.roleAssign=dataService.getGameDetail();
    else
        gc.roleAssign=dataService.gameEraser;
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
    $scope.currentData.push($scope.currentId);
    for(var i=0;i<gc.showProperties.length;i++){
        if(gc.showProperties[i]=="role")
            $scope.currentData.push(dataService.getCN(gc,gc.showProperties[i])+"："+dataService.getCN(gc,gc.roleAssign[0][gc.showProperties[i]]));
        else
            $scope.currentData.push(dataService.getCN(gc,gc.showProperties[i])+"："+gc.roleAssign[0][gc.showProperties[i]]);
    }
    /********************************************/

   /***** method *******/
   /**   changeCurrentGamer()    **/
   /**   currentGamerEraser()    **/
   /**   gameExit()              **/
   /********************/
    $scope.changeCurrentGamer=function(id){
        $scope.currentData=[];
        if(id > $scope.gameConfig.playerNum) return;
        $scope.currentId=id+1;
        if(id == $scope.gameConfig.playerNum) return;
        $scope.currentData.push($scope.currentId);
        for(var i=0;i<gc.showProperties.length;i++){
            if(gc.showProperties[i]=="role"&&!JsonUtil.inArray(eraserArr,id+1))
                    $scope.currentData.push(dataService.getCN(gc,gc.showProperties[i])+"："+dataService.getCN(gc,gc.roleAssign[id][gc.showProperties[i]]));
            else
                $scope.currentData.push(dataService.getCN(gc,gc.showProperties[i])+"："+gc.roleAssign[id][gc.showProperties[i]]);
        }
    }
    $scope.currentGamerEraser=function(id){

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