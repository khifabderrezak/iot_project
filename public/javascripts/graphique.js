var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["0 h","1 h", "2 h", "3 h", "4 h", "5 h", "6 h", "7 h","8 h", "9 h", "10 h", "11 h", "12 h","13 h", "14 h", "15 h", "16 h", "17 h", "18 h", "19 h","20 h", "21 h", "22 h", "23 h"],
        datasets: [{
            label: "Heart bpm",
            borderColor: '#2c3e50',
            data: [0, 10, 5, 2, 20, 30, 45,0, 10, 5, 2, 20,0, 10, 5, 2, 20, 30, 45,0, 10, 5, 2, 20]
        },{
            label: "Temperature",
            borderColor: 'rgb(0, 230, 0)',
            data: [0, 15, 7, 2, 22, 20, 25]
        } 
        ]
    },

    options: {
        title:{
            display:true,
            text:"", 
            fontSize:25
        }
    }
});