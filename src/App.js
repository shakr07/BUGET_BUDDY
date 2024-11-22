import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Predict from "./components/Predict";
import Chart from "./components/Chart";
import ExpenseCard from "./pages/ExpenseCard";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aesehi" element={<ExpenseCard
    title="React Testing"
    date="Oct 20, 2021"
    description="Brief description about the expense or the purpose."
    image="path-to-image.jpg"  
/>} />
        <Route path="/chart" element={<Chart/>} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;