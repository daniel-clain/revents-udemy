import sampleData from "./data"

const delay = ms => new Promise(res => setTimeout(res, ms))

export const fetchSampleData = () => {
  return delay(1000).then(() => {
    return Promise.resolve(sampleData)
  })
}