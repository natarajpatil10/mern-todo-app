import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import TaskList from './TaskList';
import { MdDelete } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';

const AddTask = () => {
    const [typedTask, setTypedTask] = useState('');
    const [displayTask, setDisplayTask] = useState([]);
    const [completed, setCompleted] = useState([]);

    const changeHandler = event => {
        setTypedTask(event.target.value);
    };

    const clickHandler = e => {
        typedTask.length === 0
            ? setDisplayTask(displayTask)
            : setDisplayTask(() => {
                  return [...displayTask, { text: typedTask, id: new Date().getTime().toString() }];
              });
        e.preventDefault();
        setTypedTask('');
    };

    const handleDelete = id => {
        setDisplayTask(oldValue => {
            return oldValue.filter(arrayElement => {
                return arrayElement.id !== id;
            });
        });
    };

    const handleDone = id => {
        let tasklist = displayTask.filter(taskItem => {
            return taskItem.id === id;
        });
        let undoneTasks = displayTask.filter(undoneItem => {
            return undoneItem.id !== id;
        });
        setCompleted([tasklist, ...completed]);
        setDisplayTask(undoneTasks);
    };

    return (
        <>
            <header>
                <div className='input-container'>
                    <input type='text' onChange={changeHandler} value={typedTask} placeholder='Add a task..' autoFocus />
                    <button id='addBtn' onClick={clickHandler}>
                        <BsPlus fontSize='x-large' />
                    </button>
                </div>
            </header>

            <div className='display'>
                {displayTask.map(task => {
                    return <TaskList key={task.id} id={task.id} handleDelete={handleDelete} task={task.text} handleDone={handleDone} />;
                })}
                {completed.length > 0 ? (
                    <div className='task-completed'>
                        <div className='underline' />

                        {completed.map(done => {
                            return (
                                <ul key={done[0].id}>
                                    <li>
                                        {done[0].text}
                                        <div className='btn-container'>
                                            <MdDelete fontSize='x-large' />
                                            <AiFillCheckCircle fontSize='x-large' id='success-btn' />
                                        </div>
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </>
    );
};
export default AddTask;
