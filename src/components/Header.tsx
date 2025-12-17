import React from 'react'
import { Plus, Users } from 'lucide-react'

interface HeaderProps {
  onAddTodo: () => void
  onManageUsers: () => void
}

const Header: React.FC<HeaderProps> = ({ onAddTodo, onManageUsers }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Collaborative Todo Board
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Drag tasks between columns to update their status
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onManageUsers}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <Users size={20} />
              Manage Users
            </button>
            <button
              onClick={onAddTodo}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header