import './login.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

const Login = () => {
	const [avtar, setAvatar] = useState({
		file: null,
		url: '',
	});
	const [loading, setLoading] = useState(false);

	const handleAvatar = (imageUploadEvent) => {
		const image = imageUploadEvent.target.files[0];
		if (image) {
			setAvatar({
				file: image,
				url: URL.createObjectURL(image),
			});
		}
	};

	const handleLogin = async (loginSubmission) => {
		loginSubmission.preventDefault();
		setLoading(true);
		const { email, password } = loginSubmission.target;
		try {
			await signInWithEmailAndPassword(auth, email.value, password.value);
		} catch (loginError) {
			console.log(loginError);
			toast.error(loginError.message);
		} finally {
			setLoading(false);
		}
	};
	const handleRegister = async (registerSubmission) => {
		registerSubmission.preventDefault();
		setLoading(true);
		const { username, email, password } = registerSubmission.target;
		try {
			const registerResponse = await createUserWithEmailAndPassword(auth, email.value, password.value);
			const imgUrl = await upload(avtar.file);
			await setDoc(doc(db, 'users', registerResponse.user.uid), {
				id: registerResponse.user.uid,
				username: username.value,
				email: email.value,
				avatar: imgUrl,
				blocked: [],
			});
			await setDoc(doc(db, 'userchats', registerResponse.user.uid), {
				chats: [],
			});
			toast.success('Account created! You can now login!');
		} catch (registerError) {
			console.log(registerError);
			toast.error(registerError.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='login'>
				<div className='item'>
					<h2>Welcome back,</h2>
					<form onSubmit={handleLogin}>
						<input type='text' name='email' placeholder='Email' />
						<input type='password' name='password' placeholder='Password' />
						<button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
					</form>
				</div>
				<div className='seperator'></div>
				<div className='item'>
					<h2>Create an account</h2>
					<form onSubmit={handleRegister}>
						<label htmlFor='file'>
							<img src={avtar.url || './avatar.png'} alt='' />
							Upload an image
						</label>
						<input type='file' id='file' style={{ display: 'none' }} onChange={handleAvatar} />
						<input type='text' name='username' placeholder='Username' />
						<input type='text' name='email' placeholder='Email' />
						<input type='password' name='password' placeholder='Password' />
						<button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
