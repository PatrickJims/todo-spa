import { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputTodo = ({getTodos}) => {
    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault();
        const body = { description };
        try {
            const response = await fetch('http://localhost:5000/auth/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: localStorage.token },
                body: JSON.stringify(body)
            });
            getTodos();
            toast.success("Added succesfully", {
                position: toast.POSITION.TOP_CENTER
            });
            setDescription('');
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            <ToastContainer />
            <form className="d-flex mt-5 d-flex" onSubmit={onSubmitForm}>
                <input
                    className="form-control" 
                    type="text" 
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;