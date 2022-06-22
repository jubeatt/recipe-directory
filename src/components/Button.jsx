import { colorScheme } from "../theme/colorScheme"

export default function Button ({ color, onClick }) {
  return (
    <button 
      className={`w-5 h-5 rounded-full border-0 ${colorScheme[color]['bg']}`}
      onClick={onClick}
    ></button>
  )
}