
import { useState } from "react";
import Input from "../../components/Input";
import './LoginForm.css';

const LoginForm = ({url, setIsLoggedIn,setShowLoginFrom}) => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const toSend = {
      name: name,
      password: password,
    };

    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setIsLoggedIn(true);
          setShowLoginFrom(false);
        } else {
          alert("Wrong password");
        }
      });
  }

  return (
    <form className="loginForm">
      <Input set={setName} value={name} label="Your Name (English)" />
      <Input type = {showPassword ? 'text' : 'password'} set={setPassword} value={password} label="Your Password" />
      {/* <Input type = 'checkbox' set={setShowPassword} value={showPassword} label="Show Password" /> */}
      <button onClick={(e) => handleSubmit(e)}>Login</button>
    </form>
  );
};

export default LoginForm;
