"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Heart, MessageSquare, Share2, ThumbsUp } from "lucide-react"

const tabs = ["要闻", "快讯", "日历", "自选", "专题", "专栏"]

interface NewsItem {
  id: string
  title: string
  source: string
  time: string
  hasImage: boolean
}

const newsItems: NewsItem[] = [
  { id: "1", title: "华尔街怎么看1月非农就业？首次降息延至7月，\"新美联储通讯社\"预计降息暂停期更久", source: "华尔街见闻", time: "06:41", hasImage: true },
  { id: "2", title: "人民币延续升值趋势，中国资产受益链条明朗，港股、A股有望先后受益", source: "财联社", time: "09:13", hasImage: true },
  { id: "3", title: "药明生物再涨，去年下半年经调整纯利达胜预期，毛利率显著增长", source: "智通财经", time: "17分钟前", hasImage: true },
  { id: "4", title: "中远海能港股延续强势，年内累涨逾八成，据报美国考虑扣押涉伊朗油轮以施压", source: "智通财经", time: "18分钟前", hasImage: true },
  { id: "5", title: "又一场暴雪的开始？美加密货币微币市商BlockFills暂停客户提款", source: "金十数据", time: "22分钟前", hasImage: true },
  { id: "6", title: "东方电气上涨，花旗认为公司从东南亚数据中心或数据公用事业客户获新订单可能性更高", source: "智通财经", time: "25分钟前", hasImage: true },
  { id: "7", title: "xAI全员会：马斯克重组四大战线，推出\"巨舰\"项目挑战微软，到月球建卫星工厂与数据中心", source: "华尔街见闻", time: "28分钟前", hasImage: true },
  { id: "8", title: "瑞博生物股价上涨，与Madrigal达成44亿美元全球独家许可协议", source: "智通财经", time: "34分钟前", hasImage: true },
  { id: "9", title: "智谱宣布涨价，GLM Coding Plan整体涨幅自30%起，多家大厂密集升级新模型", source: "量子位", time: "45分钟前", hasImage: true },
  { id: "10", title: "\"软件末日论\"盛行之际，\"AI+数字广告\"霸主Applovin发布业绩，Q4净利润同比增长84%", source: "华尔街见闻", time: "09:13", hasImage: true },
]

interface IndexInfo {
  name: string
  code: string
  value: string
  change: string
  isUp: boolean
  liked: boolean
}

const indexData: IndexInfo[] = [
  { name: "标普500指数(SPX.US)", code: "SPX", value: "4941.470", change: "-0.00%", isUp: false, liked: true },
  { name: "道琼斯指数(DJI.US)", code: "DJI", value: "50121.400", change: "-0.15%", isUp: false, liked: false },
  { name: "纳斯达克综合指数(IXIC.US)", code: "IXIC", value: "23066.467", change: "-0.36%", isUp: false, liked: true },
]

export function NewsPage() {
  const [activeTab, setActiveTab] = useState("要闻")
  const [selectedNews, setSelectedNews] = useState(newsItems[0])

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: News list */}
      <div className="flex w-[420px] flex-col border-r border-border overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-0.5 border-b border-border px-3 py-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1 text-xs rounded transition-colors",
                activeTab === tab
                  ? "text-stock-up border-b-2 border-stock-up"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* News items */}
        <div className="flex-1 overflow-y-auto">
          {newsItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className={cn(
                "flex gap-3 px-3 py-2.5 cursor-pointer border-b border-border/50 hover:bg-accent/30 transition-colors",
                selectedNews.id === item.id && "bg-accent/50"
              )}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] text-foreground leading-snug line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <span className="text-[10px] text-muted-foreground">{item.time}</span>
              </div>
              {item.hasImage && (
                <div className="w-[80px] h-[54px] rounded bg-secondary flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-muted" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Article detail */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Source header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-muted-foreground">美国宏观风向</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-muted-foreground">3924篇帖子</span>
                <span className="text-[10px] text-muted-foreground">54017人订阅</span>
              </div>
            </div>
            <button className="px-3 py-1 rounded border border-stock-up text-stock-up text-[11px] hover:bg-stock-up/10 transition-colors">
              + 订阅
            </button>
          </div>

          {/* Article title */}
          <h1 className="text-lg font-medium text-foreground leading-snug mb-3">
            {selectedNews.title}
          </h1>

          {/* Article meta */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] text-primary">{selectedNews.source || "华尔街见闻"}</span>
            <span className="text-[11px] text-muted-foreground">{selectedNews.time}</span>
          </div>

          {/* Index references */}
          <div className="mb-4 space-y-1">
            {indexData.map((idx) => (
              <div key={idx.code} className="flex items-center justify-between py-1">
                <span className="text-[11px] text-primary underline">{idx.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-foreground">{idx.value}</span>
                  <span className={cn(
                    "text-[11px]",
                    idx.isUp ? "text-stock-up" : "text-stock-down"
                  )}>
                    {idx.change}
                  </span>
                  {idx.liked ? (
                    <Heart className="h-3 w-3 text-stock-up fill-stock-up" />
                  ) : (
                    <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Article body */}
          <div className="text-[13px] text-foreground/90 leading-relaxed space-y-4">
            <p className="bg-secondary/50 p-3 rounded text-[12px] text-muted-foreground leading-relaxed">
              1月非农就业报告可能强化美联储的鸽派态度，使联储官员难以找到劳动力市场疲软的理由追加进一步降息，为抵抗通胀的"高远"提供更多弹药，强劲的就业数据降低了美联储在年中前的降息预期的必要性，但并未完全排除今年降息的可能。多家机构仍预计今年将有两次降息，但时点推迟至下半年。
            </p>
            <p>
              美国1月非农就业报告显示劳动力市场超预期强劲，促使市场推迟对美联储降息时点的预期，交易员普遍预计的首次降息时间从此前的6月推迟至7月。
            </p>
            <p>
              美东时间11日周三公布的报告显示，美国1月新增非农就业人数为13万，远超市场共识预期的6.5万，为一年多来最大月度增幅；1月失业率并未如市场预期企稳，反而降至4.3%；2025年全年就业数据遭遇大幅下修，显示去年劳动力市场实际表现远弱于此前认知。
            </p>
          </div>
        </div>

        {/* Article footer actions */}
        <div className="flex items-center border-t border-border px-6 py-2">
          <div className="flex items-center gap-1 bg-secondary rounded px-3 py-1.5 flex-1 mr-3">
            <span className="text-[11px] text-muted-foreground">写评论</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="h-4 w-4" />
              <span className="text-[11px]">5</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
