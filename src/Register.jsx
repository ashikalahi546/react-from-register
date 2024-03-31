import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase.confiq";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const [registarError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setPassword] = useState(false);
  const auth = getAuth(app);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    if (password.length < 6) {
      setRegisterError(" Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "you have should have at least one uppercase characters"
      );
      return;
    }
    setRegisterError("");
    setSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("user create a successfully");
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 mt-3 w-56 mx-auto"
      >
        <input
          className="px-3 py-2 rounded-lg"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <div className="flex relative">
          <input
            className="px-3 py-2 rounded-lg w-full"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            id=""
            required
          />
          <span
            className="absolute top-3 right-2"
            onClick={() => setPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEyeOutline></IoEyeOutline>
            ) : (
              <IoMdEyeOff></IoMdEyeOff>
            )}
          </span>
        </div>
        <input
          className="px-3 py-2 rounded-lg bg-orange-500 text-white"
          type="submit"
          value="Register"
        />
      </form>
      <div className="text-center text-red-500">
        {registarError && <p>{registarError}</p>}
      </div>
      <div className="text-center text-green-500">
        {success && <p>{success}</p>}
      </div>
    </div>
  );
};

export default Register;
