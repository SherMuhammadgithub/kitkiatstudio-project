"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Module = "Overview" | "Music" | "Books" | "Blog" | "Media" | "Pages" | "Enquiries" | "Comments" | "SEO" | "Settings";
type Status = "Published" | "Draft" | "Scheduled" | "Archived";
type ContentType = "Album" | "Book" | "Blog post";

type ContentRow = {
  id: string;
  title: string;
  kind: string;
  status: Status;
  updated: string;
  accent: string;
  meta: string;
};

type ModalState =
  | { kind: "create"; contentType: ContentType }
  | { kind: "view"; row: ContentRow }
  | { kind: "upload" }
  | null;

type MediaAsset = {
  id: string;
  name: string;
  type: string;
  size: string;
  accent: string;
  used: boolean;
};

const NAV: { label: Module; caption: string; icon: string }[] = [
  { label: "Overview", caption: "总览", icon: "O" },
  { label: "Music", caption: "音乐", icon: "M" },
  { label: "Books", caption: "书籍", icon: "B" },
  { label: "Blog", caption: "部落格", icon: "W" },
  { label: "Media", caption: "媒体库", icon: "A" },
  { label: "Pages", caption: "页面结构", icon: "P" },
];

const WORKSPACE_NAV: { label: Module; caption: string; icon: string }[] = [
  { label: "Enquiries", caption: "询问", icon: "Q" },
  { label: "Comments", caption: "评论", icon: "C" },
  { label: "SEO", caption: "搜索优化", icon: "S" },
  { label: "Settings", caption: "设置", icon: "G" },
];

const initialRows: ContentRow[] = [
  { id: "album-1", title: "SK Principium", kind: "Album", status: "Published", updated: "12 Aug 2026", accent: "from-indigo-600 via-slate-800 to-black", meta: "5 tracks · 2021" },
  { id: "album-2", title: "S Major and K Minor", kind: "Album", status: "Published", updated: "09 Aug 2026", accent: "from-rose-600 via-amber-700 to-slate-900", meta: "6 tracks · 2023" },
  { id: "album-3", title: "Unreleased Sessions", kind: "EP", status: "Draft", updated: "04 Aug 2026", accent: "from-emerald-700 via-teal-800 to-slate-950", meta: "2 tracks · 2026" },
];

const blogRows: ContentRow[] = [
  { id: "post-1", title: "理性看待母校性骚扰事件｜从制度与定义出发", kind: "求职与职场", status: "Published", updated: "13 Oct 2025", accent: "from-stone-400 via-zinc-700 to-zinc-950", meta: "5 min read" },
  { id: "post-2", title: "我对美国小费文化的迷思", kind: "生活观察", status: "Published", updated: "27 Aug 2023", accent: "from-amber-300 via-orange-700 to-zinc-900", meta: "4 min read" },
  { id: "post-3", title: "从小Kampung去到了全球科技总部谷歌", kind: "求职与职场", status: "Draft", updated: "22 Aug 2026", accent: "from-sky-500 via-indigo-800 to-zinc-950", meta: "8 min read" },
];

const bookRows: ContentRow[] = [
  { id: "book-1", title: "拓展你的人生地图", kind: "Book", status: "Published", updated: "06 Aug 2026", accent: "from-yellow-200 via-orange-400 to-red-700", meta: "ISBN 978-986-962642-2" },
  { id: "book-2", title: "The Map Is Not Your Territory", kind: "Book · English edition", status: "Scheduled", updated: "28 Aug 2026", accent: "from-lime-200 via-green-600 to-zinc-900", meta: "PlenorHub mapped" },
];

const tracks = [
  { id: "track-1", number: "01", title: "Principium", duration: "3:42", credits: "Written & produced by SK" },
  { id: "track-2", number: "02", title: "Attitude", duration: "4:05", credits: "Written by SK · Mixed by J. Tan" },
  { id: "track-3", number: "03", title: "Aptitude", duration: "3:18", credits: "Written & produced by SK" },
  { id: "track-4", number: "04", title: "Change", duration: "3:57", credits: "Written by SK" },
];

const initialMedia: MediaAsset[] = [
  { id: "media-1", name: "Principium cover", type: "JPG", size: "1.2 MB", accent: "from-indigo-600 via-slate-800 to-black", used: true },
  { id: "media-2", name: "S Major live", type: "JPG", size: "2.4 MB", accent: "from-rose-600 via-amber-700 to-slate-900", used: true },
  { id: "media-3", name: "Studio portrait", type: "JPG", size: "860 KB", accent: "from-zinc-400 via-zinc-700 to-black", used: true },
  { id: "media-4", name: "Book jacket", type: "PNG", size: "1.8 MB", accent: "from-yellow-200 via-orange-400 to-red-700", used: true },
  { id: "media-5", name: "Interview still", type: "JPG", size: "920 KB", accent: "from-sky-400 via-indigo-800 to-zinc-950", used: false },
  { id: "media-6", name: "Partner logo", type: "SVG", size: "42 KB", accent: "from-lime-200 via-green-600 to-zinc-900", used: false },
];

