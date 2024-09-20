import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { fetchUsers, fetchMessages, sendMessage } from '../api';
import { io, Socket } from 'socket.io-client';

interface User {
  id: string;
  username: string;
  email: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  createdAt: string;
}

const API_URL = 'http://localhost:3000';

export default function Chats() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const newSocket = io(API_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const loadUserAndChats = async () => {
      try {
        const usersResponse = await fetchUsers();
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data.filter((user: User) => user.id !== usersResponse.data[0].id));
        setCurrentUser(usersResponse.data[0]);
      } catch (error:any) {
        console.error('Error fetching users:', error.response);
      }
    };

    loadUserAndChats();
  }, []);

  useEffect(() => {
    if (socket && currentUser) {
      socket.emit('join', currentUser.id);

      socket.on('new-message', (message: Message) => {
        if (message.senderId === selectedUser?.id || message.recipientId === selectedUser?.id) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off('new-message');
      };
    }
  }, [socket, currentUser, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.id !== currentUser?.id && 
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
       user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users, currentUser]);

  const loadMessages = async (otherUserId: string) => {
    try {
      const response = await fetchMessages(otherUserId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !currentUser) return;

    try {
      const response = await sendMessage(newMessage, selectedUser.id);
      const sentMessage = response.data;
      
      // Update local state
      setMessages(prevMessages => [...prevMessages, sentMessage]);
      setNewMessage('');

      // No need to emit the message here, as the backend will handle it
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-6xl w-full h-[90vh] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-[300px_1fr] h-full">
          <div className="bg-muted/20 p-3 border-r overflow-y-auto">
            <div className="flex items-center justify-between space-x-4">
              <div className="font-medium text-sm">Users</div>
            </div>
            <div className="py-4">
              <Input 
                placeholder="Search users" 
                className="h-8" 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="grid gap-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 ${selectedUser?.id === user.id ? 'bg-muted' : ''}`}
                >
                  <Avatar className="border w-10 h-10">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full">
            {selectedUser ? (
              <>
                <div className="p-3 flex border-b items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="border w-10 h-10">
                      <AvatarImage src="/placeholder-user.jpg" alt={selectedUser.username} />
                      <AvatarFallback>{selectedUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <p className="text-sm font-medium leading-none">{selectedUser.username}</p>
                      <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto p-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm mb-2 ${
                        message.senderId === currentUser?.id
                          ? 'ml-auto bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                <div className="border-t">
                  <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2 p-3">
                    <Input
                      id="message"
                      placeholder="Type your message..."
                      className="flex-1"
                      autoComplete="off"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                      <span className="sr-only">Send</span>
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a user to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}