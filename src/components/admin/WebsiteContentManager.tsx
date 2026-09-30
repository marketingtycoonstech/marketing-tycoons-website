import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DynamicContentItem,
  WebsiteSectionId,
  DynamicContentType
} from '../../types';
import {
  Upload,
  Plus,
  RefreshCw,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  XCircle,
  Film,
  Image as ImageIcon,
  Sparkles,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  AlertCircle,
  FileCheck,
  Globe,
  SlidersHorizontal,
  X,
  Clock,
  Layers,
  HardDrive
} from 'lucide-react';
import { uploadMediaToStorage } from '../../lib/firebase';

const WEBSITE_SECTIONS: { id: WebsiteSectionId; label: string; description: string }[] = [
  { id: 'home-hero', label: 'Home — Hero Section', description: 'Main hero emblem, imagery, or video loop' },
  { id: 'home-about', label: 'Home — About Section', description: 'Agency story and executive showcase media' },
  { id: 'home-services', label: 'Home — Services Showcase', description: 'Core services imagery and highlights' },
  { id: 'home-portfolio', label: 'Home — Portfolio & Projects', description: 'Case study assets and project previews' },
  { id: 'home-gallery', label: 'Home — Creative Gallery', description: 'Agency creative showcase and design gallery' },
  { id: 'home-banner', label: 'Home — Full-Width Banner', description: 'Cinematic full-width promotional banner or video' },
  { id: 'home-testimonials', label: 'Home — Testimonials Section', description: 'Client showcase and trust visual assets' },
  { id: 'home-contact', label: 'Home — Contact Section', description: 'HQ map, inquiry banner, or office imagery' },
  { id: 'service-web-development', label: 'Service — Web Development', description: 'Full-stack engineering & digital architecture assets' },
  { id: 'service-graphic-design', label: 'Service — Graphic Design & 3D', description: 'Branding kits, logos, and visual design assets' },
  { id: 'service-seo', label: 'Service — SEO & Ranking', description: 'Search optimization analytics and audit visuals' },
  { id: 'service-meta-ads', label: 'Service — Meta & Google Ads', description: 'Ad creative banners and performance campaigns' },
  { id: 'general-branding', label: 'General — Brand Logos & Crests', description: 'Official emblems, watermarks, and brand marks' },
  { id: 'blog', label: 'Blog & Articles', description: 'Featured editorial covers and banner graphics' }
];

