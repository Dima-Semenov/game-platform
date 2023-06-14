import Form from './components/Form';

const Login = () => (
  <div className='flex flex-col justify-center items-center'>
    <p className='text-primary-500 text-3xl pb-6 text-center'>
      Welcome to the gaming platform
    </p>
    <p className='text-slate-400 pb-20'>Please log in or create an account</p>
    <div className='w-full max-w-sm'>
      <Form />
    </div>
  </div>
);

export default Login;
