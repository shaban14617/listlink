import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="">
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">
            Your one link <br /> for everything
          </h1>
          <h2 className="text-gray-500 text-xl mt-6">
            Share your links, music, social profile, and info
          </h2>
        </div>
        <form className="inline-flex gap items-center shadow shadow-gray-700/20">
          <span className="bg-white py-4 pl-4">Linklist.to/</span>
          <input type="text" placeholder="username" className="py-4" />
          <button type="submit" className="bg-blue-500 text-white py-4 px-6">
            join for free
          </button>
        </form>
      </section>
    </main>
  );
}
