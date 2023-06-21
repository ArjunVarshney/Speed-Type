import Keyboard from "@/components/Keyboard";
import Layout from "@/components/common/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Layout>
        <div className="max-w-md">
          <h1 className="text-6xl md:text-7xl font-bold">Speed Type</h1>
          <p className="py-6 text-xl">
            Unleash Your Typing Potential: Master the Keyboard with Lightning
            Speed and Laser Accuracy!
          </p>
          <div>
            <Link className="btn btn-primary" href="/type">
              Start Typing
            </Link>
          </div>
        </div>
        <div className="hidden xl:block ">
          <Keyboard className="shadow-lg" />
        </div>
        <div className="flex-col gap-2 hidden sm:flex xl:hidden">
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            T
          </kbd>
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            Y
          </kbd>
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            P
          </kbd>
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            E
          </kbd>
        </div>
      </Layout>
    </main>
  );
}
