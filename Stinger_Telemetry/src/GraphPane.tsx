import { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
import './GraphPane.css';
import Plot from 'react-plotly.js';

type Props = {
  sensors: string[];
};

const GraphPane = ({ sensors }: Props) => {
  const x_axis_range = 30;
  const [traces, setTraces] = useState([sensors[0]]);

  const [data, setData] = useState(
    sensors
      .filter((sensor) => traces.includes(sensor))
      .map((sensor) => ({
        x: [0],
        y: [0],
        name: sensor,
      }))
  );

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
      //get new data
      data.forEach((trace) => {
        const new_x = [...trace.x];
        new_x.push(new_x[new_x.length - 1] + 0.5);
        const new_y = [...trace.y];
        new_y.push(random_integer(10));
        new_data.push({ x: new_x, y: new_y, name: trace.name });
      });

      setData(new_data);
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const new_traces = [...traces];
    new_traces[index] = e.target.value;

    setTraces(new_traces);
  };

  useEffect(() => {
    setData(
      sensors
        .filter((sensor) => traces.includes(sensor))
        .map((sensor) => ({
          x: [0],
          y: [0],
          name: sensor,
        }))
    );
  }, [traces, sensors]);

  return (
    <div className='container-fluid graphPane'>
      <div className='row'>
        <div className='col-10'>
          <Plot
            style={{ width: 'auto' }}
            divId='plotOne'
            data={data}
            layout={{
              plot_bgcolor: 'black',
              paper_bgcolor: '#4B4B4B',
              font: { color: 'white' },
              autosize: true,
              height: 150,
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
          <div className='d-flex justify-content-between'>
            <button
              type='button'
              className='btn btn-secondary btn-sm'
              onClick={() => {
                setTraces([sensors[0]]);
              }}
            >
              Reset
            </button>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={() => {
                const new_traces = [...traces];
                new_traces.push(sensors[0]);

                setTraces(new_traces);
              }}
            >
              Add +
            </button>
          </div>
          {traces.map((trace, index) => (
            <div>
              <label htmlFor='cars'>Sensor: </label>
              <select
                onChange={(e) => handleSelectChange(e, index)}
                key={index}
                defaultValue={trace}
                name='cars'
                id='cars'
              >
                {sensors.map((sensor) => (
                  <option key={sensor} value={sensor}>
                    {sensor}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphPane;
