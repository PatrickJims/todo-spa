import { Fragment, useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = inputs;

  const onChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch(
        'http://localhost:5000/auth/register',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      if(parseRes.token){
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
        toast.success("Registered succesfully");
      }else{
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center my-5">Registration page</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="form-control my-3"
            value={name} 
            onChange={e => onChange(e)}/>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="form-control my-3" 
            value={email}
            onChange={e => onChange(e)}/>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control my-3" 
            value={password}
            onChange={e => onChange(e)}/>
          <button 
            className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to='/login'>login</Link>
      </div>
    </Fragment>
  );
}

export default Register;