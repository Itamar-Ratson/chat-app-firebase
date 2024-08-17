import './chat.css';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';

const Chat = () => {
	const [chat, setChat] = useState(null);
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const { currentUser } = useUserStore();
	const { chatId, user } = useChatStore();
	const endRef = useRef(null);

	const handleEmoji = (event) => {
		setText((t) => t + event.emoji);
		setOpen(false);
	};

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
			setChat(res.data());
		});

		return () => {
			unSub();
		};
	}, [chatId]);

	const handleSend = async () => {
		if (text === '') return;
		try {
			await updateDoc(doc(db, 'chats', chatId), {
				messages: arrayUnion({
					senderId: currentUser.id,
					text,
					createdAt: new Date(),
				}),
			});
			const userIds = [currentUser.id, user.id];
			userIds.forEach(async (id) => {
				const userChatsRef = doc(db, 'userchats', id);
				const userChatsSnapshot = await getDoc(userChatsRef);
				if (userChatsSnapshot.exists()) {
					const userChatsData = userChatsSnapshot.data();
					const chatIndex = userChatsData.chats.findIndex((chat) => chat.chatId === chatId);
					userChatsData.chats[chatIndex].lastMessage = text;
					userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
					userChatsData.chats[chatIndex].updateAt = Date.now();
					console.log(userChatsData.chats);

					await updateDoc(userChatsRef, {
						chats: userChatsData.chats,
					});
				}
			});
		} catch (sendError) {
			console.log(sendError);
		}
	};

	return (
		<div className='chat'>
			<div className='top'>
				<div className='user'>
					<img src='./avatar.png' alt='userImage' />
					<div className='text'>
						<span>Jane Doe</span>
						<p>Lorem ipsum, dolor sit amet.</p>
					</div>
				</div>
				<div className='icons'>
					<img src='./phone.png' alt='phoneIcon' />
					<img src='./video.png' alt='videoIcon' />
					<img src='./info.png' alt='infoIcon' />
				</div>
			</div>
			<div className='center'>
				{chat?.messages?.map((message) => (
					<div className='message own' key={message?.createdAt}>
						<div className='texts'>
							{message.img && <img src={message.img} alt='message image' />}
							<p>{message.text}</p>
							{/* <span>1 minute ago</span> */}
						</div>
					</div>
				))}
				<div ref={endRef}></div>
			</div>
			<div className='bottom'>
				<div className='icons'>
					<img src='./img.png' alt='image' />
					<img src='./camera.png' alt='camera' />
					<img src='./mic.png' alt='mic' />
				</div>
				<input
					type='text'
					placeholder='Type a message...'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div className='emoji'>
					<img src='./emoji.png' alt='emojis' onClick={() => setOpen((open) => !open)} />
					<div className='picker'>
						<EmojiPicker
							customEmojis={[
								{
									names: ['Scenery'],
									imgUrl:
										'https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbCUyMHNjZW5lcnl8ZW58MHx8MHx8fDA%3D',
									id: '[Scenery]',
								},
							]}
							open={open}
							onEmojiClick={handleEmoji}
						/>
					</div>
				</div>
				<button className='sendButton' onClick={handleSend}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
