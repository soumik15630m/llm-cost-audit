import type { StackLayer } from "./stack-data";

/**
 * The face of a single "context layer" plate - a brushed-metal / PCB card with
 * an engraved mono label, the leak's current cost, and a small circuit detail.
 * Presentational only; positioning + 3D transforms are applied by the parent.
 * Text sits in the isometric plane (engraved-on-the-board look); the fully
 * readable copy lives in the HUD caption beside the stack.
 */
export default function LayerPlate({ layer }: { layer: StackLayer }) {
  return (
    <div className="iso-plate-face">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <span className="tabular text-[11px] tracking-[0.2em] text-accent/90">
            L{layer.n}
          </span>
          <span className="text-accent/80">
            <layer.Icon size={18} />
          </span>
        </div>

        {/* faint circuit traces */}
        <div aria-hidden className="relative h-px w-full bg-[rgba(227,181,102,0.18)]">
          <span className="absolute -top-1 left-6 h-2 w-2 rounded-[2px] border border-[rgba(227,181,102,0.4)]" />
          <span className="absolute -top-[3px] right-10 h-1.5 w-1.5 rounded-full bg-[rgba(227,181,102,0.35)]" />
        </div>

        <div>
          <div className="tabular text-[12px] uppercase tracking-[0.14em] text-headline">
            {layer.label}
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="tabular text-[11px] text-muted">{layer.current}</span>
            <span className="tabular text-[11px] font-semibold text-accent">
              {layer.saved ? `−${layer.saved}` : "capped"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
