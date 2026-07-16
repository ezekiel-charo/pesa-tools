import { Link } from 'react-router';

export default function Home() {
  return (
    <>
      <h1>Understand your money</h1>
      <Link to="/analysis">Go to Analysis</Link>
    </>
  );
}
