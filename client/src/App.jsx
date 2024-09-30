import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Form from "./Pages/Todolist/Form";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import UpdateForm from "./Components/updateForm";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Form />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/update/:id" element={<UpdateForm />} />
    </Routes>
  );
}

export default App;
