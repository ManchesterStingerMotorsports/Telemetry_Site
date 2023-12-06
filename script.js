
// tracks x
var last_x = 0;
const graph_range_limit = 40;
const graph_div_id = 'myPlot';

// Generate values
const xValues = [];
const yValues = [];

for (let x = 0; x <= 10; x += 0.1) {
    xValues.push(x);
    yValues.push(Math.sin(last_x));
}

last_x = 10

// Display using Plotly
// const data = [{ x: xValues, y: yValues, mode: "lines" }];
// const layout = { title: "test" };

//Display using Plotly
const data = [{ x: [last_x], y: [Math.sin(last_x)], mode: "lines" },
{ x: [last_x], y: [Math.cos(last_x)], mode: "lines" }];
const layout = {
    title: "ECU Data",
    yaxis: { title: "Sensor Readouts" },
    xaxis: { title: "Time" }
};

const configs = {
    responsive: true,
    autosize: true,
};

window.onload = function () {
    Plotly.newPlot(graph_div_id, data, layout);
    setInterval(updatePlot, 10);
}

function updatePlot() {
    last_x += 0.1;

    var new_data = { y: [[Math.sin(last_x)], [Math.cos(last_x)]], x: [[last_x], [last_x]] };
    Plotly.extendTraces(graph_div_id, new_data, [0, 1])

    if (last_x > graph_range_limit) {
        Plotly.update(graph_div_id, {}, { xaxis: { range: [last_x - graph_range_limit, last_x] } });
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
