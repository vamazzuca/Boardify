import { Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Store from "./pages/store"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import RequireAuth from "./components/requireAuth";
import Product from "./pages/product";
import AdminPanel from "./pages/adminPanel";
import AddProduct from "./pages/addProduct";
import EditProduct from "./pages/editProduct";
import Error from "./pages/error";
import { CartProvider } from "./context/cartContext";
import Cart from "./pages/cart";
import ScrollToTop from "./hooks/scrollToTop";

function App() {
  
  

  return (
    <div className="App">
      <ScrollToTop/>
      <CartProvider>
      
        <Header />
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/shop" element={<Store />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/shop/:name/:productId' element={<Product />} />
          <Route element={<RequireAuth allowedRoles={["user", "admin"]}/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]}/>}>
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/admin-panel/add-product" element={<AddProduct />} />
            <Route path="/admin-panel/edit-product/:productId" element={<EditProduct/>}/> 
          </Route>
          <Route path="*" element={<Error/>}></Route>
        </Routes>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
