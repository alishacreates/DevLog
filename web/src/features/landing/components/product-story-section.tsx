export function ProductStorySection() {
  const logs = [
    {
      number: "01",
      label: "STARTED",
      title: "Set up authentication",
      meta: "SEP 01",
    },
    {
      number: "02",
      label: "BUILT",
      title: "Finished project CRUD",
      meta: "SEP 02",
    },
    {
      number: "03",
      label: "LEARNED",
      title: "Implemented cursor pagination",
      meta: "SEP 04",
    },
    {
      number: "04",
      label: "SHIPPED",
      title: "Feed V1 is live",
      meta: "SEP 06",
    },
  ];

  return (
    <section
      id="product"
      className="border-b border-black/20 bg-[#0f1111] text-[#eeeeec]"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#4aa8bb]">
              01 / Why DevLog
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              Projects show what you built.
              <span className="block text-[#8c9290]">
                DevLogs show how you got there.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-7 text-[#9ca3a1]">
              The finished repository is only part of the story. DevLog keeps
              the decisions, experiments, bugs, breakthroughs, and lessons
              that happened along the way.
            </p>
          </div>
        </div>

        {/* Build timeline */}
        <div className="mt-24 border-t border-white/20">
          <div className="grid border-b border-white/20 py-5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 lg:grid-cols-[90px_150px_1fr_100px]">
            <span>Log</span>
            <span>Status</span>
            <span>Progress</span>
            <span className="text-right">Date</span>
          </div>

          {logs.map((log) => (
            <div
              key={log.number}
              className="group grid items-center gap-3 border-b border-white/20 py-7 transition-colors hover:bg-white/[0.03] lg:grid-cols-[90px_150px_1fr_100px]"
            >
              <span className="font-mono text-xs text-white/35">
                {log.number}
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#4aa8bb]">
                {log.label}
              </span>

              <p className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                {log.title}
              </p>

              <span className="font-mono text-[10px] text-white/35 lg:text-right">
                {log.meta}
              </span>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-20 flex flex-col justify-between gap-8 border-l border-[#0B7189] pl-6 lg:flex-row lg:items-end">
          <p className="max-w-3xl text-2xl leading-[1.3] tracking-[-0.025em] sm:text-3xl">
            Your project isn&apos;t one launch.
            <span className="text-[#8c9290]">
              {" "}It&apos;s hundreds of small decisions worth remembering.
            </span>
          </p>

          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-[#4aa8bb]">
            Keep the story →
          </span>
        </div>
      </div>
    </section>
  );
}