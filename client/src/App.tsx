import CreateClient from "./views/CreateClient";
import Home from "./views/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-client" element={<CreateClient />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
