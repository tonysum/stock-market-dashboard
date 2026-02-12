"use client"

import { cn } from "@/lib/utils"

interface SectorBlock {
  name: string
  change: number
  stocks: { name: string; change: number }[]
}

const sectors: SectorBlock[] = [
  {
    name: "国有大型银行",
    change: -1.12,
    stocks: [
      { name: "工商银行", change: -0.96 },
      { name: "建设银行", change: -1.12 },
      { name: "农业银行", change: -0.58 },
      { name: "中国银行", change: -1.11 },
    ],
  },
  {
    name: "证券 II",
    change: -0.40,
    stocks: [
      { name: "中信证券", change: -0.48 },
      { name: "东方财富", change: -0.88 },
      { name: "广发证券", change: 0.13 },
    ],
  },
  {
    name: "电力",
    change: 0.32,
    stocks: [
      { name: "长江电力", change: 0.45 },
      { name: "华电国际", change: 0.67 },
      { name: "国电电力", change: 0.12 },
    ],
  },
  {
    name: "消费电子",
    change: 0.82,
    stocks: [
      { name: "立讯精密", change: 1.23 },
      { name: "歌尔股份", change: 0.56 },
      { name: "蓝思科技", change: 0.78 },
    ],
  },
  {
    name: "半导体",
    change: 0.52,
    stocks: [
      { name: "中芯国际", change: 0.93 },
      { name: "韦尔股份", change: 0.34 },
      { name: "北方华创", change: -0.12 },
    ],
  },
  {
    name: "工业金属",
    change: 1.09,
    stocks: [
      { name: "紫金矿业", change: 1.75 },
      { name: "洛阳钼业", change: 0.89 },
    ],
  },
  {
    name: "通信服务",
    change: -0.39,
    stocks: [
      { name: "中国移动", change: -0.52 },
      { name: "中国联通", change: -0.31 },
    ],
  },
  {
    name: "医药",
    change: -0.59,
    stocks: [
      { name: "恒瑞医药", change: -0.73 },
      { name: "迈瑞医疗", change: -0.45 },
    ],
  },
  {
    name: "汽车零部件",
    change: 0.77,
    stocks: [
      { name: "福耀玻璃", change: 0.92 },
      { name: "华域汽车", change: 0.63 },
    ],
  },
  {
    name: "化工及贸易",
    change: -0.79,
    stocks: [
      { name: "中国石化", change: -0.63 },
      { name: "万华化学", change: -0.98 },
    ],
  },
  {
    name: "软件开发",
    change: -0.27,
    stocks: [
      { name: "金山办公", change: 0.45 },
      { name: "用友网络", change: -0.88 },
    ],
  },
  {
    name: "白酒 I",
    change: -1.05,
    stocks: [
      { name: "贵州茅台", change: -0.87 },
      { name: "五粮液", change: -1.23 },
    ],
  },
]

function getChangeColor(change: number) {
  if (change > 2) return "bg-red-700"
  if (change > 1) return "bg-red-800/90"
  if (change > 0) return "bg-red-900/70"
  if (change === 0) return "bg-muted"
  if (change > -1) return "bg-green-900/70"
  if (change > -2) return "bg-green-800/90"
  return "bg-green-700"
}

export function HeatMap() {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-foreground">个股热力图</span>
        <span className="text-[10px] text-muted-foreground">领涨板块</span>
      </div>
      <div className="grid grid-cols-6 gap-0.5">
        {sectors.map((sector) => (
          <div key={sector.name} className="flex flex-col gap-0.5">
            {/* Sector header */}
            <div
              className={cn(
                "px-1.5 py-1 text-center",
                getChangeColor(sector.change)
              )}
            >
              <div className="text-[10px] text-foreground truncate">{sector.name}</div>
              <div className={cn(
                "text-[10px]",
                sector.change >= 0 ? "text-stock-up" : "text-stock-down"
              )}>
                {sector.change > 0 ? "+" : ""}{sector.change.toFixed(2)}%
              </div>
            </div>
            {/* Stocks */}
            {sector.stocks.map((stock) => (
              <div
                key={stock.name}
                className={cn(
                  "px-1 py-0.5 text-center",
                  getChangeColor(stock.change)
                )}
              >
                <div className="text-[9px] text-foreground truncate">{stock.name}</div>
                <div className={cn(
                  "text-[9px]",
                  stock.change >= 0 ? "text-stock-up" : "text-stock-down"
                )}>
                  {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-1 mt-2">
        {["-3%", "-2%", "-1%", "0%", "+1%", "+2%", "+3%"].map((label, i) => (
          <div key={label} className="flex items-center gap-0.5">
            <div
              className={cn(
                "h-2.5 w-6",
                i === 0 ? "bg-green-700" :
                i === 1 ? "bg-green-800/90" :
                i === 2 ? "bg-green-900/70" :
                i === 3 ? "bg-muted" :
                i === 4 ? "bg-red-900/70" :
                i === 5 ? "bg-red-800/90" :
                "bg-red-700"
              )}
            />
            <span className="text-[9px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
