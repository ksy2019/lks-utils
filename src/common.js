module.exports = {
    /**
     * @description: 防抖： 在规定的时间内重复触发会重新计时，计时结束执行函数
     * @param {*} func =>callback function
     * @param {*} delay
     * @param {*} isImmediately 是否立即执行
     * @return {*} function
     */
    debounce(func , delay , isImmediately){
        let timer
        if(isImmediately){
            return function(){
                timer ? clearTimeout(timer) : func.apply(this , arguments)
                timer = setTimeout(()=>{
                    timer = null
                },delay)
            }
        }else{
            return function(){
                timer ? clearTimeout(timer) : null
                timer = setTimeout(() => {
                    func.apply(this , arguments)
                }, delay);
            }
        }
    },
 
    /**
     * @description: 节流函数：每个一段时间可以执行一次
     * @param {*} func => cellback function
     * @param {*} delay
     * @return {*} function
     */
    torottle(func , delay){
        let isTorottle;
        return function(){
            if(!isTorottle){
                isTorottle = true
                func.apply(this , arguments)
                setTimeout(()=>{
                    isTorottle = false
                },delay)
            }
        }
    },
    /**
     * @description: 深拷贝函数
     * @param {*} obj   目标对象
     * @return {*} Object  深拷贝输出对象
     */
    deepCopy(obj){
        return JSON.parse(JSON.stringify(obj))
    },
    /**
     * @description: 对象转formData
     * @param {*} obj 输入对象
     * @return {*} FormData Object
     */
    formD(obj){
        const formData = new URLSearchParams();
        Object.keys(obj).forEach((key) => {
          if (obj[key] instanceof Array) {
            obj[key].forEach((item) => {
              formData.append(key, item);
            });
            return;
          }
          formData.append(key, obj[key]);
        });
        return formData;
    },
    /**
     * @description: 生成32为GUID
     * @return {*}  String
     */
    guid(){
            function S4() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+""+S4()+""+S4()+""+S4()+""+S4()+S4()+S4());
    },
    /**
     * @description: 通过post下载文件
     * @param {*} url:  String
     * @param {*} data: Object
     * @return {*} viod
     */
     postFile(url,data){
        let myform = document.createElement('form');
        myform.setAttribute('action',url);
        myform.setAttribute('method','post');
        for(let item in data){
            let myinput = document.createElement('input')
            myinput.setAttribute('value', data[item]);  
            myinput.setAttribute('name', item);  
            myform.appendChild(myinput);  
        }  
        document.getElementsByTagName("body")[0].appendChild(myform)
        myform.submit()
        myform.remove();
    },
    //点击复制文字
    copyT(text){ 
            if(text==''){
                    return false
            }
            let myinput = document.createElement('input') 
            myinput.setAttribute('id', 'copyinput');  
            document.getElementsByTagName("body")[0].appendChild(myinput)  
            myinput.value=text
            myinput.select(); // 选择对象 
            document.execCommand("Copy"); // 执行浏览器复制命令
            myinput.remove();
            Message.success("复制成功")
    },
    /**
     * @description: 读取css变量值，作用域全局
     * @param {*} key
     * @return {*} String
     */
    readCss(key){
            return getComputedStyle(document.documentElement).getPropertyValue(key).trim()
    },
    /**
     * @description: 删除:root标签下的css变量值
     * @param {*} key
     * @return {*} viod
     */
    delCss(key){
            document.documentElement.style.removeProperty(key);
    },
    /**
     * @description: 设置:root标签下的css变量值
     * @param {*} key
     * @param {*} val
     * @return {*} boolean
     */
    setCss(key,val){
            try{
                    document.documentElement.style.setProperty(key , val);
                    return true
            }catch(e){
                    return false
            }
    }
}