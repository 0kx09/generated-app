import React, { useState } from 'react'

export default function AddTodoModal() {
  const [items, setItems] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')

  const handleAdd = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">AddTodoModal</h2>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add new item..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No items yet</p>
            <p className="text-sm">Add your first item above</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800">{item}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
