"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"

interface TradePanelProps {
  stockName: string
  price: number
}

export function TradePanel({ stockName, price }: TradePanelProps) {
  const [quantity, setQuantity] = useState(100)
  const total = (price * quantity).toFixed(2)

  return (
    <div className="px-3 py-2">
      <div className="text-[10px] text-muted-foreground mb-2">A股交易</div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-muted-foreground">账户</span>
        <span className="text-[10px] text-foreground">综合账户</span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-muted-foreground">价格</span>
        <div className="flex items-center gap-1">
          <button className="h-5 w-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-xs text-foreground w-14 text-center">{price.toFixed(2)}</span>
          <button className="h-5 w-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-muted-foreground">类型</span>
        <span className="text-[10px] text-foreground">限价单</span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-muted-foreground">数量</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setQuantity(Math.max(100, quantity - 100))}
            className="h-5 w-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-xs text-foreground w-14 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 100)}
            className="h-5 w-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-muted-foreground">{stockName}</span>
        <span className="text-xs text-foreground">{total}</span>
      </div>

      <button className="w-full py-2 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
        交易
      </button>
    </div>
  )
}
