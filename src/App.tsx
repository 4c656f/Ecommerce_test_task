import React from 'react';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import WithNavBar from "./pages/layouts/WithNavBar/WithNavBar";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ShoppingList from "./pages/ShoppingList";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              {/*pages with nav bar*/}
              <Route element={<WithNavBar/>}>


                  <Route path={"*"} element={<h1>notFound</h1>}/>

                  <Route path={"/"} element={<Home/>}/>

                  <Route path={"/product/:productId"} element={<Product/>}/>

                  <Route path={"/cart"} element={<Cart/>}/>

                  <Route path={"/shopping-list"} element={<ShoppingList/>}/>
              </Route>

          </Routes>
      </BrowserRouter>
  );
}

export default App;
