import './index.css'

import { Routes,Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';

import {
  RegisterPage,
  Login,
  Home,
  Collections,
  ShopBgAndBasket,
  Payment,
  User,
  Error404,
  ProductDetailPage,
} from "./pages/index.js"

function App() {


  return (
    < >
    <Navbar/>
    <div id='content' >
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/collections' element={<Collections/>}></Route>
        <Route path='/shoppingbasket' element ={<ShopBgAndBasket/>}/>
        <Route path='/payment' element={<PrivateRoute><Payment/></PrivateRoute>}/>
        <Route path='/shopingbasket' element={<ShopBgAndBasket/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/products/:documentId" element={<ProductDetailPage />} />

      <Route path='*' element={<Error404/>}></Route>
      </Routes>

      </div>
    
    </>
  )
}

export default App
