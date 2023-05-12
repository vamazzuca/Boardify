import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Store from "./pages/store"
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store/>}/>
      </Routes>
    </div>
  );
}

export default App;
