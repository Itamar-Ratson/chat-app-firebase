import { useState } from 'react';
import './chatList.css';

const ChatList = () => {
	const [addMode, setAddMode] = useState(false);
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
			<div className='item'>
				<img src='./avatar.png' alt='userAvatar' />
				<div className='texts'>
					<span>Jane Doe</span>
					<p>Hello, world!</p>
				</div>
			</div>
			<div className='item'>
				<img src='./avatar.png' alt='userAvatar' />
				<div className='texts'>
					<span>Jane Doe</span>
					<p>Hello, world!</p>
				</div>
			</div>
			<div className='item'>
				<img src='./avatar.png' alt='userAvatar' />
				<div className='texts'>
					<span>Jane Doe</span>
					<p>Hello, world!</p>
				</div>
			</div>
			<div className='item'>
				<img src='./avatar.png' alt='userAvatar' />
				<div className='texts'>
					<span>Jane Doe</span>
					<p>Hello, world!</p>
				</div>
			</div>
			<div className='item'>
				<img src='./avatar.png' alt='userAvatar' />
				<div className='texts'>
					<span>Jane Doe</span>
					<p>Hello, world!</p>
				</div>
			</div>
		</div>
	);
};

export default ChatList;
