"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type PageKey = "Home" | "Music" | "Book";
type SectionStatus = "Draft" | "Published" | "Scheduled" | "Archived";
type BackgroundKey = "cream" | "white" | "ink" | "yellow";
type PageSection = {
  id: string;
  type: string;
  label: string;
  status: SectionStatus;
  visible: boolean;
  schedule: string;
  background: BackgroundKey;
  variant: string;
};

let sectionIdSeed = 0;
const nextSectionId = () => `section-${(sectionIdSeed += 1)}`;

const PAGES: PageKey[] = ["Home", "Music", "Book"];

const SECTION_TYPES: { type: string; detail: string }[] = [
  { type: "Hero", detail: "Full-bleed opening statement" },
  { type: "Rich text", detail: "Headings, paragraphs, quotes" },
  { type: "Image & text", detail: "Split layout with artwork" },
  { type: "Gallery", detail: "Drag-ordered image set" },
  { type: "Featured albums", detail: "Selected release cards" },
  { type: "Album grid", detail: "Full discography grid" },
  { type: "Track list", detail: "Ordered tracks with links" },
  { type: "Video embed", detail: "Lazy-loaded media block" },
  { type: "Featured book", detail: "Cover, blurb, buy links" },
  { type: "Latest posts", detail: "Recent journal entries" },
  { type: "Testimonials", detail: "Endorsements and quotes" },
  { type: "Partner logos", detail: "Retailers and platforms" },
  { type: "Call to action", detail: "Closing conversion block" },
];

const VARIANTS: Record<string, string[]> = {
  Hero: ["Centered", "Split"],
  "Rich text": ["Single column", "Two column"],
  "Image & text": ["Image left", "Image right"],
  Gallery: ["3 columns", "2 columns"],
  "Featured albums": ["Horizontal cards", "Stacked cards"],
  "Album grid": ["3 columns", "4 columns"],
  "Track list": ["Numbered", "Bordered"],
  "Video embed": ["Full width", "Framed"],
  "Featured book": ["Cover left", "Cover right"],
  "Latest posts": ["3 cards", "List"],
  Testimonials: ["Grid", "Carousel"],
  "Partner logos": ["Row", "Grid"],
  "Call to action": ["Centered", "Left aligned"],
};

const BACKGROUNDS: Record<BackgroundKey, { label: string; canvas: string; swatch: string }> = {
  cream: { label: "Cream", canvas: "bg-[#fbfbf8] text-zinc-900", swatch: "bg-[#fbfbf8]" },
  white: { label: "White", canvas: "bg-white text-zinc-900", swatch: "bg-white" },
  ink: { label: "Ink", canvas: "bg-[#171817] text-white", swatch: "bg-[#171817]" },
  yellow: { label: "Studio yellow", canvas: "bg-accent-yellow text-black", swatch: "bg-accent-yellow" },
};

const COVER_A = "from-indigo-600 via-slate-800 to-black";
const COVER_B = "from-rose-600 via-amber-700 to-slate-900";
const COVER_C = "from-yellow-200 via-orange-400 to-red-700";

