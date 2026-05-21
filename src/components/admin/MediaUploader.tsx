'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Upload, X, Star, Loader2, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface MediaFile {
  id?: string
  url: string
  alt?: string
  is_primary?: boolean
  sort_order?: number
}

interface MediaUploaderProps {
  files: MediaFile[]
  onFilesChange: (files: MediaFile[]) => void
  bucket?: string
  folder?: string
  maxFiles?: number
  maxSizeMB?: number
  showPrimaryToggle?: boolean
  helperText?: string
  accept?: string
}

export default function MediaUploader({
  files,
  onFilesChange,
  bucket = 'media',
  folder = 'uploads',
  maxFiles = 20,
  maxSizeMB = 5,
  showPrimaryToggle = true,
  helperText = 'Recommended size: 1920x1080px (Max 5MB)',
  accept = 'image/*',
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const uploadFile = async (file: File): Promise<string | null> => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${maxSizeMB}MB.`)
      return null
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (json.success) {
        return json.url
      } else {
        toast.error('Upload failed: ' + (json.error || 'Unknown error'))
        return null
      }
    } catch {
      toast.error('Connection error during upload')
      return null
    }
  }

  const handleFiles = useCallback(async (fileList: FileList) => {
    if (files.length + fileList.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed.`)
      return
    }

    setUploading(true)
    const newFiles: MediaFile[] = []

    for (const file of Array.from(fileList)) {
      const url = await uploadFile(file)
      if (url) {
        newFiles.push({
          url,
          alt: file.name.replace(/\.[^.]+$/, ''),
          is_primary: files.length === 0 && newFiles.length === 0,
          sort_order: files.length + newFiles.length,
        })
      }
    }

    onFilesChange([...files, ...newFiles])
    setUploading(false)
    if (newFiles.length > 0) toast.success(`${newFiles.length} file(s) uploaded!`)
  }, [files, maxFiles, onFilesChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    // If we removed the primary, make the first one primary
    if (files[index]?.is_primary && updated.length > 0) {
      updated[0].is_primary = true
    }
    onFilesChange(updated)
  }

  const setPrimary = (index: number) => {
    const updated = files.map((f, i) => ({ ...f, is_primary: i === index }))
    onFilesChange(updated)
  }

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group',
          dragOver
            ? 'border-[#0D95F0] bg-[#0D95F0]/5'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 size={32} className="text-[#0D95F0] animate-spin" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#0D95F0] group-hover:border-[#0D95F0]/30 transition-all shadow-sm">
              <Upload size={22} />
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-slate-600">
              {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
            </p>
            <p className="text-xs text-slate-400 mt-1">{helperText}</p>
          </div>
        </div>
      </div>

      {/* File Grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {files.map((file, index) => (
            <div
              key={index}
              className={cn(
                'relative group rounded-xl overflow-hidden border-2 aspect-square bg-slate-100 transition-all',
                file.is_primary ? 'border-[#0D95F0] ring-2 ring-[#0D95F0]/20' : 'border-transparent hover:border-slate-200'
              )}
            >
              <Image
                src={file.url}
                alt={file.alt || ''}
                fill
                className="object-cover"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {showPrimaryToggle && (
                  <button
                    type="button"
                    onClick={() => setPrimary(index)}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                      file.is_primary
                        ? 'bg-[#0D95F0] text-white'
                        : 'bg-white/90 text-slate-600 hover:bg-[#0D95F0] hover:text-white'
                    )}
                    title="Set as cover image"
                  >
                    <Star size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="w-8 h-8 rounded-lg bg-white/90 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                  title="Remove"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Primary Badge */}
              {file.is_primary && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#0D95F0] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && !uploading && (
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <ImageIcon size={18} className="text-slate-300" />
          <span className="text-sm text-slate-400">No files uploaded yet</span>
        </div>
      )}
    </div>
  )
}
