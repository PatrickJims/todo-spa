import { Fragment, useState, useEffect } from "react";

const InputTodo = ({getTodos}) => {
    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault();
        const body = { description };
        try {
            const response = await fetch('http://localhost:5000/auth/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            getTodos();

            setDescription('');

        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            
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