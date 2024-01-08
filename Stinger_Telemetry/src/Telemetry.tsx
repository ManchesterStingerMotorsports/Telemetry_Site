import { useState } from 'react';
import GraphPane from './GraphPane';
const Telemetry = () => {
  const [panelCount, setPanelCount] = useState(1);

  return (
    <>
      <div className='d-flex justify-content-between'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => {
            setPanelCount(1);
          }}
        >
          Reset
        </button>
        <h1 className='fs-3 text-reset text-center'>
          Stinger Motorsports Telemetry
        </h1>

        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            setPanelCount(panelCount + 1);
          }}
        >
          Add+
        </button>
      </div>
      {[...Array(panelCount).keys()].map((index) => (
        <GraphPane key={index} />
      ))}
    </>
  );
};

export default Telemetry;
