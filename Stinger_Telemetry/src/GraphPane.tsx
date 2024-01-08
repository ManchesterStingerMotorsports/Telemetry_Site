import { useState, useEffect } from 'react';
import './GraphPane.css';
import Plot from 'react-plotly.js';
const GraphPane = () => {
  const [current_x, setCurrent_x] = useState(6);

  const [data, setData] = useState([
    { name: 'rpm', x: [1, 2, 3, 4, 5, 6], y: [2, 4, 5, 8, 10, 12] },
    { name: 'temp', x: [1, 2, 3, 4, 5, 6], y: [21, 34, 35, 38, 20, 32] },
  ]);

  const updateData = (): void => {
    setCurrent_x(current_x + 0.1);
    const new_data = [...data];
    new_data.forEach((trace) => {
      trace.x.push(current_x);
      trace.y.push(random_integer(20));
    });
    setData(new_data);
    console.log(new_data);
  };
  function random_integer(maximum_value: number): number {
    return Math.floor(Math.random() * maximum_value);
  }

  useEffect(() => {
    setInterval(updateData, 100);
  }, []);

  return (
    <div className='container-fluid graphPane'>
      <div className='row'>
        <div className='col-10'>
          <Plot
            divId='plotOne'
            data={[
              {
                x: data[0].x,
                y: data[0].y,
                type: 'scatter',
                name: data[0].name,
              },
              {
                x: data[1].x,
                y: data[1].y,
                type: 'scatter',
                name: data[1].name,
              },
            ]}
            layout={{}}
            config={{ responsive: true }}
          />
        </div>
        <div className='col-2 sidePanel'>
          <button onClick={updateData}>Click</button>
        </div>
      </div>
    </div>
  );
};

export default GraphPane;
