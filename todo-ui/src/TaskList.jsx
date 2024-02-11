import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

// eslint-disable-next-line react/prop-types
const TaskList = ({ handleDelete, id, handleEdit, task }) => {
    return (
        <ul>
            <li>
                {task}

                <div className='btn-container'>
                    <CiEdit
                        onClick={() => {
                            handleEdit(task, id);
                        }}
                        fontSize='large'
                        className='edit-btn'
                    />
                    <MdDelete
                        onClick={() => {
                            handleDelete(id);
                        }}
                        fontSize='x-large'
                        className='delete-btn'
                    />
                </div>
            </li>
        </ul>
    );
};
export default TaskList;
