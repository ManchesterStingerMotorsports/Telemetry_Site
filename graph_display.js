const graph_display_template = document.createElement('template');
graph_display_template.innerHTML =
    `
      <div id="${graph_div_id}{index}"style="width: {width}%; height: {height}vh; float: left"></div>
      <button
        id="scroll_enable_button_{index}"
        onclick="toggle_scroll({index})"
        style="width: {width}%; height: 50px"
      >
        Toggle Scrolling
      </button>
`;