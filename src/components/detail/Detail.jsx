import './detail.css';
import { auth } from '../../lib/firebase.js';

const Detail = () => {
	return (
		<div className='detail'>
			<div className='user'>
				<img src='./avatar.png' alt='user image' />
				<h2>Jane Doe</h2>
				<p>Lorem ipsum dolor sit amets</p>
			</div>
			<div className='info'>
				<div className='option'>
					<div className='title'>
						<span>Chat Settings</span>
						<img src='./arrowUp.png' alt='chat settings image' />
					</div>
				</div>
				<div className='option'>
					<div className='title'>
						<span>Privacy & Help</span>
						<img src='./arrowUp.png' alt='chat settings image' />
					</div>
				</div>
				<div className='option'>
					<div className='title'>
						<span>Shared Photos</span>
						<img src='./arrowDown.png' alt='chat settings image' />
					</div>
					<div className='photos'>
						<div className='photoItem'>
							<div className='photoDetail'>
								<img
									src='https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbCUyMHNjZW5lcnl8ZW58MHx8MHx8fDA%3D'
									alt=''
								/>
								<span>photo_2024_2.png</span>
							</div>
							<img src='./download.png' alt='' className='icon' />
						</div>
						<div className='photoItem'>
							<div className='photoDetail'>
								<img
									src='https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbCUyMHNjZW5lcnl8ZW58MHx8MHx8fDA%3D'
									alt=''
								/>
								<span>photo_2024_2.png</span>
							</div>
							<img src='./download.png' alt='' className='icon' />
						</div>
						<div className='photoItem'>
							<div className='photoDetail'>
								<img
									src='https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbCUyMHNjZW5lcnl8ZW58MHx8MHx8fDA%3D'
									alt=''
								/>
								<span>photo_2024_2.png</span>
							</div>
							<img src='./download.png' alt='' className='icon' />
						</div>
						<div className='photoItem'>
							<div className='photoDetail'>
								<img
									src='https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbCUyMHNjZW5lcnl8ZW58MHx8MHx8fDA%3D'
									alt=''
								/>
								<span>photo_2024_2.png</span>
							</div>
							<img src='./download.png' alt='' className='icon' />
						</div>
					</div>
				</div>
				<div className='option'>
					<div className='title'>
						<span>Shared Files</span>
						<img src='./arrowUp.png' alt='chat settings image' />
					</div>
				</div>
				<button>Block User </button>
				<button className='logout' onClick={() => auth.signOut()}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Detail;
