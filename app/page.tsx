"use client"

import { useState, useEffect } from 'react'
import { Plus, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoveCounter } from '@/components/LoveCounter'
import { Timeline } from '@/components/Timeline'
import { EventForm } from '@/components/EventForm'
import { SettingsForm } from '@/components/SettingsForm'
import { MemoryEvent, LoveSettings } from '@/types'
import { useLocalStorage } from '@/hooks/useStorage'

export default function Home() {
  const [events, setEvents] = useLocalStorage<MemoryEvent[]>('love-events', [])
  const [settings, setSettings] = useLocalStorage<LoveSettings>('love-settings', {
    startDate: new Date().toISOString(),
    partnerName1: '我',
    partnerName2: 'TA',
  })

  const [isEventFormOpen, setIsEventFormOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<MemoryEvent | null>(null)

  // 处理保存事件
  const handleSaveEvent = (event: MemoryEvent) => {
    setEvents(prev => {
      const existingIndex = prev.findIndex(e => e.id === event.id)
      if (existingIndex >= 0) {
        // 更新现有事件
        const updated = [...prev]
        updated[existingIndex] = event
        return updated
      }
      // 添加新事件
      return [...prev, event]
    })
    setEditingEvent(null)
  }

  // 处理删除事件
  const handleDeleteEvent = (id: string) => {
    if (confirm('确定要删除这条回忆吗？')) {
      setEvents(prev => prev.filter(e => e.id !== id))
    }
  }

  // 处理编辑事件
  const handleEditEvent = (event: MemoryEvent) => {
    setEditingEvent(event)
    setIsEventFormOpen(true)
  }

  // 处理添加新事件
  const handleAddEvent = () => {
    setEditingEvent(null)
    setIsEventFormOpen(true)
  }

  // 处理保存设置
  const handleSaveSettings = (newSettings: LoveSettings) => {
    setSettings(newSettings)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* 顶部装饰 */}
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-pink-200/30 to-transparent pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 标题 */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Heart className="w-6 h-6 text-love-primary fill-love-primary animate-heart-beat" />
            <h1 className="text-2xl font-bold gradient-text">恋爱时光</h1>
            <Heart className="w-6 h-6 text-love-primary fill-love-primary animate-heart-beat" style={{ animationDelay: '0.6s' }} />
          </div>
          <p className="text-sm text-gray-500">记录我们的每一个美好瞬间</p>
        </header>

        {/* 恋爱计数器 */}
        <section className="mb-8">
          <LoveCounter 
            settings={settings} 
            onOpenSettings={() => setIsSettingsOpen(true)} 
          />
        </section>

        {/* 时间线标题 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">美好回忆</h2>
          <Button 
            variant="love" 
            size="sm" 
            onClick={handleAddEvent}
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            添加回忆
          </Button>
        </div>

        {/* 时间线 */}
        <section>
          <Timeline
            events={events}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </section>

        {/* 底部装饰 */}
        <footer className="text-center mt-12 pt-8 border-t border-love-primary/10">
          <p className="text-sm text-gray-400">
            用 ❤️ 记录我们的故事
          </p>
        </footer>
      </div>

      {/* 事件表单弹窗 */}
      <EventForm
        open={isEventFormOpen}
        onOpenChange={setIsEventFormOpen}
        onSave={handleSaveEvent}
        editingEvent={editingEvent}
      />

      {/* 设置弹窗 */}
      <SettingsForm
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </main>
  )
}
