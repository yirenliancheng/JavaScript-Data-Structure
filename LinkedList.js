class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }

    push(element) {
        const node = new Node(element);//先将该元素创建一个node项
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {   //获得链表的最后一项
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    removeAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
            } else {
                let previous;
                for (let i = 0; i < index; i++) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next; //直接将previous与current的下一项链接起来，跳过current
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }

    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }


    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = getElementAt(index - 1);
                const current = previous.next;
                previous.next = node;
                node.next = current;
            }
            this.count++;
            return true;
        }
        return false;
    }

    indexOf(element) {
        let current = this.head;
        for (let i = 0; i <= this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }

    remove(element) {
        const index = indexOf(element);
        return this.removeAt(index);
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.count;
    }

    getHead() {
        return this.head;
    }

    toString() {
        if (this.isEmpty()) {
            return "";
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 0; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}

function defaultEquals(a, b) {
    return a === b;
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

var a=new LinkedList();
a.push(25);
a.push(32);
console.log(a.indexOf(32));
console.log(a.size());
console.log(a.toString());