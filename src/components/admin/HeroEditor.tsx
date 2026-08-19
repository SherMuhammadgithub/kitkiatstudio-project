"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

type ElementKind = "heading" | "text" | "button" | "image";

type CanvasElement = {
  id: string;
  kind: ElementKind;
  x: number;
  y: number;
  width: number;
  text: string;
  accent: string;
};

const STORAGE_KEY = "kitkiat-demo-hero-builder";

let elementSeed = 0;
const nextElementId = () => `hero-el-${(elementSeed += 1)}`;

const PALETTE: { kind: ElementKind; label: string; detail: string; icon: string }[] = [
  { kind: "heading", label: "Heading", detail: "Display title", icon: "H" },
  { kind: "text", label: "Text", detail: "Paragraph line", icon: "T" },
  { kind: "button", label: "Button", detail: "Call-to-action pill", icon: "B" },
  { kind: "image", label: "Image", detail: "Resizable artwork", icon: "I" },
];

const ACCENTS = [
  "from-indigo-600 via-slate-800 to-black",
  "from-rose-600 via-amber-700 to-slate-900",
  "from-yellow-200 via-orange-400 to-red-700",
  "from-zinc-500 via-zinc-800 to-black",
];

const DEFAULT_TEXT: Record<ElementKind, string> = {
  heading: "A new heading",
  text: "A line of supporting text",
  button: "Click me",
  image: "",
};

