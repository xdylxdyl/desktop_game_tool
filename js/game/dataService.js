/**
 * Created by orphira on 14-2-11.
 */
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
        //                          [{"role":"水民","example":"what"},{"role":"鬼"},"example":"why"]
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
       // console.log("start build game config roles");
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
            if(playerNum in gameConfig.rolesConfig)
                rolesNumArr=gameConfig.rolesConfig[playerNum].split(",");
            else
                rolesNumArr=gameConfig.rolesConfig["default"].split(",");
        }
        var rolesCN = gameConfig.CN;
        var rolesNum=rolesArr.length;
        var returnData=[];
        for(var i=0;i<rolesNum;i++){
            returnData.push(JsonUtil.toJSON("{'name':'"+rolesArr[i]+"','num':'"+rolesNumArr[i]+"'}"));
        }
      //  console.log(returnData);
      //  console.log("complete build game config roles:");
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
                returnData.push(JsonUtil.toJSON("{'name':'"+gc.showProperties[i]+"'}"));
        }
        console.log("build Game config properties result:");
        console.log(returnData);
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
    getConfigCN:function(){
        html5StorageService.update("CN",versionConfig.CN);
            return html5StorageService.get("CN");
    },
    saveFormData : function(formData){
        html5StorageService.update("formData",formData);
    },
    getFormData : function(){
       return html5StorageService.get("formData");
    },
    gameConfigMaker : function(config){
        console.log("game config maker start");
        var gameConfig=config,a="",b="";
        gameConfig.showPropertiesObj=this.buildGameConfigProperties(config);
        gameConfig.peopleNumList=this.buildGameConfigPeopleNumList(config.peopleNum);
        gameConfig.roles=this.buildGameConfigRoles(config);
        if(config.properties){
            for(var i= 0,ii=config.showProperties.length;i<ii;i++){
                if(config.showProperties[i]=='role') continue;
                for(var j=0;j<config.properties[config.showProperties[i]].length;j++){
                    a=a+"'"+config.properties[config.showProperties[i]][j].role+"':'"+config.properties[config.showProperties[i]][j][config.showProperties[i]]+"',";
                }
                b=b+"'"+config.showProperties[i]+"':{"+ a.substring(0, a.length-1)+"},";
            }
            console.log(b.substring(0, b.length-1));
            gameConfig.properties= JsonUtil.toJSON("{"+b.substring(0,b.length-1)+"}");
        }
        console.log(gameConfig);
        console.log("game config maker end");
        return gameConfig;
    },
    buildProperties:function(showProperties,formData){
        var temp=[];
        console.log("build properties list start");
        for(var j =0;j<showProperties.length;j++){
            if(showProperties[j]=='role')
                continue;
            var tempArr=[],
                reg=new RegExp(".*"+showProperties[j]+".*"),
                reg2=new RegExp(/.*<-->.*/),
                index= 0,
                max=formData.length,
                tmp={};
            for(;index<max;index++){
                if(reg.test(formData[index].name)&&reg2.test(formData[index].name)){
                    var arr=formData[index].name.split('<-->');
                    tempArr.push("{'role':'"+arr[0]+"','"+showProperties[j]+"':'"+formData[index].value+"'}");
                }
            }
            tmp = JsonUtil.toJSON("{'"+showProperties[j]+"':["+tempArr+"]}");
            console.log("one properties list:");
            console.log(tmp);
            JsonUtil.push(temp,tmp);
        }
        console.log("all properties list:");
        console.log("build properties list complete");
        return temp;
    },
    buildGamePlayRoles:function(gc){
        var roleArr=[];
        var arr=[];
        for(var i=0;i<gc.playerNum;i++){
            if(!JsonUtil.inArray(roleArr,gc.roleAssign[i].role))
                   roleArr.push(gc.roleAssign[i].role);
        }
        for(var i=0;i<roleArr.length;i++){
            var count=0;
            for(var j=0;j<gc.playerNum;j++)
                if(roleArr[i]==gc.roleAssign[j].role)
                    count++;
            arr.push(JsonUtil.toJSON("{'name':'"+roleArr[i]+"','num':"+count+"}"));
        }
        return arr;
    },
    saveData:function(roleData,propertiesData){
        JsonUtil.push(roleData,propertiesData);
        this.saveFormData(roleData);
    }
}
