import { useState, useEffect } from "react"
import Sun from "./Sun.svg"
import Moon from "./Moon.svg"
import "./DarkMode.css"

export default function DarkMode() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
  document.documentElement.classList.add("dark")
},[])

  const setDarkMode = () => {
    document.documentElement.classList.add("dark")
  }

const setLightMode = () => {
  document.documentElement.classList.remove("dark")
}

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsDark(checked)

    if (checked) {
      setDarkMode()
    } else {
      setLightMode()
    }
  }

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={isDark}
        onChange={toggleTheme}
      />

      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <img src={Sun} className="sun" />
        <img src={Moon} className="moon" />
      </label>
    </div>
  )
}