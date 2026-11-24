'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Image from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';
import { Placeholder } from '@tiptap/extensions';

type Props = {
  /** Initial Markdown. Later changes to this prop are ignored (remount with a key to reset). */
  initialMarkdown: string;
  onChange: (markdown: string) => void;
  /** Uploads an image and returns its repo path (e.g. /blog/slug/x.webp), or null on failure. */
  onUploadImage: (file: File) => Promise<string | null>;
  /** Maps a stored image path to a URL the browser can display right now. Must be stable. */
  resolveSrc: (src: string) => string;
  uploading: boolean;
};

/** Image node that stores the repo path but displays a resolvable URL. */
const DisplayImage = Image.extend<{ resolve: (src: string) => string }>({
  addOptions() {
    return { ...this.parent!(), resolve: (src: string) => src };
  },
  renderHTML({ HTMLAttributes }) {
    const src = typeof HTMLAttributes.src === 'string' ? this.options.resolve(HTMLAttributes.src) : HTMLAttributes.src;
    return ['img', { ...HTMLAttributes, src }];
  },
});

export default function RichEditor({ initialMarkdown, onChange, onUploadImage, resolveSrc, uploading }: Props) {
  const uploadRef = useRef(onUploadImage);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    uploadRef.current = onUploadImage;
    onChangeRef.current = onChange;
  });

  const [sourceMode, setSourceMode] = useState(false);
  const [source, setSource] = useState('');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        underline: false, // no Markdown equivalent
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      DisplayImage.configure({ resolve: resolveSrc }),
      TableKit.configure({ table: { resizable: false } }),
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
      Markdown,
    ],
    content: initialMarkdown,
    contentType: 'markdown',
    editorProps: {
      attributes: { class: 'blog-prose rich-editor-content' },
      handlePaste(view, event) {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) => f.type.startsWith('image/'));
        if (!files.length) return false;
        event.preventDefault();
        files.forEach((f) => insertUploaded(f));
        return true;
      },
      handleDrop(view, event) {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) => f.type.startsWith('image/'));
        if (!files.length) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        files.forEach((f) => insertUploaded(f, pos));
        return true;
      },
    },
    onUpdate({ editor }) {
      onChangeRef.current(editor.getMarkdown());
    },
  });

  async function insertUploaded(file: File, pos?: number) {
    const path = await uploadRef.current(file);
    if (!path || !editor) return;
    const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
    const node = { type: 'image', attrs: { src: path, alt } };
    if (pos === undefined) editor.chain().focus().insertContent(node).run();
    else editor.chain().focus().insertContentAt(pos, node).run();
  }

  function toggleSource() {
    if (!editor) return;
    if (sourceMode) {
      editor.commands.setContent(source, { contentType: 'markdown', emitUpdate: true });
      onChangeRef.current(editor.getMarkdown());
    } else {
      setSource(editor.getMarkdown());
    }
    setSourceMode(!sourceMode);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <div className="sticky top-0 z-10 rounded-t-2xl border-b border-zinc-200 bg-white/95 backdrop-blur">
        {editor && (
          <Toolbar
            editor={editor}
            disabled={sourceMode}
            uploading={uploading}
            onPickImage={(f) => insertUploaded(f)}
            sourceMode={sourceMode}
            onToggleSource={toggleSource}
          />
        )}
      </div>
      {sourceMode ? (
        <textarea
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            onChangeRef.current(e.target.value);
          }}
          className="block min-h-[60vh] w-full resize-y rounded-b-2xl p-6 font-mono text-sm leading-relaxed outline-none"
        />
      ) : (
        <div className="mx-auto max-w-3xl px-6 py-8">
          <EditorContent editor={editor} />
        </div>
      )}
      {editor && <WordCount editor={editor} />}
    </div>
  );
}

function WordCount({ editor }: { editor: Editor }) {
  const words = useEditorState({
    editor,
    selector: ({ editor }) => {
      const text = editor.state.doc.textContent.trim();
      return text ? text.split(/\s+/).length : 0;
    },
  });
  return (
    <div className="border-t border-zinc-100 px-4 py-2 text-right text-xs text-zinc-400">
      {words} words · ~{Math.max(1, Math.round(words / 220))} min read
    </div>
  );
}

// ---------------- toolbar ----------------

