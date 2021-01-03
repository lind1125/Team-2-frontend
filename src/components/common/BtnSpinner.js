import React from 'react';

const BtnSpinner = ({loading, text}) => (
  <div className='form-group'>
    <button className='btn btn-primary btn-block' disabled={loading}>
       { loading && (
           <span className='spinner-border spinner-border-sm'></span>
       )}
       <span>{text}</span>
   </button>
 </div>
);

export default BtnSpinner;