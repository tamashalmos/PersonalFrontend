import { useState, useEffect } from "react"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function App() {
  const [user, setUser] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState<any[]>([])

  const test = "http://localhost:8000"
  const prod = "https://personalbackend-cap6.onrender.com"

  const baseUrl = prod

  const users: Record<number, string> = {
    1: "Lenyus",
    2: "Tomus",
  }

  // -----------------------
  // HELPERS
  // -----------------------

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  function formatClock(dateString: string | null) {
    if (!dateString) return "running..."

    const d = new Date(dateString)
    const h = d.getHours().toString().padStart(2, "0")
    const m = d.getMinutes().toString().padStart(2, "0")
    const s = d.getSeconds().toString().padStart(2, "0")

    return `${h}:${m}:${s}`
  }

  // -----------------------
  // FETCH (egységesítve)
  // -----------------------

  const fetchData = async () => {
    // today
    const resTotal = await fetch(`${baseUrl}/today?user=${user}`)
    const totalData = await resTotal.json()

    setSeconds(totalData.seconds)
    setRunning(totalData.running)

    // sessions
    const resSessions = await fetch(`${baseUrl}/sessions?user=${user}`)
    const sessionsData = await resSessions.json()

    setSessions(sessionsData)
  }

  // -----------------------
  // ACTIONS
  // -----------------------

  const start = async () => {
    await fetch(`${baseUrl}/start?user=${user}`, { method: "POST" })
    fetchData()
  }

  const stop = async () => {
    await fetch(`${baseUrl}/stop?user=${user}`, { method: "POST" })
    fetchData()
  }

  const reset = async () => {
  await fetch(`${baseUrl}/reset?user=${user}`, { method: "DELETE" })
  fetchData()
}

  // -----------------------
  // EFFECTS
  // -----------------------

  useEffect(() => {
    fetchData()
  }, [user])

  useEffect(() => {
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }, [user])

  // -----------------------
  // UI
  // -----------------------

  return (
    <div className="min-h-screen flex flex-col items-center select-none">

      {/* NAVBAR */}
      <div className="w-full border-b py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                {users[user]}
              </MenubarTrigger>

              <MenubarContent>
                <MenubarItem onClick={() => setUser(1)}>
                  Lenyus
                </MenubarItem>
                <MenubarItem onClick={() => setUser(2)}>
                  Tomus
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <ThemeToggle />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center text-center space-y-6 mt-10">

        <h1 className="text-3xl font-bold">
          Time Tracker
        </h1>

        <Button onClick={running ? stop : start}>
          {running ? "Stop" : "Start"}
        </Button>
        <Button variant="destructive" onClick={reset}>
          Reset
          </Button>

        <h2 className="text-xl">
          Today: {formatTime(seconds)}
        </h2>

        {/* SESSIONS */}
        <div className="mt-6 space-y-2 w-full max-w-md">
          {sessions.map((s, i) => (
            <div key={i} className="border p-2 rounded flex justify-between">
              <span>{formatClock(s.start)}</span>
              <span>-</span>
              <span>{formatClock(s.end)}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}