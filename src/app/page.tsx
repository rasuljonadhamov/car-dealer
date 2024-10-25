'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Make {
  MakeId: number
  MakeName: string
}

export default function HomePage() {
  const [selectedMake, setSelectedMake] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [makes, setMakes] = useState<Make[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  )

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch makes')
        }
        const data = await response.json()
        setMakes(data.Results)
      } catch (error) {
        setError('Error fetching vehicle makes. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchMakes()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Car Dealer Search
          </h1>
          <p className="mt-2 text-gray-600">
            Select a make and year to view available models
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="make"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Make
              </label>
              <select
                id="make"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Choose a make</option>
                {makes.map((make) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Year
              </label>
              <select
                id="year"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Choose a year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Link
              href={
                selectedMake && selectedYear
                  ? `/result/${selectedMake}/${selectedYear}`
                  : '#'
              }
              className={`
                block w-full py-2 px-4 text-center rounded-md
                ${
                  selectedMake && selectedYear
                    ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
              onClick={(e) => {
                if (!selectedMake || !selectedYear) {
                  e.preventDefault()
                }
              }}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
