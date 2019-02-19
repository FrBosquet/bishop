class CacheController {
  constructor(){
    this.allItems = null
    this.detail = {}
  }

  setAll(items){
    this.allItems = items
  }

  getAll(){
    return this.allItems
  }

  set(data){
    if(!data.id) throw new Error('Data should be normalized before cached')
    this.detail[data.id] = data
  }

  get(id){
    return this.detail[id]
  }
}

module.exports = CacheController