import { Suspense } from 'react'
import Link from 'next/link'

interface Vehicle {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

interface VehicleResults {
  Count: number
  Message: string
  Results: Vehicle[]
}

async function getVehicles(makeId: string, year: string): Promise<VehicleResults> {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    { next: { revalidate: 3600 } }
  )
  
  if (!res.ok) {
    throw new Error('Failed to fetch vehicles')
  }
  
  return res.json()
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 animate-pulse h-32 rounded-lg"
        ></div>
      ))}
    </div>
  )
}

async function VehicleList({ makeId, year }: { makeId: string; year: string }) {
  const data = await getVehicles(makeId, year)

  if (data.Count === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No vehicles found for the selected criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.Results.map((vehicle) => (
        <div
          key={vehicle.Model_ID}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900">{vehicle.Model_Name}</h3>
          <p className="text-sm text-gray-600 mt-1">{vehicle.Make_Name}</p>
        </div>
      ))}
    </div>
  )
}

export default function ResultPage({
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
  // Generate static paths for common makes and recent years
  const currentYear = new Date().getFullYear()
  const popularMakeIds = ['440', '441', '442'] // Example make IDs
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