const initialPages: Record<PageKey, PageSection[]> = {
  Home: [
    { id: "home-hero", type: "Hero", label: "SK / personal statement", status: "Published", visible: true, schedule: "", background: "ink", variant: "Centered" },
    { id: "home-albums", type: "Featured albums", label: "Selected releases", status: "Published", visible: true, schedule: "", background: "cream", variant: "Horizontal cards" },
    { id: "home-book", type: "Featured book", label: "拓展你的人生地图", status: "Published", visible: true, schedule: "", background: "white", variant: "Cover left" },
    { id: "home-posts", type: "Latest posts", label: "From the journal", status: "Draft", visible: false, schedule: "", background: "cream", variant: "3 cards" },
    { id: "home-cta", type: "Call to action", label: "Start a conversation", status: "Published", visible: true, schedule: "", background: "yellow", variant: "Centered" },
  ],
  Music: [
    { id: "music-hero", type: "Hero", label: "The catalogue", status: "Published", visible: true, schedule: "", background: "ink", variant: "Split" },
    { id: "music-grid", type: "Album grid", label: "All releases", status: "Published", visible: true, schedule: "", background: "cream", variant: "3 columns" },
    { id: "music-tracks", type: "Track list", label: "Latest track list", status: "Draft", visible: true, schedule: "", background: "white", variant: "Numbered" },
    { id: "music-video", type: "Video embed", label: "Studio session", status: "Scheduled", visible: true, schedule: "2026-09-01T10:00", background: "cream", variant: "Framed" },
  ],
  Book: [
    { id: "book-hero", type: "Hero", label: "Expand Your Map of Life", status: "Published", visible: true, schedule: "", background: "yellow", variant: "Centered" },
    { id: "book-text", type: "Image & text", label: "About the book", status: "Published", visible: true, schedule: "", background: "white", variant: "Image left" },
    { id: "book-gallery", type: "Gallery", label: "Editions & endorsements", status: "Published", visible: true, schedule: "", background: "cream", variant: "3 columns" },
    { id: "book-testimonials", type: "Testimonials", label: "Reader voices", status: "Published", visible: true, schedule: "", background: "cream", variant: "Grid" },
    { id: "book-video", type: "Video embed", label: "Author interview", status: "Archived", visible: false, schedule: "", background: "cream", variant: "Full width" },
  ],
};

