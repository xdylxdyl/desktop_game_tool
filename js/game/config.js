/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-23
 * Time: 上午10:27
 * To change this template use File | Settings | File Templates.
 */
var gameList = [
    {
        "title":"捉鬼游戏",
        "id":"ghost",
        "versions":[
            {
                "name":"简化版(1.0)",
                "gameid":-1000,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"

            },
            {
                "name":"猜词版(2.0)",
                "gameid":-1100,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"
            },
            {
                "name":"白痴版(魂版)(1.5)",
                "gameid":-1300,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"
            }

        ]
    },
    {
        "title":"杀人游戏",
        "id":"kill",
        "versions":[
            {
                "name":"简化版",
                "gameid":-2000,
                "type":"remote",
                "url":"officialGame/kill_simple.json"
            },
            {
                "name":"警版",
                "gameid":-2100,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"
            },
            {
                "name":"不翻牌",
                "gameid":-2200,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"
            },
            {
                "name":"3.0",
                "gameid":-2300,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"
            }

        ]
    },
    {
        "title":"狼人杀",
        "id":"wolf",
        "versions":[
            {
                "name":"狼人杀",
                "gameid":-3000,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"
            }
        ]
    },
    {
        "title":"炸狼堡",
        "id":"burg",
        "versions":[
            {
                "name":"炸狼堡",
                "gameid":-4000,
                "type":"remote",
                "url":"officialGame/ghost_simple.json"
            }
        ]
    }

]

var userList = [
    {
        "title":"三方",
        "id":"1",
        "versions":[
            {
                "name":"简化变异小三方",
                "gameid":1,
                "type":"local",
                "url":"ghost_simple.json"
            }


        ]
    },
    {
        "title":"最爱",
        "id":"2",
        "versions":[
            {
                "name":"三十六人象棋杀",
                "gameid":2,
                "type":"local",
                "url":"ghost_simple.json"
            },
            {
                "name":"天使与魔鬼",
                "gameid":3,
                "type":"local",
                "url":"ghost_simple.json"
            },
            {
                "name":"捉鬼变异版",
                "gameid":4,
                "type":"local",
                "url":"ghost_simple.json"
            },
            {
                "name":"狼人杀新月扩展",
                "gameid":5,
                "type":"local",
                "url":"ghost_simple.json"
            },
            {
                "name":"炸狼堡全角色",
                "gameid":6,
                "type":"local",
                "url":"ghost_simple.json"
            }

        ]
    }


]


var versionConfig = {
    "-1000":{
        "name":"捉鬼游戏简化版",
        "type":"remote",
        "gameid":-1000,
        "playerNumDefault":8,
        "showProperties":["role"],
        "peopleNumList":[2,9],
        "rolesConfig":{
            "saved":"",
            "roleSort":"ghost,water",
            "default":"1,1",
            "4":"1,3",
            "5":"1,4",
            "6":"1,5",
            "7":"2,5",
            "8":"2,6",
            "9":"2,7"
        },
        "properties":""
    },
    "-1100":{
        "name":"捉鬼游戏猜词版",
        "type":"remote",
        "gameid":-1100,
        "playerNumDefault":8,
        "showProperties":["role","card"],
        "peopleNumList":[2,9],
        "rolesConfig":{
            "roleSort":"ghost,water",
            "default":"1,1",
            "saved":"",
            "4":"1,3",
            "5":"1,4",
            "6":"1,5",
            "7":"2,5",
            "8":"2,6",
            "9":"2,7"
        },
        "CN":{
            "ghost":"幽灵",
            "water":"水民",
            "role" :"角色",
            "card" :"卡牌"
        },
        "properties":""
    },
    "-1300":{
        "name":"捉鬼游戏魂版",
        "type":"remote",
        "gameid":-1300,
        "playerNum":8,
        "showProperties":["role","card","ghost"],
        "roles":[
            {
                "name":"幽灵",
                "num":1
            },
            {
                "name":"水民",
                "num":7
            },
            {
                "name":"魂",
                "num":1
            }
        ]
    },
    "-2000":{
        "name":"杀人游戏简化版",
        "type":"remote",
        "gameid":-2000,
        "playerNum":8,
        "showProperties":["role"],
        "roles":[

            {
                "name":"杀手",

                "num":1
            },
            {
                "name":"水民",
                "num":7
            }
        ]
    },
    "-2100":{
        "name":"杀人游戏警版",
        "type":"remote",
        "gameid":-2100,
        "playerNum":8,
        "showProperties":["role"],
        "roles":[

            {
                "name":"杀手",
                "num":1
            },
            {
                "name":"水民",
                "num":7
            },
            {
                "name":"警察",
                "num":1
            }
        ]
    },
    "-2200":{
        "name":"杀人游戏警版不翻牌",
        "type":"remote",
        "gameid":-2200,
        "showProperties":["role"],
        "playerNum":8,
        "roles":[

            {
                "name":"杀手",
                "num":1
            },
            {
                "name":"水民",
                "num":7
            },
            {
                "name":"警察",
                "num":1
            }
        ]
    },
    "-2300":{
        "name":"杀人游戏3.0",
        "type":"remote",
        "gameid":-2300,
        "showProperties":["role"],
        "playerNum":8,
        "roles":[

            {
                "name":"杀手",
                "num":1
            },
            {
                "name":"水民",
                "num":5
            },
            {
                "name":"警察",
                "num":1
            },
            {
                "name":"狙击",
                "num":1
            },
            {
                "name":"医生",
                "num":1
            }
        ]
    },
    "-3000":{
         "name":"狼人杀",
         "type":"remote",
         "gameid":-3000,
        "showProperties":["role"],
        "playerNum":8,
         "roles":[

             {

                 "name":"杀手",
                 "num":1
             },
             {
                 "name":"水民",
                 "num":5
             }

         ]
     },
    "-4000":{
         "name":"炸狼堡",
         "type":"remote",
         "gameid":-3000,
         "playerNum":5,
        "showProperties":["role"],
        "roles":[

             {
                 "name":"狼人",
                 "num":2
             },
             {
                 "name":"水民",
                 "num":3
             }

         ]
     },
    "CN":{
        "ghost":"幽灵",
        "water":"水民",
        "role" :"角色",
        "card" :"卡牌"
    }
}

