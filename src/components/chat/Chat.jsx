import { useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const handleEmoji = (event) => {
		setText((t) => t + event.emoji);
		setOpen(false);
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
			<div className='center'></div>
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
									names: ['Primal Rage'],
									imgUrl: 'https://wiki.guildwars.com/images/d/d8/Primal_Rage.jpg',
									id: '[primal rage]',
								},
							]}
							open={open}
							onEmojiClick={handleEmoji}
						/>
					</div>
				</div>
				<button className='sendButton'>Send</button>
			</div>
		</div>
	);
};

export default Chat;
