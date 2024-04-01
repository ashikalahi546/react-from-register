import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from "./firebase.confiq";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Register = () => {
  const [registarError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setPassword] = useState(false);
  const auth = getAuth(app);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password, accepted);
    if (password.length < 6) {
      setRegisterError(" Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "you have should have at least one uppercase characters"
      );
      return;
    } else if (!accepted) {
      setRegisterError("please accepted");
      return;
    }
    setRegisterError("");
    setSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("user create a successfully");
        sendEmailVerification(result.user)
        .then(()=> {
         alert('please check your email and verify your acoount')
        })
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold my-3">Register </h2>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 mt-3 w-2/12 mx-auto"
      >
        <input
          className="px-3 py-2 rounded-lg"
          type="name"
          name="text"
          placeholder="Your Name"
          required
        />
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
        <div className="flex items-center gap-2">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">
            Acepect our <Link to="/login">Terms and Conditon</Link>
          </label>
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
      <p className="text-center  mt-2 ">Already have an account? <Link className="hover:underline" to='/login'>Login</Link> </p>
    </div>
  );
};

export default Register;
