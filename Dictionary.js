//本文件实现JS中的字典，字典存储的是键值对，而且是不重复的，一个键只能对应一个值，ES6中引入了Map类。
class Dictionary{
    constructor(toStrFn=defaultToString){ //toStrFn是作为一个可选参数
        this.toStrFn=toStrFn;
        this.table={};
    }
    //检查一个键是否存在于字典中
    hasKey(key){
        return this.table[this.toStrFn(key)]!=null;
    }
    //向字典中添加新元素，如果key已存在，那么已存在的value会被覆盖
    set(key,value){
        if(key!=null&&value!=null){
            const tableKey=this.toStrFn(key);
            this.table[tableKey]=new ValuePair(key,value);
            return true;
        }
        return false;
    }
    //从字典中移除一个值
    remove(key){
        if(this.hasKey(key)){
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    //从字典中检索一个值
    get(key){
        const valuePair=this.table[this.toStrFn(key)];
        return valuePair==null?undefined:valuePair.value;
    }
    //以数组形式返回字典中所有的valuePair对象
    valuePairs(){
        return Object.values(this.table);  //ES2017引入的Object.values方法
    }
    //兼容方式的valuePairs方法
    keyValues(){
        const valuePairs=[];
        for(const key in this.table){
            if(this.hasKey(key)){
                valuePairs.push(this.table[key]);
            }
        }
        return valuePairs;
    }
    //返回字典类中用于识别值的所有键名
    keys(){
        return this.keyValues().map(valuePair=>valuePair.key);
    }
    //返回字典中包含所有值的数组
    values(){
        return this.keyValues().map(valuepair=>valuepair.value);
    }
    //迭代字典中的每个键值对
    forEach(callbackFn){
        const valuePairs=this.keyValues();
        for(let i=0;i<valuePairs.length;i++){
            const result=callbackFn(valuePairs[i].key,valuePairs[i].value);
            if(result===false){
                break;
            }
        }
    }
    //清空字典
    clear(){
        this.table={};
    }
    //返回字典中的值的个数
    size(){
        return this.valuePairs().length;
    }
    //检验字典是否为空
    isEmpty(){
        return this.size()==0;
    }
    //将字典转换为字符串
    toString(){
        if(this.isEmpty()) return '';
        const valuePairs=this.valuePairs();
        let objSrting=`${valuePairs[0].toString()}`;
        for(let i=1;i<valuePairs.length;i++){
            objString=`${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
}

//创造新的键值对的类 ValuePair
class ValuePair{
    constructor(key,value){
        this.key=key;
        this.value=value;
    }
    toString(){
        return `[#${this.key}:${this.value}]`;
    }
}

function defaultToString(item){
    if(item===null){
        return 'Null';
    }else if(item===undefined){
        return 'Undefined';
    }else if(typeof item == 'string'||item instanceof String){
        return `${item}`
    }
    return item.toString();
}

//测试字典类
const dictionary=new Dictionary();
dictionary.set('张三','23岁');
dictionary.set('李四','26岁');
dictionary.set('王五','18岁');

console.log(dictionary.hasKey('李四'));
console.log(dictionary.size());
console.log(dictionary.values());
console.log(dictionary.get('王五'));

dictionary.remove('张三');
console.log(dictionary.keys());
dictionary.forEach((k,v)=>{
    console.log('forEach：',`key：${k},value：${v}`);
})