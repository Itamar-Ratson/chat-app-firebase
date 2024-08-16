import { collection, getDocs, query, where } from 'firebase/firestore';
import './addUser.css';
import { db } from '../../../../lib/firebase';
import { useState } from 'react';

const AddUser = () => {
	const [user, setUser] = useState(null);
	const handleSearch = async (searchSubmission) => {
		searchSubmission.preventDefault();
		const { username } = searchSubmission.target;

		try {
			const userRef = collection(db, 'users');
			const userQuery = query(userRef, where('username', '==', username.value));
			const userQuerySnapShot = await getDocs(userQuery);
			if (!userQuerySnapShot.empty) {
				setUser(userQuerySnapShot.docs[0].data());
			}
		} catch (searchError) {
			console.log(searchError);
		}
	};

	return (
		<div className='addUser'>
			<form onSubmit={handleSearch}>
				<input type='text' name='username' placeholder='Username' />
				<button>Search</button>
			</form>
			{user && (
				<div className='user'>
					<div className='detail'>
						<img src={user.avatar || './avatar.png'} alt='' />
						<span>{user.username}</span>
					</div>
					<button>Add User</button>
				</div>
			)}
		</div>
	);
};

export default AddUser;
