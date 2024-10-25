import { PageHeaderProps } from '@/app/types'
import Link from 'next/link'



export default function PageHeader({ year }: PageHeaderProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">
        Available Models - {year}
      </h1>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Search
      </Link>
    </div>
  )
}