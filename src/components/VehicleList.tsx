import { VehicleResults } from "@/app/types";

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

export default VehicleList;
