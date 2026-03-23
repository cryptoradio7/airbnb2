'use client'

import { Home, Castle, TreePine, Waves, Mountain, Tent } from 'lucide-react'

const categories = [
  { icon: Home, label: 'Appartements', count: '1,234' },
  { icon: Castle, label: 'Châteaux', count: '89' },
  { icon: TreePine, label: 'Cabanes', count: '567' },
  { icon: Waves, label: 'Bord de mer', count: '432' },
  { icon: Mountain, label: 'Montagne', count: '321' },
  { icon: Tent, label: 'Camping', count: '210' },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <button
          key={category.label}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-gray-200">
            <category.icon size={24} className="text-gray-700" />
          </div>
          <span className="font-medium text-gray-900">{category.label}</span>
          <span className="text-sm text-gray-500 mt-1">{category.count} logements</span>
        </button>
      ))}
    </div>
  )
}