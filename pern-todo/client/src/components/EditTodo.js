import { Fragment, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditTodo = ({ todo, getTodos }) => {
    const [description, setDescription] = useState(todo.description);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit description fn
    const updateDescription = async e => {
        e.preventDefault();
        const body = { description };
        try {
            const response = await fetch(`http://localhost:5000/auth/todos/${todo.todo_id}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)

            })
            //window.location = '/';
            getTodos();
            handleClose();
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <>
                <Button className="btn btn-warning" onClick={() => {
                    setDescription(todo.description);
                    handleShow();
                }}>
                    Edit
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="d-flex mt-4" >
                            <input
                                className="form-control"
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)} 
                                />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" onClick={updateDescription}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Fragment>
    )
}

export default EditTodo;