function Toolbar({
  editor,
  disabled,
  uploading,
  onPickImage,
  sourceMode,
  onToggleSource,
}: {
  editor: Editor;
  disabled: boolean;
  uploading: boolean;
  onPickImage: (file: File) => void;
  sourceMode: boolean;
  onToggleSource: () => void;
}) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      strike: e.isActive('strike'),
      code: e.isActive('code'),
      link: e.isActive('link'),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      codeBlock: e.isActive('codeBlock'),
      table: e.isActive('table'),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const chain = () => editor.chain().focus();

  function setLink() {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL (leave empty to remove)', prev ?? 'https://');
    if (url === null) return;
    if (url.trim() === '' || url === 'https://') {
      chain().extendMarkRange('link').unsetLink().run();
      return;
    }
    if (editor.state.selection.empty && !s.link) {
      chain().insertContent({ type: 'text', text: url, marks: [{ type: 'link', attrs: { href: url } }] }).run();
    } else {
      chain().extendMarkRange('link').setLink({ href: url }).run();
    }
  }

  const block = s.h2 ? 'h2' : s.h3 ? 'h3' : 'p';

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
      <select
        aria-label="Text style"
        disabled={disabled}
        value={block}
        onChange={(e) => {
          const v = e.target.value;
          if (v === 'p') chain().setParagraph().run();
          else chain().setHeading({ level: v === 'h2' ? 2 : 3 }).run();
        }}
        className="mr-1 h-8 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-700 outline-none hover:bg-zinc-50 disabled:opacity-40"
      >
        <option value="p">Paragraph</option>
        <option value="h2">Heading</option>
        <option value="h3">Subheading</option>
      </select>
      <Sep />
      <Btn label="Bold (Ctrl+B)" active={s.bold} disabled={disabled} onClick={() => chain().toggleBold().run()}>
        <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" strokeWidth={2.4} />
      </Btn>
      <Btn label="Italic (Ctrl+I)" active={s.italic} disabled={disabled} onClick={() => chain().toggleItalic().run()}>
        <path d="M19 4h-9M14 20H5M15 4 9 20" />
      </Btn>
      <Btn label="Strikethrough" active={s.strike} disabled={disabled} onClick={() => chain().toggleStrike().run()}>
        <path d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16" />
      </Btn>
      <Btn label="Inline code" active={s.code} disabled={disabled} onClick={() => chain().toggleCode().run()}>
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </Btn>
      <Btn label="Link" active={s.link} disabled={disabled} onClick={setLink}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </Btn>
      <Sep />
      <Btn label="Bulleted list" active={s.bullet} disabled={disabled} onClick={() => chain().toggleBulletList().run()}>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeWidth={2.2} />
      </Btn>
      <Btn label="Numbered list" active={s.ordered} disabled={disabled} onClick={() => chain().toggleOrderedList().run()}>
        <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </Btn>
      <Btn label="Quote" active={s.quote} disabled={disabled} onClick={() => chain().toggleBlockquote().run()}>
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </Btn>
      <Btn label="Code block" active={s.codeBlock} disabled={disabled} onClick={() => chain().toggleCodeBlock().run()}>
        <path d="M4 4h16v16H4zM9 9l-2 3 2 3M15 9l2 3-2 3" />
      </Btn>
      <Btn label="Divider" disabled={disabled} onClick={() => chain().setHorizontalRule().run()}>
        <path d="M3 12h18" />
      </Btn>
      <Sep />
      <Btn label={uploading ? 'Uploading…' : 'Image'} disabled={disabled || uploading} onClick={() => fileRef.current?.click()}>
        <path d="M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 8.5h.01" />
      </Btn>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPickImage(f);
          e.target.value = '';
        }}
      />
      <Btn
        label="Table"
        active={s.table}
        disabled={disabled}
        onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <path d="M3 4h18v16H3zM3 10h18M3 15h18M9 4v16M15 4v16" />
      </Btn>
      {s.table && !disabled && (
        <span className="ml-1 flex items-center gap-0.5 rounded-md bg-zinc-100 px-1 text-xs">
          <TextBtn onClick={() => chain().addRowAfter().run()}>+ Row</TextBtn>
          <TextBtn onClick={() => chain().addColumnAfter().run()}>+ Col</TextBtn>
          <TextBtn onClick={() => chain().deleteRow().run()}>− Row</TextBtn>
          <TextBtn onClick={() => chain().deleteColumn().run()}>− Col</TextBtn>
          <TextBtn danger onClick={() => chain().deleteTable().run()}>
            Delete table
          </TextBtn>
        </span>
      )}
      <Sep />
      <Btn label="Undo (Ctrl+Z)" disabled={disabled || !s.canUndo} onClick={() => chain().undo().run()}>
        <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
      </Btn>
      <Btn label="Redo (Ctrl+Y)" disabled={disabled || !s.canRedo} onClick={() => chain().redo().run()}>
        <path d="m15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
      </Btn>
      <button
        type="button"
        onClick={onToggleSource}
        className={`ml-auto h-8 rounded-md px-2.5 text-xs font-medium ${
          sourceMode ? 'bg-navy text-white' : 'text-zinc-500 hover:bg-zinc-100'
        }`}
        title="Edit the raw Markdown"
      >
        {sourceMode ? 'Back to editor' : 'Markdown'}
      </button>
    </div>
  );
}

function Btn({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:opacity-30 ${
        active ? 'bg-accent-blue/10 text-accent-blue' : 'text-zinc-600 hover:bg-zinc-100'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}

function TextBtn({ onClick, children, danger }: { onClick: () => void; children: ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded px-1.5 py-1 ${danger ? 'text-red-600 hover:bg-red-50' : 'text-zinc-700 hover:bg-white'}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px bg-zinc-200" aria-hidden />;
}
