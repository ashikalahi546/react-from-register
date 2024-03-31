import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase.confiq";
import { useState } from "react";
const Register = () => {
    const [registarError,setRegisterError] = useState('');
    const [success,setSuccess] = useState('');
  const auth = getAuth(app);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    if(password.length < 6){
       setRegisterError(' Password should be at least 6 characters') ;
       return;
    }
    setRegisterError('')
    setSuccess('')
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess('user create a successfully')
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message)
      });
  };
  return (
    <div>
      <h3>Please Register</h3>
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
        <input
          className="px-3 py-2 rounded-lg"
          type="password"
          name="password"
          placeholder="password"
          id=""
          required
        />
        <input
          className="px-3 py-2 rounded-lg bg-orange-500 text-white"
          type="submit"
          value="Register"
        />
      </form>
      <div className="text-center text-red-500">
        {
            registarError && <p>{registarError}</p>
        }
      </div>
      <div className="text-center text-green-500">
{
    success && <p>{success}</p>
}
      </div>
    </div>
  );
};

export default Register;
