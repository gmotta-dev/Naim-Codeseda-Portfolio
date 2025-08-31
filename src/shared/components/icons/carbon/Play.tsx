export default function Play(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" className={props.className}>
      <path fill="currentColor" d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28Zm7.447 14.895-12 6A.999.999 0 0 1 10 22V10a1 1 0 0 1 1.447-.895l12 6a1 1 0 0 1 0 1.79Z" />
    </svg>
  );
}
