class TreeNode{
    constructor(val,left=null,right=null){
        this.val=val;
        this.left=left
        this.right=right;
    }

   }

class Tree{
   constructor(){
       this.root=null;
   }
//插入节点
   insert(val){
        const node=this.root;
        if(node===null){     //判断是不是根节点
           this.root=new TreeNode(val); 
        }else{
           this.search(node,val);
        }
   }

//寻找插入位置
   search(node,val){
       if(val<node.val){
           if(node.left==null){
               node.left=new TreeNode(val);
           }else{
               this.search(node.left,val);
           }
       }else{
           if(node.right==null){
               node.right=new TreeNode(val);
           }else{
               this.search(node.right,val);
           }
   }
   }

//查找节点
   find(val){
       return this.findIndex(this.root,val);
   }

   findIndex(node,val){
       if(val==null){
           return false;
       }
       if(val===node.val){
           return true;
       }else if(val>node.val){
           if(node.right){
             return this.findIndex(node.right,val);                
           };
       }else if(val<node.val){
           if(node.left){
           return this.findIndex(node.left,val);                
           };
       }
   }
//返回最大值
   max(){
        const node=this.root;
        const max=this.maxNode(node);
        return  max;
        }

   maxNode(node){
          if(node.right){
            return this.maxNode(node.right);
          }else{
            return node.val;
        }
    }
//返回最小值
   min(){
       const node=this.root;
       const min=this.minNode(node);
       return min;
   }

   minNode(node){
       if(node.left){
           return this.minNode(node.left);
       }else{
           return node.val;
       }  
   }
//中序遍历递归实现
   inOrderTraverse(){
       this.inorder(this.root);
   }

   inorder(node){
       if(node!==null){
           this.inorder(node.left);
           console.log(node.val);
           this.inorder(node.right);
       };
   }

//中序遍历迭代实现
    inOrderDiedai(){
        let node=this.root;
        let res=[];
        let stack=[];
        while(node){
            stack.push(node);
            node = node.left;
        }
        while(stack.length!==0||node){
            if(node){
                stack.push(node);
                node=node.left;
            }else{
                node=stack.pop();
                res.push(node.val);
                node=node.right;
            }
        }
        return res;
    }

//前序遍历递归实现
    preOrderTraverse(){
        this.preOrder(this.root);
    }
    preOrder(node){
       if(node!==null){
           console.log(node.val);
           this.preOrder(node.left);
           this.preOrder(node.right);
       }
    }
//前序遍历迭代实现
//先压右边的，再压入左边的
    preOrderDiedai(){
        let res=[];
        let stack=[];
        let node=this.root;
        if(node==null){
            return res;
        }
        stack.push(node);
        while(stack.length!==0){    
            node=stack.pop();
            res.push(node.val);
            if(node.right){
                stack.push(node.right);
            }
            if(node.left){
                stack.push(node.left);
            }
        }
        return res;
    }

//后序遍历递归实现
postOrderTraverse(){
    this.postOrder(this.root); 
}
postOrder(node){
 if(node){
       this.postOrder(node.left);
       this.postOrder(node.right);
       console.log(node.val);
   }
}

//后序遍历迭代实现,需要两个指针，第二个指针代表当前的节点是否已经被访问了
 postOrderDiedai(){
     let res=[];
     let stack=[];
     let node=this.root;
     let lastVisit=null;
     if(node==null) return res;
     while(node){
         stack.push(node);
         node=node.left;
     }

     while(stack.length!==0){
         node=stack.pop();
         if(node.right===null||node.right===lastVisit){
             res.push(node.val);
             lastVisit=node;
         }else{
             stack.push(node);
             node=node.right;
             while(node){
                 stack.push(node);
                 node=node.left;
             }
         }
     
     }
    return res;
 }
}

var tree= new Tree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(9);
tree.insert(3);
tree.insert(6);
tree.insert(8);
tree.insert(10);
tree.insert(15);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

console.log(tree.find(5));
console.log(tree.min());
console.log(tree.max());
console.log(tree);

tree.inOrderTraverse();
tree.preOrderTraverse();
tree.postOrderTraverse();
console.log(tree.inOrderDiedai());
console.log(tree.preOrderDiedai());
console.log(tree.postOrderDiedai());