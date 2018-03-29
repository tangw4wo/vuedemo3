function setCookie(name,value,expires){
    let exdate=new Date()
    exdate.setDate(exdate.getDate()+expires)
    document.cookie=name+'='+escape(value)+((expires==null)?'' :";expires="+exdate.toGMTString())
  
}
function getCookie(name){
    var arrStr = document.cookie.split(';');
           for(var i = 0;i<arrStr.length;i++){
              var arr = arrStr[i].split('=')
              if(arr[0]==name){
              return arr[1];
             }
            return '';
        }
}
function removeCookie(name){
    setCookie(name,'',-1)
}
export {setCookie,getCookie,removeCookie}