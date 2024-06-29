import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" id='username' className='p-3 rounded-lg border' placeholder='Username'/>
        <input type="email" id='email' className='p-3 rounded-lg border'placeholder='Email'/>
        <input type="password" id='pasword' className='p-3 rounded-lg border' placeholder='Password'/>
        <button type='submit' className='bg-slate-700 hover:opacity-95 disabled:opacity-80 text-white p-3 rounded-lg'>Sign Up</button>
        <button type='submit' className='bg-rose-700 hover:opacity-95 disabled:opacity-80 text-white p-3 rounded-lg'>Continue with Google</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p className=''>Already have an account?</p>
        <Link to='/sign-in'>
          <p className='text-blue-600'>Sign in</p>
        </Link>
      </div>
    </div>
  )
}
