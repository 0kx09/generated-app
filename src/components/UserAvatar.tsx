import React from 'react'
import { User } from '../types'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white border-2 border-white shadow-sm`}
      style={{ backgroundColor: user.color }}
      title={user.name}
    >
      {initials}
    </div>
  )
}

export default UserAvatar