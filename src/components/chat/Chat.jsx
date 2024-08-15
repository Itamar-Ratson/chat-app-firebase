import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const endRef = useRef(null);

	const handleEmoji = (event) => {
		setText((t) => t + event.emoji);
		setOpen(false);
	};

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

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
				<div className='message own'>
					<div className='texts'>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa totam, ut, iste, quaerat non nemo
							unde excepturi nostrum exercitationem facere dolore ex ad quasi deserunt molestias?
							Reprehenderit iste corrupti distinctio!
						</p>
						<span>1 minute ago</span>
					</div>
				</div>
				<div className='message'>
					<img src='./avatar.png' alt='' />
					<div className='texts'>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa totam, ut, iste, quaerat non nemo
							unde excepturi nostrum exercitationem facere dolore ex ad quasi deserunt molestias?
							Reprehenderit iste corrupti distinctio!
						</p>
						<span>1 minute ago</span>
					</div>
				</div>
				<div className='message own'>
					<div className='texts'>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa totam, ut, iste, quaerat non nemo
							unde excepturi nostrum exercitationem facere dolore ex ad quasi deserunt molestias?
							Reprehenderit iste corrupti distinctio!
						</p>
						<span>1 minute ago</span>
					</div>
				</div>
				<div className='message'>
					<img src='./avatar.png' alt='' />
					<div className='texts'>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa totam, ut, iste, quaerat non nemo
							unde excepturi nostrum exercitationem facere dolore ex ad quasi deserunt molestias?
							Reprehenderit iste corrupti distinctio!
						</p>
						<span>1 minute ago</span>
					</div>
				</div>
				<div className='message own'>
					<div className='texts'>
						<img
							src='https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbCUyMHNjZW5lcnl8ZW58MHx8MHx8fDA%3D'
							alt=''
						/>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa totam, ut, iste, quaerat non nemo
							unde excepturi nostrum exercitationem facere dolore ex ad quasi deserunt molestias?
							Reprehenderit iste corrupti distinctio!
						</p>
						<span>1 minute ago</span>
					</div>
				</div>
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
									names: ['Primal Rage'],
									imgUrl:
										'https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbCUyMHNjZW5lcnl8ZW58MHx8MHx8fDA%3D',
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
