"use client"

import { Heart, Settings } from 'lucide-react'
import { calculateDays, formatDate } from '@/lib/utils'
import { LoveSettings } from '@/types'

interface LoveCounterProps {
  settings: LoveSettings
  onOpenSettings: () => void
}

export function LoveCounter({ settings, onOpenSettings }: LoveCounterProps) {
  const days = calculateDays(settings.startDate)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 p-8 text-white shadow-love-lg">
      {/* 装饰背景 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* 设置按钮 */}
      <button
        onClick={onOpenSettings}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* 内容 */}
      <div className="relative z-10 text-center">
        {/* 情侣名字 */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-xl font-medium">{settings.partnerName1 || '我'}</span>
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center animate-heart-beat">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <span className="text-xl font-medium">{settings.partnerName2 || 'TA'}</span>
        </div>

        {/* 天数统计 */}
        <div className="mb-4">
          <div className="text-6xl font-bold mb-2">{days}</div>
          <div className="text-lg opacity-90">天</div>
        </div>

        {/* 开始日期 */}
        <div className="text-sm opacity-80">
          从 {settings.startDate ? formatDate(settings.startDate) : '未设置'} 开始
        </div>

        {/* 温馨标语 */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm opacity-90 italic">
            "每一天都是相爱的证明"
          </p>
        </div>
      </div>
    </div>
  )
}
