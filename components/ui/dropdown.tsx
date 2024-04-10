"use client"

type Props = {
  options: string[]
  className?: string
  onSelect: (value: string) => void
}

export default function Dropdown({ className, options, onSelect }: Props) {
  return (
    <form
      className={className}
      onChange={(event) => onSelect(event.target.value)}
    >
      <select
        id="countries"
        className="w-full bg-color-3 p-1 text-xxs text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </form>
  )
}
