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
        "showProperties":["role", "card"],
        "peopleNum":[2, 18],
        "rolesConfig":{
            "saved":"",
            "roleSort":"ghost,water",
            "default":"1,1",
            "4":"1,3",
            "5":"1,4",
            "6":"1,5",
            "7":"2,5",
            "8":"2,6",
            "9":"2,7",
            "tips":{
                "water":"你是人还是鬼呢？小心一点没有坏处哦！",
                "ghost":"你是人还是鬼呢？小心一点没有坏处哦！"
            }
        },
        "CN":{
            "ghost":"幽灵",
            "water":"水民",
            "role":"角色",
            "card":"卡牌",
            "num":"数量"
        },
        "properties":"",
        "rule":{
            "foreword":"老虎老鼠,傻傻分不清楚",
            "text":"",
            "more":"http://bbs.ptteng.com"
        }
    },
    "-1100":{
        "name":"捉鬼游戏猜词版",
        "type":"remote",
        "gameid":-1100,
        "playerNumDefault":8,
        "showProperties":["role", "card"],
        "peopleNum":[2, 18],
        "rolesConfig":{
            "roleSort":"ghost,water",
            "default":"1,1",
            "saved":"",
            "4":"1,3",
            "5":"1,4",
            "6":"1,5",
            "7":"2,5",
            "8":"2,6",
            "9":"2,7",
            "tips":{
                "ghost":"想办法猜到人的词，同时还要注意不要暴露自己哦！",
                "water":"描述的时候要小心，不要太容易被鬼猜到你的词哦"

            }
        },
        "properties":"",
        "rule":{
            "foreword":"最欢乐的游戏",
            "text":"",
            "more":"http://bbs.ptteng.com"
        },
        "CN":{
            "ghost":"幽灵",
            "water":"水民",
            "num":"数量",
            "role":"角色",
            "card":"卡牌"
        }
    },
    "-1300":{
        "name":"捉鬼游戏魂版",
        "type":"remote",
        "gameid":-1300,
        "peopleNum":[2, 18],
        "showProperties":["role", "card"],
        "rolesConfig":{
            "saved":"",
            "roleSort":"ghost,soul,water",
            "default":"1,1,6",
            "4":"1,1,2",
            "5":"1,1,3",
            "6":"1,1,4",
            "7":"2,1,4",
            "8":"2,1,5",
            "9":"2,1,6",
            "tips":{
                "ghost":"你的词也许和同伴不一样，怎样达成共识是关键。",
                "water":"你的词也许和同伴不一样，怎样达成共识是关键。",
                "soul":"你的词也许和同伴不一样，怎样达成共识是关键。"
            }
        },
        "properties":"",
        "rule":{
            "foreword":"自己究竟是什么角色呢",
            "text":"",
            "more":"http://bbs.ptteng.com"
        },
        "CN":{
            "num":"数量",
            "ghost":"幽灵",
            "water":"水民",
            "role":"角色",
            "card":"卡牌",
            "soul":"魂"
        }
    },
    "-2000":{
        "name":"杀人游戏简化版",
        "type":"remote",
        "gameid":-2000,
        "peopleNum":[2, 18],
        "showProperties":["role"],
        "rolesConfig":{
            "saved":"",
            "roleSort":"killer,water",
            "default":"1,7",
            "4":"1,3",
            "5":"1,4",
            "6":"1,5",
            "7":"1,6",
            "8":"1,7",
            "9":"1,8",
            "tips":{
                "killer":"要注意隐藏自己的身份！",
                "water":"通过逻辑分析抓出隐藏的杀手"
            }
        },
        "properties":"",
        "rule":{
            "foreword":"将一切繁琐化为虚无,再重新演绎出无穷尽的变化",
            "text":"<p> 关于简化,我有很多话要说.</p> <p> 有关于游戏本身的, 也有和游戏无关的, 但这就是简化吧, 简化从来就不会是一个单纯的游戏.</p>" +
                "<p> 简化是杀人游戏的一种,一般认为这是最简单的版本,人称1.0版. </p>" +
                "   <p>而实际上.简化是杀人游戏中最经典的版本,是最容易将水民的魅力和杀手的博弈发挥到极致的版本. </p>" +
                "  <p> 简化是分成水民和杀手两种阵营的. </p>" +
                " <p> 通常认为线杀的经典设置是8411.即8人,白天4分钟,晚上1分钟,遗言1分钟. </p>" +
                "<p> 游戏往往是从白天开始,第一天是序幕,在一群认真游戏的玩家中,第一天是轻松也是暗流涌动的一天,如果你是水,你需要尽快的找出可以让你信任的玩家,找出你认为有可能是杀手的玩家,以便为第二天的正式交锋做准备." +
                "<p> 尘埃落定,游戏结束.简化却在继续,我们也在继续.可惜生活中没有三人局.我和你都无法分辨谁才是真正的杀手,又或者,都不是杀手却可以互相伤害对方. 这就是简化</p>",
            "more":"http://bbs.ptteng.com"
        },
        "CN":{
            "num":"数量",
            "killer":"杀手",
            "water":"水民",
            "role":"角色"
        }

    },
    "-2100":{
        "name":"杀人游戏警版",
        "type":"remote",
        "gameid":-2100,
        "peopleNum":[2, 18],
        "showProperties":["role"],
        "rolesConfig":{
            "saved":"",
            "roleSort":"killer,police,water",
            "default":"1,1,7",
            "4":"1,1,2",
            "5":"1,1,3",
            "6":"1,1,4",
            "7":"1,1,5",
            "8":"1,1,6",
            "9":"2,2,5",
            "tips":{
                "killer":"通过分析发言找出警察，杀光他们！同时也要注意隐藏自己的身份！",
                "police":"你是好人方的领路人，仔细分析，谨慎查证，用你的智慧带领平民走向胜利！",
                "water":"通过逻辑分析抓出隐藏的杀手，同时也要通过巧妙的发言来保护警察！"

            }
        },
        "properties":"",
        "rule":{
            "foreword":"只有黑白的世界.没有对错的分别",
            "text":"",
            "more":"http://bbs.ptteng.com"
        },
        "CN":{
            "num":"数量",
            "killer":"杀手",
            "water":"水民",
            "role":"角色",
            "police":"警察"
            }
    },
    "-2200":{
        "name":"杀人游戏警版不翻牌",
        "type":"remote",
        "gameid":-2200,
        "showProperties":["role"],
        "peopleNum":[2, 18],
        "rolesConfig":{
            "saved":"",
            "roleSort":"killer,police,water",
            "default":"1,1,7",
            "4":"1,1,2",
            "5":"1,1,3",
            "6":"1,1,4",
            "7":"1,1,5",
            "8":"1,1,6",
            "9":"2,2,5",
            "tips":{
                "killer":"通过分析发言找出警察，杀光他们！同时也要注意隐藏自己的身份！",
                "police":"你是好人方的领路人，仔细分析，谨慎查证，用你的智慧带领平民走向胜利！",
                "water":"通过逻辑分析抓出隐藏的杀手，同时也要通过巧妙的发言来保护警察！"

            }
        },
        "properties":"",

        "rule":{"foreword":"谁是杀手谁是警察?死亡反而什么都无法证明",
            "text":"<p> 关于简化,我有很多话要说.</p> <p> 有关于游戏本身的, 也有和游戏无关的, 但这就是简化吧, 简化从来就不会是一个单纯的游戏.</p>" +
                 "<p> 简化是杀人游戏的一种,一般认为这是最简单的版本,人称1.0版. </p>" +
                 "   <p>而实际上.简化是杀人游戏中最经典的版本,是最容易将水民的魅力和杀手的博弈发挥到极致的版本. </p>" +
                 "  <p> 简化是分成水民和杀手两种阵营的. </p>" +
                 " <p> 通常认为线杀的经典设置是8411.即8人,白天4分钟,晚上1分钟,遗言1分钟. </p>" +
                 "<p> 游戏往往是从白天开始,第一天是序幕,在一群认真游戏的玩家中,第一天是轻松也是暗流涌动的一天,如果你是水,你需要尽快的找出可以让你信任的玩家,找出你认为有可能是杀手的玩家,以便为第二天的正式交锋做准备." +
                 "<p> 尘埃落定,游戏结束.简化却在继续,我们也在继续.可惜生活中没有三人局.我和你都无法分辨谁才是真正的杀手,又或者,都不是杀手却可以互相伤害对方. 这就是简化</p>",
            "more":"http://bbs.ptteng.com"
        },
        "CN":{
            "num":"数量",
            "killer":"杀手",
            "water":"水民",
            "role":"角色",
            "police":"警察"
        }
    },
    "-2300":{
        "name":"杀人游戏3.0",
        "type":"remote",
        "gameid":-2300,
        "showProperties":["role"],
        "peopleNum":[2, 18],
        "rolesConfig":{
            "saved":"",
            "roleSort":"killer,police,awp,doctor,water",
            "default":"1,1,1,1,5",
            "5":"1,1,1,1,1",
            "6":"1,1,1,1,2",
            "7":"1,1,1,1,3",
            "8":"1,1,1,1,4",
            "9":"1,1,1,1,5",
            "tips":{
                "killer":"通过分析发言找出警察，杀光他们！同时也要注意隐藏自己的身份！",
                "police":"你是好人方的领路人，仔细分析，谨慎查证，用你的智慧带领平民走向胜利！",
                "water":"通过逻辑分析抓出隐藏的杀手，同时也要通过巧妙的发言来保护警察！",
                "awp":"最稳妥的方案是听从警察的吩咐，不要贸然开枪，也许你就是那个关键时刻扭转全局的人！",
                "doctor":"你是好人方的保护者，重点保护警察和自己总是没错的，猜中杀手的心思会让你的胜率大大增加。"
            }
        },
        "properties":"",
        "rule":
        {
            "foreword":"",
            "text":"",
            "more":"http://bbs.ptteng.com"
        },
        "CN":{
            "num":"数量",
            "killer":"杀手",
            "water":"水民",
            "role":"角色",
            "police":"警察",
            "doctor":"医生",
            "awp":"狙击",
            prophet:"先知"
        }

    },
    "-3000":{
        "name":"狼人杀",
        "type":"remote",
        "gameid":-3000,
        "showProperties":["role"],
        "peopleNum":[2, 18],
        "rolesConfig":{
            "saved":"",
            "roleSort":"wolf,prophet,witch,lover,guard,hunter,leader,idiot,mix,water",
            "default":"5,12",
            "4":"1,0,0,0,0,0,0,0,0,3",
            "5":"1,0,0,0,0,0,0,0,0,4",
            "6":"1,0,0,0,0,0,0,0,0,5",
            "7":"1,0,0,0,0,0,0,0,0,6",
            "8":"1,0,0,0,0,0,0,0,0,7",
            "9":"1,0,0,0,0,0,0,0,0,8",
            "tips":{
                "wolf":"想办法和你的同伴配合，杀光所有的好人吧！注意隐藏自己的身份！",
                "water":"通过逻辑分析抓出隐藏的狼人，掩护特权也是你的责任。",
                "prophet":"你是好人方的指路明灯，努力分析发言，查出隐藏的狼人吧！",
                "witch":"你对阵营非常重要，仔细分析，谨慎地使用你的特权，你会成为致胜的关键，不要忘记保护好自己！",
                "lover":"射出你的丘比特之箭吧，你将决定两个人的命运！",
                "guard":"你是好人方的坚实盾牌，猜中狼人的心思会让你守护的成功率大大增加。",
                "hunter":"你可以带走一个狼人，如果对自己的判断没把握，不妨听从先知的指引哦。",
                "leader":"狼人想杀你是要付出代价的，你可以大胆地站出来领导好人方。一定要注意不能被票死。",
                "idiot":"即使被票死了，你依然可以对场上形势提出你的意见，为阵营的胜利而不懈努力吧！",
                "mix":"通过分析发言判断出你所支持玩家的阵营，是你取胜的关键!"

            }
        },
        "properties":"",
        "rule":{
            "foreword":"",
            "text":"",
            "more":"http://bbs.ptteng.com"
        },
        "CN":{
            "num":"数量",
            "water":"水民",
            "role":"角色",
            "wolf":"狼人",
            prophet:"先知",
            witch:"女巫",
            lover:"爱人",
            guard:"守卫",
            hunter:"猎人",
            leader:"村长",
            idiot:"白痴",
            mix:"混血儿"

        }
    },
    "-4000":{
        "name":"炸狼堡",
        "type":"remote",
        "gameid":-3000,
        "peopleNum":[2, 18],
        "showProperties":["role"],
        "rolesConfig":{
            "saved":"",
            "roleSort":"wolf,water",
            "default":"2,6",

            "5":"2,3",
            "6":"2,4",
            "7":"2,5",
            "8":"2,6",
            "9":"2,7",
            "tips":{
                "wolf":"想办法破坏平民间的信任！如果你被选中成为炸堡者，一定要利用好这个身份！",
                "water":"信任比猜忌更重要，试着找到你的同伴，并且信任他！"

            }
        },
        "properties":"",
        "rule":{
            "foreword":"",
            "text":"",
            "more":"http://bbs.ptteng.com"
            },
        "CN":{
            "num":"数量",
            "water":"水民",
            "role":"角色",
            "wolf":"狼人"
        }
    }

}

