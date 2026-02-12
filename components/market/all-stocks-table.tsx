"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface StockData {
  rank: number
  code: string
  name: string
  price: number
  change: number
  changePercent: number
  mainBoard: string
  volume: string
  turnover: string
  pe: number | null
  pb: number | null
  marketCap: string
  fiveDayChange: number
  yearChange: number
  bid: number
  ask: number
  currentVol: number
  dividendYield: number | null
  amplitude: number
  high: number
  low: number
  open: number
  prevClose: number
}

function generateMockStocks(count: number): StockData[] {
  const names = [
    "N海茗", "优刻得-W", "赛意斯", "鑫磊股份", "海联讯", "龙福科技", "博铭科技",
    "方盛股份", "大阳光", "欧美新材", "中星环境", "晶慧股份", "铜冠铝箔",
    "爱迪特", "首都农域", "*ST金贝", "天宜新材", "天宇通信", "项固集创",
    "宏景科技", "亿鹏电力", "新特电气", "中丰科技", "炬光科技", "优米康",
    "光芯博创", "江丰电子", "湘海汽车", "雅博股份", "鹏欣资源", "山东翔科",
    "昌投电力", "海量数据", "常宝股份", "川润股份", "汉缆股份", "京展华",
    "东阳光", "环雄电子", "石英股份", "通商互联", "伊北京", "长源东谷",
    "美凯股份", "应流股份", "蒙因科技", "中闽电气", "海看股份", "光库科技",
    "兆驰股份", "名雕股份", "德才股份", "龙韵股份", "利欧股份", "新易盛",
    "英维克", "赛腾科技", "电投水电", "光线传媒", "荣信文化", "康泰文化",
  ]

  const boards = ["深证主板", "上主板", "科创板", "创业板", "北交所"]

  return Array.from({ length: count }, (_, i) => {
    const basePrice = Math.random() * 300 + 2
    const changePercent = (Math.random() - 0.45) * 20
    const change = basePrice * (changePercent / 100)
    const prevClose = basePrice - change
    const amplitude = (Math.random() * 8 + 1)
    const high = basePrice + basePrice * (Math.random() * 0.03)
    const low = basePrice - basePrice * (Math.random() * 0.03)
    const open = prevClose + (Math.random() - 0.5) * prevClose * 0.02
    const pe = Math.random() > 0.15 ? parseFloat((Math.random() * 80 + 5).toFixed(2)) : null
    const pb = Math.random() > 0.1 ? parseFloat((Math.random() * 15 + 0.5).toFixed(2)) : null
    const divYield = Math.random() > 0.3 ? parseFloat((Math.random() * 5).toFixed(2)) : null

    const volBase = Math.random() * 500000 + 1000
    const volStr = volBase > 100000
      ? `${(volBase / 10000).toFixed(0)}万`
      : `${volBase.toFixed(0)}`

    const turnBase = Math.random() * 50 + 0.1
    const turnStr = turnBase > 1
      ? `${turnBase.toFixed(2)}亿`
      : `${(turnBase * 10000).toFixed(0)}万`

    const mcBase = Math.random() * 2000 + 10
    const mcStr = mcBase > 100
      ? `${mcBase.toFixed(0)}亿`
      : `${(mcBase * 10).toFixed(0)}千万`

    return {
      rank: i + 1,
      code: `${Math.random() > 0.5 ? "6" : "3"}${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`,
      name: names[i % names.length],
      price: parseFloat(basePrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      mainBoard: boards[Math.floor(Math.random() * boards.length)],
      volume: volStr,
      turnover: turnStr,
      pe,
      pb,
      marketCap: mcStr,
      fiveDayChange: parseFloat((Math.random() * 20 - 10).toFixed(2)),
      yearChange: parseFloat((Math.random() * 60 - 30).toFixed(2)),
      bid: parseFloat((basePrice - Math.random() * 0.02).toFixed(2)),
      ask: parseFloat((basePrice + Math.random() * 0.02).toFixed(2)),
      currentVol: Math.floor(Math.random() * 2000 + 1),
      dividendYield: divYield,
      amplitude: parseFloat(amplitude.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      open: parseFloat(open.toFixed(2)),
      prevClose: parseFloat(prevClose.toFixed(2)),
    }
  })
}

type SortKey = keyof StockData
type SortDir = "asc" | "desc"

const columns: { key: SortKey; label: string; align: "left" | "right"; width: string }[] = [
  { key: "rank", label: "序号", align: "left", width: "w-10" },
  { key: "code", label: "代码", align: "left", width: "w-16" },
  { key: "name", label: "名称", align: "left", width: "w-20" },
  { key: "price", label: "最新价", align: "right", width: "w-16" },
  { key: "change", label: "涨跌额", align: "right", width: "w-14" },
  { key: "changePercent", label: "涨跌幅", align: "right", width: "w-14" },
  { key: "volume", label: "成交量", align: "right", width: "w-16" },
  { key: "turnover", label: "成交额", align: "right", width: "w-16" },
  { key: "marketCap", label: "市值TTM", align: "right", width: "w-16" },
  { key: "fiveDayChange", label: "5分钟涨跌幅", align: "right", width: "w-20" },
  { key: "yearChange", label: "年初至今涨跌幅", align: "right", width: "w-24" },
  { key: "bid", label: "买入价", align: "right", width: "w-14" },
  { key: "ask", label: "卖出价", align: "right", width: "w-14" },
  { key: "currentVol", label: "现量", align: "right", width: "w-12" },
  { key: "pe", label: "市盈率TTM", align: "right", width: "w-18" },
  { key: "pb", label: "市净率", align: "right", width: "w-14" },
  { key: "dividendYield", label: "股息率TTM", align: "right", width: "w-16" },
  { key: "amplitude", label: "振幅", align: "right", width: "w-12" },
  { key: "high", label: "最高", align: "right", width: "w-14" },
  { key: "low", label: "最低", align: "right", width: "w-14" },
  { key: "open", label: "今开", align: "right", width: "w-14" },
  { key: "prevClose", label: "昨收", align: "right", width: "w-14" },
]

function formatValue(val: number | string | null): string {
  if (val === null || val === undefined) return "--"
  return String(val)
}

function getColorClass(val: number | null): string {
  if (val === null || val === undefined || val === 0) return "text-muted-foreground"
  return val > 0 ? "text-stock-up" : "text-stock-down"
}

export function AllStocksTable() {
  const [sortKey, setSortKey] = useState<SortKey>("rank")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const stocks = useMemo(() => generateMockStocks(50), [])

  const sortedStocks = useMemo(() => {
    return [...stocks].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal === null && bVal === null) return 0
      if (aVal === null) return 1
      if (bVal === null) return -1
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })
  }, [stocks, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Filter bar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-border bg-card">
        {["深证主板", "北交所", "创业板", "科创板", "可转债", "已上市新股", "可融资股票"].map((filter) => (
          <button
            key={filter}
            className="px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground rounded transition-colors"
          >
            {filter}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground">所有板块</span>
          <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[10px] border-collapse">
          <thead className="sticky top-0 z-10 bg-card">
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={cn(
                    "py-1 px-1.5 font-normal whitespace-nowrap cursor-pointer select-none transition-colors",
                    "hover:text-foreground",
                    col.align === "right" ? "text-right" : "text-left",
                    sortKey === col.key ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <span className="inline-flex items-center gap-0.5">
                    {col.label}
                    {sortKey === col.key && (
                      <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {sortDir === "asc" ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        )}
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((stock, index) => {
              const isUp = stock.changePercent > 0
              const isDown = stock.changePercent < 0
              const rowColor = isUp ? "text-stock-up" : isDown ? "text-stock-down" : "text-muted-foreground"

              return (
                <tr
                  key={`${stock.code}-${index}`}
                  className={cn(
                    "border-b border-border/50 cursor-pointer transition-colors",
                    "hover:bg-accent/50",
                    index === 0 && "bg-accent/30"
                  )}
                >
                  <td className="py-0.5 px-1.5 text-muted-foreground">{stock.rank}</td>
                  <td className="py-0.5 px-1.5 text-muted-foreground">{stock.code}</td>
                  <td className={cn("py-0.5 px-1.5 font-medium", rowColor)}>{stock.name}</td>
                  <td className={cn("py-0.5 px-1.5 text-right", rowColor)}>{stock.price.toFixed(2)}</td>
                  <td className={cn("py-0.5 px-1.5 text-right", getColorClass(stock.change))}>
                    {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}
                  </td>
                  <td className={cn("py-0.5 px-1.5 text-right", getColorClass(stock.changePercent))}>
                    {stock.changePercent > 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.volume}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.turnover}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.marketCap}</td>
                  <td className={cn("py-0.5 px-1.5 text-right", getColorClass(stock.fiveDayChange))}>
                    {stock.fiveDayChange > 0 ? "+" : ""}{stock.fiveDayChange.toFixed(2)}%
                  </td>
                  <td className={cn("py-0.5 px-1.5 text-right", getColorClass(stock.yearChange))}>
                    {stock.yearChange > 0 ? "+" : ""}{stock.yearChange.toFixed(2)}%
                  </td>
                  <td className={cn("py-0.5 px-1.5 text-right", rowColor)}>{stock.bid.toFixed(2)}</td>
                  <td className={cn("py-0.5 px-1.5 text-right", rowColor)}>{stock.ask.toFixed(2)}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.currentVol}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.pe !== null ? stock.pe.toFixed(2) : "--"}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.pb !== null ? stock.pb.toFixed(2) : "--"}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.dividendYield !== null ? `${stock.dividendYield.toFixed(2)}%` : "--"}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.amplitude.toFixed(2)}%</td>
                  <td className={cn("py-0.5 px-1.5 text-right", getColorClass(stock.high - stock.prevClose))}>{stock.high.toFixed(2)}</td>
                  <td className={cn("py-0.5 px-1.5 text-right", getColorClass(stock.low - stock.prevClose))}>{stock.low.toFixed(2)}</td>
                  <td className={cn("py-0.5 px-1.5 text-right", getColorClass(stock.open - stock.prevClose))}>{stock.open.toFixed(2)}</td>
                  <td className="py-0.5 px-1.5 text-right text-foreground">{stock.prevClose.toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 px-2 py-1 border-t border-border bg-card text-[10px] text-muted-foreground">
        <span>交易中</span>
        <span>上证指数 <span className="text-stock-up">4,137.01</span></span>
        <span className="text-stock-up">+5,502</span>
        <span className="text-stock-up">+1.25%</span>
        <span>5834亿</span>
        <span className="ml-auto">品股数总 <span className="text-stock-up">4,175</span></span>
      </div>
    </div>
  )
}
