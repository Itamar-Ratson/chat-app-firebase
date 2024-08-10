import './chat.css';

const Chat = () => {
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
			<div className='bottom'></div>
		</div>
	);
};

export default Chat;
