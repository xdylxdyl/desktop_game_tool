/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-20
 * Time: 上午11:26
 * To change this template use File | Settings | File Templates.
 */
function gameModelList($scope) {
    $scope.test_title = "aaa";
    $scope.officialList = [
        {
            "title":"捉鬼游戏",
            "id":"ghost",
            "versions":[
                {
                    "name":"简化版(1.0)",
                    "gameid":1
                },
                {
                    "name":"猜词版(2.0)",
                    "gameid":2
                },
                {
                    "name":"白痴版(魂版)(1.5)",
                    "gameid":3
                }

            ]
        },
        {
            "title":"杀人游戏",
            "id":"kill",
            "versions":[
                {
                    "name":"简化版",
                    "gameid":4
                },
                {
                    "name":"警版",
                    "gameid":5
                },
                {
                    "name":"不翻牌",
                    "gameid":6
                },
                {
                    "name":"3.0",
                    "gameid":7
                }

            ]
        },
        {
            "title":"狼人杀",
            "id":"wolf",
            "versions":[
                {
                    "name":"狼人杀",
                    "gameid":8
                }
            ]
        },
        {
            "title":"炸狼堡",
            "id":"zlb",
            "versions":[
                {
                    "name":"炸狼堡",
                    "gameid":9
                }
            ]
        }

    ]
    $scope.userList = [
        {
            "title":"三方",
            "id":"1",
            "versions":[
                {
                    "name":"简化变异小三方",
                    "gameid":1
                }


            ]
        },
        {
            "title":"最爱",
            "id":"2",
            "versions":[
                {
                    "name":"三十六人象棋杀",
                    "gameid":2
                },
                {
                    "name":"天使与魔鬼",
                    "gameid":3
                },
                {
                    "name":"捉鬼变异版",
                    "gameid":4
                },
                {
                    "name":"狼人杀新月扩展",
                    "gameid":5
                },
                {
                    "name":"炸狼堡全角色",
                    "gameid":6
                }

            ]
        }


    ]
}
function gameInitCtrl($scope,$routeParams,$http){
    var gameid=getParameterFromUrl(location.href,"gameid");
    $http.get('../json/officialGame/'+gameid+'.json').success(function(data){
       $scope.gameName=data.name;
       $scope.type=data.type;
       $scope.playerNum=data.playerNum;
       $scope.roles=data.roles;
       $scope.gameid=data.gameid;
    });
}
function gamePlayCtrl($scope,$routeParams,$http){
    var gameid=getParameterFromUrl(location.href,"gameid");
    $http.get('../json/officialGame/'+gameid+'.json').success(function(data){
        $scope.gameName=data.name;
        $scope.type=data.type;
        $scope.playerNum=data.playerNum;
        $scope.roles=data.roles;
        //$scope.roleAssign=eval("("+roleMaker(data)+")");
        $scope.roleAssign=roleMaker(data);
    });
}