export const WebsiteContentManager: React.FC = () => {
  const {
    dynamicContent,
    isDynamicContentLoading,
    addDynamicContentItem,
    updateDynamicContentItem,
    replaceDynamicContentMedia,
    deleteDynamicContentItem,
    togglePublishContentItem,
    reorderContentItems,
    adminUser,
    setCurrentView
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'published' | 'unpublished'>('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [activeItem, setActiveItem] = useState<DynamicContentItem | null>(null);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string>('');
  const [formSectionId, setFormSectionId] = useState<WebsiteSectionId>('home-hero');
  const [formContentType, setFormContentType] = useState<DynamicContentType>('image');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formIsPublished, setFormIsPublished] = useState<boolean>(true);

  // Upload Progress & Notification
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Filtered and Searched items
  const filteredItems = useMemo(() => {
    return dynamicContent.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.sectionId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSection =
        selectedSectionFilter === 'all' || item.sectionId === selectedSectionFilter;

      const matchesType =
        selectedTypeFilter === 'all' || item.contentType === selectedTypeFilter;

      const matchesStatus =
        selectedStatusFilter === 'all' ||
        (selectedStatusFilter === 'published' && item.isPublished) ||
        (selectedStatusFilter === 'unpublished' && !item.isPublished);

      return matchesSearch && matchesSection && matchesType && matchesStatus;
    });
  }, [dynamicContent, searchQuery, selectedSectionFilter, selectedTypeFilter, selectedStatusFilter]);

  // Statistics
  const totalItems = dynamicContent.length;
  const publishedItems = dynamicContent.filter(i => i.isPublished).length;
  const videoItems = dynamicContent.filter(i => i.contentType === 'video').length;
  const imageItems = dynamicContent.filter(i => i.contentType === 'image' || i.contentType === 'gallery' || i.contentType === 'banner').length;

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Detect type
    if (file.type.startsWith('video/')) {
      setFormContentType('video');
    } else {
      setFormContentType('image');
    }

    setUploadFile(file);
    const objectUrl = URL.createObjectURL(file);
    setUploadPreviewUrl(objectUrl);

    if (!formTitle) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setFormTitle(cleanName);
    }
  };

  // Submit New Content
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      showNotification('Please select a media file to upload.', 'error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload to Firebase Storage
      const { downloadURL, storagePath } = await uploadMediaToStorage(
        uploadFile,
        formSectionId,
        (progress) => setUploadProgress(progress)
      );

      // 2. Write metadata record to Firestore
      await addDynamicContentItem({
        sectionId: formSectionId,
        contentType: formContentType,
        storagePath,
        downloadURL,
        title: formTitle.trim() || 'Untitled Media',
        description: formDescription.trim(),
        caption: formCaption.trim(),
        order: Number(formOrder) || 1,
        isPublished: formIsPublished,
        authorEmail: adminUser?.email || 'marketingtycoons.tech@gmail.com',
        metadata: {
          fileSize: uploadFile.size,
          fileType: uploadFile.type,
          fileName: uploadFile.name
        }
      });

      showNotification('Media published and live across the website worldwide!');
      setIsAddModalOpen(false);
      resetUploadForm();
    } catch (err: any) {
      console.error('Add content failed:', err);
      showNotification(err?.message || 'Upload failed. Please check permissions.', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Submit Edit Metadata
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;

    try {
      await updateDynamicContentItem(activeItem.id, {
        title: formTitle.trim(),
        description: formDescription.trim(),
        caption: formCaption.trim(),
        sectionId: formSectionId,
        contentType: formContentType,
        order: Number(formOrder),
        isPublished: formIsPublished
      });

      showNotification('Content metadata updated successfully!');
      setIsEditModalOpen(false);
    } catch (err: any) {
      showNotification(err?.message || 'Update failed', 'error');
    }
  };

  // Submit Replace File
  const handleReplaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem || !uploadFile) {
      showNotification('Please choose a replacement file.', 'error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await replaceDynamicContentMedia(activeItem.id, uploadFile, (progress) => {
        setUploadProgress(progress);
      });

      showNotification('Media replaced successfully! New version live on website.');
      setIsReplaceModalOpen(false);
      resetUploadForm();
    } catch (err: any) {
      showNotification(err?.message || 'Replacement failed.', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Confirm Delete Action
  const handleDeleteConfirm = async () => {
    if (!activeItem) return;
    try {
      await deleteDynamicContentItem(activeItem.id);
      showNotification('Content item and storage asset permanently deleted.');
      setIsDeleteModalOpen(false);
      setActiveItem(null);
    } catch (err: any) {
      showNotification(err?.message || 'Delete operation failed.', 'error');
    }
  };

  const resetUploadForm = () => {
    setUploadFile(null);
    if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
    setUploadPreviewUrl('');
    setFormTitle('');
    setFormDescription('');
    setFormCaption('');
    setFormOrder(1);
    setFormIsPublished(true);
    setFormContentType('image');
  };

  const openEditModal = (item: DynamicContentItem) => {
    setActiveItem(item);
    setFormTitle(item.title);
    setFormDescription(item.description || '');
    setFormCaption(item.caption || '');
    setFormSectionId(item.sectionId);
    setFormContentType(item.contentType);
    setFormOrder(item.order);
    setFormIsPublished(item.isPublished);
    setIsEditModalOpen(true);
  };

  const openReplaceModal = (item: DynamicContentItem) => {
    setActiveItem(item);
    resetUploadForm();
    setFormSectionId(item.sectionId);
    setFormContentType(item.contentType);
    setIsReplaceModalOpen(true);
  };

  const openPreviewModal = (item: DynamicContentItem) => {
    setActiveItem(item);
    setIsPreviewModalOpen(true);
  };

  const openDeleteModal = (item: DynamicContentItem) => {
    setActiveItem(item);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Toast Notification */}
      {statusMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl border text-sm font-semibold transition-all ${
          statusMessage.type === 'success'
            ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40 shadow-emerald-900/30'
            : 'bg-rose-950/90 text-rose-200 border-rose-500/40 shadow-rose-900/30'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121319] via-[#0d0e13] to-[#121319] border border-gray-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="p-1.5 rounded-xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                Website Content Manager
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Firebase CMS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              Upload, replace, and organize media across all website sections without writing code. Changes automatically sync to Firebase Storage &amp; Firestore in real time worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                resetUploadForm();
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f6c453] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add Content / Upload Media</span>
            </button>
            <button
              onClick={() => setCurrentView('public')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-700 bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#d4af37]" />
              <span>View Public Website</span>
            </button>
          </div>
        </div>

        {/* CMS Statistics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-800/80">
          <div className="p-3 rounded-2xl bg-black/40 border border-gray-800">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Total Items</span>
            <span className="text-lg font-bold text-white">{totalItems}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-gray-800">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">Published Live</span>
            <span className="text-lg font-bold text-emerald-300">{publishedItems}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-gray-800">
            <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold block">Images &amp; Banners</span>
            <span className="text-lg font-bold text-[#d4af37]">{imageItems}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-gray-800">
            <span className="text-[10px] uppercase tracking-wider text-sky-400 font-semibold block">Videos &amp; Streams</span>
            <span className="text-lg font-bold text-sky-300">{videoItems}</span>
          </div>
        </div>
      </div>

      {/* Control Panel: Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#090a0d] border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by title, section, or caption..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Section Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSectionFilter}
            onChange={e => setSelectedSectionFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-xs text-gray-300 focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            <option value="all">All Website Sections</option>
            {WEBSITE_SECTIONS.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedTypeFilter}
            onChange={e => setSelectedTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-xs text-gray-300 focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="banner">Banners</option>
            <option value="gallery">Gallery</option>
            <option value="logo">Logos</option>
            <option value="hero">Hero Media</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={e => setSelectedStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-black/60 border border-gray-800 text-xs text-gray-300 focus:outline-none focus:border-[#d4af37] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="unpublished">Unpublished (Draft)</option>
          </select>
        </div>
      </div>

      {/* Content Grid */}
      {isDynamicContentLoading && dynamicContent.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#0d0e13] border border-gray-800/80 text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Loading dynamic media from Firebase...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#0d0e13] border border-gray-800/80 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-gray-800 flex items-center justify-center mx-auto text-gray-400">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Content Found</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              {searchQuery || selectedSectionFilter !== 'all' || selectedTypeFilter !== 'all'
                ? 'No items match your active search and filter criteria.'
                : 'No dynamic content has been uploaded yet. Click "+ Add Content / Upload Media" to upload your first image, video, banner, or gallery item.'}
            </p>
          </div>
          <button
            onClick={() => {
              resetUploadForm();
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Content Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const sectionMeta = WEBSITE_SECTIONS.find(s => s.id === item.sectionId);
            const isVideo = item.contentType === 'video';

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#0d0e13] border border-gray-800/80 hover:border-[#d4af37]/40 shadow-lg flex flex-col justify-between overflow-hidden group transition-all"
              >
                {/* Visual Media Canvas */}
                <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center group/media">
                  {isVideo ? (
                    <video
                      src={item.downloadURL}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={e => (e.target as HTMLVideoElement).play().catch(() => {})}
                      onMouseLeave={e => (e.target as HTMLVideoElement).pause()}
                    />
                  ) : (
                    <img
                      src={item.downloadURL}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logo.png';
                      }}
                    />
                  )}

                  {/* Media Type & Section Overlays */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-gray-700 flex items-center gap-1">
                      {isVideo ? <Film className="w-3 h-3 text-sky-400" /> : <ImageIcon className="w-3 h-3 text-[#d4af37]" />}
                      <span>{item.contentType}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/40">
                      {sectionMeta?.label.split('—')[1] || item.sectionId}
                    </span>
                  </div>

                  {/* Published Status Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <button
                      onClick={() => togglePublishContentItem(item.id)}
                      title={item.isPublished ? 'Click to unpublish' : 'Click to publish'}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer transition-colors backdrop-blur-md ${
                        item.isPublished
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isPublished ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span>{item.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </div>

                  {/* Hover Quick Preview Button */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => openPreviewModal(item)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer"
                      title="Inspect Full Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openReplaceModal(item)}
                      className="p-2 rounded-xl bg-[#d4af37]/80 hover:bg-[#d4af37] text-black backdrop-blur-md transition-colors cursor-pointer font-bold text-xs flex items-center gap-1"
                      title="Replace this media file"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Replace</span>
                    </button>
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0">#{item.order}</span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-gray-400 line-clamp-2 mt-1">{item.description}</p>
                    )}

                    {item.caption && (
                      <p className="text-[11px] text-[#d4af37] italic mt-1 line-clamp-1">"{item.caption}"</p>
                    )}
                  </div>

                  {/* Card Meta & Actions Footer */}
                  <div className="pt-3 border-t border-gray-800/80 space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(item.updatedAt || item.createdAt).toLocaleDateString()}</span>
                      </span>
                      <span>
                        {item.metadata?.fileSize
                          ? `${(item.metadata.fileSize / (1024 * 1024)).toFixed(2)} MB`
                          : 'Storage Asset'}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="py-1.5 px-2 rounded-xl bg-gray-800/70 hover:bg-gray-800 text-gray-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => openReplaceModal(item)}
                        className="py-1.5 px-2 rounded-xl bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/30 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Replace</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="py-1.5 px-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. ADD CONTENT / UPLOAD MEDIA MODAL */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121319] border border-[#d4af37]/40 shadow-2xl p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#d4af37]/20 text-[#d4af37]">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Upload New Website Media</h3>
                  <p className="text-xs text-gray-400">Add an image, video, banner, or gallery item to any section</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isUploading) {
                    setIsAddModalOpen(false);
                    resetUploadForm();
                  }
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Section Selector */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  Target Website Section *
                </label>
                <select
                  value={formSectionId}
                  onChange={e => setFormSectionId(e.target.value as WebsiteSectionId)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  required
                >
                  {WEBSITE_SECTIONS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.label} ({s.description})
                    </option>
                  ))}
                </select>
              </div>

              {/* Content Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['image', 'video', 'banner', 'gallery'] as DynamicContentType[]).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormContentType(type)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      formContentType === type
                        ? 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]'
                        : 'bg-black/40 text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Drag & Drop File Selector */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  Select Media File (Images: JPG, PNG, WEBP, SVG | Videos: MP4, WebM) *
                </label>
                <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#d4af37]/50 hover:border-[#d4af37] rounded-2xl bg-black/40 cursor-pointer group transition-all">
                  {uploadPreviewUrl ? (
                    <div className="w-full space-y-2 text-center">
                      {formContentType === 'video' || uploadFile?.type.startsWith('video/') ? (
                        <video
                          src={uploadPreviewUrl}
                          className="max-h-48 rounded-xl mx-auto object-contain border border-gray-800"
                          controls
                        />
                      ) : (
                        <img
                          src={uploadPreviewUrl}
                          alt="Upload preview"
                          className="max-h-48 rounded-xl mx-auto object-contain border border-gray-800"
                        />
                      )}
                      <div className="text-xs font-semibold text-gray-300">
                        {uploadFile?.name} ({(uploadFile!.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                      <span className="text-[11px] text-[#d4af37] underline">Click to choose a different file</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="p-3 rounded-2xl bg-[#d4af37]/10 text-[#d4af37] group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Click to browse or drag file here</span>
                        <span className="text-[11px] text-gray-400">Directly uploads to Firebase Storage &amp; updates Firestore</span>
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm,video/quicktime"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Title & Caption */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. Master Hero Emblem"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Order Index (Sort)</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={e => setFormOrder(Number(e.target.value))}
                    min={1}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Caption / Subtitle (Optional)</label>
                <input
                  type="text"
                  value={formCaption}
                  onChange={e => setFormCaption(e.target.value)}
                  placeholder="e.g. Official Metallic Lion Crest"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description (Optional)</label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  rows={2}
                  placeholder="Detailed context or client delivery details..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              {/* Publication Status Toggle */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Publish Immediately</span>
                  <span className="text-[11px] text-gray-400">Make this media visible to public visitors right away</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPublished}
                    onChange={e => setFormIsPublished(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af37]" />
                </label>
              </div>

              {/* Upload Progress Indicator */}
              {isUploading && (
                <div className="space-y-1.5 p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30">
                  <div className="flex items-center justify-between text-xs text-[#d4af37] font-bold">
                    <span>Uploading to Firebase Storage...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#d4af37] to-amber-300 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetUploadForm();
                  }}
                  disabled={isUploading}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadFile}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Publish to Website'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. REPLACE MEDIA FILE MODAL (Requirement 8) */}
      {/* ========================================================= */}
      {isReplaceModalOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#121319] border border-[#d4af37]/40 shadow-2xl p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#d4af37]/20 text-[#d4af37]">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Replace Website Media</h3>
                  <p className="text-xs text-gray-400">Safely replace "{activeItem.title}" with a new file</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isUploading) {
                    setIsReplaceModalOpen(false);
                    resetUploadForm();
                  }
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReplaceSubmit} className="space-y-4">
              {/* Current Media Thumbnail */}
              <div className="p-3 rounded-2xl bg-black/40 border border-gray-800 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-black overflow-hidden border border-gray-700 shrink-0 flex items-center justify-center">
                  {activeItem.contentType === 'video' ? (
                    <video src={activeItem.downloadURL} className="w-full h-full object-cover" />
                  ) : (
                    <img src={activeItem.downloadURL} alt="Current" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">Current Live Asset</span>
                  <span className="text-gray-400 block line-clamp-1">{activeItem.title}</span>
                  <span className="text-[10px] text-[#d4af37] font-mono block">Section: {activeItem.sectionId}</span>
                </div>
              </div>

              {/* New File Selector */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  Choose New Replacement File *
                </label>
                <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#d4af37]/50 hover:border-[#d4af37] rounded-2xl bg-black/40 cursor-pointer group transition-all">
                  {uploadPreviewUrl ? (
                    <div className="w-full space-y-2 text-center">
                      {uploadFile?.type.startsWith('video/') ? (
                        <video src={uploadPreviewUrl} className="max-h-40 rounded-xl mx-auto" controls />
                      ) : (
                        <img src={uploadPreviewUrl} alt="New preview" className="max-h-40 rounded-xl mx-auto object-contain" />
                      )}
                      <div className="text-xs font-bold text-emerald-400">
                        New: {uploadFile?.name} ({(uploadFile!.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <Upload className="w-6 h-6 text-[#d4af37]" />
                      <span className="text-xs font-bold text-white">Click or drag new replacement file here</span>
                      <span className="text-[10px] text-gray-400">The old file will be replaced safely once the new upload succeeds.</span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm,video/quicktime"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-1.5 p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30">
                  <div className="flex items-center justify-between text-xs text-[#d4af37] font-bold">
                    <span>Uploading replacement to Storage...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#d4af37] to-amber-300 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsReplaceModalOpen(false);
                    resetUploadForm();
                  }}
                  disabled={isUploading}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadFile}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? 'Replacing...' : 'Confirm & Replace Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. EDIT CONTENT METADATA MODAL */}
      {/* ========================================================= */}
      {isEditModalOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#121319] border border-gray-800 shadow-2xl p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-lg font-bold text-white">Edit Content Metadata</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Target Section</label>
                <select
                  value={formSectionId}
                  onChange={e => setFormSectionId(e.target.value as WebsiteSectionId)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  {WEBSITE_SECTIONS.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Caption / Subtitle</label>
                <input
                  type="text"
                  value={formCaption}
                  onChange={e => setFormCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={e => setFormOrder(Number(e.target.value))}
                    min={1}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-200">
                    <input
                      type="checkbox"
                      checked={formIsPublished}
                      onChange={e => setFormIsPublished(e.target.checked)}
                      className="rounded border-gray-700 text-[#d4af37] focus:ring-[#d4af37] w-4 h-4"
                    />
                    <span>Published to Website</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-extrabold text-xs uppercase cursor-pointer hover:brightness-110 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. FULL PREVIEW MODAL */}
      {/* ========================================================= */}
      {isPreviewModalOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#0d0e13] border border-[#d4af37]/40 shadow-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <h3 className="text-base font-bold text-white">{activeItem.title}</h3>
                <span className="text-xs text-[#d4af37] font-mono">Section: {activeItem.sectionId}</span>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full max-h-[65vh] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-800">
              {activeItem.contentType === 'video' ? (
                <video
                  src={activeItem.downloadURL}
                  controls
                  autoPlay
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              ) : (
                <img
                  src={activeItem.downloadURL}
                  alt={activeItem.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              )}
            </div>

            {activeItem.description && (
              <p className="text-xs text-gray-300">{activeItem.description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800/80">
              <span className="font-mono text-[11px] truncate max-w-md">URL: {activeItem.downloadURL}</span>
              <a
                href={activeItem.downloadURL}
                target="_blank"
                rel="noreferrer"
                className="text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open Raw Asset</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. DELETE CONFIRMATION MODAL (Requirement 16) */}
      {/* ========================================================= */}
      {isDeleteModalOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#121319] border border-rose-500/40 shadow-2xl p-6 text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Content Item?</h3>
                <span className="text-xs text-gray-400">This action cannot be undone</span>
              </div>
            </div>

            <p className="text-xs text-gray-300">
              Are you sure you want to delete <strong className="text-white">"{activeItem.title}"</strong>?
              It will be removed immediately from the public website, its Firestore document reference will be deleted, and the associated file will be cleaned up from Firebase Storage.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase cursor-pointer transition-colors"
              >
                Yes, Delete Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
