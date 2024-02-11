import { useEffect, useState, useRef } from 'react';
import { BsPlus } from 'react-icons/bs';
import TaskList from './TaskList';
import axios from 'axios';
import { MdDone } from 'react-icons/md';

const AddTask = () => {
    const [typedTask, setTypedTask] = useState({ text: '', id: '' });
    const [displayTask, setDisplayTask] = useState([]);
    const [isEdited, setIsEdited] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/get-tasks')
            .then(res => {
                setDisplayTask(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const changeHandler = e => {
        setTypedTask({ text: e.target.value, id: typedTask.id });
    };

    const clickHandler = e => {
        e.preventDefault();
        inputRef.current.focus();

        if (!typedTask.text.trim()) return alert('Please add a task');

        if (!isEdited) {
            if (typedTask.text.trim()) {
                axios
                    .post('http://127.0.0.1:5000/add', { task: typedTask.text })
                    .then(() => location.reload())
                    .catch(err => console.error(err));
            }
        } else {
            axios
                .put('http://127.0.0.1:5000/update/' + typedTask.id, { task: typedTask.text })
                .then(() => location.reload())
                .catch(err => console.error(err));
        }
        setTypedTask('');
        setIsEdited(false);
    };

    const handleEdit = (task, id) => {
        setTypedTask({ text: task, id });
        inputRef.current.focus();
        setIsEdited(true);
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
                    <input ref={inputRef} type='text' onChange={changeHandler} value={typedTask.text} placeholder='Add a task..' autoFocus />
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
