import './detail.css';
import { auth, db } from '../../lib/firebase.js';
import { useChatStore } from '../../lib/chatStore.js';
import { useUserStore } from '../../lib/userStore.js';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Detail = () => {
	const { chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlock } = useChatStore();
	const { currentUser } = useUserStore();
	const handleBlock = async () => {
		if (!user) return;
		const userDocRef = doc(db, 'users', currentUser.id);
		try {
			await updateDoc(userDocRef, {
				blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
			});
			changeBlock();
		} catch (blockError) {
			console.log(blockError);
		}
	};

	return (
		<div className='detail'>
			<div className='user'>
				<img src={user?.avatar || './avatar.png'} alt='user image' />
				<h2>{user?.username}</h2>
				<p>{isCurrentUserBlocked || isRecieverBlocked ? 'Blocked' : 'Lorem ipsum, dolor sit amet.'}</p>
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
				<button onClick={handleBlock}>
					{isCurrentUserBlocked ? "You're blocked!" : isRecieverBlocked ? 'Unblock user' : 'Block user'}
				</button>
				<button className='logout' onClick={() => auth.signOut()}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Detail;
