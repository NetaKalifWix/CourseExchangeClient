import { useState } from "react";
import Input from "./Input";
import "./LoginForm.css";

const LoginForm = ({
  url,
  isLoggedIn,
  setIsLoggedIn,
  setShowLoginFrom,
  userInfo,
  setUserInfo,
  setIsTermsOfUseModalOpen,
}) => {
  const { name, password, email } = userInfo;
  const [showPassword, setShowPassword] = useState(false);

  const updateUserInfo = (prop) => {
    setUserInfo((curr) => {
      return { ...curr, ...prop };
    });
  };

  const flagsToLabel = () => {
    if (isLoggedIn) {
      return "Logout";
    } else {
      return showPassword ? "login" : "send me a key";
    }
  };

  // const validateEmail = (email) => {
  //   const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   return emailRegex.test(email);
  // };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@bgu\.ac\.il$/;
    const emailRegexPost = /^[a-zA-Z0-9._%+-]+@post.bgu\.ac\.il$/;

    return emailRegex.test(email) || emailRegexPost.test(email);
  };

  const handleSubmit = (e) => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      return;
    }

    e.preventDefault();

    if (!showPassword) {
      getAuthKey();
      return;
    }

    const toSend = {
      email: email,
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
        if (data.success) {
          setIsLoggedIn(true);
          setShowLoginFrom(false);
          if (data.isAdmin) {
            setUserInfo({ ...userInfo, isAdmin: true });
          } else {
            setIsTermsOfUseModalOpen(true);
          }
        } else {
          alert("Wrong key");
        }
      })
      .catch((err) => console.log(err));
  };

  const getAuthKey = () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid BGU email");
      return;
    }

    const toSend = {
      email: email,
      name: name,
    };
    fetch(`${url}/getAuthKey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowPassword(true);
        } else {
          alert("error sending key");
        }
      });
  };

  return (
    <form className="loginForm">
      {!isLoggedIn && !showPassword && (
        <Input
          set={(name) => updateUserInfo({ name })}
          value={name}
          label="Your Name (English)"
        />
      )}
      {!isLoggedIn && !showPassword && (
        <Input
          set={(email) => updateUserInfo({ email })}
          value={email}
          label="Your Email"
        />
      )}
      {!isLoggedIn && showPassword && (
        <Input
          type={"password"}
          set={(password) => updateUserInfo({ password })}
          value={password}
          label="anter the key sent to your email"
        />
      )}
      <button onClick={(e) => handleSubmit(e)}>{flagsToLabel()}</button>
    </form>
  );
};

export default LoginForm;
