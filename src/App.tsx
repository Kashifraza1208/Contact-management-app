
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Contacts from "./pages/Contact/Contacts";
import ChartsMap from "./pages/ChartsMap/ChartsMap";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/chartsmap" element={<ChartsMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
