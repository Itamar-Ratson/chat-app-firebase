import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
	chatId: null,
	user: null,
	isCurrentUserBlocked: false,
	isRecieverBlocked: false,
	changeChat: (chatId, user, isCurrentUserBlocked, isRecieverBlocked) => {
		const currentUser = useUserStore.getState().currentUser;
		// Check if current user is blocked
		if (user.blocked.includes(currentUser.id)) {
			return set({
				chatId,
				user: null,
				isCurrentUserBlocked: true,
				isRecieverBlocked,
			});
		}
		// Check if reciever is blocked
		else if (currentUser.blocked.includes(user.id)) {
			return set({
				chatId,
				user,
				isCurrentUserBlocked,
				isRecieverBlocked: true,
			});
		} else {
			return set({
				chatId,
				user,
				isCurrentUserBlocked,
				isRecieverBlocked,
			});
		}
	},
	changeBlock: () => {
		set((state) => ({ ...state, isRecieverBlocked: !state.isRecieverBlocked }));
	},
}));

// Todo: check if I can return set once with the "ifs checks" for the block attributes
// what I mean:
//
// return set({
// 	chatId,
// 	user: !user.blocked.includes(currentUser.id),
// 	isCurrentUserBlocked: user.blocked.includes(currentUser.id),
// 	isRecieverBlocked: currentUser.blocked.includes(user.id),
// });
