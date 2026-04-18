import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Upload, Info, CheckCircle2, AlertCircle, LogIn, Lock } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email === 'teacherkalandi@gmail.com') {
        setIsAdmin(true);
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
      // Reset subject to first one
      setSubject(SUBJECTS_LIST[0].id);
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

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
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 dark:border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-brand-red dark:text-white mb-4 uppercase tracking-tight">
            Internal <span className="text-brand-accent">Portal</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Upload new chapters, instructions, and learning resources for students.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Type Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">Resource Type</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setType('school')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase transition-all ${
                      type === 'school' 
                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    School Education
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('competitive')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase transition-all ${
                      type === 'competitive' 
                        ? 'bg-brand-accent text-brand-red shadow-lg shadow-brand-accent/20' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    Competitive Exam
                  </button>
                </div>
              </div>

              {/* Class/Exam Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">
                  {type === 'school' ? 'Select Class' : 'Select Exam'}
                </label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-red transition-all"
                  required
                >
                  {(type === 'school' ? SCHOOL_CLASSES : COMPETITIVE_EXAMS).map((item) => (
                    <option key={item} value={item.toLowerCase()}>
                      {type === 'school' ? `Class ${item}` : item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Subject Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-red transition-all"
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
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">Chapter Name</label>
                <input
                  type="text"
                  value={chapterName}
                  onChange={(e) => setChapterName(e.target.value)}
                  placeholder="e.g. Quadratic Equations"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-red transition-all"
                  required
                />
              </div>
            </div>

            {/* Instruction */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">Instruction</label>
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="Write specific instructions for this resource..."
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-red transition-all resize-none"
                required
              />
            </div>

            {/* Link */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">Resource Link</label>
              <div className="relative">
                <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com/resource"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-red transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                  <Info size={14} />
                  <span>All fields are required. Data will be saved to Firestore.</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 bg-brand-red text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-red-800 disabled:opacity-50 transition-all shadow-lg shadow-brand-red/20"
              >
                {status === 'loading' ? 'Saving...' : (
                  <>
                    <Save size={20} />
                    Save Resource
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 p-4 rounded-xl border border-emerald-100"
              >
                <CheckCircle2 size={20} />
                Resource saved successfully! It will now appear on the public site.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-rose-600 font-bold bg-rose-50 p-4 rounded-xl border border-rose-100"
              >
                <AlertCircle size={20} />
                Failed to save resource. Please try again or check Firebase configuration.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
