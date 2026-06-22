import LayerPlate from "./LayerPlate";
import { STACK, METER_START, formatUSD } from "./stack-data";

// Plate resting height along Z (top layer highest). Shared with the teardown.
export const restZ = (i: number) => 28 + (STACK.length - 1 - i) * 38;

/**
 * Hero visual: the assembled isometric "context stack" on a glowing GPU/API
 * base, gently bobbing (CSS only; reduced-motion freezes it). It teases the
 * scroll-teardown act further down the page. No client JS.
 */
export default function IsoStackIdle() {
  return (
    <div className="relative flex min-h-[22rem] items-center justify-center sm:min-h-[26rem]">
      <div className="iso-shadow" aria-hidden />

      <div className="iso-scene scale-[0.82] sm:scale-95 lg:scale-100" aria-hidden>
        <div className="iso-stack iso-idle">
          {/* GPU / API base node */}
          <div className="iso-plate" style={{ transform: "translateZ(-12px)" }}>
            <div className="iso-base-face flex items-center justify-center">
              <span className="tabular text-[10px] tracking-[0.2em] text-accent">
                GPU · API
              </span>
            </div>
          </div>

          {STACK.map((layer, i) => (
            <div
              key={layer.id}
              className="iso-plate"
              style={{ transform: `translateZ(${restZ(i)}px)` }}
            >
              <LayerPlate layer={layer} />
            </div>
          ))}
        </div>
      </div>

      {/* 2D HUD badge — kept flat for legibility */}
      <div className="absolute right-1 top-2 rounded-lg border border-[var(--hairline)] bg-ink/70 px-3 py-2 backdrop-blur-sm">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted">
          Current spend
        </div>
        <div className="tabular text-lg font-semibold text-headline">
          {formatUSD(METER_START)}
          <span className="ml-1 text-xs font-normal text-muted">/mo</span>
        </div>
      </div>

      <p className="absolute bottom-0 left-1 text-xs text-muted">
        Your context stack — re-sent on every call.
      </p>
    </div>
  );
}
