import { ScrollStroke } from "@/component/landingpage/scrollimage";

export function Hero() {
  return (
    <div className="landing-container relative mx-auto grid min-h-[calc(100vh-80px)] w-[calc(100%-48px)] max-w-[1080px] grid-cols-[1fr_1fr] items-center gap-10 pt-[170px] pb-[140px]">

      <div className="flex flex-col items-start">
        <p className="mb-[22px] text-[0.78rem] font-medium tracking-[0.08em] text-[rgba(17,17,17,0.48)] uppercase">
          Convert anything. Keep it simple.
        </p>

        <h1 className="font-fraunces font-[360] text-[clamp(42px,4.41vw,72px)] leading-[1.06]">
          Turn your files 
          <br />
          into PDFs 
          <br />
          with <span className="text-[rgba(17,17,17,0.48)]">ease.</span>
        </h1>

        <p className="mt-[40px] text-[0.78rem] font-medium tracking-[0.08em] text-[rgba(17,17,17,0.48)] uppercase leading-[1.8]">
          No uploads. No watermark. No unnecessary steps.
          <br />
          Everything runs securely in your browser.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-start gap-3">
            <a
                href="/tools"
                className="inline-flex h-[42px] min-w-[168px] cursor-pointer items-center justify-center rounded-full border border-[#111] bg-gradient-to-b from-[#2d2d2d] to-[#171717] px-7 text-[0.86rem] font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-[180ms] hover:from-[#222] hover:to-[#111]"
            >
                Start
            </a>

            <a
                href="#features"
                className="inline-flex h-[42px] min-w-[168px] cursor-pointer items-center justify-center rounded-full border border-[] bg-gradient-to-b from-white to-[#fffff] px-7 text-[0.86rem] font-medium text-[#171717] transition-all duration-[180ms] hover:bg-neutral-100"
            >
                See in action
            </a>
        </div>
      
      </div>

      <ScrollStroke />

    </div>
  );
}