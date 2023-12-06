
var graph_div;
var scroll_enabled = true;
var number_of_sensors = 3;
// tracks x
var last_x = 0;
const graph_range_limit = 40;
const graph_div_id = 'myPlot';


// Display using Plotly
// const data = [{ x: xValues, y: yValues, mode: "lines" }];
// const layout = { title: "test" };

//Display using Plotly
const data = [{ x: [last_x], y: [Math.sin(last_x)], mode: "lines" },
{ x: [last_x], y: [Math.cos(last_x + Math.PI / 2)], mode: "lines" }];
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
    graph_div = document.getElementById(graph_div_id);
    var selection_form = document.getElementById('trace_toggles');
    for (i = 0; i < number_of_sensors; i++) {
        var cb = document.createElement("input");
        cb.id = "checkbox_" + i;
        cb.type = "checkbox";
        var lbl = document.createElement("label");
        lbl.for = "checkbox_" + i;
        lbl.innerHTML = "Sensor " + i;
        var br = document.createElement("br");
        selection_form.appendChild(cb);
        selection_form.appendChild(lbl);
        selection_form.appendChild(br);


    }
    Plotly.newPlot(graph_div_id, data, layout);
    setInterval(updatePlot, 10);
}

function updatePlot() {
    last_x += 0.1;

    var new_data = { y: [[Math.sin(last_x)], [Math.cos(last_x + Math.PI / 2)]], x: [[last_x], [last_x]] };
    Plotly.extendTraces(graph_div_id, new_data, [0, 1])

    if (last_x > graph_range_limit && scroll_enabled) {
        Plotly.update(graph_div_id, {}, { xaxis: { range: [last_x - graph_range_limit, last_x] } });
    }

}

function toggle_scroll() {
    scroll_enabled = !scroll_enabled;
}

