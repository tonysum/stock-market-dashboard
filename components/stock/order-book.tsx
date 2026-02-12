"use client"

import { cn } from "@/lib/utils"

interface OrderLevel {
  price: number
  volume: string
  isBid: boolean
}

const asks: OrderLevel[] = [
  { price: 5.65, volume: "156", isBid: false },
  { price: 5.64, volume: "180", isBid: false },
  { price: 5.63, volume: "649", isBid: false },
  { price: 5.62, volume: "1,652K", isBid: false },
  { price: 5.61, volume: "1,834K", isBid: false },
]

const bids: OrderLevel[] = [
  { price: 5.65, volume: "303", isBid: true },
  { price: 5.66, volume: "248", isBid: true },
  { price: 5.67, volume: "360", isBid: true },
  { price: 5.68, volume: "260", isBid: true },
  { price: 5.69, volume: "318", isBid: true },
]

export function OrderBook() {
  const maxAskVol = 1834
  const maxBidVol = 360

  return (
    <div className="px-2 py-1.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-stock-up">卖盘五档</span>
        <span className="text-[10px] text-stock-down">买盘五档</span>
      </div>

      {/* Bid/Ask ratio bar */}
      <div className="flex h-3 rounded-sm overflow-hidden mb-1.5">
        <div className="bg-stock-up/30 h-full" style={{ width: "37.27%" }} />
        <div className="bg-stock-down/30 h-full" style={{ width: "62.73%" }} />
      </div>

      <div className="flex gap-2">
        {/* Ask side */}
        <div className="flex-1">
          {asks.map((level, i) => (
            <div key={`ask-${i}`} className="flex items-center justify-between py-0.5 text-[10px]">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground w-4">{"卖" + (5 - i)}</span>
                <span className="text-stock-up">{level.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-12 h-2 bg-card rounded-sm overflow-hidden flex justify-end">
                  <div
                    className="h-full bg-stock-up/40"
                    style={{ width: `${Math.min(100, (parseInt(level.volume.replace(/,/g, "")) / maxAskVol) * 100)}%` }}
                  />
                </div>
                <span className="text-foreground w-12 text-right">{level.volume}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bid side */}
        <div className="flex-1">
          {bids.map((level, i) => (
            <div key={`bid-${i}`} className="flex items-center justify-between py-0.5 text-[10px]">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground w-4">{"买" + (i + 1)}</span>
                <span className="text-stock-down">{level.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-12 h-2 bg-card rounded-sm overflow-hidden flex justify-end">
                  <div
                    className="h-full bg-stock-down/40"
                    style={{ width: `${Math.min(100, (parseInt(level.volume.replace(/,/g, "")) / maxBidVol) * 100)}%` }}
                  />
                </div>
                <span className="text-foreground w-12 text-right">{level.volume}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
