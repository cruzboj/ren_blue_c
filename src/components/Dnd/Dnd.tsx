import React, { useEffect } from 'react';

import { 
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragOverlay,
  type Modifier
} from "@dnd-kit/core";

import type { Container } from "./types";
import { useContainers } from '../../hooks/useContainers';

import DroppableContainer from './DroppableContainer';
import ItemOverlay from './ItemOverlay';

function adjustScale(scale: number): Modifier {
  return ({ transform }) => {
    return {
      ...transform,
      x: transform.x / scale,
      y: transform.y / scale,
    };
  };
}

export default function BasicDragDrop({children}: { children: React.ReactNode } ) {
    /*
    creating containers with react.children , 
    warp container in object called initialContainers
    initialContainers = [
      - OuterItems{id, title, items[]} : index[0]
      - innerItems{id, title, items[]} : index[1]
    ]
    - useEffect to update OuterItems when children change (imported)

    + useContainers hook to get state and handlers
    - adjustScale modifier function to scale drag overlay
    - sensors to detect mouse pointer
  
    returns DndContext from @dnd-kit/core
    - contains DroppableContainer components for each container
    - contains DragOverlay component for active dragged item
  */
  const childrenArray = React.Children.toArray(children);

  const initialContainers: Container[] = [
    {
      id: 'OuterItems',
      title: 'OuterItems',
      items: childrenArray.map((child, index) => ({
        id: `${index + 1}`, 
        content: child,
      })),
    },
    {
      id: 'innerItems',
      title: 'innerItems',
      items: [],
    },
  ];
  
  const {
    containers,
    setContainers,
    activeId,
    getActiveItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useContainers(initialContainers);

  
  useEffect(() => {
    const newChildrenArray = React.Children.toArray(children);
    
    setContainers((prevContainers) => {
      return prevContainers.map((container) => {
        if (container.id === 'OuterItems') {
          return {
            ...container,
            items: newChildrenArray.map((child, index) => ({
              id: `${index + 1}`, 
              content: child,
            })),
          };
        }
        return container;
      });
    });
  }, [children, setContainers]); 

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1 //8px of movement required 
      },
    })
  );

  return (
    <div className="mx-auto w-full h-full bg-red-400/0">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[adjustScale(0.85)]}
      >
        <div className="flex flex-col h-full gap-1">
          {containers.map((container, index) => (
            <DroppableContainer
              key={container.id}
              id={container.id}
              title={container.title}
              items={container.items}
              index={index}
            />
          ))}
        </div>
        
        <DragOverlay
          dropAnimation={{
            duration: 250,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {activeId ? (
            <ItemOverlay>
              {getActiveItem()?.content}
            </ItemOverlay>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}