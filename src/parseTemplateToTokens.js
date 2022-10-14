import Scanner from './Scanner'
import nextTokens from './nestTokens';

/*
    将模板字符串变为tokens数组
*/
export default function parseTemplateToTokens(templateStr){
    var tokens=[];
    // 创建扫描器
    var scanner=new Scanner(templateStr);
    var words;
    // 让扫描器工作
    while(!scanner.eos()){
        // 收集开始标记出现之前的文字
        words=scanner.scanUtil('{{');
        if(words!=''){
            // 存起来
            tokens.push(['text',words]);
        }
        // 过双大括号
        scanner.scan('{{');

        words=scanner.scanUtil('}}');
        if(words!=''){
            if(words[0]=='#'){
                // 存起来,从下标为1的项开始存，因为下标为0的项是#
                tokens.push(['#',words.substring(1)]);
            }else if(words[0]=='/'){
                // 存起来,从下标为1的项开始存，因为下标为0的项是/
                tokens.push(['/',words.substring(1)]);
            }else{
                // 存起来
                tokens.push(['name',words]);
            }
        }
        scanner.scan('}}');
    }

    // 返回折叠收集的tokens
    return nextTokens(tokens);
}