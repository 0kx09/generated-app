import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TodoCard from './TodoCard'
import { Todo, User, Column as ColumnType } from '../types'
import { Circle, Clock, CheckCircle2 } from 'lucide-react'

interface ColumnProps {
  column: ColumnType
  todos: Todo[]
  users: User[]
  onDeleteTodo: (id: string) => void
  onEditTodo: (todo: Todo) => void
}

const Column: React.FC<ColumnProps> = ({ column, todos, users, onDeleteTodo, onEditTodo }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.status,
  })

  const getColumnColor = () => {
    switch (column.status) {
      case 'not-started':
        return 'border-gray-300 bg-gray-50'
      case 'in-progress':
        return 'border-blue-300 bg-blue-50'
      case 'completed':
        return 'border-green-300 bg-green-50'
    }
  }

  const getHeaderColor = () => {
    switch (column.status) {
      case 'not-started':
        return 'bg-gray-100 text-gray-700'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
    }
  }

  const getIcon = () => {
    switch (column.status) {
      case 'not-started':
        return <Circle size={20} />
      case 'in-progress':
        return <Clock size={20} />
      case 'completed':
        return <CheckCircle2 size={20} />
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border-2 transition-all duration-200 ${getColumnColor()} ${
        isOver ? 'ring-4 ring-blue-400 ring-opacity-50 scale-105' : ''
      }`}
    >
      <div className={`p-4 rounded-t-lg ${getHeaderColor()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <h2 className="text-lg font-semibold">{column.title}</h2>
          </div>
          <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
            {todos.length}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3 min-h-[500px]">
        <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {todos.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No tasks yet</p>
              <p className="text-xs mt-1">Drag tasks here or create a new one</p>
            </div>
          ) : (
            todos.map(todo => (
              <TodoCard
                key={todo.id}
                todo={todo}
                users={users}
                onDelete={onDeleteTodo}
                onEdit={onEditTodo}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default Column