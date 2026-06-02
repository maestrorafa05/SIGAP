export default function KpiCard({ title, value, subtitle, icon: Icon, tone = "green" }) {
  const tones = {
    green: "bg-apple-pearl text-apple-blue",
    gold: "bg-apple-pearl text-apple-ink",
    blue: "bg-apple-pearl text-apple-blue",
    slate: "bg-apple-pearl text-apple-muted",
  }

  return (
    <article className="rounded-[18px] border border-apple-hairline bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[14px] font-normal leading-[1.43] text-apple-muted">{title}</p>
          <p className="apple-display mt-2 break-words text-[28px] font-semibold leading-[1.14] text-apple-ink">
            {value}
          </p>
        </div>
        {Icon && (
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tones[tone]}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mt-3 text-[14px] leading-[1.43] text-apple-muted">{subtitle}</p>
      )}
    </article>
  )
}
