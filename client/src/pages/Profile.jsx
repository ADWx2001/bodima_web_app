import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-2 '>
        <img src={currentUser.avatar} alt="" className='self-center rounded-full h-24 w-24 object-cover cursor-pointer mt-3'/>
        <input type="text" className='border p-3 rounded-lg focus:outline-orange-600' placeholder='Username' id='username' />
        <input type="email" className='border p-3 rounded-lg focus:outline-orange-600' placeholder='Email' id='username' />
        <input type="text" className='border p-3 rounded-lg focus:outline-orange-600' placeholder='Password' id='username' />
        <button className='p-3 bg-green-600 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>Submit</button>
        <div className='flex flex-wrap justify-between mt-5'>
          <span className='text-red-600 cursor-pointer'>Delete Account</span>
          <span className='text-red-600 cursor-pointer'>Sign Out</span>
        </div>
      </form>
    </div>
  )
}
