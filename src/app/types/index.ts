export interface Vehicle {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

export interface VehicleResults {
  Count: number
  Message: string
  Results: Vehicle[]
}

export interface Make {
  MakeId: number
  MakeName: string
}