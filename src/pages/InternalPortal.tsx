import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Upload, Info, CheckCircle2, AlertCircle, LogIn, Lock, Trash2, ExternalLink, Search, Filter, Loader2 } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';

import { SUBJECTS_LIST, SCHOOL_CLASSES, COMPETITIVE_EXAMS } from '../constants';

export default function InternalPortal() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [type, setType] = useState('school');
  const [classLevel, setClassLevel] = useState('1');
  const [subject, setSubject] = useState(SUBJECTS_LIST[0].id);
  const [chapterName, setChapterName] = useState('');
  const [instruction, setInstruction] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resources, setResources] = useState<any[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchResources = async () => {
    setLoadingResources(true);
    try {
      const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResources(docs);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoadingResources(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email === 'teacherkalandi@gmail.com') {
        setIsAdmin(true);
        fetchResources();
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setStatus('loading');

    try {
      await addDoc(collection(db, 'resources'), {
        type,
        classLevel,
        subject,
        chapterName,
        instruction,
        link,
        createdAt: serverTimestamp(),
        authorEmail: currentUser?.email,
        authorUid: currentUser?.uid
      });
      setStatus('success');
      setChapterName('');
      setInstruction('');
      setLink('');
      setSubject(SUBJECTS_LIST[0].id);
      fetchResources();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resource? This action cannot be undone.")) return;
    
    try {
      await deleteDoc(doc(db, 'resources', id));
      setResources(resources.filter(res => res.id !== id));
      console.log("Successfully deleted resource:", id);
    } catch (error: any) {
      console.error("Error deleting document:", error);
      let errorMessage = "Failed to delete resource.";
      if (error.code === 'permission-denied') {
        errorMessage = "Permission Denied: You do not have authority to delete this resource. Please make sure your email is verified.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);
    }
  };

  const filteredResources = resources.filter(res => 
    res.chapterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.classLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full text-center"
        >
          <div className="bg-brand-red/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-brand-red" size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase">Portal Access</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Please login with your school administrator account to access the internal portal.
          </p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 dark:border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all text-slate-900"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 transition-all" />
            Continue with Google
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full text-center"
        >
          <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-rose-600" size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase">Access Denied</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Your account ({currentUser.email}) does not have administrator privileges.
          </p>
          <button
            onClick={() => auth.signOut()}
            className="text-brand-red font-bold hover:underline"
          >
            Sign out
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-brand-red dark:text-white mb-4 uppercase tracking-tight">
            Internal <span className="text-brand-accent">Portal</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
             <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">
                   Active: {currentUser.email}
                </span>
             </div>
             {isAdmin && (
               <div className="bg-brand-red text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-red/10">
                  Admin Access Verified
               </div>
             )}
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Manage your school curriculum, chapters, and study resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 sticky top-24">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <Upload size={20} className="text-brand-red" />
                  Upload Resource
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Type Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Type</label>
                  <div className="flex gap-2">
                    {['school', 'competitive'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`flex-1 py-2 px-3 rounded-lg font-black text-[10px] uppercase transition-all ${
                          type === t 
                            ? 'bg-brand-red text-white' 
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {t === 'school' ? 'School' : 'Exam'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Class/Exam Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    {type === 'school' ? 'Class' : 'Exam Selection'}
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-red transition-all"
                    required
                  >
                    {(type === 'school' ? SCHOOL_CLASSES : COMPETITIVE_EXAMS).map((item) => (
                      <option key={item} value={item.toLowerCase()}>
                        {type === 'school' ? `Class ${item}` : item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-red transition-all"
                    required
                  >
                    {SUBJECTS_LIST.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chapter Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Chapter</label>
                  <input
                    type="text"
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                    placeholder="Chapter title..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-red transition-all"
                    required
                  />
                </div>

                {/* Instruction */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Instruction</label>
                  <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="Describe content..."
                    rows={3}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-red transition-all resize-none"
                    required
                  />
                </div>

                {/* Link */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">URL</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Resource link..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-red transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-800 disabled:opacity-50 transition-all shadow-lg shadow-brand-red/20"
                >
                  {status === 'loading' ? 'Saving...' : (
                    <>
                      <Save size={18} />
                      Save Resource
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="text-emerald-500 text-[10px] font-black text-center uppercase tracking-widest">
                    Saved successfully!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Resources List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                    Existing Resources
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-black">
                      {resources.length}
                    </span>
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Filter resources..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold outline-none focus:ring-2 focus:ring-brand-red/20"
                    />
                  </div>
               </div>

               <div className="p-2">
                 {loadingResources ? (
                   <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                      <Loader2 className="animate-spin" size={32} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Loading Library...</p>
                   </div>
                 ) : filteredResources.length > 0 ? (
                   <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                              <th className="px-6 py-4">Chapter & Subject</th>
                              <th className="px-6 py-4">Target</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                           <AnimatePresence>
                             {filteredResources.map((res) => (
                               <motion.tr 
                                 key={res.id}
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0, x: -20 }}
                                 className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                               >
                                  <td className="px-6 py-5">
                                     <div className="font-black text-slate-900 dark:text-white text-sm uppercase leading-tight">
                                        {res.chapterName}
                                     </div>
                                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                        {res.subject}
                                     </div>
                                  </td>
                                  <td className="px-6 py-5">
                                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                       res.type === 'school' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                     }`}>
                                       {res.type === 'school' ? `Class ${res.classLevel}` : res.classLevel}
                                     </span>
                                  </td>
                                  <td className="px-6 py-5">
                                     <div className="flex items-center justify-end gap-2">
                                        <a 
                                          href={res.link} 
                                          target="_blank" 
                                          rel="noreferrer"
                                          className="p-2 text-slate-400 hover:text-brand-red transition-colors"
                                        >
                                          <ExternalLink size={18} />
                                        </a>
                                        <button 
                                          onClick={() => handleDelete(res.id)}
                                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                                        >
                                          <Trash2 size={18} />
                                        </button>
                                     </div>
                                  </td>
                               </motion.tr>
                             ))}
                           </AnimatePresence>
                        </tbody>
                     </table>
                   </div>
                 ) : (
                   <div className="py-20 text-center text-slate-400">
                      <Trash2 size={40} className="mx-auto mb-4 opacity-20" />
                      <p className="text-[10px] font-black uppercase tracking-widest">No matching resources found</p>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
