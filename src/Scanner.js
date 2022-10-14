/*
    扫描器类
*/
export default class Scanner{
    // js对象的constructor属性返回创建该对象的函数的引用。
    constructor(templateStr){
        // 将模板字符串写到实例身上
        this.templateStr=templateStr;
        // 指针，当前位置
        this.pos=0;
        // 指针的尾巴(包括现在指针指向的那一位),一开始就是模板字符串的原文
        this.tail=templateStr;
    }
    // 功能弱，就是走过指定内容，无返回值
    scan(tag){
        if(this.tail.indexOf(tag)==0){
            // tag有多长，比如{{长度是2，就让指针后移多少位
            this.pos+=tag.length;
            // 尾巴也要变
            this.tail=this.templateStr.substring(this.pos)
        }
    }
    // 让指针进行扫描直到遇见指定内容结束，且能够返回结束之前路过的文字
    scanUtil(stopTag){
        // 记录一下执行本方法时的pos值
        const pos_backup=this.pos;
        // 指针后移。当尾巴的开头不是stopTag时说明还未扫描到stopTag。写&&防止找不到，而且寻找到最后也要停下来
        while(!this.eos() && this.tail.indexOf(stopTag)!=0){
            this.pos++;
            // 改变尾巴为从当前指针这个字符开始到最后的全部字符
            this.tail=this.templateStr.substring(this.pos);
        }

        // 返回从当前位置到指针位置（不包括指针位置）
        return this.templateStr.substring(pos_backup,this.pos);
    }

    // 指针是否已经到头，返回布尔值。eos即end of string
    eos(){
        return this.pos>=this.templateStr.length;
    }
}