export interface User {
  id: string;
  name: string;
  email: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  assignedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
}