export default class Dictionary<K, V>{
    map:Map<K, V>
    constructor(){
      this.map = new Map<K, V>()
    }

    setValue(key:K, value:V){
        this.map.set(key, value);
    }

    remove(key:K){
        this.map.delete(key);
    }

    getValue(key:K):V | undefined {
        return this.map.get(key);
    }

    containsKey(key:K){
        return this.map.has(key);
    }

    size():number{
      return this.map.size;
    }
}