const defaultElements: CanvasElement[] = [
  { id: "hero-el-heading", kind: "heading", x: 40, y: 72, width: 0, text: "SK / 郭俯宏", accent: "" },
  {
    id: "hero-el-text",
    kind: "text",
    x: 42,
    y: 128,
    width: 0,
    text: "Music, books and ideas — from Kuala Lumpur to the world.",
    accent: "",
  },
  { id: "hero-el-button", kind: "button", x: 42, y: 188, width: 0, text: "Explore music", accent: "" },
  {
    id: "hero-el-image",
    kind: "image",
    x: 420,
    y: 64,
    width: 180,
    text: "",
    accent: "from-indigo-600 via-slate-800 to-black",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function PaletteItem({
  item,
  onAdd,
}: {
  item: (typeof PALETTE)[number];
  onAdd: (kind: ElementKind) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${item.kind}`,
    data: { from: "palette", kind: item.kind },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => onAdd(item.kind)}
      aria-label={`Add ${item.label} to hero`}
      className={`flex cursor-grab items-center gap-3 border border-[#deddd7] bg-white p-3 text-left transition-colors hover:border-black active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center bg-[#171817] text-[10px] font-bold text-accent-yellow">
        {item.icon}
      </span>
      <span className="min-w-0">
        <strong className="block text-xs">{item.label}</strong>
        <small className="text-[10px] text-zinc-500">{item.detail}</small>
      </span>
    </div>
  );
}

function CanvasElementView({
  element,
  selected,
  editing,
  onSelect,
  onStartEdit,
  onCommitText,
  onTextChange,
  onDelete,
  onResizeStart,
  onResizeMove,
  onResizeEnd,
}: {
  element: CanvasElement;
  selected: boolean;
  editing: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onCommitText: () => void;
  onTextChange: (value: string) => void;
  onDelete: () => void;
  onResizeStart: (event: React.PointerEvent) => void;
  onResizeMove: (event: React.PointerEvent) => void;
  onResizeEnd: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id,
    data: { from: "canvas" },
    disabled: editing,
  });

  const dragStyle = transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined;

  let body: React.ReactNode;
  if (editing && element.kind !== "image") {
    const inputClass =
      element.kind === "heading"
        ? "w-72 max-w-[min(72vw,28rem)] border border-dashed border-white/60 bg-black/40 px-1 text-2xl font-bold tracking-[-0.05em] text-white outline-none"
        : element.kind === "button"
          ? "w-40 border border-dashed border-black/40 bg-accent-yellow/90 px-2 text-xs font-semibold text-black outline-none"
          : "w-72 max-w-[min(72vw,28rem)] border border-dashed border-white/40 bg-black/40 px-1 text-sm text-white outline-none";
    body = (
      <input
        autoFocus
        value={element.text}
        onChange={(event) => onTextChange(event.target.value)}
        onBlur={onCommitText}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Escape") onCommitText();
        }}
        onPointerDown={(event) => event.stopPropagation()}
        className={inputClass}
        aria-label={`Edit ${element.kind}`}
      />
    );
  } else if (element.kind === "heading") {
    body = <p className="whitespace-nowrap text-2xl font-bold tracking-[-0.05em] text-white">{element.text}</p>;
  } else if (element.kind === "text") {
    body = <p className="max-w-xs text-sm leading-relaxed text-white/70">{element.text}</p>;
  } else if (element.kind === "button") {
    body = (
      <span className="inline-flex h-9 items-center whitespace-nowrap rounded-full bg-accent-yellow px-4 text-xs font-semibold text-black">
        {element.text}
      </span>
    );
  } else {
    body = (
      <div style={{ width: element.width }} className="relative aspect-square">
        <div className={`absolute inset-0 bg-gradient-to-br ${element.accent}`} />
        <span className="absolute bottom-1 left-1 text-[8px] font-bold uppercase tracking-[0.16em] text-white/75">SK</span>
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent-yellow" />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        left: element.x,
        top: element.y,
        transform: dragStyle,
        zIndex: isDragging ? 30 : selected ? 20 : 1,
      }}
      className="absolute touch-none"
      onPointerDown={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      onDoubleClick={element.kind === "image" ? undefined : onStartEdit}
    >
      <div {...(editing ? {} : { ...attributes, ...listeners })} className={editing ? "" : "cursor-grab active:cursor-grabbing"}>
        {body}
      </div>
      {element.kind === "image" && !editing && (
        <button
          type="button"
          aria-label="Resize image"
          onPointerDown={onResizeStart}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeEnd}
          onPointerCancel={onResizeEnd}
          className="absolute -bottom-1.5 -right-1.5 z-40 h-4 w-4 cursor-nwse-resize border-2 border-black bg-accent-yellow"
        />
      )}
      {selected && !editing && (
        <div className="absolute -top-9 left-0 z-40 flex gap-1">
          {element.kind !== "image" && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onStartEdit();
              }}
              className="bg-black px-2 py-1 text-[10px] font-semibold text-white hover:bg-zinc-800"
            >
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className="bg-black px-2 py-1 text-[10px] font-semibold text-white hover:bg-zinc-800"
          >
            Delete
          </button>
        </div>
      )}
      {selected && <span className="pointer-events-none absolute -inset-2 border-2 border-dashed border-accent-yellow" />}
    </div>
  );
}

function HeroCanvas({
  elements,
  selectedId,
  editingId,
  onCanvasBackground,
  onSelect,
  onStartEdit,
  onCommitText,
  onTextChange,
  onDelete,
  onResizeStart,
  onResizeMove,
  onResizeEnd,
  canvasRef,
}: {
  elements: CanvasElement[];
  selectedId: string | null;
  editingId: string | null;
  onCanvasBackground: () => void;
  onSelect: (id: string) => void;
  onStartEdit: (id: string) => void;
  onCommitText: () => void;
  onTextChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  onResizeStart: (id: string, event: React.PointerEvent) => void;
  onResizeMove: (event: React.PointerEvent) => void;
  onResizeEnd: () => void;
  canvasRef: React.MutableRefObject<HTMLElement | null>;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "hero-canvas" });
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold">
          Hero canvas{" "}
          <span className="ml-2 font-normal text-zinc-500">{isOver ? "release to drop" : "drop zone active"}</span>
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">{elements.length} elements</span>
      </div>
      <div
        ref={(node) => {
          setNodeRef(node);
          canvasRef.current = node;
        }}
        onPointerDown={onCanvasBackground}
        className={`relative min-h-[440px] overflow-visible bg-[#171817] transition-shadow ${isOver ? "ring-2 ring-accent-yellow ring-offset-2 ring-offset-[#f4f4f0]" : ""}`}
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <span className="pointer-events-none absolute right-4 top-4 font-script text-2xl text-white/15">make</span>
        {elements.map((element) => (
          <CanvasElementView
            key={element.id}
            element={element}
            selected={selectedId === element.id}
            editing={editingId === element.id}
            onSelect={() => onSelect(element.id)}
            onStartEdit={() => onStartEdit(element.id)}
            onCommitText={onCommitText}
            onTextChange={(value) => onTextChange(element.id, value)}
            onDelete={() => onDelete(element.id)}
            onResizeStart={(event) => onResizeStart(element.id, event)}
            onResizeMove={onResizeMove}
            onResizeEnd={onResizeEnd}
          />
        ))}
        {elements.length === 0 && (
          <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-white/40">
            Drag elements from the toolbox
          </p>
        )}
      </div>
      <p className="mt-3 text-[11px] text-zinc-400">Demo layout · auto-saved in localStorage · Hero section only</p>
    </div>
  );
}

