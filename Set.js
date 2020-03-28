//该文件介绍数据结构中的集合
//这是集合的构造函数
class set{
    constructor(){
         this.items={};
    }
    //如果元素在集合中，则返回true，否则返回false
    has(element){
        //return element in this.items;
          return Object.prototype.hasOwnProperty.call(this.items,element);
    }
    //向集合中添加元素
    add(element){
        if (!this.has(element)){
            this.items[element]=element;
            return true;
        }
        return false;
    }
    //删除集合中的元素
    delete(element){
        if(this.has(element)){
            delete this.items[element];
            return true;
        }
        return false;
    }
    //清空集合中的元素
    clear(){
        this.items={};
    }
    //返回集合中元素的个数
    size(){
        return Object.keys(this.items).length;
        //keys方法能够返回一个包含给定对象的所有属性的数组
    }
    //返回集合中的所有元素
    values(){
        return Object.values(this.items);
        //使用Object类内置的values方法，是ES2017引入，目前只在现代浏览器中使用
    }
    //兼容性的values方法
    valuesLegacy(){
        let values=[];
        for(let key in this.items){
            if(this.items.hasOwnProperty(key)){
                values.push(key);
            }
        }
        return values;
    }

    //下面的函数实现集合运算
    //并集的实现方式（add方法中有判断一个元素是否已经拥有，所以可以直接用）
    union(otherSet){
        const unionSet=new set();
        this.values().forEach(value =>unionSet.add(value));
        otherSet.values().forEach(value =>unionSet.add(value));
        return unionSet;
    }
    //交集的实现方式
    intersection(otherSet){
        const intersectionSet=new Set();
        this.values().forEach(value=>{
            if(otherSet.has(value)) intersectionSet.add(value)
        });
        return intersectionSet;
    }
    //差集的实现方式（A集合中有，但是B中没有的，A-B）
    difference(otherSet){
        const differenceSet=new Set();
        this.values().forEach(value => {
            if(!otherSet.has(value)) differenceSet.add(value);
        });
        return differenceSet;
    }
    //子集的实现方式
    isSubsetof(otherSet){
        if(this.size()>otherSet.size()) return false;
        return this.values().every(value=>{return otherSet.has(value)});
    }
}

//下面的代码测试集合类
const newset = new set();
newset.add(1);
console.log(newset.valuesLegacy());
console.log(newset.has(1));
console.log(newset.size());

newset.delete(1);
console.log(newset.has(1));

//交集测试
const set1=new set();
const set2=new set();
set1.add(1);
set1.add(2);
set2.add(1);
set2.add(2);
set2.add(3);
intersection12=set1.intersection(set2);
console.log(intersection12.values());
console.log(set1.isSubsetof(set2));