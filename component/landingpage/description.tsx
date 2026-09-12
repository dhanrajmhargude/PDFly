import { FileText, Heart, Shield } from "lucide-react";

const featureCards = [
  {
    label: "Clean",
    description:
      "Clean PDF workflows with focused controls, clear outputs, and no visual clutter.",
    icon: FileText,
  },
  {
    label: "Free & Unlimited",
    description:
      "Merge, split, compress, convert, and export as often as you need.",
    icon: Heart,
  },
  {
    label: "Safe & Local",
    description:
      "Files stay in your browser. No upload, no sign-up, no watermark.",
    icon: Shield,
  },
];

export function Feature() {
  return (
    <section
      id="features"
      className="relative z-10  border-t border-black/10 bg-white"
    >
      <div className="landing-container pt-[90px]">
        <h1 className="font-fraunces font-[380] text-[clamp(40px,4.1vw,64px)] leading-[1.06]">
          Convert. Organize. Deliver.
        </h1>

        <p className="mt-[20px] text-[0.78rem] font-medium uppercase leading-[1.8] tracking-[0.08em] text-[rgba(17,17,17,0.48)]">
          No uploads. No watermark. No unnecessary steps.
          <br />
          Everything runs securely in your browser.
        </p>

        <div className="mt-[70px] grid grid-cols-1 gap-4 md:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.label}
                className="group relative min-h-[220px] rounded-[14px] border border-black/50 bg-white p-6 transition-all duration-200 hover:border-black"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-black"
                    />

                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-black">
                      {feature.label}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.08em] text-black">
                    0{featureCards.indexOf(feature) + 1}
                  </span>
                </div>
                <p className="font-mono mt-10 max-w-[300px] text-[14px] leading-[1.7] text-black">
                  {feature.description}
                </p> 
                <div className="absolute bottom-6 left-6 text-[10px] font-medium uppercase tracking-[0.08em] text-black">
                  Rescude
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}