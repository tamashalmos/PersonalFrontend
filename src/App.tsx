import { useState, useEffect } from "react"

import DarkMode from "@/components/DarkMode/DarkMode"

  import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar"

import { Button } from "@/components/ui/button"

export default function App() {
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)


  const API = "https://personalbackend-cap6.onrender.com"

  const start = async () => {
    await fetch(`${API}/start`, { method: "POST" })
    setRunning(true)
  }

  const stop = async () => {
    await fetch(`{API}/stop`, { method: "POST" })
    setRunning(false)
    fetchTotal()
  }

  const fetchTotal = async () => {
    const res = await fetch(`{API}/today`)
    const data = await res.json()
    setSeconds(data.seconds)
  }

  useEffect(() => {
    fetchTotal()
  }, [])

return (
  <>
    {/* FELSŐ SÁV */}
    <Menubar className="flex-1 justify-center ghost">
      
      <MenubarMenu>
        <MenubarTrigger>Timer</MenubarTrigger>
        <MenubarTrigger>Stats</MenubarTrigger>
        <MenubarTrigger>Valami</MenubarTrigger>
        
      </MenubarMenu>

    </Menubar>
    <DarkMode/>
    
    {/* TARTALOM */}
    
    <div>
      <h1 className="text-2xl font-bold mb-4">Time Tracker</h1>

      <Button className= "ghost" onClick={running ? stop : start}>
        {running ? "stop" : "start"}
      </Button>

      <h2 className="mt-4">
        Today total:{seconds} sec 
      </h2>
    </div>
  </>
)
}