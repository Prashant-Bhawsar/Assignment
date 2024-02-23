import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import ProductListing from "./Component/ProductListing";
import AddProduct from "./Component/AddProduct";
import UpdateProduct from "./Component/UpdateProduct";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <BrowserRouter>
          <div className="header">
            <Link to={"/"}>Home</Link>
            <Link to={"/product"}>Product</Link>
          </div>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/product"
              element={<ProductListing></ProductListing>}
            ></Route>
            <Route path="/product/add" element={<AddProduct />}></Route>
            <Route
              path="/product/edit/:code"
              element={<UpdateProduct />}
            ></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          className="toast-position"
          position="bottom-right"
        ></ToastContainer>
      </div>
    </Provider>
  );
}

export default App;
