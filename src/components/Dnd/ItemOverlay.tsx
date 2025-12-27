
export default function ItemOverlay({children}: { children: React.ReactNode}) {
  /*
    ItemOverlay component represents the overlay of the dragged item
    - applies a fixed zoom level for better visibility during drag
    - styles the overlay container
  */
  return (
    <div
      style = {{zoom : 0.25 }}
      className="
        cursor-grab 
        touch-none 
        rounded border 
        p-3 
        dark:border-gray-700 
        dark:bg-red-500 
        z-20 
        opacity-90
        w-max h-max
        "
    >
      <div className="flex items-center gap-3">
        {children}
      </div>
    </div>
  )
}