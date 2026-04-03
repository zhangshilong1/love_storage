"use client"

import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { Camera, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MemoryEvent } from '@/types'
import { generateId } from '@/lib/utils'

interface EventFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (event: MemoryEvent) => void
  editingEvent?: MemoryEvent | null
}

export function EventForm({ open, onOpenChange, onSave, editingEvent }: EventFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 当弹窗打开或编辑事件变化时，填充表单
  useEffect(() => {
    if (open) {
      if (editingEvent) {
        setTitle(editingEvent.title)
        setDescription(editingEvent.description)
        setDate(editingEvent.date.split('T')[0])
        setPhotos(editingEvent.photos)
      } else {
        setTitle('')
        setDescription('')
        setDate(new Date().toISOString().split('T')[0])
        setPhotos([])
      }
    }
  }, [open, editingEvent])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !date) return

    const eventData: MemoryEvent = {
      id: editingEvent?.id || generateId(),
      title: title.trim(),
      description: description.trim(),
      date: new Date(date).toISOString(),
      photos,
      createdAt: editingEvent?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSave(eventData)
    onOpenChange(false)
    
    // 重置表单
    setTitle('')
    setDescription('')
    setDate('')
    setPhotos([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-xl">
            {editingEvent ? '编辑回忆' : '添加美好回忆'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* 日期选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日期 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-love-primary focus:ring-2 focus:ring-love-primary/20 outline-none transition-all"
            />
          </div>

          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：第一次约会、周年纪念日..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-love-primary focus:ring-2 focus:ring-love-primary/20 outline-none transition-all"
            />
          </div>

          {/* 描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="记录下这个特别时刻的细节和感受..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-love-primary focus:ring-2 focus:ring-love-primary/20 outline-none transition-all resize-none"
            />
          </div>

          {/* 照片上传 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              照片
            </label>
            
            {/* 已上传的照片预览 */}
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`预览 ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-xl border-2 border-love-soft"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 上传按钮 */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-love-primary/30 rounded-xl text-love-primary hover:bg-love-soft transition-colors w-full justify-center"
            >
              <Camera className="w-5 h-5" />
              <span className="text-sm">添加照片</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button
              type="submit"
              variant="love"
              className="flex-1"
              disabled={!title.trim() || !date}
            >
              {editingEvent ? '保存修改' : '添加回忆'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
