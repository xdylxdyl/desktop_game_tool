/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-20
 * Time: 上午11:26
 * To change this template use File | Settings | File Templates.
 */
function gameModelList($scope){
    $scope.modelList=[
        {
            "title":"捉鬼游戏",
            "versions":
            [
                {
                    "name":"简化版(1.0)",
                    "ver":1
                 },
                {
                    "name":"猜词版(2.0)",
                    "ver":2
                },
                {
                    "name":"白痴版(魂版)(1.5)",
                    "ver":3
                }

            ]
        },
        {
            "title":"杀人游戏",
            "versions":
                [
                    {
                        "name":"简化版",
                        "ver":4
                    },
                    {
                        "name":"警版",
                        "ver":5
                    },
                    {
                        "name":"不翻牌",
                        "ver":6
                    },
                    {
                        "name":"3.0",
                        "ver":7
                    }

                ]
        },
        {
            "title":"狼人杀",
            "versions":
                [
                    {
                        "name":"狼人杀",
                        "ver":8
                    }
                ]
        },
        {
            "title":"炸狼堡",
            "versions":
                [
                    {
                        "name":"炸狼堡",
                        "ver":9
                    }
                ]
        }

    ]
}