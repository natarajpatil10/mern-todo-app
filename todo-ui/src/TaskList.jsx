import { MdDelete } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

// eslint-disable-next-line react/prop-types
const TaskList = ({ handleDelete, _id, handleDone, task }) => {
    return (
        <ul>
            <li>
                {task}

                <div className='btn-container'>
                    <MdDelete
                        onClick={() => {
                            handleDelete(_id);
                        }}
                        fontSize='x-large'
                        className='delete-btn'
                    />

                    <IoIosCheckmarkCircleOutline
                        onClick={() => {
                            handleDone(_id);
                        }}
                        fontSize='x-large'
                        className='done-btn'
                    />
                </div>
            </li>
        </ul>
    );
};
export default TaskList;
