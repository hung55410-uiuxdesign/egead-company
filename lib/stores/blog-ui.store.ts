import { create } from 'zustand';

interface BlogUIStore {
  isAIBlogModalOpen: boolean;
  openAIBlogModal: () => void;
  closeAIBlogModal: () => void;
}

export const useBlogUIStore = create<BlogUIStore>((set) => ({
  isAIBlogModalOpen: false,
  openAIBlogModal: () => set({ isAIBlogModalOpen: true }),
  closeAIBlogModal: () => set({ isAIBlogModalOpen: false }),
}));
