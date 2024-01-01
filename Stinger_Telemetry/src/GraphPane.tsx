import './GraphPane.css';
import Plot from 'react-plotly.js';
const GraphPane = () => {
  return (
    <div className='container-fluid graphPane'>
      <div className='row'>
        <div className='col-10'>
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
              { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
          />
        </div>
        <div className='col-2 sidePanel'>
          <p>side panel goes here</p>
        </div>
      </div>
    </div>
  );
};

export default GraphPane;
