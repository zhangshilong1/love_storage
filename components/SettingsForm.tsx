"use client"

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LoveSettings } from '@/types'

interface SettingsFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: LoveSettings
  onSave: (settings: LoveSettings) => void
}

export function SettingsForm({ open, onOpenChange, settings, onSave }: SettingsFormProps) {
  const [partnerName1, setPartnerName1] = useState('')
  const [partnerName2, setPartnerName2] = useState('')
  const [startDate, setStartDate] = useState('')

  useEffect(() => {
    if (open) {
      setPartnerName1(settings.partnerName1)
      setPartnerName2(settings.partnerName2)
      setStartDate(settings.startDate ? settings.startDate.split('T')[0] : '')
    }
  }, [open, settings])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    onSave({
      partnerName1: partnerName1.trim() || '我',
      partnerName2: partnerName2.trim() || 'TA',
      startDate: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 fill-love-primary text-love-primary" />
            恋爱设置
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* 情侣名字 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                你的名字
              </label>
              <input
                type="text"
                value={partnerName1}
                onChange={(e) => setPartnerName1(e.target.value)}
                placeholder="我"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-love-primary focus:ring-2 focus:ring-love-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TA的名字
              </label>
              <input
                type="text"
                value={partnerName2}
                onChange={(e) => setPartnerName2(e.target.value)}
                placeholder="TA"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-love-primary focus:ring-2 focus:ring-love-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* 开始日期 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              恋爱开始日期 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-love-primary focus:ring-2 focus:ring-love-primary/20 outline-none transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">
              从这个日期开始计算你们的恋爱天数
            </p>
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
              disabled={!startDate}
            >
              保存设置
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
