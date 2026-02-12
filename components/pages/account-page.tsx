"use client"

import { cn } from "@/lib/utils"
import { DollarSign, TrendingUp, Infinity } from "lucide-react"

const features = [
  { icon: DollarSign, title: "交易免佣", desc: "开户即免佣，超低融资费用料", color: "text-primary" },
  { icon: TrendingUp, title: "腾讯投资，持牌券商", desc: "香港证监会监管，投资者赔偿基金保障", color: "text-stock-down" },
  { icon: Infinity, title: "开户入金无限制", desc: "存入任意金额即可交易", color: "text-foreground" },
]

const tableHeaders = ["操作", "代码", "名称", "持有数量", "可卖数量", "市值", "平均成本价", "总盈亏金额", "未实现盈亏比例", "已实现盈亏", "今日盈亏", "持仓占比", "今日成交量", "今日买入均价", "今日卖出均价", "保证金率"]

export function AccountPage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Features */}
        <div className="flex items-center justify-center gap-12 py-8 border-b border-border">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center">
                  <Icon className={cn("h-6 w-6", f.color)} />
                </div>
                <span className="text-xs font-medium text-foreground">{f.title}</span>
                <span className="text-[10px] text-muted-foreground">{f.desc}</span>
              </div>
            )
          })}
        </div>

        {/* Open account button */}
        <div className="flex justify-center py-4 border-b border-border">
          <button className="px-8 py-2 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors">
            立即开通
          </button>
        </div>

        {/* Holdings table header */}
        <div className="flex-1 overflow-x-auto p-3">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                {tableHeaders.map((header) => (
                  <th key={header} className="text-left py-1.5 px-2 font-normal whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={tableHeaders.length} className="py-16 text-center text-muted-foreground text-xs">
                  暂无持仓数据
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Stock detail panel (same as stock detail page right panel) */}
      <div className="w-[280px] border-l border-border overflow-y-auto">
        <div className="flex items-center gap-0.5 border-b border-border px-2 py-1.5">
          <button className="px-2 py-0.5 text-[11px] bg-accent text-accent-foreground rounded">报价</button>
          <button className="px-2 py-0.5 text-[11px] text-muted-foreground rounded">资讯</button>
          <button className="px-2 py-0.5 text-[11px] text-muted-foreground rounded">评论</button>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">600333</span>
            <span className="text-sm font-medium text-foreground">长春燃气</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold text-stock-down">5.64</span>
            <span className="text-xs text-stock-down">-0.04</span>
            <span className="text-xs text-stock-down">-0.70%</span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-3 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">最高价</span>
              <span className="text-stock-up">5.71</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">开盘价</span>
              <span className="text-stock-up">5.68</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">最低价</span>
              <span className="text-stock-down">5.58</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">成交量</span>
              <span className="text-foreground">3,387万</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">振幅</span>
              <span className="text-foreground">2.29%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">换手率</span>
              <span className="text-foreground">4.41%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">总市值</span>
              <span className="text-foreground">34.35亿</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">52周最高</span>
              <span className="text-stock-up">14.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">历史最低</span>
              <span className="text-stock-down">2.03</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">股价TTM</span>
              <span className="text-foreground">5.11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
