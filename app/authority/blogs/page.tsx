'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faChartLine, faClipboardList, faCog, faPlus, faEdit, faTrash, faUpload, faSearch } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth, storage } from '../../../lib/firebase';
import { useRouter } from 'next/navigation'; 
import dynamic from 'next/dynamic';

// Dynamically import Tiptap editor with client-side rendering only
const TiptapEditor = dynamic(() => import('./TiptapEditor'), { 
  ssr: false,
  loading: () => <div className="p-8 text-center text-gray-500 font-mono text-xs animate-pulse">Initializing Neural Canvas...</div>,
});

// Define FAQ interface
interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

// Define Review interface
interface Review {
  id?: string;
  name: string;
  rating: number;
  review: string;
}

// Define Blog interface with updated structure
interface Blog {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image: string;
  created: number;
  metaTitle?: string;
  metaDescription?: string;
  slug: string; // New slug field for URLs
  faqs?: FAQ[]; // New field for FAQs
  reviews?: Review[]; // New field for Reviews
  author: string; // New author field
}

const BlogsDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [newBlog, setNewBlog] = useState<Blog>({
    title: '',
    subtitle: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    image: '',
    created: Date.now(),
    metaTitle: '',
    metaDescription: '',
    slug: '', // Initialize the slug field
    faqs: [], // Initialize empty FAQs array
    reviews: [], // Initialize empty Reviews array
    author: 'Anuj Anand Malik' // Default author
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const [rssDebugInfo, setRssDebugInfo] = useState<string>('');
  const [isLoadingRss, setIsLoadingRss] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages based on filtered blogs
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  // Get the current blogs to display based on the current page
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/nullify');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const data = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            title: docData.title || '',
            subtitle: docData.subtitle || '',
            description: docData.description || '',
            date: docData.date || '',
            image: docData.image || '',
            created: docData.created || Date.now(),
            metaTitle: docData.metaTitle || '',
            metaDescription: docData.metaDescription || '',
            slug: docData.slug || '',
            faqs: docData.faqs || [],
            reviews: docData.reviews || [],
            author: docData.author || 'Anuj Anand Malik'
          };
        });
        const sortedData = data.sort((a, b) => (b.created || 0) - (a.created || 0));
        setBlogs(sortedData);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Autosave functionality
  useEffect(() => {
    if (showBlogForm && newBlog) {
      if (newBlog.title === '' && newBlog.description === '') return;

      const timer = setTimeout(() => {
        const key = formMode === 'edit' && newBlog.id ? `autosave_blog_${newBlog.id}` : 'autosave_blog_new';
        localStorage.setItem(key, JSON.stringify(newBlog));
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [newBlog, showBlogForm, formMode]);

  // Helper function to generate slug from title
  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^\w\s-]/g, '') 
      .replace(/\s+/g, '-') 
      .replace(/--+/g, '-') 
      .trim(); 
  };

  // Handle blog form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBlog(prevState => {
      if (name === 'title' && (!prevState.slug || prevState.slug === generateSlug(prevState.title))) {
        return {
          ...prevState,
          [name]: value,
          slug: generateSlug(value)
        };
      }
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  // Handle Tiptap editor content changes
  const handleEditorChange = (content: string) => {
    setNewBlog(prevState => ({
      ...prevState,
      description: content
    }));
  };

  // FAQ management
  const addFaq = () => {
    setNewBlog(prevState => ({
      ...prevState,
      faqs: [...(prevState.faqs || []), { question: '', answer: '' }]
    }));
  };

  const removeFaq = (index: number) => {
    setNewBlog(prevState => ({
      ...prevState,
      faqs: (prevState.faqs || []).filter((_, i) => i !== index)
    }));
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setNewBlog(prevState => {
      const updatedFaqs = [...(prevState.faqs || [])];
      updatedFaqs[index] = { 
        ...updatedFaqs[index], 
        [field]: value 
      };
      return {
        ...prevState,
        faqs: updatedFaqs
      };
    });
  };

  // Review management
  const addReview = () => {
    setNewBlog(prevState => ({
      ...prevState,
      reviews: [...(prevState.reviews || []), { name: '', rating: 5, review: '' }]
    }));
  };

  const removeReview = (index: number) => {
    setNewBlog(prevState => ({
      ...prevState,
      reviews: (prevState.reviews || []).filter((_, i) => i !== index)
    }));
  };

  const handleReviewChange = (index: number, field: keyof Review, value: string | number) => {
    setNewBlog(prevState => {
      const updatedReviews = [...(prevState.reviews || [])];
      updatedReviews[index] = { 
        ...updatedReviews[index], 
        [field]: value 
      };
      return {
        ...prevState,
        reviews: updatedReviews
      };
    });
  };

  // Helper function to compress images
  const compressImageFile = (file: File): Promise<File> => {
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
            if (!blob) { reject(new Error('Canvas to Blob conversion failed')); return; }
            resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
          }, 'image/jpeg', 0.7);
        };
        img.onerror = () => reject(new Error('Img loading failed'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Error reading file'));
    });
  };

  // Handle file upload to Firebase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      setUploadProgress(0);
      const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`);
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target?.result as string);
      reader.readAsDataURL(file);
      const fileToUpload = file.type.startsWith('image/') ? await compressImageFile(file) : file;
      const snapshot = await uploadBytes(storageRef, fileToUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setNewBlog(prevState => ({ ...prevState, image: downloadURL }));
      setUploadProgress(100);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setUploading(false);
    }
  };

  // Handle blog form submission
  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const blogWithMetadata = {
        ...newBlog,
        created: formMode === 'add' ? Date.now() : newBlog.created,
        date: new Date(newBlog.date).toISOString().split('T')[0]
      };
      const { faqs, reviews, ...blogData } = blogWithMetadata;
      let blogId = newBlog.id;
      if (formMode === 'add') {
        const docRef = await addDoc(collection(db, 'blogs'), blogData);
        blogId = docRef.id;
      } else if (blogId) {
        await updateDoc(doc(db, 'blogs', blogId), blogData);
      }
      if (blogId && faqs) {
        if (formMode === 'edit') {
          const faqsSnap = await getDocs(collection(db, 'blogs', blogId, 'faqs'));
          for (const d of faqsSnap.docs) await deleteDoc(d.ref);
        }
        for (const faq of faqs) await addDoc(collection(db, 'blogs', blogId, 'faqs'), { question: faq.question, answer: faq.answer });
      }
      if (blogId && reviews) {
        if (formMode === 'edit') {
          const reviewsSnap = await getDocs(collection(db, 'blogs', blogId, 'reviews'));
          for (const d of reviewsSnap.docs) await deleteDoc(d.ref);
        }
        for (const review of reviews) await addDoc(collection(db, 'blogs', blogId, 'reviews'), { name: review.name, rating: review.rating, review: review.review });
      }
      resetForm();
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const updatedBlogs = querySnapshot.docs.map(doc => {
        const d = doc.data();
        return { id: doc.id, title: d.title || '', subtitle: d.subtitle || '', description: d.description || '', date: d.date || '', image: d.image || '', created: d.created || Date.now(), metaTitle: d.metaTitle || '', metaDescription: d.metaDescription || '', slug: d.slug || '', faqs: [], reviews: [], author: d.author || 'Anuj Anand Malik' };
      });
      setBlogs(updatedBlogs.sort((a, b) => (b.created || 0) - (a.created || 0)));
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Save failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (blog: Blog) => {
    try {
      const faqsSnap = await getDocs(collection(db, 'blogs', blog.id!, 'faqs'));
      const faqs = faqsSnap.docs.map(d => ({ id: d.id, ...d.data() } as FAQ));
      const reviewsSnap = await getDocs(collection(db, 'blogs', blog.id!, 'reviews'));
      const reviews = reviewsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Review));
      setNewBlog({...blog, faqs, reviews});
      setFormMode('edit');
      const savedDraft = localStorage.getItem(`autosave_blog_${blog.id}`);
      if (savedDraft && window.confirm('Restore unsaved draft?')) {
        setNewBlog(JSON.parse(savedDraft));
      }
      setShowBlogForm(true);
    } catch (error) {
      setNewBlog(blog);
      setFormMode('edit');
      setShowBlogForm(true);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !window.confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    if (formMode === 'edit' && newBlog.id) localStorage.removeItem(`autosave_blog_${newBlog.id}`);
    else localStorage.removeItem('autosave_blog_new');
    setNewBlog({ title: '', subtitle: '', description: '', date: new Date().toISOString().split('T')[0], image: '', created: Date.now(), metaTitle: '', metaDescription: '', slug: '', faqs: [], reviews: [], author: 'Anuj Anand Malik' });
    setFormMode('add');
    setShowBlogForm(false);
    setImagePreview(null);
  };

  const testRssFeed = async () => {
    try {
      setIsLoadingRss(true);
      const res = await fetch('/api/rss');
      const xml = await res.text();
      setRssDebugInfo(`RSS Status: ${res.status === 200 ? '✅ OK' : '❌ Error'}\nItems: ${(xml.match(/<item>/g) || []).length}`);
    } catch (error) {
      setRssDebugInfo(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoadingRss(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 sm:p-8">
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-all hover:border-white/10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Blogs Dashboard</h1>
          <p className="text-gray-400 text-lg">Authoring engine for SEO-optimized content and thought leadership.</p>
        </div>
        <div className="flex gap-4">
          <motion.button
            onClick={() => {
              if (showBlogForm) resetForm();
              else {
                const savedDraft = localStorage.getItem('autosave_blog_new');
                if (savedDraft && window.confirm('Found an unsaved draft. Restore it?')) {
                  setNewBlog(JSON.parse(savedDraft));
                }
                setShowBlogForm(true);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all
              ${showBlogForm 
                ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10' 
                : 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-500'}`}
          >
            <FontAwesomeIcon icon={showBlogForm ? faChartLine : faPlus} className="mr-2" />
            {showBlogForm ? 'Back to Pipeline' : 'Create New Post'}
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showBlogForm ? (
          <motion.div
            key="blog-form-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#0D1B36] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-3xl overflow-hidden">
              <h2 className="text-2xl font-black mb-8 text-blue-400 flex items-center uppercase tracking-widest border-b border-white/10 pb-4">
                <FontAwesomeIcon icon={formMode === 'add' ? faPlus : faEdit} className="mr-4" />
                {formMode === 'add' ? 'Initialize Knowledge Entry' : 'Refine Published Entry'}
              </h2>
              
              <form onSubmit={handleSubmitBlog} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">Asset Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newBlog.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                      placeholder="e.g. Closing Enterprise Deals in 90 Days"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">SEO Descriptor / Slug</label>
                    <input
                      type="text"
                      name="slug"
                      value={newBlog.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all font-mono lowercase"
                      placeholder="url-friendly-slug-id"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">Core Keywords / Value Prop</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={newBlog.subtitle}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                      placeholder="Key themes for indexing..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">Meta Title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={newBlog.metaTitle || ''}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                      placeholder="SEO optimized title..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">Publication Timestamp</label>
                    <input
                      type="date"
                      name="date"
                      value={newBlog.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-blue-500/50 outline-none appearance-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">Cover Asset</label>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileUpload} className="hidden" />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center"
                        >
                          <FontAwesomeIcon icon={faUpload} className="mr-2" />
                          {uploading ? 'Processing Stream...' : 'Initialize Upload'}
                        </button>
                      </div>
                      {uploading && (
                        <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            className="bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          />
                        </div>
                      )}
                      {(imagePreview || newBlog.image) && (
                        <div className="relative w-40 h-24 rounded-xl overflow-hidden border border-white/10 group">
                          <img src={imagePreview || newBlog.image || undefined} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => {
                              setImagePreview(null);
                              setNewBlog(prev => ({ ...prev, image: '' }));
                            }}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                          >
                            <FontAwesomeIcon icon={faTrash} className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">Meta Descriptor</label>
                    <input
                      type="text"
                      name="metaDescription"
                      value={newBlog.metaDescription || ''}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700 font-mono"
                      placeholder="SEO meta description..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-3 ml-1">Editorial Authority</label>
                    <select
                      name="author"
                      value={newBlog.author}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all uppercase font-mono tracking-widest"
                    >
                      <option value="Anuj Anand Malik" className="bg-[#0B1528]">Anuj Anand Malik</option>
                      <option value="Shrey Arora" className="bg-[#0B1528]">Shrey Arora</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-4 ml-1">Structured Context (FAQs)</label>
                    <div className="border border-white/10 rounded-2xl p-6 bg-black/20 space-y-6">
                      {(newBlog.faqs || []).map((faq, index) => (
                        <div key={`faq-${index}`} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl shadow-inner group relative">
                          <button type="button" onClick={() => removeFaq(index)} className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 transition-all uppercase text-[8px] font-black tracking-widest">Terminate</button>
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Key Question"
                              value={faq.question}
                              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-blue-500/30 transition-all"
                            />
                            <textarea
                              placeholder="Authoritative Response"
                              value={faq.answer}
                              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-blue-500/30 transition-all min-h-[80px]"
                            />
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={addFaq} className="w-full py-3 border border-dashed border-white/20 rounded-xl text-[10px] text-gray-500 uppercase font-black tracking-widest hover:border-blue-500/40 hover:text-blue-400 transition-all">
                        Append Query Node
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-4 ml-1">Validation Snippets (Reviews)</label>
                    <div className="border border-white/10 rounded-2xl p-6 bg-black/20 space-y-6">
                      {(newBlog.reviews || []).map((review, index) => (
                        <div key={`review-${index}`} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl shadow-inner relative group">
                          <button type="button" onClick={() => removeReview(index)} className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 transition-all"><FontAwesomeIcon icon={faTrash} size="xs" /></button>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder="Subject Name" value={review.name} onChange={(e) => handleReviewChange(index, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none" />
                            <select value={review.rating} onChange={(e) => handleReviewChange(index, 'rating', parseInt(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none font-mono">
                              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} className="bg-[#0B1528]">{n} Stars</option>)}
                            </select>
                          </div>
                          <textarea placeholder="Observation Data..." value={review.review} onChange={(e) => handleReviewChange(index, 'review', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none min-h-[60px]" />
                        </div>
                      ))}
                      <button type="button" onClick={addReview} className="w-full py-3 border border-dashed border-white/20 rounded-xl text-[10px] text-gray-500 uppercase font-black tracking-widest hover:border-blue-500/40 hover:text-blue-400 transition-all">
                        Register Observation
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-4 ml-1">Content Architecture</label>
                    <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-black/20 ring-1 ring-white/5">
                      <TiptapEditor content={newBlog.description} onChange={handleEditorChange} />
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex justify-end gap-4 border-t border-white/10 mt-12">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-4 border border-white/10 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-blue-600 shadow-lg shadow-blue-600/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Syncing...' : (formMode === 'add' ? 'Publish Asset' : 'Commit Changes')}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="blog-table-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-gray-500">
                <FontAwesomeIcon icon={faSearch} size="sm" />
              </div>
              <input
                type="text"
                placeholder="Index Search: Title, Slug, or Author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 tracking-wide"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <th className="px-6 py-5">Release Date</th>
                    <th className="px-6 py-5">Post Specification</th>
                    <th className="px-6 py-5">Visual Asset</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentBlogs.map((blog) => (
                    <tr key={blog.id || `temp-${blog.created}`} className="group hover:bg-white/[0.04] transition-colors duration-200">
                      <td className="px-6 py-6 align-middle">
                        <div className="text-xs text-gray-300 font-mono">{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      </td>
                      <td className="px-6 py-6 align-middle">
                        <div className="text-sm font-bold text-white tracking-tight">{blog.title}</div>
                        <div className="text-[10px] text-gray-500 mt-1 font-mono uppercase tracking-widest opacity-60">/{blog.slug}</div>
                      </td>
                      <td className="px-6 py-6 align-middle">
                        {blog.image ? (
                          <img src={blog.image} alt="" className="w-16 h-10 rounded-lg object-cover ring-1 ring-white/10 shadow-lg" />
                        ) : (
                          <div className="w-16 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[8px] text-gray-600 font-black uppercase">Null</div>
                        )}
                      </td>
                      <td className="px-6 py-6 align-middle text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(blog)} className="p-2.5 bg-white/5 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 rounded-lg border border-white/10 transition-all">
                            <FontAwesomeIcon icon={faEdit} size="sm" />
                          </button>
                          <button onClick={() => handleDelete(blog.id)} className="p-2.5 bg-white/5 hover:bg-red-600/20 text-gray-400 hover:text-red-400 rounded-lg border border-white/10 transition-all">
                            <FontAwesomeIcon icon={faTrash} size="sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center px-4 py-2 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                Buffer Segment: {filteredBlogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} — {Math.min(currentPage * itemsPerPage, filteredBlogs.length)} / {filteredBlogs.length}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest disabled:opacity-20 hover:bg-white/10 transition-all">Prev</button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest disabled:opacity-20 hover:bg-white/10 transition-all">Next</button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogsDashboard;
