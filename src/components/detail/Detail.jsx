import './detail.css';

const Detail = () => {
	return (
		<div className='detail'>
			<div className='user'>
				<img src='./avatar.png' alt='user image' />
				<h2>Jane Doe</h2>
				<p>Lorem ipsum dolor sit amets</p>
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
								<img src='https://wiki.guildwars.com/images/d/d8/Primal_Rage.jpg' alt='' />
								<span>photo_2024_2.png</span>
							</div>
							<img src='./download.png' alt='' className='icon' />
						</div>
						<div className='photoItem'>
							<div className='photoDetail'>
								<img src='https://wiki.guildwars.com/images/d/d8/Primal_Rage.jpg' alt='' />
								<span>photo_2024_2.png</span>
							</div>
							<img src='./download.png' alt='' className='icon' />
						</div>
						<div className='photoItem'>
							<div className='photoDetail'>
								<img src='https://wiki.guildwars.com/images/d/d8/Primal_Rage.jpg' alt='' />
								<span>photo_2024_2.png</span>
							</div>
							<img src='./download.png' alt='' className='icon' />
						</div>
						<div className='photoItem'>
							<div className='photoDetail'>
								<img src='https://wiki.guildwars.com/images/d/d8/Primal_Rage.jpg' alt='' />
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
				<button>Block User </button>
			</div>
		</div>
	);
};

export default Detail;
