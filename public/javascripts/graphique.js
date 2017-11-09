var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Heart bpm",
            borderColor: '#2c3e50',
            data: [0, 10, 5, 2, 20, 30, 45]
        },{
            label: "Temperature",
            borderColor: 'rgb(0, 230, 0)',
            data: [0, 15, 7, 2, 22, 20, 25]
        } 
        ]
    },

    options: {}
});