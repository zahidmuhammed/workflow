import Layout from "./_components/layout";

export default function Home() {
  return (
    <main className="h-screen">
      <Layout content={<div className="w-full h-screen flex justify-center items-center">Dashboard</div>} />
    </main>
  );
}