export default function HeroEditor() {
  const [elements, setElements] = useState<CanvasElement[]>(defaultElements);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const canvasRef = useRef<HTMLElement | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );
  const loaded = useRef(false);
  const draggedRecently = useRef(false);
  const resizing = useRef<{ id: string; startX: number; startWidth: number } | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CanvasElement[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          queueMicrotask(() => setElements(parsed));
        }
      }
    } catch {
      /* ignore */
    }
    queueMicrotask(() => {
      loaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(elements));
    } catch {
      /* ignore */
    }
  }, [elements]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Delete" && event.key !== "Backspace") return;
      if (!selectedId || editingId) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      event.preventDefault();
      setElements((prev) => prev.filter((el) => el.id !== selectedId));
      setSelectedId(null);
      notify("Element deleted");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, editingId, notify]);

  function addFromPalette(kind: ElementKind) {
    if (draggedRecently.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = rect ? clamp(rect.width / 2 - 70, 8, Math.max(8, rect.width - 150)) : 120;
    const y = 32 + ((elements.length * 44) % 260);
    const el: CanvasElement = {
      id: nextElementId(),
      kind,
      x,
      y,
      width: kind === "image" ? 160 : 0,
      text: DEFAULT_TEXT[kind],
      accent: ACCENTS[elementSeed % ACCENTS.length],
    };
    setElements((prev) => [...prev, el]);
    setSelectedId(el.id);
    setEditingId(null);
    notify(`${PALETTE.find((p) => p.kind === kind)?.label ?? "Element"} added`);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over, delta, activatorEvent } = event;
    draggedRecently.current = true;
    window.setTimeout(() => {
      draggedRecently.current = false;
    }, 120);
    if (!over || over.id !== "hero-canvas") return;
    const data = active.data.current as { from?: string; kind?: ElementKind } | undefined;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (data?.from === "palette" && data.kind) {
      const ae = activatorEvent as { clientX?: number; clientY?: number };
      const pointerX = typeof ae.clientX === "number" ? ae.clientX : rect.left + rect.width / 2;
      const pointerY = typeof ae.clientY === "number" ? ae.clientY : rect.top + 60;
      const x = clamp(pointerX + delta.x - rect.left - 20, 8, Math.max(8, rect.width - 90));
      const y = clamp(pointerY + delta.y - rect.top - 12, 8, Math.max(8, rect.height - 40));
      const el: CanvasElement = {
        id: nextElementId(),
        kind: data.kind,
        x,
        y,
        width: data.kind === "image" ? 160 : 0,
        text: DEFAULT_TEXT[data.kind],
        accent: ACCENTS[elementSeed % ACCENTS.length],
      };
      setElements((prev) => [...prev, el]);
      setSelectedId(el.id);
      setEditingId(null);
      notify(`${PALETTE.find((p) => p.kind === data.kind)?.label ?? "Element"} added`);
      return;
    }

    if (data?.from === "canvas") {
      setElements((prev) =>
        prev.map((el) =>
          el.id === active.id
            ? {
                ...el,
                x: clamp(el.x + delta.x, 0, Math.max(0, rect.width - 48)),
                y: clamp(el.y + delta.y, 0, Math.max(0, rect.height - 32)),
              }
            : el,
        ),
      );
      notify("Element moved");
    }
  }

  function startResize(id: string, event: React.PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    const el = elements.find((item) => item.id === id);
    resizing.current = { id, startX: event.clientX, startWidth: el?.width ?? 160 };
    setSelectedId(id);
    setEditingId(null);
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function moveResize(event: React.PointerEvent) {
    const state = resizing.current;
    if (!state) return;
    const width = clamp(state.startWidth + event.clientX - state.startX, 56, 640);
    setElements((prev) => prev.map((el) => (el.id === state.id ? { ...el, width } : el)));
  }

  function endResize() {
    if (resizing.current) notify("Image resized");
    resizing.current = null;
  }

  function deleteElement(id: string) {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (editingId === id) setEditingId(null);
    notify("Element deleted");
  }

  function resetCanvas() {
    setElements(defaultElements);
    setSelectedId(null);
    setEditingId(null);
    notify("Hero reset to defaults");
  }

  return (
    <div className="min-h-screen bg-[#f4f4f0] text-zinc-900">
      <header className="sticky top-0 z-30 border-b border-[#e2e1db] bg-[#f4f4f0]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/admin" className="shrink-0 text-xs font-semibold text-zinc-500 hover:text-black">
              ← Admin
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="hidden text-xs text-zinc-500 sm:inline">Pages</span>
            <span className="hidden text-zinc-300 sm:inline">/</span>
            <span className="truncate text-xs font-semibold">Hero editor</span>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={resetCanvas}
              className="inline-flex h-10 items-center justify-center border border-[#d5d4ce] bg-white px-4 text-xs font-semibold text-zinc-700 hover:border-zinc-500"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => notify("Hero saved to this browser (demo)")}
              className="inline-flex h-10 items-center justify-center bg-black px-4 text-xs font-semibold text-accent-yellow hover:bg-zinc-800"
            >
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10">
        <div className="border-b border-[#dcdcd6] pb-7">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c875c]">Visual editor / Hero</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Design the hero.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
            Drag elements from the toolbox, drop them on the canvas, double-click text to edit, and drag the yellow corner
            handle to resize images. Layout is saved in this browser for the demo.
          </p>
        </div>

        <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
          <div className="mt-8 grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="border border-[#deddd7] bg-[#fbfbf8] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c875c]">Toolbox</p>
              <h2 className="mt-1 text-base font-semibold">Elements</h2>
              <p className="mt-1 text-[10px] text-zinc-500">Drag onto the canvas or click to add</p>
              <div className="mt-4 space-y-2">
                {PALETTE.map((item) => (
                  <PaletteItem key={item.kind} item={item} onAdd={addFromPalette} />
                ))}
              </div>
              <ul className="mt-6 space-y-2 border-t border-[#e8e7e2] pt-4 text-[10px] leading-relaxed text-zinc-500">
                <li>Double-click text or button to edit</li>
                <li>Drag any element to reposition</li>
                <li>Yellow corner resizes images</li>
                <li>Delete key removes selection</li>
              </ul>
            </aside>

            <HeroCanvas
              elements={elements}
              selectedId={selectedId}
              editingId={editingId}
              canvasRef={canvasRef}
              onCanvasBackground={() => {
                if (!editingId) setSelectedId(null);
              }}
              onSelect={setSelectedId}
              onStartEdit={(id) => {
                setSelectedId(id);
                setEditingId(id);
              }}
              onCommitText={() => setEditingId(null)}
              onTextChange={(id, value) =>
                setElements((prev) => prev.map((el) => (el.id === id ? { ...el, text: value } : el)))
              }
              onDelete={deleteElement}
              onResizeStart={startResize}
              onResizeMove={moveResize}
              onResizeEnd={endResize}
            />
          </div>
        </DndContext>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-black px-4 py-3 text-xs font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
