import { Suspense } from 'react'
import VehicleList from '@/components/VehicleList'
import PageHeader from '@/components/PageHeader'
import LoadingState from '@/app/loading'

interface PageProps {
  params: {
    makeId: string
    year: string
  }
}

export default async function ResultPage({ params }: PageProps) {
  const pageData = await Promise.resolve(params)

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <PageHeader year={pageData.year} />
        </Suspense>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Suspense fallback={<LoadingState />}>
            <VehicleList makeId={pageData.makeId} year={pageData.year} />
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