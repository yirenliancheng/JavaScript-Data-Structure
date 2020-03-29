//本文件实现JS中的哈希表数据结构
class HashTable{
    constructor(toStrFn=defaultToString){
        this.toStrFn=toStrFn;
        this.table={};
    }
    //散列函数
    /* 简单的相加ASCII码的散列函数，冲突可能较多
    loseloseHashCode(key){
        if (typeof key ==="number"){
            return key;
        }
        const tableKey=this.toStrFn(key);
        let hash=0;
        for(let i=0;i<tableKey.length;i++){
            hash+=tableKey.charCodeAt(i);//转换为ASCII值，注意charCodeAt函数的参数是当前需要转换的字符相对于0号字符的位置
        }
        return hash%37; //为了防止数值超出最大数值范围，因此除以一个任意数值
    }

*/
    //目前最受欢迎的散列函数
    loseloseHashCode(key){
        const tableKey=this.toStrFn(key);
        let hash=5381; //质数，目前一般都用这个数实现
        for(let i=0;i<tableKey.length;i++){
            hash=(hash*33)+tableKey.charCodeAt(i);
        }
        return hash % 1013;
    }

    hashCode(key){
        return this.loseloseHashCode(key);
    }
    //向散列表中增加一个新的项
    put(key,value){
        if(key!=null&&value!=null){
            const position = this.hashCode(key);
            this.table[position]=new ValuePair(key,value);
            return true;
        }
        return false;
    }
    //从散列表中移除一个值
    remove(key){
        const hash=this.hashCode(key);
        const ValuePair1=this.table[hash];
        if(ValuePair1!=null){
            delete this.table[hash];
            return true;
        }
        return false;
    }
    //从散列表中获取一个值
    get(key){
        const valuePair2=this.table[this.hashCode(key)];
        return valuePair2==null? undefined:valuePair2.value;
    }
    //转换为字符串
    toString(){
        if(this.table==null){
            return '';
        }
        const keys=Object.keys(this.table);
        let objString=`{${keys[0]}=>${this.table[keys[0]].toString()}}`;
        for(let i=1;i<keys.length;i++){
            objString=`${objString}\n{${keys[i]}=>${this.table[keys[i]].toString()}}`;
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

//下面为测试哈希表类的代码
const hash=new HashTable();
hash.put('张三','25岁');
hash.put('李四','20岁');
hash.put('王五','28岁');
console.log(hash.get('李四')); //20岁
hash.remove('李四');
console.log(hash.get('李四')); //undefined
console.log(hash.toString())