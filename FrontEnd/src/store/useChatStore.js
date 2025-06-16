import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers: async() =>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        } 
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    getMessages: async(userId) =>{
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } 
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    sendMessage:async(messageData) => {
        const {selectedUser,messages} = get();

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]});
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    },

    //whenever we get a message,to update the messages array in real time;
    //if this is not used then we need to refresh the page to get the new messages from the database
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
            set({
                messages:[...get().messages,newMessage],
            });
        });
    },
    //alternative
    //  subscribeToMessages: () => {
    //   const { selectedUser } = get();
    //   if (!selectedUser) return;

    //   const socket = useAuthStore.getState().socket;
    //   socket.on("newMessage", (newMessage) => {
    //     // Only update messages if it's part of the current conversation
    //     const isForCurrentChat =
    //       newMessage.senderId === selectedUser._id ||
    //       newMessage.recieverId === selectedUser._id;

    //     if (isForCurrentChat) {
    //       set({
    //         messages: [...get().messages, newMessage],
    //       });
    //     }
    //   });
    //  },


    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser:(selectedUser) => set({selectedUser}),
}));
