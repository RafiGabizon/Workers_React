import './App.css';
import ContextProvider from "./Context/Context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page404 from "./Pages/Page404";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Favorite from "./Pages/Favorite";
import EmployeeDetail from "./Components/EmployeeDetail";
function App() {

  return (
    <div className="App">
  <ContextProvider>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={"/favourites"} element={<Favorite />} />
        <Route path={"/employee"} element={<EmployeeDetail/>} />
        <Route path={"favourites/employee"} element={<EmployeeDetail/>} />
        <Route path="/error" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
    </ContextProvider>
    </div>
  );
}

export default App;
