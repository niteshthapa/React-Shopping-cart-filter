import './App.css';
import {  useEffect, useReducer, useState } from 'react';
import { GET_PRODUCT } from "./component/context/ProductType";
import ProductContext from './component/context/ProductContext';
import ProductReducer from './component/context/products/ProductReducer';
import { initialValue } from './component/context/products/ProductReducer';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import Products from './component/Products';
function App() {
  const [checkboxValue, setCheckBoxValue] = useState("");
  const [clearfilter, setclearfilter] = useState(false);
  const [obj, setObj] = useState(null);
  const sendValue = (e) => {
    setCheckBoxValue(e)
  }
  const clearfilterFn = (bol) => {
    setclearfilter(bol)
  }
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
      let data = await fetch("https://dummyjson.com/products");
      let response = await data.json();

      dispatch(
        {
          type: GET_PRODUCT,
          payload: response.products
        })
    } catch (error) {
      console.log(error)
    }
  }
  const [state, dispatch] = useReducer(ProductReducer, initialValue);
  useEffect(() => {
    setObj(state);
  }, [state])
  return (
    <>
      <ProductContext.Provider value={state}>
        <div className="container">
          <Header>
          </Header>
          <div className="row">
            <div className="col-3">
              <Sidebar sendValue={sendValue} clearfilterFn={clearfilterFn} />
            </div>
            <div className="col">
              <Products checkboxValue={checkboxValue} clearfilter={clearfilter} />
            </div>
          </div>
        </div>
      </ProductContext.Provider>
    </>
  );
}

export default App;
