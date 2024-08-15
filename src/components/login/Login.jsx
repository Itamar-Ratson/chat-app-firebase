import './login.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
	const [avtar, setAvatar] = useState({
		file: null,
		url: '',
	});

	const handleAvatar = (imageUploadEvent) => {
		const image = imageUploadEvent.target.files[0];
		if (image) {
			setAvatar({
				file: image,
				url: URL.createObjectURL(image),
			});
		}
	};

	const handleLogin = (formSubmission) => {
		formSubmission.preventDefault();
	};

	return (
		<>
			<div className='login'>
				<div className='item'>
					<h2>Welcome back,</h2>
					<form onSubmit={handleLogin}>
						<input type='text' name='email' placeholder='Email' />
						<input type='password' name='password' placeholder='Password' />
						<button>Sign In</button>
					</form>
				</div>
				<div className='seperator'></div>
				<div className='item'>
					<h2>Create an account</h2>
					<form action=''>
						<label htmlFor='file'>
							<img src={avtar.url || './avatar.png'} alt='' />
							Upload an image
						</label>
						<input type='file' id='file' style={{ display: 'none' }} onChange={handleAvatar} />
						<input type='text' name='username' placeholder='Username' />
						<input type='text' name='email' placeholder='Email' />
						<input type='password' name='password' placeholder='Password' />
						<button>Sign Up</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
