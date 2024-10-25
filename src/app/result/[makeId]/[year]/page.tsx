import { Suspense } from 'react'
import Link from 'next/link'
import VehicleList from '@/components/VehicleList'
import LoadingState from '@/app/loading';



export default async function ResultPage({
  params,
}: {
  params: { makeId: string; year: string }
}) {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Available Models - {params.year}
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Search
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Suspense fallback={<LoadingState />}>
            <VehicleList makeId={params.makeId} year={params.year} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear()
  const popularMakeIds = ['440', '441', '442'] 
  const recentYears = [
    currentYear.toString(),
    (currentYear - 1).toString(),
    (currentYear - 2).toString(),
  ]

  return popularMakeIds.flatMap((makeId) =>
    recentYears.map((year) => ({
      makeId,
      year,
    }))
  )
}