import { useState, useEffect } from "react"

import DarkMode from "@/components/DarkMode/DarkMode"

  import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar"

import { Button } from "@/components/ui/button"

export default function App() {
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)

  //const test = "http://localhost:8000"
  const prod = "https://personalbackend-cap6.onrender.com"

  const start = async () => {
    await fetch(`${prod}/start`, { method: "POST" })
    setRunning(true)
  }

  const stop = async () => {
    await fetch(`${prod}/stop`, { method: "POST" })
    setRunning(false)
    fetchTotal()
  }

  const fetchTotal = async () => {
    const res = await fetch(`${prod}/today`)
    const data = await res.json()
    setSeconds(data.seconds)
  }

  useEffect(() => {
    fetchTotal()
  }, [])

return (
  <div className="min-h-screen flex flex-col items-center">

    {/* NAVBAR */}
    <div className="w-full border-b py-3">
      <div className="max-w-4xl mx-auto grid grid-cols-3 items-center">

        {/* BAL */}
        <div />

        {/* CENTER */}
        <div className="flex justify-center">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Timer</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Start</MenubarItem>
                <MenubarItem>Stop</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Stats</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Today</MenubarItem>
                <MenubarItem>Weekly</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Valami</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Option 1</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* JOBB */}
        <div className="flex justify-end">
          <DarkMode />
        </div>

      </div>
    </div>

    {/* CONTENT */}
    <div className="flex flex-col items-center text-center space-y-6 mt-10">

      <h1 className="text-3xl font-bold">
        Time Tracker
      </h1>

      <Button onClick={running ? stop : start}>
        {running ? "stop" : "start"}
      </Button>

      <h2>
        Today total: {seconds} sec
      </h2>

    </div>

  </div>
)
}