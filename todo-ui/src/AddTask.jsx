import { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import { BsPlus } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';
import TaskList from './TaskList';

const initialState = {
    typedTask: '',
    displayTask: [],
    isEdited: false,
};

const stateReducer = (currentState, newState) => {
    return { ...currentState, ...newState };
};

const AddTask = () => {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const inputRef = useRef(null);
    const prevTaskRef = useRef(null);
    const { typedTask, displayTask, isEdited } = state;

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/get-tasks')
            .then(res => {
                dispatch({ displayTask: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const changeHandler = e => {
        dispatch({ typedTask: { text: e.target.value, id: typedTask.id } });
    };

    const clickHandler = e => {
        e.preventDefault();
        inputRef.current.focus();

        if (!typedTask.text?.trim()) return alert('Please add a task');

        if (!isEdited) {
            if (typedTask.text.trim()) {
                axios
                    .post('http://127.0.0.1:5000/add', { task: typedTask.text })
                    .then(() => location.reload())
                    .catch(err => console.error(err));
            }
        } else {
            if (prevTaskRef.current !== typedTask.text) {
                axios
                    .put('http://127.0.0.1:5000/update/' + typedTask.id, { task: typedTask.text })
                    .then(() => location.reload())
                    .catch(err => console.error(err));
                dispatch({ isEdited: false });
            }
        }
        dispatch({ typedTask: '' });
    };

    const handleEdit = (task, id) => {
        prevTaskRef.current = task;
        dispatch({ typedTask: { text: task, id } });
        inputRef.current.focus();
        dispatch({ isEdited: true });
    };

    const handleDelete = id => {
        axios
            .delete('http://127.0.0.1:5000/delete/' + id)
            .then(() => location.reload())
            .catch(err => console.error(err));
    };

    return (
        <>
            <header>
                <div className='input-container'>
                    <input ref={inputRef} type='text' onChange={changeHandler} value={typedTask?.text || ''} placeholder='Add a task..' autoFocus />
                    <button id='addBtn' onClick={clickHandler}>
                        {!isEdited ? <BsPlus fontSize='x-large' /> : <MdDone fontSize='x-large' />}
                    </button>
                </div>
            </header>

            <div className='display'>
                {displayTask.map(task => {
                    return <TaskList key={task._id} id={task._id} handleDelete={handleDelete} task={task.task} handleEdit={handleEdit} />;
                })}
            </div>
        </>
    );
};
export default AddTask;
