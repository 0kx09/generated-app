import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Edit, X, Check } from 'lucide-react'
import { Todo, User } from '../types'
import UserAvatar from './UserAvatar'

interface TodoCardProps {
  todo: Todo
  users: User[]
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
  isDragging?: boolean
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, users, onDelete, onEdit, isDragging = false }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description)
  const [editAssignedUsers, setEditAssignedUsers] = useState<string[]>(todo.assignedUsers)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  const assignedUserObjects = users.filter(user => todo.assignedUsers.includes(user.id))

  const handleSave = () => {
    onEdit({
      ...todo,
      title: editTitle,
      description: editDescription,
      assignedUsers: editAssignedUsers,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description)
    setEditAssignedUsers(todo.assignedUsers)
    setIsEditing(false)
  }

  const toggleUserAssignment = (userId: string) => {
    setEditAssignedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  if (isDragging) {
    return (
      <div className="bg-white rounded-lg shadow-lg border-2 border-blue-400 p-4">
        <div className="flex items-start gap-3">
          <div className="text-gray-400 mt-1">
            <GripVertical size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{todo.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
    >
      {isEditing ? (
        <div className="p-4 space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Task description"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Users
            </label>
            <div className="flex flex-wrap gap-2">
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => toggleUserAssignment(user.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    editAssignedUsers.includes(user.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {user.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              <Check size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div
              {...attributes}
              {...listeners}
              className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing mt-1"
            >
              <GripVertical size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 break-words">{todo.title}</h3>
              <p className="text-sm text-gray-600 mt-1 break-words">{todo.description}</p>
              
              {assignedUserObjects.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex -space-x-2">
                    {assignedUserObjects.map(user => (
                      <UserAvatar key={user.id} user={user} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {assignedUserObjects.length === 1
                      ? assignedUserObjects[0].name
                      : `${assignedUserObjects.length} users`}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit task"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoCard