"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts"

const tabs = ["排行", "我的", "关注"]
const periodTabs = ["引擎", "近3月", "近1年", "全部"]

interface PortfolioItem {
  rank: number
  name: string
  author: string
  avatar: string
  dailyReturn: string
  isUp: boolean
}

const portfolios: PortfolioItem[] = [
  { rank: 1, name: "引擎", author: "晟辰", dailyReturn: "+9.70%", isUp: true },
  { rank: 2, name: "内存", author: "34959747", dailyReturn: "+9.45%", isUp: true },
  { rank: 3, name: "等风来", author: "Luffy75", dailyReturn: "+7.63%", isUp: true },
  { rank: 4, name: "港股稳赢", author: "知行合-LM", dailyReturn: "+7.30%", isUp: true },
  { rank: 5, name: "PCB2026", author: "石鉴运输...", dailyReturn: "+6.82%", isUp: true },
  { rank: 6, name: "港股中长线...", author: "ImDave", dailyReturn: "+6.73%", isUp: true },
  { rank: 7, name: "真诚到永远2...", author: "春天牛", dailyReturn: "+5.93%", isUp: true },
  { rank: 8, name: "26年赢", author: "柯菲特39", dailyReturn: "+5.74%", isUp: true },
  { rank: 9, name: "20360818", author: "翁股份心54", dailyReturn: "+5.31%", isUp: true },
  { rank: 10, name: "2026港股趋势", author: "LP917", dailyReturn: "+5.05%", isUp: true },
  { rank: 11, name: "存储五虎", author: "7834378", dailyReturn: "+4.73%", isUp: true },
  { rank: 12, name: "港股半导体", author: "31426941", dailyReturn: "+4.39%", isUp: true },
  { rank: 13, name: "你是不是经...", author: "不吃鱼鱼的猫", dailyReturn: "+4.37%", isUp: true },
  { rank: 14, name: "工业刀具", author: "搬行侠", dailyReturn: "+4.27%", isUp: true },
  { rank: 15, name: "电力2025-20...", author: "Dawnzheng", dailyReturn: "+4.23%", isUp: true },
]

function generatePerformanceData() {
  const data = []
  const startDate = new Date("2026-02-10")
  let portfolioVal = 0
  let indexVal = 0

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() - 29 + i)
    portfolioVal += (Math.random() - 0.45) * 0.3
    indexVal += (Math.random() - 0.52) * 0.25

    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      portfolio: parseFloat(portfolioVal.toFixed(2)),
      index: parseFloat(indexVal.toFixed(2)),
    })
  }
  return data
}

interface HoldingItem {
  seq: number
  code: string
  name: string
  weight: string
  costPrice: string
  currentPrice: string
  returnPct: string
  status: string
}

const holdings: HoldingItem[] = [
  { seq: 1, code: "07747", name: "南方两倍做多三...", weight: "53.20%", costPrice: "61.180", currentPrice: "69.260", returnPct: "+13.21%", status: "全部成交" },
  { seq: 2, code: "07709", name: "南方两倍做多海...", weight: "44.80%", costPrice: "28.140", currentPrice: "28.020", returnPct: "-0.43%", status: "全部成交" },
]

