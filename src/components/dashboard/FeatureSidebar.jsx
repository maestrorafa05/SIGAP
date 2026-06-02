export default function FeatureSidebar({
  features,
  activeFeature,
  onFeatureChange,
}) {
  return (
    <aside className="max-h-[calc(100vh-76px)] overflow-y-auto rounded-[18px] border border-apple-hairline bg-white p-3">
      <div className="px-2 pb-3">
        <p className="text-[12px] leading-[1.3] text-apple-muted">Fitur</p>
        <h2 className="apple-display mt-1 text-[22px] font-semibold leading-[1.14] text-apple-ink">
          SIGAP
        </h2>
      </div>

      <div className="grid gap-1.5">
        {features.map((feature) => {
          const Icon = feature.icon
          const active = activeFeature === feature.id

          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => onFeatureChange(feature.id)}
              className={[
                "group flex w-full max-w-full items-start gap-2.5 rounded-[14px] border px-3 py-2.5 text-left transition",
                active
                  ? "border-apple-blue bg-apple-blue text-white"
                  : "border-transparent bg-white text-apple-ink hover:border-apple-hairline hover:bg-apple-pearl",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  active ? "bg-white/18 text-white" : "bg-apple-pearl text-apple-blue",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 overflow-hidden">
                <span className="block truncate text-[14px] font-semibold leading-[1.24]">
                  {feature.label}
                </span>
                <span
                  className={[
                    "mt-0.5 block overflow-hidden text-[11px] leading-[1.3] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
                    active ? "text-white/78" : "text-apple-muted",
                  ].join(" ")}
                >
                  {feature.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