function StatusPill({ status }: { status: SectionStatus }) {
  const colors: Record<SectionStatus, string> = {
    Published: "bg-[#e5f4d0] text-[#355715]",
    Draft: "bg-[#eeeaf8] text-[#5c4d7d]",
    Scheduled: "bg-[#fff0c9] text-[#805c00]",
    Archived: "bg-zinc-200 text-zinc-600",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${colors[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function SectionPreview({ section }: { section: PageSection }) {
  const dark = section.background === "ink";
  const line = dark ? "bg-white/25" : "bg-black/15";
  const sub = dark ? "bg-white/15" : "bg-black/10";
  const chip = dark ? "bg-white/10" : "bg-black/5";
  const script = dark ? "text-white/70" : "text-[#abb888]";
  const primary = dark ? "bg-accent-yellow" : "bg-black";
  const secondary = dark ? "border border-white/40" : "border border-black/30";

  switch (section.type) {
    case "Hero":
      if (section.variant === "Split") {
        return (
          <div className="flex min-h-[176px] items-center gap-6 px-8 py-10">
            <div className="flex-1 space-y-3">
              <span className={`font-script text-xl ${script}`}>make</span>
              <div className={`h-3 w-4/5 rounded ${line}`} />
              <div className={`h-3 w-1/2 rounded ${line}`} />
              <div className="flex gap-2 pt-2"><div className={`h-6 w-16 rounded ${primary}`} /><div className={`h-6 w-16 rounded ${secondary}`} /></div>
            </div>
            <div className={`aspect-square w-32 shrink-0 bg-gradient-to-br ${COVER_A}`} />
          </div>
        );
      }
      return (
        <div className="flex min-h-[176px] flex-col items-center justify-center gap-3 px-8 py-10 text-center">
          <span className={`font-script text-xl ${script}`}>make</span>
          <div className={`h-3 w-2/3 rounded ${line}`} />
          <div className={`h-3 w-1/3 rounded ${line}`} />
          <div className="flex gap-2 pt-2"><div className={`h-6 w-16 rounded ${primary}`} /><div className={`h-6 w-16 rounded ${secondary}`} /></div>
        </div>
      );
    case "Rich text":
      if (section.variant === "Two column") {
        return (
          <div className="grid grid-cols-2 gap-6 px-8 py-8">
            {[0, 1].map((column) => (
              <div key={column} className="space-y-2">
                <div className={`h-2.5 w-1/2 rounded ${line}`} />
                {[0, 1, 2].map((row) => <div key={row} className={`h-1.5 w-full rounded ${sub}`} />)}
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="max-w-lg space-y-2 px-8 py-8">
          <div className={`h-2.5 w-1/2 rounded ${line}`} />
          {[0, 1, 2, 3].map((row) => <div key={row} className={`h-1.5 w-full rounded ${sub}`} />)}
        </div>
      );
    case "Image & text": {
      const cover = <div className={`aspect-square w-full bg-gradient-to-br ${COVER_B}`} />;
      const text = (
        <div className="space-y-3">
          <div className={`h-2.5 w-2/3 rounded ${line}`} />
          {[0, 1, 2].map((row) => <div key={row} className={`h-1.5 w-full rounded ${sub}`} />)}
          <div className={`h-6 w-20 rounded ${primary}`} />
        </div>
      );
      return (
        <div className="grid grid-cols-2 items-center gap-6 px-8 py-8">
          {section.variant === "Image right" ? <>{text}{cover}</> : <>{cover}{text}</>}
        </div>
      );
    }
    case "Gallery":
      return (
        <div className={`grid gap-2 px-8 py-8 ${section.variant === "2 columns" ? "grid-cols-2" : "grid-cols-3"}`}>
          {[COVER_A, COVER_B, COVER_C, COVER_B, COVER_A, COVER_C].map((gradient, index) => (
            <div key={index} className={`aspect-square bg-gradient-to-br ${gradient}`} />
          ))}
        </div>
      );
    case "Featured albums":
      if (section.variant === "Stacked cards") {
        return (
          <div className="space-y-3 px-8 py-8">
            {[COVER_A, COVER_B].map((gradient, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`h-14 w-14 shrink-0 bg-gradient-to-br ${gradient}`} />
                <div className="flex-1 space-y-2"><div className={`h-2 w-1/3 rounded ${line}`} /><div className={`h-1.5 w-1/2 rounded ${sub}`} /></div>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="grid grid-cols-2 gap-4 px-8 py-8">
          {[COVER_A, COVER_B].map((gradient, index) => (
            <div key={index}>
              <div className={`aspect-square bg-gradient-to-br ${gradient}`} />
              <div className="mt-2 h-2 w-2/3 rounded bg-black/20" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded bg-black/10" />
            </div>
          ))}
        </div>
      );
    case "Album grid":
      return (
        <div className={`grid gap-3 px-8 py-8 ${section.variant === "4 columns" ? "grid-cols-4" : "grid-cols-3"}`}>
          {[COVER_A, COVER_B, COVER_C, COVER_B, COVER_A, COVER_C].map((gradient, index) => (
            <div key={index}>
              <div className={`aspect-square bg-gradient-to-br ${gradient}`} />
              <div className={`mt-1.5 h-1.5 w-2/3 rounded ${sub}`} />
            </div>
          ))}
        </div>
      );
    case "Track list":
      return (
        <div className="space-y-2.5 px-8 py-8">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className={`flex items-center gap-3 ${section.variant === "Bordered" ? "border-b border-black/10 pb-2.5" : ""}`}>
              <span className={`w-5 font-mono text-[9px] ${dark ? "text-white/40" : "text-zinc-400"}`}>{String(row + 1).padStart(2, "0")}</span>
              <div className={`h-1.5 w-1/3 rounded ${line}`} />
              <div className="flex-1" />
              <div className={`h-1.5 w-8 rounded ${sub}`} />
            </div>
          ))}
        </div>
      );
    case "Video embed": {
      const player = (
        <div className={`flex aspect-video items-center justify-center ${dark ? "bg-white/10" : "bg-gradient-to-br from-zinc-800 to-black"}`}>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[10px] text-black">▶</div>
        </div>
      );
      if (section.variant === "Framed") {
        return (
          <div className="px-8 py-8">
            {player}
            <div className={`mt-2 h-1.5 w-1/4 rounded ${sub}`} />
          </div>
        );
      }
      return player;
    }
    case "Featured book": {
      const coverBook = <div className={`h-28 w-20 shrink-0 bg-gradient-to-br ${COVER_C}`} />;
      const blurb = (
        <div className="flex-1 space-y-3">
          <div className={`h-2.5 w-2/3 rounded ${line}`} />
          {[0, 1].map((row) => <div key={row} className={`h-1.5 w-full rounded ${sub}`} />)}
          <div className="flex gap-2"><div className={`h-6 w-16 rounded ${primary}`} /><div className={`h-6 w-16 rounded ${secondary}`} /></div>
        </div>
      );
      return (
        <div className="flex items-center gap-6 px-8 py-8">
          {section.variant === "Cover right" ? <>{blurb}{coverBook}</> : <>{coverBook}{blurb}</>}
        </div>
      );
    }
    case "Latest posts":
      if (section.variant === "List") {
        return (
          <div className="space-y-3 px-8 py-8">
            {[COVER_A, COVER_B, COVER_C].map((gradient, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`h-10 w-10 shrink-0 bg-gradient-to-br ${gradient}`} />
                <div className="flex-1 space-y-1.5"><div className={`h-2 w-2/3 rounded ${line}`} /><div className={`h-1.5 w-1/4 rounded ${sub}`} /></div>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="grid grid-cols-3 gap-4 px-8 py-8">
          {[COVER_A, COVER_B, COVER_C].map((gradient, index) => (
            <div key={index}>
              <div className={`h-12 bg-gradient-to-br ${gradient}`} />
              <div className={`mt-2 h-2 w-5/6 rounded ${line}`} />
              <div className={`mt-1.5 h-1.5 w-1/2 rounded ${sub}`} />
            </div>
          ))}
        </div>
      );
    case "Testimonials":
      return (
        <div className="grid grid-cols-2 gap-4 px-8 py-8">
          {[0, 1].map((card) => (
            <div key={card} className={`p-4 ${chip}`}>
              <span className={`font-script text-lg leading-none ${script}`}>&ldquo;</span>
              <div className="mt-2 space-y-2">
                <div className={`h-1.5 w-full rounded ${sub}`} />
                <div className={`h-1.5 w-3/4 rounded ${sub}`} />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className={`h-5 w-5 rounded-full ${line}`} />
                <div className={`h-1.5 w-1/3 rounded ${sub}`} />
              </div>
            </div>
          ))}
        </div>
      );
    case "Partner logos":
      return (
        <div className={`flex flex-wrap items-center gap-3 px-8 py-8 ${section.variant === "Grid" ? "max-w-sm" : ""}`}>
          {[0, 1, 2, 3, 4].map((logo) => (
            <div key={logo} className={`flex h-8 w-20 items-center justify-center ${chip}`}>
              <div className={`h-1.5 w-10 rounded ${sub}`} />
            </div>
          ))}
        </div>
      );
    case "Call to action":
      return (
        <div className={`flex flex-col gap-3 px-8 py-10 ${section.variant === "Left aligned" ? "items-start" : "items-center"}`}>
          <div className={`h-3 ${section.variant === "Left aligned" ? "w-2/3" : "w-1/2"} rounded ${line}`} />
          <div className={`h-1.5 w-1/3 rounded ${sub}`} />
          <div className={`mt-1 h-7 w-24 rounded ${primary}`} />
        </div>
      );
    default:
      return <div className={`flex min-h-[120px] items-center justify-center px-8 py-10 ${sub}`}><span className="text-[10px] font-semibold tracking-wide opacity-60">{section.type}</span></div>;
  }
}

function CanvasSection({
  section,
  selected,
  onSelect,
  onDuplicate,
  onToggleVisible,
  onArchive,
  onOpenEditor,
}: {
  section: PageSection;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onToggleVisible: () => void;
  onArchive: () => void;
  onOpenEditor?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
  const bg = BACKGROUNDS[section.background];
  const muted = !section.visible || section.status !== "Published";
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`group relative ${isDragging ? "z-20 shadow-2xl" : ""}`}
      onDoubleClick={onOpenEditor}
    >
      <button onClick={onSelect} aria-label={`Select ${section.type} section`} className={`absolute inset-0 z-[1] border-2 transition-colors ${selected ? "border-black" : "border-transparent group-hover:border-black/30"}`} />
      <div className={bg.canvas}>
        <div className={muted ? "opacity-40" : ""}>
          <SectionPreview section={section} />
        </div>
      </div>
      <div className="absolute left-2 top-2 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <button {...attributes} {...listeners} aria-label={`Reorder ${section.type}`} className="grid h-7 w-7 cursor-grab place-items-center bg-black text-xs font-bold text-accent-yellow active:cursor-grabbing">::</button>
        <button onClick={(event) => { event.stopPropagation(); onToggleVisible(); }} className="h-7 bg-black px-2 text-[10px] font-semibold text-white hover:bg-zinc-800">{section.visible ? "Hide" : "Show"}</button>
        <button onClick={(event) => { event.stopPropagation(); onDuplicate(); }} className="h-7 bg-black px-2 text-[10px] font-semibold text-white hover:bg-zinc-800">Copy</button>
        <button onClick={(event) => { event.stopPropagation(); onArchive(); }} className="h-7 bg-black px-2 text-[10px] font-semibold text-white hover:bg-zinc-800">Archive</button>
        {onOpenEditor && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              onOpenEditor();
            }}
            className="h-7 bg-accent-yellow px-2 text-[10px] font-semibold text-black hover:bg-yellow-300"
          >
            Edit visually
          </button>
        )}
      </div>
      <span className="absolute right-2 top-2 z-10 bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">{section.status}</span>
      {section.status === "Scheduled" && section.schedule && (
        <span className="absolute bottom-2 right-2 z-10 bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold text-black">{section.schedule.replace("T", " ")}</span>
      )}
      {section.type === "Hero" && onOpenEditor ? (
        <span className="absolute bottom-2 left-2 z-10 bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
          Double-click to edit ↗
        </span>
      ) : (
        <span className="absolute bottom-2 left-2 z-10 bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">{section.label}</span>
      )}
    </div>
  );
}

function AddSectionModal({ onAdd, onClose }: { onAdd: (type: string) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-5">
      <div role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-black/10 bg-[#f8f8f4] shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#deddd7] px-5 py-5 sm:px-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c875c]">Section library</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em]">Add a section</h2>
            <p className="mt-1 text-xs text-zinc-500">New sections appear at the bottom of the canvas as visible drafts.</p>
          </div>
          <button aria-label="Close section picker" onClick={onClose} className="grid h-8 w-8 place-items-center border border-[#d9d8d2] text-lg text-zinc-500 hover:border-black hover:text-black">×</button>
        </div>
        <div className="grid grid-cols-1 gap-2 px-5 py-6 sm:grid-cols-2 sm:px-7">
          {SECTION_TYPES.map((entry) => (
            <button key={entry.type} onClick={() => onAdd(entry.type)} className="flex items-center gap-3 border border-[#deddd7] bg-white p-3 text-left transition-colors hover:border-black hover:bg-accent-yellow">
              <span className="grid h-8 w-8 shrink-0 place-items-center bg-[#171817] text-[10px] font-bold text-accent-yellow">{entry.type.slice(0, 1)}</span>
              <span className="min-w-0">
                <strong className="block text-xs">{entry.type}</strong>
                <small className="text-[10px] text-zinc-500">{entry.detail}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Inspector({
  section,
  onPatch,
  onDuplicate,
  onTogglePublish,
  onArchive,
  onClose,
}: {
  section: PageSection;
  onPatch: (patch: Partial<PageSection>) => void;
  onDuplicate: () => void;
  onTogglePublish: () => void;
  onArchive: () => void;
  onClose: () => void;
}) {
  return (
    <div className="border border-[#deddd7] bg-[#fbfbf8]">
      <div className="flex items-start justify-between border-b border-[#deddd7] px-5 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c875c]">Inspector</p>
          <h2 className="mt-1 text-base font-semibold">{section.type}</h2>
          <div className="mt-2"><StatusPill status={section.status} /></div>
        </div>
        <button aria-label="Close inspector" onClick={onClose} className="grid h-8 w-8 place-items-center border border-[#d9d8d2] text-lg text-zinc-500 hover:border-black hover:text-black">×</button>
      </div>
      <div className="space-y-5 px-5 py-5">
        <label className="block text-xs font-semibold">
          Section label
          <input
            value={section.label}
            onChange={(event) => onPatch({ label: event.target.value })}
            className="mt-2 w-full border border-[#d9d8d2] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-black"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold">
            Status
            <select
              value={section.status === "Archived" ? "Draft" : section.status}
              onChange={(event) => onPatch({ status: event.target.value as SectionStatus })}
              className="mt-2 w-full border border-[#d9d8d2] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-black"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </label>
          {section.status === "Scheduled" && (
            <label className="block text-xs font-semibold">
              Schedule
              <input
                type="datetime-local"
                value={section.schedule}
                onChange={(event) => onPatch({ schedule: event.target.value })}
                className="mt-2 w-full border border-[#d9d8d2] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-black"
              />
            </label>
          )}
        </div>
        <label className="flex items-center gap-3 border border-[#e7e6e1] bg-white p-3 text-xs font-semibold">
          <input type="checkbox" checked={section.visible} onChange={(event) => onPatch({ visible: event.target.checked })} className="h-4 w-4 accent-black" />
          Visible on the public page
        </label>
        <div>
          <p className="text-xs font-semibold">Background</p>
          <p className="mt-1 text-[10px] text-zinc-500">Approved palette only — pages stay consistent.</p>
          <div className="mt-2 flex gap-2">
            {(Object.keys(BACKGROUNDS) as BackgroundKey[]).map((key) => (
              <button
                key={key}
                aria-label={`${BACKGROUNDS[key].label} background`}
                onClick={() => onPatch({ background: key })}
                className={`h-9 flex-1 border ${BACKGROUNDS[key].swatch} ${section.background === key ? "border-black ring-2 ring-black ring-offset-1" : "border-[#deddd7]"}`}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold">Layout variant</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(VARIANTS[section.type] ?? ["Default"]).map((variant) => (
              <button
                key={variant}
                onClick={() => onPatch({ variant })}
                className={`border px-3 py-2 text-[11px] font-semibold transition-colors ${section.variant === variant ? "border-black bg-black text-accent-yellow" : "border-[#deddd7] bg-white text-zinc-600 hover:border-black"}`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-[#deddd7] pt-4">
          <button onClick={onTogglePublish} className="inline-flex h-10 items-center justify-center bg-black px-4 text-xs font-semibold text-accent-yellow hover:bg-zinc-800">
            {section.status === "Published" ? "Unpublish" : "Publish"}
          </button>
          <button onClick={onDuplicate} className="inline-flex h-10 items-center justify-center border border-[#d5d4ce] bg-white px-4 text-xs font-semibold text-zinc-700 hover:border-zinc-500">
            Duplicate
          </button>
          <button onClick={onArchive} className="inline-flex h-10 items-center justify-center border border-[#e5d5d5] bg-white px-4 text-xs font-semibold text-[#8a3a3a] hover:bg-[#f7ecec]">
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}

function PageSummary({ sections, onAdd }: { sections: PageSection[]; onAdd: () => void }) {
  const live = sections.filter((section) => section.status !== "Archived");
  const published = live.filter((section) => section.status === "Published" && section.visible).length;
  const drafts = live.filter((section) => section.status === "Draft").length;
  const scheduled = live.filter((section) => section.status === "Scheduled").length;
  const hidden = live.filter((section) => !section.visible).length;
  return (
    <div className="border border-[#deddd7] bg-[#fbfbf8]">
      <div className="border-b border-[#deddd7] px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c875c]">Page overview</p>
        <h2 className="mt-1 text-base font-semibold">Nothing selected</h2>
        <p className="mt-1 text-xs text-zinc-500">Click a section on the canvas to edit it.</p>
      </div>
      <div className="space-y-2 px-5 py-5">
        {[["Live on page", published], ["Drafts", drafts], ["Scheduled", scheduled], ["Hidden", hidden]].map(([label, value]) => (
          <div key={label as string} className="flex items-center justify-between border-b border-[#e8e7e2] py-2 text-xs last:border-0">
            <span className="text-zinc-500">{label}</span>
            <strong className="font-mono">{String(value).padStart(2, "0")}</strong>
          </div>
        ))}
        <button onClick={onAdd} className="mt-3 w-full border border-dashed border-[#c8c7c0] py-3 text-xs font-semibold text-zinc-600 hover:border-black hover:text-black">+ Add Section</button>
        <p className="pt-2 text-[11px] leading-relaxed text-zinc-500">Drag the :: handle on any section to reorder. Layout variants stay within the controlled design system, so pages never drift into inconsistent shapes.</p>
      </div>
    </div>
  );
}

export function SectionBuilder({ onNotify }: { onNotify: (message: string) => void }) {
  const router = useRouter();
  const [pages, setPages] = useState(initialPages);
  const [page, setPage] = useState<PageKey>("Home");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const sections = pages[page];
  const live = sections.filter((section) => section.status !== "Archived");
  const archived = sections.filter((section) => section.status === "Archived");
  const selected = live.find((section) => section.id === selectedId) || null;

  function setSections(next: PageSection[]) {
    setPages((current) => ({ ...current, [page]: next }));
  }

  function patchSection(id: string, patch: Partial<PageSection>) {
    setSections(sections.map((section) => (section.id === id ? { ...section, ...patch } : section)));
  }

  function addSection(type: string) {
    const section: PageSection = {
      id: nextSectionId(),
      type,
      label: type,
      status: "Draft",
      visible: true,
      schedule: "",
      background: "cream",
      variant: (VARIANTS[type] ?? ["Default"])[0],
    };
    setSections([...live, section, ...archived]);
    setSelectedId(section.id);
    setPickerOpen(false);
    onNotify(`${type} section added — selected on canvas`);
  }

  function duplicateSection(id: string) {
    const index = live.findIndex((section) => section.id === id);
    if (index < 0) return;
    const source = live[index];
    const copy: PageSection = { ...source, id: nextSectionId(), label: `${source.label} (copy)`, status: "Draft", schedule: "" };
    const next = [...live.slice(0, index + 1), copy, ...live.slice(index + 1)];
    setSections([...next, ...archived]);
    onNotify(`${source.type} duplicated`);
  }

  function archiveSection(id: string) {
    const target = sections.find((section) => section.id === id);
    patchSection(id, { status: "Archived", visible: false });
    if (selectedId === id) setSelectedId(null);
    onNotify(`${target?.type ?? "Section"} archived — restorable below`);
  }

  function restoreSection(id: string) {
    const target = sections.find((section) => section.id === id);
    patchSection(id, { status: "Draft", visible: true });
    onNotify(`${target?.type ?? "Section"} restored as draft`);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = live.findIndex((section) => section.id === active.id);
    const to = live.findIndex((section) => section.id === over.id);
    if (from < 0 || to < 0) return;
    setSections([...arrayMove(live, from, to), ...archived]);
    onNotify("Section order updated");
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 border-b border-[#dcdcd6] pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c875c]">Structure / 页面</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Visual section builder</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
            Assemble Home, Music and Book pages from reusable sections — drag them on the canvas, click to edit, and restyle within the controlled design system.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-[#d5d4ce] bg-white">
            {(["desktop", "mobile"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDevice(mode)}
                className={`px-3 py-2.5 text-[11px] font-semibold capitalize ${device === mode ? "bg-black text-accent-yellow" : "text-zinc-500 hover:text-black"}`}
              >
                {mode}
              </button>
            ))}
          </div>
          <button onClick={() => setPickerOpen(true)} className="inline-flex h-10 items-center justify-center whitespace-nowrap bg-black px-4 text-xs font-semibold text-accent-yellow hover:bg-zinc-800">
            + Add Section
          </button>
        </div>
      </div>

      <div className="mt-7 flex gap-1 border-b border-[#deddd7]">
        {PAGES.map((key) => (
          <button
            key={key}
            onClick={() => { setPage(key); setSelectedId(null); }}
            className={`-mb-px border-b-2 px-4 py-3 text-xs font-semibold transition-colors ${page === key ? "border-black text-black" : "border-transparent text-zinc-500 hover:text-black"}`}
          >
            {key} page
            <span className="ml-2 font-mono text-[10px] text-zinc-400">{pages[key].filter((section) => section.status !== "Archived").length}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="border border-[#deddd7] bg-[#fbfbf8]">
            <div className="flex items-center justify-between gap-3 border-b border-[#deddd7] px-4 py-3">
              <p className="text-xs font-semibold">{page} canvas <span className="ml-2 font-normal text-zinc-500">click to select · drag :: to reorder · double-click Hero to edit visually</span></p>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">{device} preview</span>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={live.map((section) => section.id)} strategy={verticalListSortingStrategy}>
                <div className={device === "mobile" ? "mx-auto max-w-[390px] border-x border-[#deddd7]" : ""}>
                  {live.map((section) => (
                    <CanvasSection
                      key={section.id}
                      section={section}
                      selected={selectedId === section.id}
                      onSelect={() => setSelectedId(selectedId === section.id ? null : section.id)}
                      onDuplicate={() => duplicateSection(section.id)}
                      onToggleVisible={() => {
                        patchSection(section.id, { visible: !section.visible });
                        onNotify(`${section.type} ${section.visible ? "hidden from" : "shown on"} the public page`);
                      }}
                      onArchive={() => archiveSection(section.id)}
                      onOpenEditor={
                        section.type === "Hero"
                          ? () => {
                              onNotify("Opening Hero visual editor");
                              router.push("/admin/builder/hero");
                            }
                          : undefined
                      }
                    />
                  ))}
                  {live.length === 0 && <p className="py-14 text-center text-sm text-zinc-500">No active sections. Add one below.</p>}
                </div>
              </SortableContext>
            </DndContext>
            <button onClick={() => setPickerOpen(true)} className="w-full border-t border-dashed border-[#c8c7c0] py-4 text-xs font-semibold text-zinc-600 hover:border-black hover:text-black">
              + Add Section
            </button>
          </div>

          {archived.length > 0 && (
            <div className="mt-6 border border-[#deddd7] bg-[#fbfbf8] p-5">
              <h2 className="text-base font-semibold">Archived sections</h2>
              <p className="mt-1 text-xs text-zinc-500">Soft-deleted sections stay restorable.</p>
              <div className="mt-4 space-y-2">
                {archived.map((section) => (
                  <div key={section.id} className="flex items-center gap-3 border border-dashed border-[#d5d4ce] bg-white/60 px-3 py-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center bg-zinc-200 text-[10px] font-bold text-zinc-500">{section.type.slice(0, 1)}</span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-xs text-zinc-500">{section.type}</strong>
                      <small className="text-[10px] text-zinc-400">{section.label}</small>
                    </span>
                    <button onClick={() => restoreSection(section.id)} className="rounded border border-[#deddd7] px-2 py-1 text-[10px] font-semibold text-zinc-600 hover:border-black hover:text-black">Restore</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="mt-4 text-[11px] text-zinc-400">{live.length} active · {archived.length} archived · In-memory mock data for this demo</p>
        </div>

        <aside>
          {selected ? (
            <Inspector
              key={selected.id}
              section={selected}
              onPatch={(patch) => patchSection(selected.id, patch)}
              onDuplicate={() => duplicateSection(selected.id)}
              onTogglePublish={() => {
                const next = selected.status === "Published" ? "Draft" : "Published";
                patchSection(selected.id, { status: next, schedule: next === "Published" ? "" : selected.schedule });
                onNotify(`${selected.type} ${next === "Published" ? "published" : "unpublished"}`);
              }}
              onArchive={() => archiveSection(selected.id)}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <PageSummary sections={sections} onAdd={() => setPickerOpen(true)} />
          )}
        </aside>
      </div>

      {pickerOpen && <AddSectionModal onAdd={addSection} onClose={() => setPickerOpen(false)} />}
    </div>
  );
}
