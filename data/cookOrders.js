const cookOrders = [

        {
            item: "Kabaab 1kg",
            count:3,
            isStarted:false,
            completedCount: 3,
            isCompleted: false,
            tables:[
                 {
                   tableNO:"1",
                   count:1
                 },
                {
                    tableNO: "5",
                    count: 3
                },
             ]
        },
        {
            item: "fish fry",
            count: 2,
            completedCount:2,
            isCompleted: false,
            isStarted: false,
            tables: [
                {
                    tableNO: "1",
                    count: 1
                },
                {
                    tableNO: "5",
                    count: 3
                },
            ]
        },
        {
            item: "fish curry",
            count: 5,
            completedCount: 5,
            isCompleted: false,
            isStarted: false,
            tables: [
                {
                    tableNO: "1",
                    count: 1
                },
                {
                    tableNO: "5",
                    count: 3
                },
            ]
        },
  

]

export default cookOrders;