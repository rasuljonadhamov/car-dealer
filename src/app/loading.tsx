export default function LoadingState() {
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