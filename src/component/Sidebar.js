import React, { useState } from 'react';
const Sidebar = ({ sendValue, clearfilterFn }) => {
  const [radioCheck, setRadioCheck] = useState(null);
  const products = [{ label: 'Ascending', value: "asc" }, { label: 'Descending', value: "desc" }];
  const handleCheckbox = (e) => {
    sendValue(e.target.value)
    clearfilterFn(false);
    setRadioCheck(e.target.value)
  }
  const handleclearFilter = () => {
    clearfilterFn(true);
    setRadioCheck(null)
  }
  return (
    <aside className='bg-secondary'>
      <div className="list-group">
        <h4 className="list-group-item list-group-item-action  bg-secondary">
          Filter Products
        </h4></div>
      <div className="list-group px-3">
        {
          products.map((item, index) => {
            return <div key={index} className="form-check">
              <input className="form-check-input" type="radio" checked={radioCheck === item.value} onChange={handleCheckbox} value={item.value} name="ascdesc" />
              <label className="form-check-label" >
                {item.label}
              </label>
            </div>
          })
        }
      </div>
      <div className="list-group py-3">
        <div className="d-grid gap-2  mx-auto">
          <button type="button" onClick={handleclearFilter} className="btn btn-primary active btn-block">Clear Filter</button>
        </div>
      </div>
    </aside>
  )
}
export default Sidebar