export function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("排行")
  const [activePeriod, setActivePeriod] = useState("引擎")
  const [selectedPortfolio, setSelectedPortfolio] = useState(0)
  const data = useMemo(() => generatePerformanceData(), [])

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Portfolio list */}
      <div className="w-[200px] flex flex-col border-r border-border overflow-hidden">
        <div className="flex items-center gap-0.5 border-b border-border px-2 py-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2 py-0.5 text-xs rounded transition-colors",
                activeTab === tab
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
          <button className="ml-auto text-muted-foreground hover:text-foreground text-lg leading-none">+</button>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 border-b border-border">
          <span className="text-[10px] text-muted-foreground">日收益</span>
          <span className="text-[10px] text-muted-foreground">月收益</span>
          <span className="text-[10px] text-muted-foreground">总收益</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {portfolios.map((p, i) => (
            <div
              key={p.rank}
              onClick={() => setSelectedPortfolio(i)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent/30 transition-colors",
                selectedPortfolio === i && "bg-accent/50"
              )}
            >
              <span className={cn(
                "w-5 text-center text-[11px] font-medium",
                p.rank <= 3 ? "text-primary" : "text-muted-foreground"
              )}>
                {p.rank}
              </span>
              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[9px] text-muted-foreground">
                {p.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-foreground truncate">{p.name}</div>
                <div className="text-[9px] text-muted-foreground truncate">{p.author}</div>
              </div>
              <span className="text-[11px] text-stock-up">{p.dailyReturn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Performance chart */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Period tabs */}
        <div className="flex items-center gap-1 border-b border-border px-3 py-1.5">
          {periodTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActivePeriod(tab)}
              className={cn(
                "px-2 py-0.5 text-[11px] rounded transition-colors",
                activePeriod === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 p-3">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: 10 }}>
                <CartesianGrid stroke="hsl(220 15% 15%)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 9, fill: "hsl(210 10% 45%)" }}
                  axisLine={{ stroke: "hsl(220 15% 20%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "hsl(210 10% 45%)" }}
                  axisLine={{ stroke: "hsl(220 15% 20%)" }}
                  tickLine={false}
                  tickFormatter={(val) => `${val.toFixed(1)}%`}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 18% 13%)",
                    border: "1px solid hsl(220 15% 20%)",
                    fontSize: 11,
                    color: "hsl(210 10% 85%)",
                  }}
                />
                <Line type="monotone" dataKey="portfolio" stroke="hsl(210 100% 50%)" strokeWidth={1.5} dot={false} name="组合" />
                <Line type="monotone" dataKey="index" stroke="hsl(30 90% 55%)" strokeWidth={1.5} dot={false} name="恒生指数" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2 px-2">
            <div className="flex items-center gap-1">
              <div className="h-0.5 w-4 bg-primary" />
              <span className="text-[10px] text-muted-foreground">组合</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-0.5 w-4 bg-orange-500" />
              <span className="text-[10px] text-muted-foreground">恒生指数</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">标普500</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">沪深300</span>
            </div>
          </div>
        </div>

        {/* Holdings table */}
        <div className="border-t border-border">
          <div className="flex items-center gap-2 px-3 py-1.5">
            <button className="px-2 py-0.5 text-[11px] bg-accent text-accent-foreground rounded">市场</button>
            <button className="px-2 py-0.5 text-[11px] text-muted-foreground rounded hover:text-foreground">行业</button>
          </div>
          <div className="px-3 pb-3">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-1 font-normal">序号</th>
                  <th className="text-left py-1 font-normal">代码</th>
                  <th className="text-left py-1 font-normal">名称</th>
                  <th className="text-right py-1 font-normal">仓位比例</th>
                  <th className="text-right py-1 font-normal">成本价</th>
                  <th className="text-right py-1 font-normal">当前价</th>
                  <th className="text-right py-1 font-normal">盈亏比例</th>
                  <th className="text-right py-1 font-normal">状态</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => {
                  const isUp = h.returnPct.startsWith("+")
                  return (
                    <tr key={h.seq} className="border-b border-border/30 hover:bg-accent/30">
                      <td className="py-1 text-muted-foreground">{h.seq}</td>
                      <td className="py-1 text-foreground">{h.code}</td>
                      <td className="py-1 text-foreground">{h.name}</td>
                      <td className="py-1 text-right text-foreground">{h.weight}</td>
                      <td className="py-1 text-right text-foreground">{h.costPrice}</td>
                      <td className={cn("py-1 text-right", isUp ? "text-stock-up" : "text-stock-down")}>{h.currentPrice}</td>
                      <td className={cn("py-1 text-right", isUp ? "text-stock-up" : "text-stock-down")}>{h.returnPct}</td>
                      <td className="py-1 text-right text-muted-foreground">{h.status}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right: Portfolio detail */}
      <div className="w-[220px] border-l border-border overflow-hidden flex flex-col">
        <div className="flex items-center gap-0.5 border-b border-border px-2 py-1.5">
          <button className="px-2 py-0.5 text-[11px] bg-accent text-accent-foreground rounded">报价</button>
          <button className="px-2 py-0.5 text-[11px] text-muted-foreground rounded">评论</button>
        </div>

        <div className="px-3 py-2">
          <h3 className="text-sm font-medium text-foreground">引擎</h3>
          <div className="text-[10px] text-muted-foreground mt-0.5">PFL0185211 粉丝: 0</div>

          <div className="flex items-center gap-3 mt-2">
            <div>
              <span className="text-[10px] text-muted-foreground">总收益</span>
              <div className="text-sm font-medium text-stock-up">+6.39%</div>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground">净值</span>
              <div className="text-sm font-medium text-foreground">1.0639</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 text-[10px]">
            <span className="text-muted-foreground">日收益</span>
            <span className="text-stock-up">+8.62%</span>
            <span className="text-muted-foreground ml-2">月收益</span>
            <span className="text-foreground">0.00%</span>
          </div>
        </div>

        {/* Market distribution */}
        <div className="px-3 py-2 border-t border-border">
          <span className="text-[11px] text-foreground font-medium">市场分布</span>
          <div className="flex items-center gap-4 mt-2">
            <div className="h-14 w-14 rounded-full border-4 border-purple-500 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-card" />
            </div>
            <div className="text-[10px] space-y-0.5">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-muted-foreground">现金 0.00%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-stock-up" />
                <span className="text-muted-foreground">港股 100.0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry distribution */}
        <div className="px-3 py-2 border-t border-border">
          <span className="text-[11px] text-foreground font-medium">行业分布</span>
          <div className="flex items-center gap-4 mt-2">
            <div className="h-14 w-14 rounded-full border-4 border-primary flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-card" />
            </div>
            <div className="text-[10px] space-y-0.5">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">其他 100.0%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-stock-down" />
                <span className="text-muted-foreground">现金 0.0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
