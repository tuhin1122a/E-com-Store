interface DealsTimerProps {
  timeLeft: {
    hours: number
    minutes: number
    seconds: number
  }
}

export function DealsTimer({ timeLeft }: DealsTimerProps) {
  return (
    <div className="flex items-center gap-2 bg-white/20 rounded-lg p-3">
      <span className="text-sm font-medium">Ends in:</span>
      <div className="flex gap-1">
        <div className="bg-white text-red-600 px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <span className="text-white">:</span>
        <div className="bg-white text-red-600 px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <span className="text-white">:</span>
        <div className="bg-white text-red-600 px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}
