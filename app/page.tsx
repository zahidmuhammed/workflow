import Dummy from "./_components/dummy";
import LayoutWrapper from "./_components/layoutWrapper";

export default function Home() {

  return (
    <main className="h-screen">
      <LayoutWrapper content={<div className="w-full h-screen flex justify-center items-center">
        <Dummy />
      </div>} />
    </main>
  );
}