function StatusPill({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Published: "bg-[#e5f4d0] text-[#355715]",
    Draft: "bg-[#eeeaf8] text-[#5c4d7d]",
    Scheduled: "bg-[#fff0c9] text-[#805c00]",
    Archived: "bg-zinc-200 text-zinc-600",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

function SortableTrack({ track }: { track: (typeof tracks)[number] }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: track.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className="group flex items-center gap-3 border-b border-[#e7e6e1] py-3 last:border-0">
      <button {...attributes} {...listeners} aria-label={`Reorder ${track.title}`} className="cursor-grab px-1 text-lg leading-none text-zinc-300 transition-colors hover:text-zinc-700 active:cursor-grabbing">::</button>
      <span className="w-6 font-mono text-[11px] text-zinc-400">{track.number}</span>
      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-zinc-900">{track.title}</p><p className="truncate text-xs text-zinc-500">{track.credits}</p></div>
      <span className="font-mono text-xs text-zinc-500">{track.duration}</span>
      <button className="hidden rounded-md border border-[#deddd7] px-2 py-1 text-[11px] text-zinc-500 hover:bg-white group-hover:block">Edit</button>
    </div>
  );
}

function Artwork({ accent, title }: { accent: string; title: string }) {
  return <div className={`relative aspect-square w-12 shrink-0 overflow-hidden bg-gradient-to-br ${accent}`}><span className="absolute bottom-1 left-1 text-[8px] font-bold uppercase tracking-[0.16em] text-white/75">{title.slice(0, 2)}</span><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent-yellow" /></div>;
}

export default function AdminPage() {
  const [active, setActive] = useState<Module>("Overview");
  const [rows, setRows] = useState(initialRows);
  const [blogContent, setBlogContent] = useState(blogRows);
  const [bookContent, setBookContent] = useState(bookRows);
  const [media, setMedia] = useState(initialMedia);
  const [filter, setFilter] = useState<Status | "All">("All");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [orderedTracks, setOrderedTracks] = useState(tracks);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function openCreate(label: string) {
    if (label === "Upload Media") {
      setActive("Media");
      setModal({ kind: "upload" });
      notify("Media uploader opened");
      return;
    }
    const contentType = label === "New Blog Post" ? "Blog post" : label === "New Book" ? "Book" : "Album";
    setActive(contentType === "Blog post" ? "Blog" : contentType === "Book" ? "Books" : "Music");
    setModal({ kind: "create", contentType });
    notify(`${label} draft started`);
  }

  function addContent(contentType: ContentType, title: string) {
    const base = { id: `${contentType.toLowerCase().replace(" ", "-")}-${Date.now()}`, title, status: "Draft" as Status, updated: "Just now", accent: "from-accent-purple via-zinc-700 to-zinc-950" };
    if (contentType === "Album") setRows((current) => [{ ...base, kind: "Album", meta: "0 tracks · 2026" }, ...current]);
    if (contentType === "Book") setBookContent((current) => [{ ...base, kind: "Book", meta: "Draft profile" }, ...current]);
    if (contentType === "Blog post") setBlogContent((current) => [{ ...base, kind: "Editorial", meta: "0 min read" }, ...current]);
    setModal(null);
    notify(`${title} saved as draft`);
  }

  function addMedia(asset: MediaAsset) {
    setMedia((current) => [asset, ...current]);
    setModal(null);
    notify(`${asset.name} added to media library`);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active: dragged, over } = event;
    if (!over || dragged.id === over.id) return;
    setOrderedTracks((current) => {
      const oldIndex = current.findIndex((track) => track.id === dragged.id);
      const newIndex = current.findIndex((track) => track.id === over.id);
      return arrayMove(current, oldIndex, newIndex).map((track, index) => ({ ...track, number: String(index + 1).padStart(2, "0") }));
    });
    notify("Track order updated");
  }

  const currentRows = active === "Blog" ? blogContent : active === "Books" ? bookContent : rows;
  const filteredRows = currentRows.filter((row) => (filter === "All" || row.status === filter) && row.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="admin-shell min-h-screen bg-[#f4f4f0] text-zinc-900">
      <aside className={`admin-sidebar fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col bg-[#171817] px-4 py-5 text-white transition-transform lg:translate-x-0 ${showMobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-start justify-between px-3"><div><p className="text-lg font-bold tracking-[-0.04em]">SK <span className="font-normal text-white/60">郭俯宏</span></p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Studio console</p></div><button onClick={() => setShowMobileNav(false)} className="text-xl text-white/40 lg:hidden">×</button></div>
        <div className="mt-9 flex-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Workspace</p>
          <nav className="mt-3 space-y-1">{NAV.map((item) => <NavItem key={item.label} item={item} active={active} onClick={() => { setActive(item.label); setEditorOpen(false); setShowMobileNav(false); }} />)}</nav>
          <p className="mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Operations</p>
          <nav className="mt-3 space-y-1">{WORKSPACE_NAV.map((item) => <NavItem key={item.label} item={item} active={active} onClick={() => { setActive(item.label); setEditorOpen(false); setShowMobileNav(false); }} />)}</nav>
        </div>
        <div className="border-t border-white/10 pt-4"><div className="flex items-center gap-3 px-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-accent-purple text-xs font-bold text-black">KS</div><div><p className="text-xs font-semibold">Ker Soon Kiat</p><p className="mt-0.5 text-[10px] text-white/40">Super administrator</p></div><span className="ml-auto h-2 w-2 rounded-full bg-accent-yellow" /></div><button onClick={() => notify("Production preview opened") } className="mt-4 w-full border border-white/15 px-3 py-2 text-left text-[11px] text-white/60 transition-colors hover:border-white/40 hover:text-white">↗ View public site</button></div>
      </aside>

      <main className="lg:pl-[252px]">
        <header className="sticky top-0 z-30 border-b border-[#e2e1db] bg-[#f4f4f0]/95 backdrop-blur">
          <div className="flex h-[72px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"><div className="flex items-center gap-3"><button onClick={() => setShowMobileNav(true)} className="grid h-9 w-9 place-items-center border border-[#d9d8d2] text-sm lg:hidden">☰</button><div><p className="text-sm font-semibold">{active === "Overview" ? "Good morning, Ker Soon" : active}</p><p className="hidden text-xs text-zinc-500 sm:block">Your studio is calm. Here is what needs your attention.</p></div></div><div className="flex items-center gap-2 sm:gap-3"><span className="hidden items-center gap-2 rounded-full border border-[#deddd7] bg-white px-3 py-2 text-[10px] font-semibold text-zinc-500 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#75a633]" /> UAT environment</span><button onClick={() => notify("Notifications are all caught up") } className="relative grid h-9 w-9 place-items-center border border-[#deddd7] bg-white text-sm">○<span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-yellow" /></button><div className="grid h-9 w-9 place-items-center rounded-full bg-black text-[10px] font-bold text-accent-yellow">KS</div></div></div>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10">
          {editorOpen && active === "Music" ? <ReleaseEditor orderedTracks={orderedTracks} sensors={sensors} onDragEnd={handleDragEnd} onClose={() => setEditorOpen(false)} onNotify={notify} /> : <>
            {active === "Overview" ? <Overview onCreate={openCreate} onNavigate={setActive} onNotify={notify} /> : <ModuleView module={active} rows={currentRows} filteredRows={filteredRows} filter={filter} query={query} setFilter={setFilter} setQuery={setQuery} onCreate={openCreate} onNotify={notify} onEdit={(row) => setModal({ kind: "view", row })} media={media} onUpload={() => setModal({ kind: "upload" })} />}
          </>}
        </div>
      </main>
      {showMobileNav && <button aria-label="Close navigation" onClick={() => setShowMobileNav(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}
      {toast && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-black bg-black px-4 py-3 text-xs font-semibold text-white shadow-xl">{toast}</div>}
      {modal?.kind === "create" && <CreateModal contentType={modal.contentType} onClose={() => setModal(null)} onSave={(title) => addContent(modal.contentType, title)} />}
      {modal?.kind === "view" && <ViewModal row={modal.row} onClose={() => setModal(null)} onEdit={() => { setModal(null); setActive("Music"); setEditorOpen(true); }} onNotify={notify} />}
      {modal?.kind === "upload" && <UploadModal onClose={() => setModal(null)} onUpload={addMedia} />}
    </div>
  );
}

function NavItem({ item, active, onClick }: { item: { label: Module; caption: string; icon: string }; active: Module; onClick: () => void }) {
  const selected = active === item.label;
  return <button onClick={onClick} className={`group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${selected ? "bg-accent-yellow text-black" : "text-white/55 hover:bg-white/5 hover:text-white"}`}><span className={`grid h-6 w-6 place-items-center text-[10px] font-bold ${selected ? "bg-black text-accent-yellow" : "border border-current"}`}>{item.icon}</span><span className="flex-1 text-sm font-medium">{item.label}</span><span className={`text-[10px] ${selected ? "text-black/60" : "text-white/30"}`}>{item.caption}</span></button>;
}

function PageHeading({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail: string; action?: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-5 border-b border-[#dcdcd6] pb-7 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c875c]">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-4xl">{title}</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">{detail}</p></div>{action}</div>;
}

function Button({ children, onClick, secondary = false }: { children: React.ReactNode; onClick?: () => void; secondary?: boolean }) {
  return <button onClick={onClick} className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap px-4 text-xs font-semibold transition-transform active:translate-y-px ${secondary ? "border border-[#d5d4ce] bg-white text-zinc-700 hover:border-zinc-500" : "bg-black text-accent-yellow hover:bg-zinc-800"}`}>{children}</button>;
}

function Overview({ onCreate, onNavigate, onNotify }: { onCreate: (label: string) => void; onNavigate: (module: Module) => void; onNotify: (message: string) => void }) {
  return <div><PageHeading eyebrow="Studio console / 01" title="Your studio, in one view." detail="A quiet place to publish music, books and ideas without touching the code." action={<Button onClick={() => onNotify("Preview opened in a new tab")}>↗ Preview site</Button>} />
    <section className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-[#deddd7] bg-[#deddd7] md:grid-cols-4">{[["14", "Published items", "+2 this month"], ["03", "In draft", "Needs review"], ["07", "Pending actions", "Comments + enquiries"], ["1.8 GB", "Media storage", "UAT bucket"]].map(([value, label, note], index) => <div key={label} className={`bg-[#fbfbf8] p-5 sm:p-6 ${index === 0 ? "bg-accent-yellow" : ""}`}><p className={`font-mono text-2xl font-semibold tracking-[-0.07em] ${index === 0 ? "text-black" : "text-zinc-950"}`}>{value}</p><p className={`mt-4 text-xs font-semibold ${index === 0 ? "text-black" : "text-zinc-800"}`}>{label}</p><p className={`mt-1 text-[11px] ${index === 0 ? "text-black/60" : "text-zinc-500"}`}>{note}</p></div>)}</section>
    <section className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]"><div className="border border-[#deddd7] bg-[#fbfbf8] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-base font-semibold tracking-tight">Start something new</h2><p className="mt-1 text-xs text-zinc-500">Create a draft and shape it before it goes live.</p></div><span className="font-script text-3xl text-[#abb888]">make</span></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{[["New Album", "Music release", "M"], ["New Book", "Book profile", "B"], ["New Blog Post", "Editorial story", "W"]].map(([label, detail, icon]) => <button key={label} onClick={() => onCreate(label)} className="group flex min-h-[132px] flex-col justify-between border border-[#deddd7] bg-white p-4 text-left transition-colors hover:border-black hover:bg-accent-yellow"><span className="grid h-8 w-8 place-items-center border border-current text-xs font-bold">{icon}</span><span><strong className="block text-sm">+ {label}</strong><small className="mt-1 block text-[11px] text-zinc-500 group-hover:text-black/60">{detail}</small></span></button>)}</div><button onClick={() => onCreate("Upload Media")} className="mt-3 flex w-full items-center justify-center gap-2 border border-dashed border-[#c8c7c0] py-3 text-xs font-semibold text-zinc-600 transition-colors hover:border-black hover:text-black">↑ Upload media <span className="font-normal text-zinc-400">or browse library</span></button></div><div className="border border-[#deddd7] bg-[#171817] p-5 text-white sm:p-6"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-yellow">Needs attention</p><h2 className="mt-2 text-xl font-semibold tracking-tight">Keep the studio moving.</h2></div><span className="text-2xl text-white/30">↗</span></div><div className="mt-8 space-y-4">{[["02", "Draft releases", "Unreleased Sessions is waiting", "Music"], ["03", "Unread enquiries", "Last message 2 hours ago", "Enquiries"], ["02", "Comments to review", "Moderation queue is active", "Comments"]].map(([count, label, detail, target]) => <button key={label} onClick={() => onNavigate(target as Module)} className="flex w-full items-center gap-3 border-t border-white/10 pt-4 text-left hover:text-accent-yellow"><span className="font-mono text-xl text-accent-yellow">{count}</span><span className="flex-1"><strong className="block text-xs">{label}</strong><small className="mt-1 block text-[11px] text-white/45">{detail}</small></span><span className="text-white/30">→</span></button>)}</div></div></section>
    <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"><div><div className="mb-3 flex items-end justify-between"><div><h2 className="text-base font-semibold">Recent activity</h2><p className="mt-1 text-xs text-zinc-500">The latest changes across your content.</p></div><button onClick={() => onNavigate("Settings")} className="text-xs font-semibold underline underline-offset-4">View history</button></div><div className="border-y border-[#deddd7] bg-[#fbfbf8]">{[["KS", "Published", "S Major and K Minor", "12 minutes ago"], ["KS", "Updated media", "Principium cover — Studio", "2 hours ago"], ["SY", "Drafted", "从小Kampung去到了全球科技总部谷歌", "Yesterday"]].map(([initials, action, object, time]) => <div key={object} className="flex items-center gap-3 border-b border-[#e8e7e2] px-4 py-4 last:border-0"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e9e8e1] text-[9px] font-bold">{initials}</span><p className="min-w-0 flex-1 text-xs"><span className="font-semibold">{action}</span> <span className="text-zinc-500">{object}</span></p><time className="shrink-0 text-[10px] text-zinc-400">{time}</time></div>)}</div></div><div className="border border-[#deddd7] bg-accent-purple/35 p-5 sm:p-6"><div className="flex justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Commerce bridge</p><h2 className="mt-2 text-xl font-semibold tracking-tight">PlenorHub</h2></div><span className="grid h-8 w-8 place-items-center rounded-full bg-[#dceac3] text-xs font-bold text-[#355715]">✓</span></div><p className="mt-7 text-xs leading-relaxed text-zinc-600">Catalog sync is healthy. Editorial content stays here; price, stock and checkout stay with PlenorHub.</p><div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-[11px]"><span className="text-zinc-500">Last sync</span><strong>Today, 09:42</strong></div><button onClick={() => onNavigate("Books")} className="mt-4 text-xs font-semibold underline underline-offset-4">View mapped books →</button></div></section>
  </div>;
}

function ModuleView({ module, rows, filteredRows, filter, query, setFilter, setQuery, onCreate, onNotify, onEdit, media, onUpload }: { module: Module; rows: ContentRow[]; filteredRows: ContentRow[]; filter: Status | "All"; query: string; setFilter: (value: Status | "All") => void; setQuery: (value: string) => void; onCreate: (label: string) => void; onNotify: (message: string) => void; onEdit: (row: ContentRow) => void; media: MediaAsset[]; onUpload: () => void }) {
  const copy: Record<Module, [string, string, string, string]> = { Music: ["Music / 音乐", "Releases", "Manage albums, EPs and singles, including tracks, credits and streaming links.", "New Album"], Books: ["Books / 书籍", "Books", "Keep editorial book details separate from commerce data synced from PlenorHub.", "New Book"], Blog: ["Blog / 部落格", "Stories", "Draft, schedule and publish Chinese-first editorial content with clean metadata.", "New Blog Post"], Media: ["Library / 媒体库", "Media library", "One client-owned home for cover art, photos, audio and video poster images.", "Upload Media"], Pages: ["Structure / 页面", "Page sections", "Build Home, Music and Book pages from controlled, reusable sections.", "Add Section"], Enquiries: ["Inbox / 询问", "Enquiries", "Review contact form submissions and keep follow-up work visible.", "Export CSV"], Comments: ["Moderation / 评论", "Comments", "Approve, reject or archive public comments before they appear on the site.", "Moderate queue"], SEO: ["Discoverability / 搜索优化", "SEO & redirects", "Protect indexed URLs, metadata and social previews during the Wix migration.", "Add redirect"], Settings: ["Control room / 设置", "Settings", "Manage site identity, navigation, social links and publishing preferences.", "Save changes"], Overview: ["", "", "", ""] };
  const [eyebrow, title, detail, action] = copy[module];
  if (["Media", "Pages", "Enquiries", "Comments", "SEO", "Settings"].includes(module)) return <UtilityView module={module} eyebrow={eyebrow} title={title} detail={detail} action={action} onNotify={onNotify} media={media} onUpload={onUpload} />;
  return <div><PageHeading eyebrow={eyebrow} title={title} detail={detail} action={<Button onClick={() => onCreate(action)}>+ {action}</Button>} /><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-1 overflow-x-auto pb-1">{(["All", "Published", "Draft", "Scheduled", "Archived"] as const).map((status) => <button key={status} onClick={() => setFilter(status)} className={`whitespace-nowrap px-3 py-2 text-xs font-semibold ${filter === status ? "bg-black text-accent-yellow" : "text-zinc-500 hover:bg-white"}`}>{status}</button>)}</div><label className="flex h-9 min-w-[230px] items-center gap-2 border border-[#d9d8d2] bg-white px-3 text-xs text-zinc-400"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search content" className="w-full bg-transparent outline-none placeholder:text-zinc-400" /></label></div><div className="mt-5 overflow-hidden border border-[#deddd7] bg-[#fbfbf8]"><div className="hidden grid-cols-[minmax(0,1.4fr)_120px_135px_100px_40px] gap-4 border-b border-[#deddd7] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 sm:grid"><span>Title</span><span>Type</span><span>Status</span><span>Updated</span><span /></div>{filteredRows.map((row) => <ContentItem key={row.id} row={row} onEdit={() => onEdit(row)} />)}{filteredRows.length === 0 && <div className="p-12 text-center text-sm text-zinc-500">No content matches this view.</div>}</div><p className="mt-3 text-[11px] text-zinc-400">Showing {filteredRows.length} of {rows.length} items · In-memory mock data</p></div>;
}

function ContentItem({ row, onEdit }: { row: ContentRow; onEdit: () => void }) {
  return <button onClick={onEdit} className="group grid w-full gap-3 border-b border-[#e8e7e2] px-4 py-4 text-left transition-colors last:border-0 hover:bg-white sm:grid-cols-[minmax(0,1.4fr)_120px_135px_100px_40px] sm:items-center sm:gap-4 sm:px-5"><div className="flex min-w-0 items-center gap-3"><Artwork accent={row.accent} title={row.title} /><div className="min-w-0"><p className="truncate text-sm font-semibold text-zinc-900 group-hover:underline group-hover:underline-offset-4">{row.title}</p><p className="mt-1 text-xs text-zinc-500">{row.meta}</p></div></div><span className="text-xs text-zinc-500 sm:block">{row.kind}</span><span><StatusPill status={row.status} /></span><span className="text-[11px] text-zinc-400">{row.updated}</span><span className="hidden text-lg text-zinc-300 group-hover:text-black sm:block">→</span></button>;
}

function ReleaseEditor({ orderedTracks, sensors, onDragEnd, onClose, onNotify }: { orderedTracks: typeof tracks; sensors: ReturnType<typeof useSensors>; onDragEnd: (event: DragEndEvent) => void; onClose: () => void; onNotify: (message: string) => void }) {
  return <div><div className="flex items-center gap-3 border-b border-[#dcdcd6] pb-6"><button onClick={onClose} className="text-xs font-semibold text-zinc-500 hover:text-black">← Music</button><span className="text-zinc-300">/</span><span className="text-xs text-zinc-500">New release</span></div><div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c875c]">Draft / Release editor</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em]">Shape the next chapter.</h1><p className="mt-2 text-sm text-zinc-500">Build the release page from content you control.</p></div><div className="flex gap-2"><Button secondary onClick={() => onNotify("Secure preview generated")}>Preview</Button><Button onClick={() => onNotify("Release saved as draft")}>Save draft</Button></div></div><div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.8fr]"><div className="space-y-6"><EditorCard title="Release details" help="The essentials visitors see first."><div className="grid gap-5 sm:grid-cols-2"><Field label="Release title" value="New release" /><Field label="Release type" value="Album" select /><Field label="Release year" value="2026" /><Field label="Slug" value="new-release" /></div><div className="mt-5"><label className="mb-2 block text-xs font-semibold">Description</label><textarea defaultValue="A new chapter in the SK catalogue." rows={4} className="w-full resize-none border border-[#d9d8d2] bg-white p-3 text-sm outline-none focus:border-black" /></div></EditorCard><EditorCard title="Track list" help="Drag to set the public order."><DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}><SortableContext items={orderedTracks.map((track) => track.id)} strategy={verticalListSortingStrategy}>{orderedTracks.map((track) => <SortableTrack key={track.id} track={track} />)}</SortableContext></DndContext><button onClick={() => onNotify("New track row added") } className="mt-3 w-full border border-dashed border-[#c8c7c0] py-3 text-xs font-semibold text-zinc-600 hover:border-black hover:text-black">+ Add track</button></EditorCard></div><div className="space-y-6"><EditorCard title="Cover artwork" help="Select from the media library."><div className="flex gap-4"><div className="grid aspect-square w-32 shrink-0 place-items-center bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-950 text-3xl font-black text-accent-yellow">SK</div><div className="flex flex-col items-start justify-center"><p className="text-sm font-semibold">No cover selected</p><p className="mt-1 text-xs leading-relaxed text-zinc-500">Use a 1:1 image for the best result on release cards.</p><button onClick={() => onNotify("Media picker opened") } className="mt-4 text-xs font-semibold underline underline-offset-4">Choose media →</button></div></div></EditorCard><EditorCard title="Streaming platforms" help="Exact links, never generic homepages.">{["Spotify", "Apple Music", "YouTube Music", "SoundCloud"].map((platform, index) => <div key={platform} className="flex items-center gap-3 border-b border-[#e7e6e1] py-3 last:border-0"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#eeeaf8] text-[10px] font-bold">{platform[0]}</span><span className="flex-1 text-xs font-semibold">{platform}</span><input defaultValue={index < 2 ? `https://${platform.toLowerCase().replaceAll(" ", "")}.com/sk-principium` : ""} placeholder="Release URL" className="hidden w-44 border border-[#d9d8d2] bg-white px-2 py-2 text-[10px] outline-none focus:border-black sm:block" /><span className={`h-2 w-2 rounded-full ${index < 2 ? "bg-[#75a633]" : "bg-zinc-300"}`} /></div>)}<button onClick={() => onNotify("Platform added to release")} className="mt-3 text-xs font-semibold underline underline-offset-4">+ Add platform</button></EditorCard><EditorCard title="Publishing" help="Nothing goes public without your say-so."><div className="flex items-center justify-between border-b border-[#e7e6e1] pb-3"><span className="text-xs text-zinc-500">Visibility</span><strong className="text-xs">Draft</strong></div><div className="mt-3 flex items-center justify-between"><span className="text-xs text-zinc-500">Schedule release</span><button onClick={() => onNotify("Schedule picker opened")} className="text-xs font-semibold underline underline-offset-4">Add date</button></div></EditorCard></div></div></div>;
}

function EditorCard({ title, help, children }: { title: string; help: string; children: React.ReactNode }) { return <section className="border border-[#deddd7] bg-[#fbfbf8] p-5 sm:p-6"><div className="mb-5"><h2 className="text-base font-semibold">{title}</h2><p className="mt-1 text-xs text-zinc-500">{help}</p></div>{children}</section>; }
function Field({ label, value, select = false }: { label: string; value: string; select?: boolean }) { return <label className="block text-xs font-semibold">{label}<div className="relative mt-2"><input defaultValue={value} className="w-full border border-[#d9d8d2] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-black" />{select && <span className="pointer-events-none absolute right-3 top-2.5 text-zinc-400">⌄</span>}</div></label>; }

function UtilityView({ module, eyebrow, title, detail, action, onNotify, media, onUpload }: { module: Module; eyebrow: string; title: string; detail: string; action: string; onNotify: (message: string) => void; media: MediaAsset[]; onUpload: () => void }) {
  const utility = module === "Media" ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{["Principium cover", "S Major live", "Studio portrait", "Book jacket", "Interview still", "Partner logo"].map((asset, index) => <button key={asset} onClick={() => onNotify(`${asset} selected`)} className="group text-left"><div className={`relative aspect-square bg-gradient-to-br ${["from-indigo-600 via-slate-800 to-black", "from-rose-600 via-amber-700 to-slate-900", "from-zinc-400 via-zinc-700 to-black", "from-yellow-200 via-orange-400 to-red-700", "from-sky-400 via-indigo-800 to-zinc-950", "from-lime-200 via-green-600 to-zinc-900"][index]}`}><span className="absolute bottom-3 left-3 text-xs font-semibold text-white">SK</span><span className="absolute right-3 top-3 bg-white px-1.5 py-1 text-[9px] font-semibold text-black">{index % 2 === 0 ? "Used" : "Ready"}</span></div><p className="mt-2 truncate text-xs font-semibold group-hover:underline">{asset}</p><p className="mt-1 text-[10px] text-zinc-500">JPG · 1.2 MB</p></button>)}</div> : module === "Pages" ? <div className="grid gap-3 md:grid-cols-2">{["Home page", "Music landing", "Book landing", "Contact page"].map((page, index) => <div key={page} className="border border-[#deddd7] bg-[#fbfbf8] p-5"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold">{page}</p><p className="mt-1 text-xs text-zinc-500">{index + 5} reusable sections</p></div><StatusPill status={index === 3 ? "Draft" : "Published"} /></div><div className="mt-5 space-y-2">{["Hero", index === 1 ? "Album grid" : "Rich text", "Latest posts"].map((section, sectionIndex) => <div key={section} className="flex items-center gap-2 border border-[#e8e7e2] bg-white px-3 py-2 text-xs"><span className="text-zinc-300">::</span><span className="flex-1">{section}</span><span className="text-[10px] text-zinc-400">{sectionIndex === 2 ? "Hidden" : "Visible"}</span></div>)}</div><button onClick={() => onNotify(`${page} section builder opened`)} className="mt-4 text-xs font-semibold underline underline-offset-4">Edit structure →</button></div>)}</div> : module === "Enquiries" ? <div className="border-y border-[#deddd7] bg-[#fbfbf8]">{[["A", "Alicia Tan", "Speaking enquiry", "2 hours ago", "Unread"], ["M", "Marcus Lim", "Music collaboration", "Yesterday", "Read"], ["S", "Siti Rahmah", "Book purchase question", "12 Aug 2026", "Read"]].map(([initial, name, subject, time, state]) => <button key={name} onClick={() => onNotify(`${name}'s enquiry opened`)} className="flex w-full items-center gap-3 border-b border-[#e8e7e2] px-4 py-4 text-left last:border-0 hover:bg-white"><span className="grid h-8 w-8 place-items-center rounded-full bg-accent-purple text-xs font-bold">{initial}</span><span className="flex-1"><strong className="block text-xs">{subject}</strong><small className="mt-1 block text-[11px] text-zinc-500">{name} · {time}</small></span><span className={`text-[10px] font-semibold ${state === "Unread" ? "text-[#658d2c]" : "text-zinc-400"}`}>{state}</span><span>→</span></button>)}</div> : module === "Comments" ? <div className="space-y-3">{[["理性看待母校性骚扰事件", "The article made me think about how…", "Pending"], ["我对美国小费文化的迷思", "Interesting perspective from the US.", "Pending"], ["从小Kampung去到了全球科技总部谷歌", "Thank you for sharing this story.", "Approved"]].map(([post, comment, state]) => <div key={comment} className="flex flex-col gap-4 border border-[#deddd7] bg-[#fbfbf8] p-5 sm:flex-row sm:items-center"><div className="flex-1"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">{post}</p><p className="mt-2 text-sm text-zinc-700">“{comment}”</p><p className="mt-2 text-[11px] text-zinc-400">Guest commenter · 1 day ago</p></div><div className="flex items-center gap-2"><StatusPill status={state === "Approved" ? "Published" : "Scheduled"} /><button onClick={() => onNotify(`${state === "Approved" ? "Comment rejected" : "Comment approved"}`)} className="border border-[#d9d8d2] px-3 py-2 text-[11px] font-semibold hover:border-black">{state === "Approved" ? "Reject" : "Approve"}</button></div></div>)}</div> : module === "SEO" ? <div className="space-y-3">{[["/", "Home", "Indexed", "Attitude defines Your Aptitude..."], ["/book", "Book landing", "Indexed", "书本与教育专区 | SK 郭俯宏"], ["/post/chhs-sexual-harrasment-incident", "Article", "Redirect", "理性看待母校性骚扰事件..."]].map(([path, name, state, titleValue]) => <div key={path} className="grid gap-3 border border-[#deddd7] bg-[#fbfbf8] p-4 sm:grid-cols-[1.5fr_1fr_100px_40px] sm:items-center"><div><p className="font-mono text-[11px] text-zinc-600">{path}</p><p className="mt-1 text-xs text-zinc-400">{name}</p></div><p className="truncate text-xs text-zinc-600">{titleValue}</p><span className={`text-[10px] font-semibold ${state === "Redirect" ? "text-[#805c00]" : "text-[#658d2c]"}`}>{state}</span><button onClick={() => onNotify(`${path} SEO settings opened`)} className="text-lg text-zinc-400 hover:text-black">→</button></div>)}</div> : <div className="max-w-2xl border border-[#deddd7] bg-[#fbfbf8] p-5 sm:p-6"><div className="grid gap-5 sm:grid-cols-2"><Field label="Studio name" value="KitKiat Studio" /><Field label="Public email" value="sk21.service@gmail.com" /><Field label="Default language" value="Chinese (zh-Hans)" select /><Field label="Copyright year" value="2026" /></div><div className="mt-7 border-t border-[#e7e6e1] pt-5"><p className="text-xs font-semibold">Social links</p>{["Facebook", "Instagram", "LinkedIn", "YouTube"].map((social) => <div key={social} className="mt-3 flex items-center gap-3"><span className="w-20 text-xs text-zinc-500">{social}</span><input defaultValue={`https://${social.toLowerCase()}.com/sk_ker21`} className="flex-1 border border-[#d9d8d2] bg-white px-3 py-2 text-xs outline-none focus:border-black" /></div>)}</div></div>;
  return <div><PageHeading eyebrow={eyebrow} title={title} detail={detail} action={<Button onClick={module === "Media" ? onUpload : () => onNotify(`${action} action triggered`)}>+ {action}</Button>} /><div className="mt-8">{utility}</div>{module === "Media" && media.length > initialMedia.length && <UploadedMedia assets={media.slice(initialMedia.length)} onNotify={onNotify} />} {module === "Media" && <p className="mt-4 text-[11px] text-zinc-400">{media.length} assets · In-memory library for this demo.</p>}</div>;
}

function UploadedMedia({ assets, onNotify }: { assets: MediaAsset[]; onNotify: (message: string) => void }) {
  return <div className="mt-8 border-t border-[#deddd7] pt-6"><p className="mb-4 text-xs font-semibold">Uploaded this session</p><div className="grid gap-2 sm:grid-cols-2">{assets.map((asset) => <button key={asset.id} onClick={() => onNotify(`${asset.name} selected`)} className="flex items-center gap-3 border border-[#deddd7] bg-[#fbfbf8] p-3 text-left hover:bg-white"><span className={`grid h-10 w-10 place-items-center bg-gradient-to-br ${asset.accent} text-xs font-bold text-accent-yellow`}>SK</span><span className="min-w-0"><strong className="block truncate text-xs">{asset.name}</strong><small className="text-[10px] text-zinc-500">{asset.type} · {asset.size}</small></span></button>)}</div></div>;
}

function Modal({ title, detail, onClose, children }: { title: string; detail: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-5"><div role="dialog" aria-modal="true" className="max-h-[92vh] w-full max-w-xl overflow-y-auto border border-black/10 bg-[#f8f8f4] shadow-2xl"><div className="flex items-start justify-between border-b border-[#deddd7] px-5 py-5 sm:px-7"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7c875c]">Studio action</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.04em]">{title}</h2><p className="mt-1 text-xs text-zinc-500">{detail}</p></div><button aria-label="Close modal" onClick={onClose} className="grid h-8 w-8 place-items-center border border-[#d9d8d2] text-lg text-zinc-500 hover:border-black hover:text-black">×</button></div><div className="px-5 py-6 sm:px-7">{children}</div></div></div>;
}

function CreateModal({ contentType, onClose, onSave }: { contentType: ContentType; onClose: () => void; onSave: (title: string) => void }) {
  const [title, setTitle] = useState("");
  const labels: Record<ContentType, [string, string, string]> = { Album: ["New album", "Start a release draft with tracks, artwork and platform links.", "Album title"], Book: ["New book", "Create a book profile before mapping its commerce data.", "Book title"], "Blog post": ["New blog post", "Write a story draft with categories, cover art and SEO fields.", "Post title"] };
  const [heading, detail, field] = labels[contentType];
  return <Modal title={heading} detail={detail} onClose={onClose}><label className="block text-xs font-semibold">{field}<input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && title.trim()) onSave(title.trim()); }} placeholder={contentType === "Album" ? "e.g. Night Garden" : contentType === "Book" ? "e.g. Expand Your Map of Life" : "e.g. Notes from the road"} className="mt-2 w-full border border-[#d9d8d2] bg-white px-3 py-3 text-sm outline-none focus:border-black" /></label><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="border border-[#e7e6e1] bg-white p-4"><p className="text-xs font-semibold">Draft workflow</p><p className="mt-1 text-[11px] leading-relaxed text-zinc-500">Save privately, preview securely, then publish when the content is ready.</p></div><div className="border border-[#e7e6e1] bg-white p-4"><p className="text-xs font-semibold">In-memory demo</p><p className="mt-1 text-[11px] leading-relaxed text-zinc-500">The new record will appear immediately in this session.</p></div></div><div className="mt-6 flex justify-end gap-2"><Button secondary onClick={onClose}>Cancel</Button><Button onClick={() => title.trim() && onSave(title.trim())}>Create draft</Button></div></Modal>;
}

function ViewModal({ row, onClose, onEdit, onNotify }: { row: ContentRow; onClose: () => void; onEdit: () => void; onNotify: (message: string) => void }) {
  return <Modal title={row.title} detail={`${row.kind} · Last updated ${row.updated}`} onClose={onClose}><div className="flex gap-4 border-b border-[#e7e6e1] pb-5"><div className={`grid h-24 w-24 shrink-0 place-items-center bg-gradient-to-br ${row.accent} text-2xl font-black text-accent-yellow`}>SK</div><div><StatusPill status={row.status} /><p className="mt-3 text-sm text-zinc-600">{row.meta}</p><p className="mt-1 text-xs leading-relaxed text-zinc-500">This is a live preview of the selected in-memory content record.</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="bg-white p-3"><p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400">Visibility</p><p className="mt-2 text-xs font-semibold">Public page ready</p></div><div className="bg-white p-3"><p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400">SEO</p><p className="mt-2 text-xs font-semibold text-[#658d2c]">Metadata complete</p></div><div className="bg-white p-3"><p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400">Media</p><p className="mt-2 text-xs font-semibold">3 assets linked</p></div></div><div className="mt-6 flex flex-wrap justify-end gap-2"><Button secondary onClick={() => onNotify("Secure preview opened")}>Preview</Button><Button secondary onClick={onEdit}>Open editor</Button><Button onClick={() => onNotify(`${row.title} published`)}>Publish</Button></div></Modal>;
}

function UploadModal({ onClose, onUpload }: { onClose: () => void; onUpload: (asset: MediaAsset) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  function submit() {
    if (!file) return;
    onUpload({ id: `media-${Date.now()}`, name: name.trim() || file.name.replace(/\.[^/.]+$/, ""), type: file.name.split(".").pop()?.toUpperCase() || "FILE", size: `${Math.max(1, Math.round(file.size / 1024))} KB`, accent: "from-accent-purple via-zinc-700 to-zinc-950", used: false });
  }
  return <Modal title="Upload media" detail="Add artwork, photography, logos or video poster images to the library." onClose={onClose}><label className="flex min-h-40 cursor-pointer flex-col items-center justify-center border border-dashed border-[#bdbcb5] bg-white px-5 text-center transition-colors hover:border-black"><span className="grid h-10 w-10 place-items-center bg-accent-yellow text-lg text-black">↑</span><strong className="mt-3 text-sm">{file ? file.name : "Choose a file"}</strong><span className="mt-1 text-xs text-zinc-500">JPG, PNG, SVG, WebP or MP4 · mock upload</span><input type="file" accept="image/*,video/*,audio/*" onChange={(event) => setFile(event.target.files?.[0] || null)} className="sr-only" /></label><label className="mt-5 block text-xs font-semibold">Library name <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Optional display name" className="mt-2 w-full border border-[#d9d8d2] bg-white px-3 py-3 text-sm outline-none focus:border-black" /></label><div className="mt-6 flex justify-end gap-2"><Button secondary onClick={onClose}>Cancel</Button><Button onClick={submit}>{file ? "Add to library" : "Choose file first"}</Button></div></Modal>;
}
