/*
    函数的功能是折叠tokens
    将#和/之间的tokens能整合起来,作为它下标为3的项
*/
export default function nextTokens(tokens){
    // 准备一个结果数组
    var nextTokens=[];
    // 栈结构，存放小tokens
    var sections=[];
    // 收集器，天生指向nextTokens结果数组，引用类型值，使用指向的是同一个数组
    // 收集器的指向会变化，当遇见#时收集器会指向这个token的下标为2的新数组
    var collector=nextTokens;

    for(let i=0;i<tokens.length;i++){
        let token=tokens[i];

        switch(token[0]){
            case '#':
                // 收集器中放入这个token
                collector.push(token);
                // 入栈
                sections.push(token);
                // 收集器要换入了，给token添加下标为2的项，并让收集器指向它
                token[2]=[];
                collector=token[2]=[];
                break;
            case '/':
                // 出栈，pop()会返回刚刚弹出的项
                sections.pop();
                // 改变收集器为栈结构（队尾是栈顶）那项的下标为2的数组
                collector=sections.length>0?sections[sections.length-1][2]:nextTokens;
                break;
            default:
                collector.push(token);
        }
    }
    return nextTokens;
}