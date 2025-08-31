export default function Error(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" viewBox="0 0 32 32" className={props.className}>
      <path
        fill="currentColor"
        d="M2 16a14 14 0 1 0 28 0 14 14 0 0 0-28 0Zm23.15 7.75L8.25 6.85a12 12 0 0 1 16.9 16.9ZM8.24 25.16a12 12 0 0 1-1.4-16.89l16.89 16.89a12 12 0 0 1-15.49 0Z"
      />
    </svg>
  );
}
