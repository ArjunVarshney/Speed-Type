import Keyboard from "@/components/Keyboard";
import Layout from "@/components/common/Layout";
import React from "react";

const page = () => {
  return (
    <main>
      <Layout className="mt-24 flex flex-col md:flex-row gap-4">
        <div>
          <Keyboard keyClasses="kbd-sm sm:kbd-md 2xl:kbd-lg" />
        </div>
      </Layout>
    </main>
  );
};

export default page;
