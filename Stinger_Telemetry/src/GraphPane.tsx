import './GraphPane.css';
const GraphPane = () => {
  return (
    <div className='container-fluid graphPane'>
      <div className='row'>
        <div className='col-10'>
          <p>Graph Goes here</p>
        </div>
        <div className='col-2 sidePanel'>
          <p>side panel goes here</p>
        </div>
      </div>
    </div>
  );
};

export default GraphPane;
