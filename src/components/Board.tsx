import React from 'react'
import Column from './Column'
import { Todo, User, Column as ColumnType } from '../types'

interface BoardProps {
  todos: Todo[]
  users: User[]
  onDeleteTodo: (id: string) => void
  onEditTodo: (todo: Todo) => void
}

const columns: ColumnType[] = [
  { id: 'not-started', title: 'Not Started', status: 'not-started' },
  { id: 'in-progress', title: 'Working On It', status: 'in-progress' },
  { id: 'completed', title: 'Completed', status: 'completed' },
]

const Board: React.FC<BoardProps> = ({ todos, users, onDeleteTodo, onEditTodo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => {
          const columnTodos = todos.filter(todo => todo.status === column.status)
          return (
            <Column
              key={column.id}
              column={column}
              todos={columnTodos}
              users={users}
              onDeleteTodo={onDeleteTodo}
              onEditTodo={onEditTodo}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Board