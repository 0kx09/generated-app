import React, { useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
import Board from './components/Board'
import Header from './components/Header'
import AddTodoModal from './components/AddTodoModal'
import ManageUsersModal from './components/ManageUsersModal'
import TodoCard from './components/TodoCard'
import { Todo, User } from './types'

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', color: '#3b82f6' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', color: '#ef4444' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', color: '#10b981' },
]

const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Design Landing Page',
    description: 'Create mockups for the new landing page with modern design',
    status: 'not-started',
    assignedUsers: ['1'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up JWT authentication with refresh tokens',
    status: 'in-progress',
    assignedUsers: ['2', '3'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Write Documentation',
    description: 'Complete API documentation for all endpoints',
    status: 'completed',
    assignedUsers: ['1', '2'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false)
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const todo = todos.find(t => t.id === active.id)
    if (todo) {
      setActiveTodo(todo)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTodo(null)

    if (!over) return

    const todoId = active.id as string
    const newStatus = over.id as 'not-started' | 'in-progress' | 'completed'

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, status: newStatus, updatedAt: new Date() }
          : todo
      )
    )
  }

  const handleAddTodo = (newTodo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const todo: Todo = {
      ...newTodo,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTodos([...todos, todo])
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEditTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id 
        ? { ...updatedTodo, updatedAt: new Date() }
        : todo
    ))
  }

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
    }
    setUsers([...users, user])
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
    // Remove user from all todos
    setTodos(todos.map(todo => ({
      ...todo,
      assignedUsers: todo.assignedUsers.filter(userId => userId !== id)
    })))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        onAddTodo={() => setIsAddModalOpen(true)}
        onManageUsers={() => setIsUsersModalOpen(true)}
      />
      
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Board
          todos={todos}
          users={users}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />
        
        <DragOverlay>
          {activeTodo ? (
            <div className="rotate-3 opacity-90">
              <TodoCard
                todo={activeTodo}
                users={users}
                onDelete={() => {}}
                onEdit={() => {}}
                isDragging={true}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {isAddModalOpen && (
        <AddTodoModal
          users={users}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTodo}
        />
      )}

      {isUsersModalOpen && (
        <ManageUsersModal
          users={users}
          onClose={() => setIsUsersModalOpen(false)}
          onAddUser={handleAddUser}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  )
}

export default App