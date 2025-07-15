import Link from 'next/link'

export default function Landing() {
  return (
    <div>
      <h1>Welcome to my site</h1>
      <Link href="/login">
        Go to Login
      </Link>
    </div>
  );
}
