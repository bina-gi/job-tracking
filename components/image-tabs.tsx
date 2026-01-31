import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize"); //organize,hired,manage

  return (
    <section className="border-t bg-white py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex gap-2 justify-center mb-8">
          <Button
            onClick={() => setActiveTab("organize")}
            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "organize" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}
          >
            Organize Application
          </Button>
          <Button
            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "hired" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("hired")}
          >
            Get Hired
          </Button>
          <Button
            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "manage" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Boards
          </Button>
        </div>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
          {activeTab === "organize" && (
            <Image
              src="/hero-images/hero1.png"
              alt="Organize Applications"
              width={1200}
              height={800}
            />
          )}
          {activeTab === "hired" && (
            <Image
              src="/hero-images/hero2.png"
              alt="Get Hired"
              width={1200}
              height={800}
            />
          )}
          {activeTab === "manage" && (
            <Image
              src="/hero-images/hero3.png"
              alt="Manage Boards"
              width={1200}
              height={800}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ImageTabs;
