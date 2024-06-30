import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleClick = async() =>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
    
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
            });
    
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("can't complete with google", error);
        }
    }
    
  return (
    <button type='button' onClick={handleGoogleClick} className="bg-red-700 hover:opacity-95 disabled:opacity-80 text-white p-3 rounded-lg" >Continue with Google</button>
  )
}
