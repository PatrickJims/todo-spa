import { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

//sub components
import ListTodo from "./ListTodo";

const Landing = ({setAuth}) => {

  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/landing', {
        method: 'GET',
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  },[]);
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logout succesfully');
  }
  return(
    <Fragment>
      <div className="container">
        <div className="row mt-5">
          <div className="col"><h1 className="text-center">{ name } Input Todo</h1></div>
          <div className="col d-flex justify-content-end">
            <button 
              className="btn btn-danger"
              onClick={e => logout(e)}
              >Logout</button>
          </div>
        </div>
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default Landing;