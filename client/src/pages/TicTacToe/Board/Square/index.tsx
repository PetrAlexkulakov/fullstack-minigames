import { MouseEventHandler } from "react";

export function Square({ value, onSquareClick }: 
  { value: string | null, onSquareClick: MouseEventHandler<HTMLButtonElement> | undefined }) {
  return (
    <button className="square border border-black" onClick={onSquareClick}>
      {value}
    </button>
  );
}