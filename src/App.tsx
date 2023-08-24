import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Info from "./pages/Info";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addEditContact" element={<AddEdit />} />
        <Route path="/addEditContact/:id" element={<AddEdit />} />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </Router>
  );
};

export default App;
