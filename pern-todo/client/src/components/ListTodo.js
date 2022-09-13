import { 
  Fragment, 
  useEffect, 
  useState 
} from "react";

//components
import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";


const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    //delete a todo item
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/auth/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    //get the todo list
    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/todos');
            const jsonData = await response.json();

            setTodos(jsonData);
            console.log('data changed');
        } catch (err) {
            console.error(err.message);
        }
        console.log('data changed');
    }
    useEffect(() => {
        getTodos();
    },[]);

    console.log(todos);
    return (
        <Fragment>
            <InputTodo getTodos={getTodos} />
            <h1 className="text-center mt-3">Todos List</h1>
            <table className="table text-center">
                <thead className="fw-bold">
                    <tr>
                        <td>Description</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                {/* {todos.sort((a, b) => (a.todo_id > b.todo_id) ? 1 : -1).map(todo => ( */}

                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td className="text-start">{todo.description}</td>
                            <td><EditTodo todo={todo} getTodos={getTodos}/></td>
                            <td>
                                <button onClick={() => deleteTodo(todo.todo_id)}
                                    className="btn btn-danger">
                                    Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodo;