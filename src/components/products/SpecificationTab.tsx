"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= TYPES ================= */

type SpecRow = {
    id: string;
    label: string;
    valueA: string;
    valueB: string;
    valueC: string;
    valueD: string;
};

type SpecGroup = {
    group: string;
    rows: SpecRow[];
};

type TabType = {
    id: string;
    label: string;
    subtitle: string;
    specs: SpecGroup[];
};

/* ================= DATA ================= */

const tabs: TabType[] = [
    {
        id: "indoor",
        label: "Indoor Series",
        subtitle: "SIGMA-IN",
        specs: [
            {
                group: "Display",
                rows: [
                    {
                        id: "resolution",
                        label: "Resolution",
                        valueA: "P1.25",
                        valueB: "P1.56",
                        valueC: "P1.875",
                        valueD: "P2.5",
                    },
                    {
                        id: "cabinet",
                        label: "Cabinet Size",
                        valueA: "500×500mm",
                        valueB: "500×500mm",
                        valueC: "500×500mm",
                        valueD: "500×1000mm",
                    },
                    {
                        id: "module",
                        label: "Module Size",
                        valueA: "250×250mm",
                        valueB: "250×250mm",
                        valueC: "250×250mm",
                        valueD: "250×250mm",
                    },
                    {
                        id: "brightness",
                        label: "Brightness",
                        valueA: "800 nits",
                        valueB: "1000 nits",
                        valueC: "1200 nits",
                        valueD: "1500 nits",
                    },
                ],
            },
            {
                group: "Optics",
                rows: [
                    {
                        id: "viewing",
                        label: "Viewing Angle",
                        valueA: "160°/160°",
                        valueB: "160°/160°",
                        valueC: "160°/160°",
                        valueD: "160°/160°",
                    },
                    {
                        id: "grayscale",
                        label: "Gray Scale",
                        valueA: "16 bit",
                        valueB: "16 bit",
                        valueC: "16 bit",
                        valueD: "16 bit",
                    },
                ],
            },
            {
                group: "Electronics",
                rows: [
                    {
                        id: "refresh",
                        label: "Refresh Rate",
                        valueA: "3840 Hz",
                        valueB: "3840 Hz",
                        valueC: "3840 Hz",
                        valueD: "1920 Hz",
                    },
                    {
                        id: "power",
                        label: "Power Requirements",
                        valueA: "Max 350W",
                        valueB: "Max 350W",
                        valueC: "Max 400W",
                        valueD: "Max 500W",
                    },
                    {
                        id: "temp",
                        label: "Operating Temperature",
                        valueA: "-10°C ~ 45°C",
                        valueB: "-10°C ~ 45°C",
                        valueC: "-10°C ~ 45°C",
                        valueD: "-10°C ~ 45°C",
                    },
                ],
            },
            {
                group: "System",
                rows: [
                    {
                        id: "signal",
                        label: "Signal Compatibility",
                        valueA: "DVI / HDMI / DP",
                        valueB: "DVI / HDMI / DP",
                        valueC: "DVI / HDMI / DP",
                        valueD: "DVI / HDMI / DP",
                    },
                    {
                        id: "control",
                        label: "Control Systems",
                        valueA: "Novastar / Colorlight",
                        valueB: "Novastar / Colorlight",
                        valueC: "Novastar / Linsn",
                        valueD: "Novastar / Linsn",
                    },
                ],
            },
        ],
    },
    {
        id: "outdoor",
        label: "Outdoor Series",
        subtitle: "SIGMA-OUT",
        specs: [
            {
                group: "Display",
                rows: [
                    {
                        id: "resolution",
                        label: "Resolution",
                        valueA: "P2.97",
                        valueB: "P3.91",
                        valueC: "P4.81",
                        valueD: "P6.25",
                    },
                    {
                        id: "cabinet",
                        label: "Cabinet Size",
                        valueA: "500×500mm",
                        valueB: "500×500mm",
                        valueC: "500×1000mm",
                        valueD: "640×640mm",
                    },
                    {
                        id: "module",
                        label: "Module Size",
                        valueA: "250×250mm",
                        valueB: "250×250mm",
                        valueC: "250×500mm",
                        valueD: "320×320mm",
                    },
                    {
                        id: "brightness",
                        label: "Brightness",
                        valueA: "4500 nits",
                        valueB: "5000 nits",
                        valueC: "5500 nits",
                        valueD: "6000 nits",
                    },
                ],
            },
            {
                group: "Optics",
                rows: [
                    {
                        id: "viewing",
                        label: "Viewing Angle",
                        valueA: "140°/140°",
                        valueB: "140°/140°",
                        valueC: "120°/120°",
                        valueD: "120°/120°",
                    },
                    {
                        id: "grayscale",
                        label: "Gray Scale",
                        valueA: "16 bit",
                        valueB: "16 bit",
                        valueC: "16 bit",
                        valueD: "14 bit",
                    },
                ],
            },
            {
                group: "Electronics",
                rows: [
                    {
                        id: "refresh",
                        label: "Refresh Rate",
                        valueA: "1920 Hz",
                        valueB: "1920 Hz",
                        valueC: "1920 Hz",
                        valueD: "960 Hz",
                    },
                    {
                        id: "power",
                        label: "Power Requirements",
                        valueA: "Max 600W",
                        valueB: "Max 650W",
                        valueC: "Max 700W",
                        valueD: "Max 800W",
                    },
                    {
                        id: "temp",
                        label: "Operating Temperature",
                        valueA: "-20°C ~ 55°C",
                        valueB: "-20°C ~ 55°C",
                        valueC: "-20°C ~ 60°C",
                        valueD: "-20°C ~ 60°C",
                    },
                ],
            },
            {
                group: "System",
                rows: [
                    {
                        id: "signal",
                        label: "Signal Compatibility",
                        valueA: "DVI / HDMI / DP",
                        valueB: "DVI / HDMI / DP / Fiber",
                        valueC: "DVI / HDMI / Fiber",
                        valueD: "DVI / Fiber",
                    },
                    {
                        id: "control",
                        label: "Control Systems",
                        valueA: "Novastar / Colorlight",
                        valueB: "Novastar / Colorlight",
                        valueC: "Novastar / Linsn",
                        valueD: "Novastar / Linsn",
                    },
                ],
            },
        ],
    },
    {
        id: "rental",
        label: "Rental Series",
        subtitle: "AXION-R",
        specs: [
            {
                group: "Display",
                rows: [
                    {
                        id: "resolution",
                        label: "Resolution",
                        valueA: "P2.6",
                        valueB: "P2.9",
                        valueC: "P3.9",
                        valueD: "P4.8",
                    },
                    {
                        id: "cabinet",
                        label: "Cabinet Size",
                        valueA: "500×500mm",
                        valueB: "500×500mm",
                        valueC: "500×1000mm",
                        valueD: "500×1000mm",
                    },
                    {
                        id: "module",
                        label: "Module Size",
                        valueA: "250×250mm",
                        valueB: "250×250mm",
                        valueC: "500×500mm",
                        valueD: "500×500mm",
                    },
                    {
                        id: "brightness",
                        label: "Brightness",
                        valueA: "1000 nits",
                        valueB: "1200 nits",
                        valueC: "2000 nits",
                        valueD: "2500 nits",
                    },
                ],
            },
            {
                group: "Optics",
                rows: [
                    {
                        id: "viewing",
                        label: "Viewing Angle",
                        valueA: "160°/160°",
                        valueB: "160°/160°",
                        valueC: "140°/140°",
                        valueD: "140°/140°",
                    },
                    {
                        id: "grayscale",
                        label: "Gray Scale",
                        valueA: "16 bit",
                        valueB: "16 bit",
                        valueC: "16 bit",
                        valueD: "16 bit",
                    },
                ],
            },
            {
                group: "Electronics",
                rows: [
                    {
                        id: "refresh",
                        label: "Refresh Rate",
                        valueA: "3840 Hz",
                        valueB: "3840 Hz",
                        valueC: "1920 Hz",
                        valueD: "1920 Hz",
                    },
                    {
                        id: "power",
                        label: "Power Requirements",
                        valueA: "Max 400W",
                        valueB: "Max 400W",
                        valueC: "Max 500W",
                        valueD: "Max 550W",
                    },
                    {
                        id: "temp",
                        label: "Operating Temperature",
                        valueA: "-10°C ~ 45°C",
                        valueB: "-10°C ~ 45°C",
                        valueC: "-10°C ~ 50°C",
                        valueD: "-10°C ~ 50°C",
                    },
                ],
            },
            {
                group: "System",
                rows: [
                    {
                        id: "signal",
                        label: "Signal Compatibility",
                        valueA: "DVI / HDMI / DP",
                        valueB: "DVI / HDMI / DP",
                        valueC: "DVI / HDMI / DP",
                        valueD: "DVI / HDMI / DP",
                    },
                    {
                        id: "control",
                        label: "Control Systems",
                        valueA: "Novastar / Colorlight",
                        valueB: "Novastar / Colorlight",
                        valueC: "Novastar / Colorlight",
                        valueD: "Novastar / Linsn",
                    },
                ],
            },
        ],
    },
];

/* ================= COLUMN HEADERS ================= */

const columnHeaders = ["MODEL A", "MODEL B", "MODEL C", "MODEL D"];

/* ================= EDITABLE CELL ================= */

type EditableCellProps = {
    value: string;
    onChange: (val: string) => void;
    highlight?: boolean;
};

const EditableCell: React.FC<EditableCellProps> = ({ value, onChange, highlight }) => {
    const [editing, setEditing] = useState(false);
    const [localVal, setLocalVal] = useState(value);

    const commit = () => {
        onChange(localVal);
        setEditing(false);
    };

    if (editing) {
        return (
            <input
                autoFocus
                value={localVal}
                onChange={(e) => setLocalVal(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") commit();
                    if (e.key === "Escape") { setLocalVal(value); setEditing(false); }
                }}
                className="w-full bg-[#002B49]/5 px-2 py-1 font-mono text-xs text-[#002B49] outline-none border border-[#002B49]/30 rounded-sm"
            />
        );
    }

    return (
        <div
            onClick={() => { setLocalVal(value); setEditing(true); }}
            title="Click to edit"
            className={`
                group/cell relative cursor-pointer select-none rounded-sm px-2 py-1 font-mono text-xs
                transition-colors duration-150
                ${highlight
                    ? "text-[#002B49] font-bold"
                    : "text-slate-600"
                }
                hover:bg-[#002B49]/5
            `}
        >
            {value || <span className="text-slate-300">—</span>}
            {/* pencil hint */}
            <span className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/cell:opacity-40 text-[9px] text-[#002B49] transition-opacity">✎</span>
        </div>
    );
};

/* ================= MAIN COMPONENT ================= */

const SpecificationTab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("indoor");

    /* Mutable spec data per tab */
    const [specData, setSpecData] = useState<Record<string, TabType>>(() => {
        const map: Record<string, TabType> = {};
        tabs.forEach((t) => { map[t.id] = JSON.parse(JSON.stringify(t)); });
        return map;
    });

    const currentTab = specData[activeTab];

    const updateCell = (
        groupIdx: number,
        rowIdx: number,
        field: "label" | "valueA" | "valueB" | "valueC" | "valueD",
        val: string
    ) => {
        setSpecData((prev) => {
            const next = JSON.parse(JSON.stringify(prev)) as Record<string, TabType>;
            next[activeTab].specs[groupIdx].rows[rowIdx][field] = val;
            return next;
        });
    };

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">

            {/* SUBTLE DIAGONAL STRIPE BACKGROUND */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        #002B49,
                        #002B49 1px,
                        transparent 1px,
                        transparent 28px
                    )`,
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 lg:px-10">

                {/* ── SECTION HEADER ── */}
                <div className="mb-10 lg:mb-14">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-10 bg-[#002B49]" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#002B49]">
                            Technical Specifications
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-slate-800 sm:text-4xl lg:text-[42px]">
                            Specification{" "}
                            <span className="text-[#002B49]">Tables</span>
                        </h2>
                        <p className="max-w-xs text-sm leading-relaxed text-slate-400 lg:text-right">
                            Click any cell to edit. Values update live.
                            <br />
                            Switch series using the tabs below.
                        </p>
                    </div>
                </div>

                {/* ── TAB STRIP ── */}
                <div className="mb-0 flex gap-0 border-b border-slate-200 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative shrink-0 flex flex-col items-start px-6 py-4 transition-colors duration-200
                                ${activeTab === tab.id
                                    ? "text-[#002B49]"
                                    : "text-slate-400 hover:text-slate-700"
                                }`}
                        >
                            <span className="font-mono text-[9px] uppercase tracking-widest mb-0.5">
                                {tab.subtitle}
                            </span>
                            <span className="text-sm font-extrabold uppercase tracking-tight">
                                {tab.label}
                            </span>
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#002B49]"
                                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* ── TABLE PANEL ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* ── SCROLLABLE TABLE WRAPPER ── */}
                        <div className="overflow-x-auto border border-t-0 border-slate-200">
                            <table className="w-full min-w-[640px] border-collapse">

                                {/* COLUMN HEADERS */}
                                <thead>
                                    <tr className="bg-[#002B49]">
                                        {/* Left label column */}
                                        <th className="w-[200px] px-6 py-4 text-left">
                                            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/50">
                                                Parameter
                                            </span>
                                        </th>
                                        {columnHeaders.map((col, i) => (
                                            <th key={i} className="px-4 py-4 text-left">
                                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                                                    {col}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {/* SPEC GROUPS */}
                                <tbody>
                                    {currentTab.specs.map((group, gIdx) => (
                                        <>
                                            {/* GROUP DIVIDER ROW */}
                                            <tr key={`g-${gIdx}`} className="bg-slate-50 border-b border-slate-200">
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-2"
                                                >
                                                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                                        {group.group}
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* DATA ROWS */}
                                            {group.rows.map((row, rIdx) => (
                                                <motion.tr
                                                    key={row.id}
                                                    className="group border-b border-slate-100 transition-colors duration-150 hover:bg-[#f0f4f8]"
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (gIdx * 4 + rIdx) * 0.03 }}
                                                >
                                                    {/* PARAM LABEL — editable */}
                                                    <td className="w-[200px] border-r border-slate-100 px-6 py-3">
                                                        <EditableCell
                                                            value={row.label}
                                                            onChange={(v) => updateCell(gIdx, rIdx, "label", v)}
                                                            highlight
                                                        />
                                                    </td>

                                                    {/* VALUE A */}
                                                    <td className="border-r border-slate-100 px-4 py-3">
                                                        <EditableCell
                                                            value={row.valueA}
                                                            onChange={(v) => updateCell(gIdx, rIdx, "valueA", v)}
                                                        />
                                                    </td>

                                                    {/* VALUE B */}
                                                    <td className="border-r border-slate-100 px-4 py-3">
                                                        <EditableCell
                                                            value={row.valueB}
                                                            onChange={(v) => updateCell(gIdx, rIdx, "valueB", v)}
                                                        />
                                                    </td>

                                                    {/* VALUE C */}
                                                    <td className="border-r border-slate-100 px-4 py-3">
                                                        <EditableCell
                                                            value={row.valueC}
                                                            onChange={(v) => updateCell(gIdx, rIdx, "valueC", v)}
                                                        />
                                                    </td>

                                                    {/* VALUE D */}
                                                    <td className="px-4 py-3">
                                                        <EditableCell
                                                            value={row.valueD}
                                                            onChange={(v) => updateCell(gIdx, rIdx, "valueD", v)}
                                                        />
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ── TABLE FOOTER ── */}
                        <div className="flex flex-col items-start justify-between gap-4 border border-t-0 border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center">
                            <p className="font-mono text-[10px] text-slate-400">
                                ✎ Click any cell to edit · Press Enter or click away to save · Esc to cancel
                            </p>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className="rounded-sm bg-[#002B49] px-6 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition hover:opacity-90"
                                >
                                    Download PDF
                                </button>
                                <button
                                    type="button"
                                    className="rounded-sm border border-slate-300 bg-white px-6 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-600 transition hover:bg-slate-100"
                                >
                                    Export CSV
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
};

export default SpecificationTab;