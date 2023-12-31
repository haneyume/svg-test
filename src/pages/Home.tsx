import { useState, MouseEventHandler } from 'react';

import { useListState } from '@mantine/hooks';

export const Home = () => {
  const [list, handlers] = useListState<{ id: string; cx: number; cy: number }>(
    [
      { id: '1', cx: 50, cy: 50 },
      { id: '2', cx: 150, cy: 150 },
    ],
  );

  const [selected, setSelected] = useState<string | undefined>(undefined);

  const [dragging, setDragging] = useState(false);

  const onMouseDown: MouseEventHandler = () => {
    setDragging(true);
  };

  const onMouseMove: MouseEventHandler = (event) => {
    const deltaX = event.movementX;
    const deltaY = event.movementY;

    if (dragging) {
      handlers.applyWhere(
        (item) => item.id === selected,
        (item) => ({
          ...item,
          cx: item.cx + deltaX,
          cy: item.cy + deltaY,
        }),
      );
    }
  };

  const onMouseUp: MouseEventHandler = () => {
    setDragging(false);
  };

  return (
    <>
      <p>{JSON.stringify(list)}</p>

      <svg
        width="1000"
        height="1000"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {list.map((item) => (
          <circle
            key={item.id}
            cx={item.cx}
            cy={item.cy}
            r="40"
            stroke="black"
            strokeWidth="3"
            fill={item.id === selected ? 'red' : 'transparent'}
            onMouseDown={(event) => {
              onMouseDown(event);
              setSelected(item.id);
            }}
          />
        ))}
      </svg>
    </>
  );
};
