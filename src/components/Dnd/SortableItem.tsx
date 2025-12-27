
import {useSortable,} from '@dnd-kit/sortable'
import { type UniqueIdentifier,} from "@dnd-kit/core";
import { type ReactNode } from 'react'
import {CSS} from '@dnd-kit/utilities'

export default function SortableItem({id,content,index}: {id: UniqueIdentifier , content: ReactNode , index: number}){
  /*
    SortableItem component represents an individual sortable item
    - uses useSortable hook from @dnd-kit/sortable to make item sortable
    - applies different zoom levels based on the container index
    - styles the item and handles drag state
  */
  const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({id})
  
    const zoomValue = index === 0 ? 1 : 0.2;
    const style = {
    transform: CSS.Transform.toString({ 
        x: transform?.x ?? 0,
        y: transform?.y ?? 0, 
        scaleX: 1, 
        scaleY: 1, 
    }),
    opacity: isDragging ? 0.85 : 1,
    transition,     
    zoom: zoomValue,                      
    };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={
        `cursor-grab
        toutch-none 
        rounded 
        p-3 
        dark:bg-green-500/0
        origin-top-left
        w-max h-max
        ${isDragging ? 'z-10 ' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="dark:text-gray-200">{content}</span>
      </div>
    </li>
  )
}