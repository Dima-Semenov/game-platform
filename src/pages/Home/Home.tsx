import { useNavigate } from 'react-router-dom';
import { BsKeyboard } from 'react-icons/bs';
import { IoList } from 'react-icons/io5';
import { MdGrid3X3 } from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className='flex gap-10 justify-center items-center w-full'>
      <div
        onClick={() => navigate('/todo-list')}
        className='w-44 h-44 rounded bg-slate-700 flex flex-col gap-5 items-center cursor-pointer p-2 py-6 hover:scale-110 duration-300 hover:shadow-2xl'
      >
        <h4 className='text-primary-500 text-xl'>Todo List</h4>
        <IoList className='w-16 h-16 text-primary-500' />
      </div>
      <div
        onClick={() => navigate('/speed-typing')}
        className='w-44 h-44 rounded bg-slate-700 flex flex-col gap-5 items-center cursor-pointer p-2 py-6 hover:scale-110 duration-300 hover:shadow-2xl'
      >
        <h4 className='text-primary-500 text-xl'>Speed typing</h4>
        <BsKeyboard className='w-16 h-16 text-primary-500' />
      </div>
      <div
        onClick={() => navigate('/tic-tac')}
        className='w-44 h-44 rounded bg-slate-700 flex flex-col gap-5 items-center cursor-pointer p-2 py-6 hover:scale-110 duration-300 hover:shadow-2xl'
      >
        <h4 className='text-primary-500 text-xl'>Tic Tac game</h4>
        <MdGrid3X3 className='w-16 h-16 text-primary-500' />
      </div>
    </main>
  );
};

export default Home;
