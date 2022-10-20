import React, { useContext, useState, useEffect } from 'react';
import ProductsContext from './context/ProductContext';
const Products = (props) => {
  const { checkboxValue, clearfilter } = props;
  const { loading, allproducts } = useContext(ProductsContext);
  const [defaultdata, setDefaultdata] = useState(null);
  const [sortData, setSortData] = useState(null);
  const [sortValue, setSortValue] = useState({
    order: "",
    sorting: false
  });
  useEffect(() => {
    setDefaultdata(allproducts)
    setSortData([...allproducts])
  }, [allproducts])
  useEffect(() => {
    if (clearfilter) {
      setSortValue({
        order: "",
        sorting: false
      })
    }
  }, [clearfilter])
  useEffect(() => {
    if (checkboxValue === "asc") {
      setSortValue({ ...sortValue, order: "asc", sorting: true })
      sortData.sort(ascFn)
    }
    if (checkboxValue === "desc") {
      setSortValue({ ...sortValue, order: "desc", sorting: true })
      sortData.sort(desFn);
    }
  }, [checkboxValue])
  const ascFn = ((a, b) => {
    if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
      return -1;
    }
    else if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  })
  const desFn = ((a, b) => {
    if (b.title.toLocaleLowerCase() < a.title.toLocaleLowerCase()) {
      return -1;
    }
    else if (b.title.toLocaleLowerCase() > a.title.toLocaleLowerCase()) {
      return 1;
    }
    else return 0;
  })
  return (
    <div className="row">
      {sortValue.sorting && sortValue.order === "desc" || sortValue.sorting && sortValue.order === "asc" ? loading ? "Loading...." : sortData.map(item => {
        return <div key={item.id} className=" col-md-4 row-flex mb-4 ">
          <div className="card" >
            <img src={item.thumbnail} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <h5 className="card-title">Price: {item.price}</h5>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        </div>
      }) 
          :
          loading ? "Loading...." : defaultdata.map(item => {
            return <div key={item.id} className=" col-md-4 row-flex mb-4">
              <div className="card" >
                <img src={item.thumbnail} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.title} "default"</h5>
                  <h5 className="card-title">Price: {item.price}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          })
      }
    </div>
  )
}
export default Products