
export default function User(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" viewBox="0 0 32 32" className={props.className}>
      <path
        fill="currentColor"
        d="M16 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0-2a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm10 28h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7v5Z"
      />
    </svg>
  );
}
