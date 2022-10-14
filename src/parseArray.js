/* 
    处理数组，结合renderTemplate实现递归
    注：这个函数收到的参数是token而不是tokens。
    token就是一个简单的['#','students',[]] 

    这个函数要递归调用renderTemplate函数，调用次数由data决定。
    数组长度是几parseArray()函数就要递归调用renderTemplate函数几次
    比如data的形式是这样的：
    {
        students: [
            { 'name': '小明', 'hobbies': ['游泳', '健身'] },
            { 'name': '小红', 'hobbies': ['足球', '蓝球', '羽毛球'] },
            { 'name': '小强', 'hobbies': ['吃饭', '睡觉'] },
        ]
    };
    那么parseArray()函数就要递归调用renderTemplate函数3次，因为数组长度是3
*/

import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

export default function parseArray(token,data){
    // 得到整体数据data中这个数组要使用的部分
    var v=lookup(data,token[1]);
    // 结果字符串
    var resultStr='';
    // 遍历v数组
    for(let i=0;i<v.length;i++){
        resultStr +=renderTemplate(token[2],{
            // 展开原对象
            ...v[i],
            // 补充一个点属性
            '.':v[i]
        });
    }
    return resultStr;
}