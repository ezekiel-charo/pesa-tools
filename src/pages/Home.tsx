import Footer from '../components/Footer';
import Header from '../components/Header';
import Upload from '../components/Upload';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center py-20">
        <h1 className="font-cal-sans text-5xl font-bold mb-5 text-center">
          Explore Your Statements <br /> Hassle-free
        </h1>
        <p className="mb-12 text-lg text-gray-800 text-center mx-3 lg:w-120">
          Filter, search, sort or export your transactions. Upload your Mpesa
          statement below to get started.
        </p>
        <Upload />
      </main>
      <Footer />
    </>
  );
}
