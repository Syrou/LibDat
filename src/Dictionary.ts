export default class Dictionary<K, V>{
    map:Map<K, V> = new Map<K, V>()
    constructor(){
    
    }

    setValue(key:K, value:V){
        this.map.set(key, value);
    }

    remove(key:K){
        this.map.delete(key);
    }

    getValue(key:K){
        return this.map.get(key);
    }

    containsKey(key:K){
        return this.map.has(key);
    }
}

