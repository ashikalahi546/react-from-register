import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase.confiq";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {
  const auth = getAuth(app);
  const [registarError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setRegisterError("");
    setSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      if(res.user.emailVerified){
        setSuccess("user create a successfully");
      
      }else{
        alert('please verify your email address')
      }
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide an email", emailRef.current.value);
      return;
    } else if (
      !/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("please write a vaild email");
      return;
    }


    sendPasswordResetEmail(auth,email)
    .then(()=> {
      alert('please check your email')
    }).catch(error => {
      console.log(error.message)
    })
  };
  return (
    <div className="hero min-h-screen bg-base-200">
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
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
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
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="text-center text-red-500">
              {registarError && <p>{registarError}</p>}
            </div>
            <div className="text-center text-green-500">
              {success && <p>{success}</p>}
            </div>
          </form>
          <p className="text-center py-2">
            New to this website?{" "}
            <Link className="hover:underline" to="/register">
              please register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
