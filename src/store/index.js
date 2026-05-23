import{create}from'zustand';

export const useStore=create((set)=>({
code:`// Welcome to Chromacode ✦
// Paste your code below and watch it come alive

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const API_URL = 'https://api.example.com';

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`\${API_URL}/users/\${id}\`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

const UserCard: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="spinner" />;

  return (
    <div className="card">
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};

export default UserCard;`,
language:'tsx',
theme:'Neon Ink',
fontSize:14,
lineNumbers:true,
padding:32,
showWindow:true,
background:'transparent',
setCode:(code)=>set({code}),
setLanguage:(language)=>set({language}),
setTheme:(theme)=>set({theme}),
setFontSize:(fontSize)=>set({fontSize}),
setLineNumbers:(lineNumbers)=>set({lineNumbers}),
setPadding:(padding)=>set({padding}),
setShowWindow:(showWindow)=>set({showWindow}),
setBackground:(background)=>set({background}),
}));
