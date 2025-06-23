import { useFlightStore } from '../../store/flightStore'
import { useEffect } from 'react'

export default function LoadingScreen() {
  const { isLoading, setLoading } = useFlightStore()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [setLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="text-4xl font-bold mb-4">✈️ Cessna Flight Simulator</div>
        <div className="text-xl mb-8">Loading...</div>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
} 