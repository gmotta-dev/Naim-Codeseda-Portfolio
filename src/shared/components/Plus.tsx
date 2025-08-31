export default function Plus(props: { positions: { x: number | string; y: number | string } }) {
  return (
    <span className="text-4xl py-1 px-3 bg-neutral-900 text-neutral-500 font-light absolute -translate-x-1/2 -translate-y-1/2" style={{ top: props.positions.y, left: props.positions.x }}>
      +
    </span>
  );
}
