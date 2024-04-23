"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  ShipIcon,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function VesselFinderDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        type="button"
        className="dark:highlight-white/5 hidden w-full items-center rounded-md bg-slate-800 py-1.5 pl-2 pr-3 text-sm leading-6 text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:bg-slate-700 hover:ring-slate-300 lg:flex"
        onClick={() => setOpen(true)}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          className="mr-3 flex-none"
        >
          <path
            d="m19 19-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <circle
            cx="11"
            cy="11"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></circle>
        </svg>
        Find vessels...
        <span className="ml-auto flex-none pl-3 text-xs font-semibold">⌘K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type MMSI, IMO or vessel name to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Vessels">
            <CommandItem>
              <ShipIcon className="mr-2 h-4 w-4" />
              <span>Ship Name 1 | MMSI | IMO</span>
            </CommandItem>
            <CommandItem>
              <ShipIcon className="mr-2 h-4 w-4" />
              <span>Ship Name 2 | MMSI | IMO</span>
            </CommandItem>
            <CommandItem>
              <ShipIcon className="mr-2 h-4 w-4" />
              <span>Ship Name 3| MMSI | IMO</span>
            </CommandItem>
            <CommandItem>
              <ShipIcon className="mr-2 h-4 w-4" />
              <span>Ship Name 4| MMSI | IMO</span>
            </CommandItem>
            <CommandItem>
              <ShipIcon className="mr-2 h-4 w-4" />
              <span>Ship Name 4 | MMSI | IMO</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
