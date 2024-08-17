import './chat.css';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';

const Chat = () => {
	const [chat, setChat] = useState(null);
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const [image, setImage] = useState({
		file: null,
		url: '',
	});
	const { currentUser } = useUserStore();
	const { chatId, user, isCurrentUserBlocked, isRecieverBlocked } = useChatStore();
	const endRef = useRef(null);

	const handleEmoji = (event) => {
		setText((t) => t + event.emoji);
		setOpen(false);
	};

	const handleImage = async (imageUploadEvent) => {
		const image = imageUploadEvent.target.files[0];
		if (image) {
			setImage({
				file: image,
				url: URL.createObjectURL(image),
			});
		}
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
		if (text === '' && !image.file) return;
		let imageUrl = null;
		try {
			if (image.file) {
				imageUrl = await upload(image.file);
			}
			if (text) {
				await updateDoc(doc(db, 'chats', chatId), {
					messages: arrayUnion({
						senderId: currentUser.id,
						text,
						...(imageUrl && { image: imageUrl }),
						createdAt: new Date(),
					}),
				});
			} else {
				await updateDoc(doc(db, 'chats', chatId), {
					messages: arrayUnion({
						senderId: currentUser.id,
						...(imageUrl && { image: imageUrl }),
						createdAt: new Date(),
					}),
				});
			}
			const userIds = [currentUser.id, user.id];
			userIds.forEach(async (id) => {
				const userChatsRef = doc(db, 'userchats', id);
				const userChatsSnapshot = await getDoc(userChatsRef);
				if (userChatsSnapshot.exists()) {
					const userChatsData = userChatsSnapshot.data();
					const chatIndex = userChatsData.chats.findIndex((chat) => chat.chatId === chatId);
					userChatsData.chats[chatIndex].lastMessage = (text !== '' && text) || '(Uploaded Image)';
					userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
					userChatsData.chats[chatIndex].updateAt = Date.now();
					await updateDoc(userChatsRef, {
						chats: userChatsData.chats,
					});
				}
			});
		} catch (sendError) {
			console.log(sendError);
		}

		setImage({ file: null, url: '' });
		setText('');
	};

	return (
		<div className='chat'>
			<div className='top'>
				<div className='user'>
					<img src={user?.avatar || './avatar.png'} alt='userImage' />
					<div className='text'>
						<span>{user?.username}</span>
						<p>{isCurrentUserBlocked || isRecieverBlocked ? 'Blocked' : 'Lorem ipsum, dolor sit amet.'}</p>
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
					<div
						className={message.senderId === currentUser.id ? 'message own' : 'message'}
						key={message?.createdAt}>
						<div className='texts'>
							{message.image && <img src={message.image} alt='message image' />}
							{message.text && <p>{message.text}</p>}
							{/* <span>1 minute ago</span> */}
						</div>
					</div>
				))}
				{image.url && (
					<div className='message own'>
						<div className='texts'>
							<img src={image.url} alt='' style={{ opacity: 0.4 }} />
						</div>
					</div>
				)}
				<div ref={endRef}></div>
			</div>
			<div className='bottom'>
				<div className='icons'>
					<label htmlFor='file'>
						<img src='./img.png' alt='image' hidden={isCurrentUserBlocked || isRecieverBlocked} />
					</label>
					<input type='file' id='file' style={{ display: 'none' }} onChange={handleImage} />
					<img src='./camera.png' alt='camera' hidden={isCurrentUserBlocked || isRecieverBlocked} />
					<img src='./mic.png' alt='mic' hidden={isCurrentUserBlocked || isRecieverBlocked} />
				</div>
				<input
					type='text'
					placeholder={
						isCurrentUserBlocked || isRecieverBlocked ? "Can't type a message" : 'Type a message...'
					}
					value={text}
					onChange={(e) => setText(e.target.value)}
					disabled={isCurrentUserBlocked || isRecieverBlocked}
				/>
				<div className='emoji' hidden={isCurrentUserBlocked || isRecieverBlocked}>
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
				<button
					className='sendButton'
					onClick={handleSend}
					disabled={isCurrentUserBlocked || isRecieverBlocked}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
