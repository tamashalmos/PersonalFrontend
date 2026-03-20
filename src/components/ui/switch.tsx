import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
<SwitchPrimitive.Root
  className={cn(
    "group relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
    "bg-orange-100 data-[state=checked]:bg-blue-100",
    className
  )}
  {...props}
>
  <SwitchPrimitive.Thumb
    className={cn(
      "block h-4 w-4 rounded-full bg-white shadow transition-transform",
      "translate-x-0.5",
      "group-data-[state=checked]:translate-x-4.5"
    )}
  />
</SwitchPrimitive.Root>
  )
}

export { Switch }
