
let exp = "Math.sin(x)";
let exp2 = "Math.cos(x)";

// Generate values
const xValues = [];
const yValues = [];
for (let x = 0; x <= 10; x += 0.1) {
    xValues.push(x);
    yValues.push(eval(exp));
}


const yValues2 = [];
for (let x = 0; x <= 10; x += 0.1) {
    yValues2.push(eval(exp2));
}

var lastX = 10

// Display using Plotly
const data = [{ x: xValues, y: yValues, mode: "lines" },
{ x: xValues, y: yValues2, mode: "lines" }];
const layout = { title: "ECU Data",
yaxis: {title: "Sensor Readouts"},
xaxis: {title: "Time"}};

const configs = {
    
    responsive: true,
    autosize: true,
    width: 500,
    height: 500,
    automargin: true,
};

window.onload = function () {
    Plotly.newPlot("myPlot", data, layout, configs);
    setInterval(updatePlot, 10)
}

function updatePlot() {
    lastX += 0.1;
    x = lastX;
    // removes first element of array
    // xValues.shift();
    // yValues.shift();
    // yValues2.shift();

    // appends new values
    xValues.push(x);
    yValues.push(eval(exp))
    yValues2.push(eval(exp2))

    Plotly.redraw('myPlot')
}