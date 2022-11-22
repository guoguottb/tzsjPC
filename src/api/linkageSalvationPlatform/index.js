// 联动救助保障平台 api
import request from "@/utils/request"
// 数据共享开放 > 同步省厅操作列表 > 生成同步数据
export const GenerateSynchronousDataApi = (data) => {
  return request({
    url:"/social/syncJmBasic/createSyncJMBasic",
    method:"POST",
    data
  })
}

// 数据共享开放 > 同步省厅操作列表 > 同步金民的数据列表(搜索功能)
export const getTableDataApi = (data) => {
  return request({
    url:"/social/syncJmBasic/getList",
    method:"POST",
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 删除一个同步金民的数据
export const deleteCurrentDataApi = (data) => {
  return request({
    method:"POST",
    url:"/social/syncJmBasic/deleteOneBasic",
    data
  })
}

// 数据共享开放 > 同步省厅操作列表 > 新增一个同步金民的数据
export const addSyncDataApi = (data) => {
  return request({
    method:"POST",
    url:"/social/syncJmBasic/addSyncOneBasic",
    data
  })
}

// 数据共享开放 > 同步省厅操作列表 > 更新一个同步金民的数据
export const updataSyncDataApi = (data) => {
  return request({
    method:"POST",
    url:"/social/syncJmBasic/updateSyncOneBasic",
    data
  })
}

// 数据共享开放 > 同步省厅操作列表 > 注销一个同步金民的数据
export const cancelSyncDataApi = (data) => {
  return request({
    method:"POST",
    url:"/social/syncJmBasic/cancelSyncOneBasic",
    data
  })
}

//  数据共享开放 > 同步省厅操作列表 > 按月删除本地数据
export const deleteMonthLocalDataApi = (data) => {
  return  request({
    url:"/social/syncJmBasic/deleteSyncJMBasic",
    method:"POST",
    data
  })
}

//  数据共享开放 > 同步省厅操作列表 > 同步金民数据
export const addSyncJMDataApi = (data) => {
  return request({
    method:"POST",
    url:"/social/syncJmBasic/executeSyncJMBasic",
    data
  })
}

//  数据共享开放 > 同步省厅操作列表 > 删除金民按钮
export const deleteOneJMDataApi = (data) => {
  return request({
    method:"POST",
    url:"/social/syncJmBasic/deleteSyncOneBasic",
    data
  })
}