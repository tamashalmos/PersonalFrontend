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
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const test = "http://localhost:8000"
  const prod = "https://personalbackend-cap6.onrender.com"

const users: Record<number,string> = {
  1: "Lenyus",
  2: "Tomus"
}
  // -------------------
  // TIME FORMAT
  // -------------------
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  // -------------------
  // FETCH TOTAL
  // -------------------
  const fetchTotal = async () => {
    const res = await fetch(`${prod}/today?user=${user}`)
    const data = await res.json()

    setSeconds(data.seconds)
    setRunning(data.running)
  }

  // -------------------
  // START
  // -------------------
  const start = async () => {
    await fetch(`${prod}/start?user=${user}`, { method: "POST" })
    fetchTotal()
  }

  // -------------------
  // STOP
  // -------------------
  const stop = async () => {
    await fetch(`${prod}/stop?user=${user}`, { method: "POST" })
    fetchTotal()
  }

  // -------------------
  // USER CHANGE
  // -------------------
  useEffect(() => {
    fetchTotal()
  }, [user])

  // -------------------
  // LIVE TIMER
  // -------------------
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTotal()
    }, 1000)

    return () => clearInterval(interval)
  }, [user])

  return (
    <div className="min-h-screen flex flex-col items-center select-none">
      
      {/* NAVBAR */}
      <div className="w-full border-b py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          {/* BAL - USER */}
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                  {users[user]}
              </MenubarTrigger>

              <MenubarContent>
                <MenubarItem onClick={() => setUser(1)}>
                  {user === 1 ? "✓ " : ""}Lenyus
                </MenubarItem>

                <MenubarItem onClick={() => setUser(2)}>
                  {user === 2 ? "✓ " : ""}Tomi
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {/* JOBB - THEME */}
          <ThemeToggle />

        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center text-center space-y-6 mt-10">

        <h1 className="text-3xl font-bold">
          Time Tracker
        </h1>

        <Button
          onClick={running ? stop : start}
        >
          {running ? "Stop" : "Start"}
        </Button>

        <h2 className="text-xl">
          Today: {formatTime(seconds)}
        </h2>

      </div>
    </div>
  )
}