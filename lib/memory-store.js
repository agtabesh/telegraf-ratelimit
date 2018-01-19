class MemoryStore {
  constructor (clearPeriod, maxSize) {
    this.users = new Set()
    this.maxSize = maxSize
    setInterval(this.reset.bind(this), clearPeriod)
  }

  add (value) {
    if(this.users.has(value)) return true
    if(this.users.size >= this.maxSize) return false
    this.users.add(value)  
    return true
  }

  reset () {
    this.users.clear()
  }
}

module.exports = MemoryStore
