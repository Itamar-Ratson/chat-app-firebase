import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const ChatList = () => {
	const [chats, setChats] = useState([]);
	const [addMode, setAddMode] = useState(false);
	const { currentUser } = useUserStore();

	useEffect(() => {
		const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => {
			const items = res.data().chats;
			const promises = items.map(async (item) => {
				const userDocRef = doc(db, 'users', item.recieverId);
				const userDocSnap = await getDoc(userDocRef);
				const user = userDocSnap.data();
				return { ...item, user };
			});
			const chatData = await Promise.all(promises);
			setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt)); //descending order
		});
		return () => {
			unSub();
		};
	}, [currentUser.id]);

	return (
		<div className='chatList'>
			<div className='search'>
				<div className='searchBar'>
					<img src='/search.png' alt='searchImage' />
					<input type='text' placeholder='Search' />
				</div>
				<img
					className='add'
					src={addMode ? './minus.png' : './plus.png'}
					alt='AddButton'
					onClick={() => setAddMode((mode) => !mode)}
				/>
			</div>

			{chats.map((chat) => (
				<div className='item' key={chat.chatId}>
					<img src='./avatar.png' alt='userAvatar' />
					<div className='texts'>
						<span>Jane Doe</span>
						<p>{chat.lastMessage}</p>
					</div>
				</div>
			))}
			{addMode && <AddUser />}
		</div>
	);
};

export default ChatList;
