import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const ChatList = () => {
	const [chats, setChats] = useState([]);
	const [addMode, setAddMode] = useState(false);
	const [search, setSearch] = useState('');
	const { currentUser } = useUserStore();
	const { chatId, changeChat } = useChatStore();

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

	const handleSelect = async (chat) => {
		const userChats = chats.map((item) => {
			const { user, ...rest } = item;
			return rest;
		});
		const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
		userChats[chatIndex].isSeen = true;
		const userChatsRef = doc(db, 'userchats', currentUser.id);
		try {
			await updateDoc(userChatsRef, {
				chats: userChats,
			});
		} catch (selectError) {
			console.log(selectError);
		} finally {
			changeChat(chat.chatId, chat.user);
		}
	};

	const filteredChats = chats.filter((chat) =>
		chat.user.username.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className='chatList'>
			<div className='search'>
				<div className='searchBar'>
					<img src='/search.png' alt='searchImage' />
					<input
						type='text'
						placeholder='Search'
						onChange={(searchInput) => setSearch(searchInput.target.value)}
					/>
				</div>
				<img
					className='add'
					src={addMode ? './minus.png' : './plus.png'}
					alt='AddButton'
					onClick={() => setAddMode((mode) => !mode)}
				/>
			</div>

			{filteredChats.map((chat) => (
				<div
					className='item'
					key={chat.chatId}
					onClick={() => {
						handleSelect(chat);
					}}
					style={{ backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe' }}>
					<img
						src={
							chat.user.blocked.includes(currentUser.id) ? './avatar.png' : chat.user.avatar || './avatar.png'
						}
						alt='userAvatar'
					/>
					<div className='texts'>
						<span>{chat.user.blocked.includes(currentUser.id) ? 'Blocked' : chat.user.username}</span>
						<p>{chat.user.blocked.includes(currentUser.id) ? '' : chat.lastMessage}</p>
					</div>
				</div>
			))}
			{addMode && <AddUser />}
		</div>
	);
};

export default ChatList;
