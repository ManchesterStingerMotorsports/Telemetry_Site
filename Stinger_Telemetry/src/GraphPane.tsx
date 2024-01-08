import { useState, useEffect } from 'react';
import './GraphPane.css';
import Plot from 'react-plotly.js';
const GraphPane = () => {
  const x_axis_range = 30;

  const [data, setData] = useState([
    {
      x: [0],
      y: [0],
      name: 'rpm',
    },
    { x: [0], y: [0], name: 'temp' },
    { x: [0], y: [0], name: 'speed' },
    { x: [0], y: [0], name: 'voltage' },
  ]);

  function random_integer(maximum_value: number): number {
    return Math.floor(Math.random() * maximum_value);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const new_data: {
        x: number[];
        y: number[];
        name: string;
      }[] = [];
      data.forEach((trace) => {
        const new_x = [...trace.x];
        new_x.push(new_x[new_x.length - 1] + 0.5);
        const new_y = [...trace.y];
        new_y.push(random_integer(10));
        new_data.push({ x: new_x, y: new_y, name: trace.name });
      });

      setData(new_data);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div className='container-fluid graphPane'>
      <div className='row'>
        <div className='col-10'>
          <Plot
            divId='plotOne'
            data={data}
            layout={{
              plot_bgcolor: 'black',
              paper_bgcolor: '#4B4B4B',
              font: { color: 'white' },
              height: 250,
              margin: { t: 0, b: 20, l: 20, r: 0, pad: 0 },
              xaxis: {
                range: [
                  data[0].x[data[0].x.length - 1] - x_axis_range,
                  data[0].x[data[0].x.length - 1],
                ],
              },
            }}
            config={{}}
          />
        </div>
        <div className='col-2 sidePanel'>
          <button>Click</button>
        </div>
      </div>
    </div>
  );
};

export default GraphPane;
