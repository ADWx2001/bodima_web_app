import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  console.log(currentUser._id);
  //console.log(file);
  console.log(formData);
  //console.log(progress);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
        //console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser.avatar}
          id="avatar"
          alt=""
          className="self-center rounded-full h-24 w-24 object-cover cursor-pointer mt-3"
        />

        <p className="text-center text-sm">
          {uploadError ? (
            <span className="text-red-500">Error uploading file</span>
          ) : progress > 0 && progress < 100 ? (
            <span className="text-green-500">Uploading {progress}%</span>
          ) : progress === 100 ? (
            <span className="text-green-500">Upload complete</span>
          ) : null}
        </p>

        <input
          type="text"
          className="border p-3 rounded-lg focus:outline-orange-600"
          placeholder="Username"
          onChange={handleChange}
          defaultValue={currentUser.username}
          id="username"
        />
        <input
          type="email"
          className="border p-3 rounded-lg focus:outline-orange-600"
          placeholder="Email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          id="email"
        />
        <input
          type="password"
          className="border p-3 rounded-lg focus:outline-orange-600"
          placeholder="Password"
          onChange={handleChange}
          id="password"
        />
        <button className="p-3 bg-green-600 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
          Submit
        </button>
        <div className="flex flex-wrap justify-between mt-5">
          <span className="text-red-600 cursor-pointer">Delete Account</span>
          <span className="text-red-600 cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}
