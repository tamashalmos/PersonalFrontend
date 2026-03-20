import { Sun, Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked)

    if (checked) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="flex items-center space-x-2 select-none">
      <Sun className={`h-4 w-4 ${!darkMode ? "text-yellow-500" : "text-muted-foreground"}`} />

      <Switch
        checked={darkMode}
        onCheckedChange={toggleDarkMode}
      />

      <Moon className={`h-4 w-4 ${darkMode ? "text-blue-500" : "text-muted-foreground"}`} />
    </div>
  )
}