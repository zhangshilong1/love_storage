"use client"

import { useState } from 'react'
import { Heart, Calendar, ImageIcon, Trash2, Edit2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MemoryEvent } from '@/types'
import { formatDate, formatDateShort } from '@/lib/utils'

interface TimelineProps {
  events: MemoryEvent[]
  onEdit: (event: MemoryEvent) => void
  onDelete: (id: string) => void
}

export function Timeline({ events, onEdit, onDelete }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // 按日期排序（最新的在前）
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-love-soft flex items-center justify-center mb-4">
          <Heart className="w-12 h-12 text-love-primary/50" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">还没有记录哦</h3>
        <p className="text-sm text-gray-400">点击下方的按钮添加你们的第一个美好回忆吧</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* 时间线轴线 */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-love-primary/30 via-love-primary/50 to-love-primary/30" />

      <div className="space-y-6">
        {sortedEvents.map((event, index) => (
          <div key={event.id} className="relative pl-16">
            {/* 时间节点 */}
            <div className="absolute left-0 top-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-love z-10">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
            </div>

            {/* 日期标签 */}
            <div className="absolute left-16 -top-1 flex items-center gap-2 text-sm text-love-primary/70">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>

            {/* 内容卡片 */}
            <Card className="mt-6 overflow-hidden group">
              <CardContent className="p-0">
                {/* 照片区域 */}
                {event.photos.length > 0 && (
                  <div className="relative">
                    <div className="flex gap-2 p-4 pb-2 overflow-x-auto">
                      {event.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 border-love-soft hover:border-love-primary/50 transition-colors cursor-pointer"
                          onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                        >
                          <img
                            src={photo}
                            alt={`回忆照片 ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    {event.photos.length > 3 && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        +{event.photos.length - 3}
                      </div>
                    )}
                  </div>
                )}

                {/* 文字内容 */}
                <div className="p-4 pt-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-end gap-2 px-4 pb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(event)}
                    className="text-gray-400 hover:text-love-primary"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    编辑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(event.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    删除
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
