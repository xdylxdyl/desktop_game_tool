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
    updateConfig : function(id,data){
        html5StorageService.update(id.toString(),data);
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
        console.log("gameDetail complete");
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
        var rolesArray = [],
            rolesNumArray = [],
            roleChooser = 0,
            str = "",
            count = 1,
            returnData,
            flag = 1,
            playerNum=0;

        for (var i=0; i<config.roles.length;i++) {
            rolesArray.push(config.roles[i].name);
            rolesNumArray.push(config.roles[i].num);
            playerNum=playerNum+parseInt(config.roles[i].num);
        }
            console.log("rolesArr:"+rolesArray+",rolesNumArray:"+rolesNumArray);

        while (flag) {
                roleChooser = Math.floor(Math.random() * rolesArray.length); //0,1
                if (rolesNumArray[roleChooser] > 0) {
                    str = str + "{id:" + count + ",role:'" + rolesArray[roleChooser] + "'},";
                    console.log(str);
                    rolesNumArray[roleChooser]--;
                    count++;
                }
            console.log(count == playerNum );
            if (count == playerNum + 1) break;
            }

        returnData = "[" + str.substring(0, str.length - 1) + "]";
        console.log(returnData+"\nroleMaker complete");
        return eval("(" + returnData + ")");
    },
    buildGameConfigRoles : function(gameConfig,players){
        console.log("start build game config roles");
        var rolesNumArr=[];
        var playerNum=0;
        var rolesArr=gameConfig.rolesConfig.roleSort.split(',');
        if(gameConfig.rolesConfig.saved!=""&&!players){
            var x = gameConfig.rolesConfig.saved.split(',');
            playerNum=x[0];
            for(var i=1;i<x.length;i++){
                rolesNumArr.push(x[i]);
            }
        }else{
            playerNum=gameConfig.playerNumDefault;
            if(players) playerNum=players;
            if(playerNum > gameConfig.peopleNumList[0] && playerNum < gameConfig.peopleNumList[1])
                rolesNumArr=gameConfig.rolesConfig[playerNum].split(",");
            else
                rolesNumArr=gameConfig.rolesConfig["default"].split(",");
        }
        var rolesCN = gameConfig.CN;
        var rolesNum=rolesArr.length;
        var returnData=[];
        for(var i=0;i<rolesNum;i++){
            returnData.push(JsonUtil.toJSON("{'name':'"+rolesArr[i]+"','CN':'"+rolesCN[rolesArr[i]]+"','num':'"+rolesNumArr[i]+"'}"));
        }
        console.log(returnData);
        console.log("complete build game config roles:");
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
    saveFormData : function(formData){
        html5StorageService.update("formData",formData);
    },
    getFormData : function(){
        html5StorageService.get("formData");
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

   /***** init  ******/
    var gameid = getParameterFromUrl(location.href, "gameid"),
        gameConfig={},
        roleArr=[];
    var gc={};
    if(JsonUtil.toJSON(localStorage.getItem(gameid)).rolesConfig.saved)
            gc=JsonUtil.toJSON(localStorage.getItem(gameid));
    else
            gc=dataService.getConfig(gameid);

    /******************/

    /****************  gameConfig init start  **********************/
    gameConfig.gameid=gc.gameid;
    console.log(gc.rolesConfig.saved);
    if(!gc.rolesConfig.saved){
        gameConfig.playerNumDefault=gc.playerNumDefault;
    }
    gameConfig.roles =dataService.buildGameConfigRoles(gc);
    gameConfig.showProperties =dataService.buildGameConfigProperties(gc);
    gameConfig.peopleNumList=dataService.buildGameConfigPeopleNumList(gc.peopleNumList);
    var a="";
    var b="";
    console.log(gc.properties);
    if(gc.properties!=""){
        for(var i= 0,ii=gc.showProperties.length;i<ii;i++){
            if(gc.showProperties[i]=='role') continue;
            for(var j=0;j<gc.properties[gc.showProperties[i]].length;j++){
                a=a+"'"+gc.properties[gc.showProperties[i]][j].role+"':'"+gc.properties[gc.showProperties[i]][j][gc.showProperties[i]]+"',";
            }
            b=b+"'"+gc.showProperties[i]+"':{"+ a.substring(0, a.length-1)+"},";
        }
        console.log(b.substring(0, b.length-1));
        gameConfig.properties= JsonUtil.toJSON("{"+b.substring(0,b.length-1)+"}");
    }
    /**************************************************************/

    /************  scope properties bind  ******************/
    $scope.gameid=gameid;
    $scope.gameConfig=gameConfig;
    $scope.peopleNum =gc.playerNumDefault;//init select
    /*******************************************/
    //{properties:{"role1":"properties1","role2":"properties2"}}
    /**   method   ***/
    //  gameChange()
    //  gameInit()
    //  gameExit()
    /*****************/

    $scope.gameChange=function(num){
        console.log("gameChange");
        gameConfig.roles = dataService.buildGameConfigRoles(gc,num);
        $scope.gameConfig=gameConfig;
        console.log("gameChange end")
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
            console.log(formData[i].name);
            console.log(formData[i].value);
            console.log(formData[i].style.display);
                if(JsonUtil.inArray(roleArr,formData[i].name)&&formData[i].value!=""&&formData[i].style.display!="none")

                    tempa.push(formData[i].value);
        }

        /*********************/

        if(domUtil.hasClass(startBtn,"disabled"))return false;
        var roleMakeData=dataService.buildRoleMakeData(formData,gameConfig.playerNumDefault);
        /********************************** build properties list ***************************************/
            //{"properties":[{"role":"水民","card":"value"},{"role":"鬼","card":"value"}]}
                console.log("build properties list start");
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
                    console.log("one properties list:"+tmp);
                     JsonUtil.push(temp,tmp);
                }
                console.log("all properties list:"+temp);
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