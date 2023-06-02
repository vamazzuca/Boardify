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


function App() {
  

  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/shop" element={<Store />} />
        <Route path="/register" element={<Register />} />
        <Route path='/shop/:name/:productId' element={<Product />} />
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
