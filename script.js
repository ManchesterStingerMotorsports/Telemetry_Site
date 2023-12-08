
var graph_div;
var scroll_enabled = [];
var number_of_sensors = 3;
var number_of_displays = 3;

// tracks x
var last_x = 0;
const graph_range_limit = 20;
const displays_div_id = "displays";
const display_pane_div_id = "display_pane_";
const graph_div_id = 'data_plot_';

// display html template
var index = 0;
var width = 90;
var height = 30;
const display_template = 
    `
      <div id="${graph_div_id}{index}"style="width: {width}%; height: {height}vh; float: left"></div>
      <button
        id="scroll_enable_button_{index}"
        onclick="toggle_scroll({index})"
        style="width: {width}%; height: 50px"
      >
        Toggle Scrolling
      </button>
    `

// Generating initial data

const data = [];
for (i = 0; i < number_of_displays; i++){
    scroll_enabled.push(true);
    data.push(
        [{ x: [last_x], y: [randint(last_x)], mode: "lines" },
        { x: [last_x], y: [randint(last_x)], mode: "lines" }]
    );
}

const layout = {
    title: "ECU Data",
    yaxis: { title: "Sensor Readouts" },
    xaxis: { title: "Time" },
    plot_bgcolor:"black",
    paper_bgcolor:"black"
};

const configs = {};

window.onload = function () {

    var displays_div = document.getElementById(displays_div_id);


    //graph_div = document.getElementById(graph_div_id);
    //var selection_form = document.getElementById('trace_toggles');
    // for (i = 0; i < number_of_sensors; i++) {
    //     var cb = document.createElement("input");
    //     cb.id = "checkbox_" + i;
    //     cb.type = "checkbox";
    //     var lbl = document.createElement("label");
    //     lbl.for = "checkbox_" + i;
    //     lbl.innerHTML = "Sensor " + i;
    //     var br = document.createElement("br");
    //     selection_form.appendChild(cb);
    //     selection_form.appendChild(lbl);
    //     selection_form.appendChild(br);
    // }

    height = 100/number_of_displays
    for (i = 0; i<number_of_displays; i++){
        index = i;
        var new_display_pane_div = document.createElement("div");        
        new_display_pane_div.id = display_pane_div_id+i;
        new_display_pane_div.innerHTML = display_template;
        new_display_pane_div.innerHTML= new_display_pane_div.innerHTML.replace('{index}',index);
        new_display_pane_div.innerHTML= new_display_pane_div.innerHTML.replace('{width}',width);
        new_display_pane_div.innerHTML= new_display_pane_div.innerHTML.replace('{height}',height);
        displays_div.appendChild(new_display_pane_div);
        Plotly.newPlot(graph_div_id+i, data[i], layout);
    }
    setInterval(updatePlots, 100);
}

function updatePlots() {
    last_x += 0.1;
    for (i =0; i<number_of_displays; i++){
        var new_data = { y: [[randint(last_x)], [randint(last_x)]], x: [[last_x], [last_x]] };
        Plotly.extendTraces(graph_div_id+i, new_data, [0, 1])

        if (last_x > graph_range_limit && scroll_enabled[i]) {
            Plotly.update(graph_div_id+i, {}, { xaxis: { range: [last_x - graph_range_limit, last_x] } });
        }        
    }
    

}

function toggle_scroll(i) {
    scroll_enabled[i] = !scroll_enabled[i];
}

function randint(maxval){
    return Math.floor(Math.random()*maxval);
}

