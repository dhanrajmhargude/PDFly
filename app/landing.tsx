import { Navbar } from "@/component/landingpage/Navbar";
import { Hero } from "@/component/landingpage/hero";
import { Feature } from "@/component/landingpage/description";
import { Skiper39 } from "@/component/landingpage/skiper39";
export function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111111] antialiased selection:bg-black/10">
      <Navbar />
      <Hero/>
      <section >
        <Feature />
      </section>
      <footer className="relative z-5 h-[50vh] min-h-[440px]">
          <Skiper39 />
      </footer>
    </div>
  );
}