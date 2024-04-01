import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase.confiq";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";


const HeroResgister = () => {
  const auth = getAuth(app);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleHeroRegistar = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setRegisterError("");
    setSuccess('')
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters");
      return;
    }else if(!/[A-Z]/.test(password)){
      setRegisterError('your password should have at least one uppercase ')
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        setSuccess("User create a successfully");
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleHeroRegistar} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered w-full "
                  required
                />
                <span
                  className="absolute top-4 right-2 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeOutline></IoEyeOutline>
                  ) : (
                    <IoMdEyeOff></IoMdEyeOff>
                  )}
                </span>
              </div>
           

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
      
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center py-2 text-red-500">
            {registerError && <p>{registerError}</p>}
          </div>
          <div className="text-center py-2 text-green-500">
            {success && <p>{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroResgister;
