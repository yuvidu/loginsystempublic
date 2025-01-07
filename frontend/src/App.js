import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserInfoPage from "./pages/UserInfoPage";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/logininfo" element={<UserInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
