'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { BubbleMenu as BubbleMenuExtension } from '@tiptap/extension-bubble-menu';
import { common, createLowlight } from 'lowlight';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBold, faItalic, faUnderline, faStrikethrough, 
  faListUl, faListOl, faQuoteRight, faCode, 
  faUndo, faRedo, faLink, faImage, faTable,
  faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify,
  faHeading, faParagraph, faMinus, faEraser,
  faSubscript, faSuperscript, faHighlighter,
  faPlus, faTrash, faColumns, faLevelDownAlt, faLevelUpAlt
} from '@fortawesome/free-solid-svg-icons';

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round(height * (MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
        } else if (height > MAX_HEIGHT) {
          width = Math.round(width * (MAX_HEIGHT / height));
          height = MAX_HEIGHT;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error('Canvas to Blob failed')); return; }
          resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
        }, 'image/jpeg', 0.7);
      };
      img.onerror = () => reject(new Error('Img loading failed'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Reader error'));
  });
};

const MenuBar = ({ editor }: { editor: any }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        alert("Image is too large (max 10MB)");
        return;
      }
      let fileToUpload = file.type.startsWith('image/') ? await compressImage(file) : file;
      const ts = Date.now();
      const fn = `${ts}_${file.name}`;
      const storageRef = ref(storage, `blog-content-images/${fn}`);
      const snapshot = await uploadBytes(storageRef, fileToUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, 'blog_images'), {
        filename: fn, url: downloadURL, path: `blog-content-images/${fn}`,
        uploadedAt: ts, fileSize: fileToUpload.size, type: fileToUpload.type, inUse: true
      });
      editor.chain().focus().setImage({ src: downloadURL, alt: file.name }).run();
    } catch (e) {
      console.error(e);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const ToolbarButton = ({ onClick, isActive, icon, title, disabled = false }: any) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center h-9 w-9 border
        ${isActive 
          ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}
        ${disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </button>
  );

  return (
    <div className="sticky top-0 z-20 border-b border-white/10 p-2 flex flex-wrap gap-2 bg-[#0D1B36]/95 backdrop-blur-xl">
      <div className="flex bg-black/20 rounded-xl p-1 gap-1 border border-white/5">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} icon={faUndo} title="Undo" />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} icon={faRedo} title="Redo" />
      </div>

      <div className="flex bg-black/20 rounded-xl p-1 gap-1 border border-white/5">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={faBold} title="Bold" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={faItalic} title="Italic" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon={faUnderline} title="Underline" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={faStrikethrough} title="Strikethrough" />
      </div>

      <div className="flex bg-black/20 rounded-xl p-1 gap-1 border border-white/5">
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} icon={faAlignLeft} title="Align Left" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} icon={faAlignCenter} title="Align Center" />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} icon={faAlignRight} title="Align Right" />
      </div>

      <div className="flex bg-black/20 rounded-xl p-1 gap-1 border border-white/5">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={faListUl} title="Bullet List" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={faListOl} title="Ordered List" />
      </div>

      <div className="flex bg-black/20 rounded-xl p-1 gap-1 border border-white/5">
        <ToolbarButton 
          onClick={() => {
            const url = window.prompt('URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }} 
          isActive={editor.isActive('link')} 
          icon={faLink} 
          title="Link" 
        />
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }} />
        <ToolbarButton onClick={() => fileInputRef.current?.click()} disabled={uploading} icon={faImage} title="Insert Image" />
        <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={faTable} title="Insert Table" />
      </div>

      <div className="flex bg-black/20 rounded-xl p-1 gap-1 border border-white/5 items-center px-3">
        <select 
          className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-gray-400 hover:text-white transition-all" 
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'p') editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run();
          }}
          value={editor.isActive('heading', { level: 1 }) ? '1' : editor.isActive('heading', { level: 2 }) ? '2' : editor.isActive('heading', { level: 3 }) ? '3' : 'p'}
        >
          <option value="p" className="bg-[#0D1B36]">Paragraph</option>
          <option value="1" className="bg-[#0D1B36]">H1 Title</option>
          <option value="2" className="bg-[#0D1B36]">H2 Subtitle</option>
          <option value="3" className="bg-[#0D1B36]">H3 Heading</option>
        </select>
      </div>

      {editor.isActive('table') && (
        <div className="flex bg-blue-600/10 rounded-xl p-1 gap-1 border border-blue-500/20">
          <ToolbarButton onClick={() => editor.chain().focus().addColumnBefore().run()} icon={faColumns} title="Add Column Before" />
          <ToolbarButton onClick={() => editor.chain().focus().addRowBefore().run()} icon={faLevelUpAlt} title="Add Row Before" />
          <ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} icon={faTrash} title="Delete Table" />
        </div>
      )}
    </div>
  );
};

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, className = '' }) => {
  const [isMounted, setIsMounted] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ allowBase64: true, HTMLAttributes: { class: 'rounded-2xl border border-white/10 shadow-2xl max-w-full h-auto my-8 mx-auto block' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-400 underline decoration-blue-400/30 hover:decoration-blue-400 transition-all font-medium cursor-pointer' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['left', 'center', 'right', 'justify'] }),
      Underline, TextStyle, Color, Highlight.configure({ multicolor: true }), Subscript, Superscript,
      Table.configure({ resizable: true, HTMLAttributes: { class: 'w-full border-collapse border border-white/10 my-8 rounded-xl overflow-hidden' } }),
      TableRow, TableHeader, TableCell, 
      CodeBlockLowlight.configure({ 
        lowlight,
        HTMLAttributes: { class: 'bg-black/60 rounded-2xl p-6 font-mono text-sm text-blue-300 border border-white/5 my-8 relative group' } 
      }),
      BubbleMenuExtension,
    ],
    content: content || '<p>Start authoring...</p>',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-blue max-w-none p-8 min-h-[500px] focus:outline-none leading-relaxed text-gray-300 selection:bg-blue-500/30',
      },
    },
  });

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const editorStyles = `
    .ProseMirror { min-height: 500px; }
    .ProseMirror h1 { font-size: 2.5rem; color: #fff; font-weight: 800; margin-bottom: 2rem; }
    .ProseMirror h2 { font-size: 2rem; color: #fff; font-weight: 700; margin-bottom: 1.5rem; }
    .ProseMirror h3 { font-size: 1.75rem; color: #fff; font-weight: 600; margin-bottom: 1rem; }
    .ProseMirror p { font-size: 1.125rem; line-height: 1.8; color: #cbd5e1; }
    .ProseMirror blockquote { border-left: 4px solid #3b82f6; background: rgba(59,130,246,0.05); padding: 1.5rem; font-style: italic; border-radius: 0 1rem 1rem 0; margin: 2rem 0; }
    .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin: 1.5rem 0; }
    .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin: 1.5rem 0; }
    .ProseMirror table p { margin: 0; font-size: 0.95rem; }
    .ProseMirror table th { background: rgba(255,255,255,0.05); text-align: left; padding: 12px; border: 1px solid rgba(255,255,255,0.1); }
    .ProseMirror table td { padding: 12px; border: 1px solid rgba(255,255,255,0.1); }
    .ProseMirror hr { border: 0; border-top: 2px solid rgba(255,255,255,0.1); margin: 3rem 0; }
    .ProseMirror img.ProseMirror-selectednode { outline: 3px solid #3b82f6; border-radius: 1rem; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
  `;

  return (
    <div className={`${className} bg-[#0D1B36] rounded-2xl border border-white/10 overflow-hidden shadow-2xl`}>
      <style jsx global>{editorStyles}</style>
      {isMounted && editor && (
        <div className="flex flex-col h-full">
          <MenuBar editor={editor} />
          <BubbleMenu editor={editor} className="flex bg-[#1a2b4b] shadow-2xl rounded-xl border border-white/10 p-1.5 gap-1.5 items-center backdrop-blur-xl">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg hover:bg-white/5 transition-all ${editor.isActive('bold') ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400'}`}><FontAwesomeIcon icon={faBold} size="sm" /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg hover:bg-white/5 transition-all ${editor.isActive('italic') ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400'}`}><FontAwesomeIcon icon={faItalic} size="sm" /></button>
            <button type="button" onClick={() => { const url = window.prompt('URL'); if(url) editor.chain().focus().setLink({ href: url }).run(); }} className={`p-2 rounded-lg hover:bg-white/5 transition-all ${editor.isActive('link') ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400'}`}><FontAwesomeIcon icon={faLink} size="sm" /></button>
          </BubbleMenu>
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            <EditorContent editor={editor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TiptapEditor;
