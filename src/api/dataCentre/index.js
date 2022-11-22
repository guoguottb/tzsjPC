import request from "@/utils/request"

/**
 * @param { Object} data { type,way,year,quarter}
 * @returns Promise
 */
// 数据中心 > 数据分析 > 特困供养季度表
export const exceptionalQuarterlyTableApi = (data) => {
  return request({
    method:"POST",
    url:"social/assistance/TKStatisticalAnalysis",
    data
  })
}

// DB 指的是低保
/**
 * 
 * @returns promise
 */
// 数据中心 > 数据分析 > 低保季度表
export const DBQuarterlyTableApi = (data) => {
  return request({
    method:"POST",
    url:"social/assistance/DBStatisticalAnalysis",
    data
  })
}

// 数据中心 > 数据分析 > 低保特定对象统计表
export const DBspecificObjectApi = (data) => {
  return request({
    method:"POST",
    url:"social/assistance/DBTDDXStatisticalAnalysis",
    data
  })
}

// 数据中心 > 数据分析 > 低收入人口统计表
export const StatisticsOfLowIncomePopulationApi = (data) => {
  return request({
    method:"POST",
    url:"social/assistance/DSRRKStatisticalAnalysis",
    data
  })
}

// 数据中心 > 数据分析 > 临时救助季度表
export const TemporaryAssistanceApi = (data) => {
  return request({
    method: 'POST',
    url: "/social/assistance/LSJZStatisticalAnalysis",
    data
  })
}