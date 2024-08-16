import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

export const useUserStore = create((set) => ({
	currentUser: null,
	isLoading: true,
	fetchUserInfo: async (uid) => {
		if (!uid) return set({ currentUser: null, isLoading: false });
		try {
			const docRef = doc(db, 'users', uid);
			const docSnap = await getDoc(docRef);
			const user = docSnap.data();

			if (docSnap.exists()) {
				set({ currentUser: user, isLoading: false });
			} else {
				set({ currentUser: null, isLoading: false });
			}
		} catch (uidError) {
			console.log(uidError);
			return set({ currentUser: null, isLoading: false });
		}
	},
}));
