import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Store from "./pages/store"
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
