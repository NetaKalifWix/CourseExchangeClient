// hook to contain all user info
import { useState } from "react";

const useUserInfo = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

    const userInfo = {
        name,
        password,
        email,
        phone,
        };
        

  const setUserInfo = (props) => {
    const { name, password, email, phone } = props;
    if (name) {
      setName(name);
    }
    if (password) {
      setPassword(password);
    }
    if (email) {
      setEmail(email);
    }
    if (phone) {
      setPhone(phone);
    }
  };

  return {
    userInfo,
    setUserInfo,
  };
};

export default useUserInfo;
