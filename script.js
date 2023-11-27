// function clock(){
//     alert("tick")
// }

// oneHertzClock = setInterval(clock, 2000)


var graph = document.createElement("div")



let exp = "Math.sin(x)";

// Generate values
const xValues = [];
const yValues = [];
for (let x = 0; x <= 10; x += 0.1) {
    xValues.push(x);
    yValues.push(eval(exp));
}
var lastX = 10

// Display using Plotly
const data = [{ x: xValues, y: yValues, mode: "lines" }];
const layout = { title: "y = " + exp };

window.onload = function () {
    Plotly.newPlot("myPlot", data, layout);
    setInterval(updatePlot, 10)
}

function updatePlot() {
    lastX += 0.1;
    x = lastX;
    xValues.shift();
    yValues.shift();
    xValues.push(x);
    yValues.push(eval(exp))
    Plotly.redraw('myPlot')
}