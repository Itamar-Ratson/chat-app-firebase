import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import './addUser.css';
import { db } from '../../../../lib/firebase';
import { useState } from 'react';
import { useUserStore } from '../../../../lib/userStore';

const AddUser = () => {
	const [user, setUser] = useState(null);
	const { currentUser } = useUserStore();
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

	const handleAdd = async () => {
		const chatsRef = collection(db, 'chats');
		const userChatsRef = collection(db, 'userchats');
		try {
			const newChatRef = doc(chatsRef);
			await setDoc(newChatRef, {
				createdAt: serverTimestamp(),
				messages: [],
			});

			await updateDoc(doc(userChatsRef, user.id), {
				chats: arrayUnion({
					chatId: newChatRef.id,
					lastMessage: '',
					recieverId: currentUser.id,
					updatedAt: Date.now(),
				}),
			});
			await updateDoc(doc(userChatsRef, currentUser.id), {
				chats: arrayUnion({
					chatId: newChatRef.id,
					lastMessage: '',
					recieverId: user.id,
					updatedAt: Date.now(),
				}),
			});
		} catch (addError) {
			console.log(addError);
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
					<button onClick={handleAdd}>Add User</button>
				</div>
			)}
		</div>
	);
};

export default AddUser;
