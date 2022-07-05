let upload = document.getElementById('upload');
let outPut = document.getElementById('outPut');
let inpFile = document.getElementById('inpFile');

upload.addEventListener('change', () => {
    let fileRegister = new FileReader();
    fileRegister.readAsText(upload.files[0]);
    fileRegister.onload = () => {
        outPut.value = fileRegister.result.toString();
    }
}) 
inpFile.addEventListener('change', () => {
    let fileRegister = new FileReader();
    fileRegister.readAsText(inpFile.files[0]);
    fileRegister.onload = () => {
        outPut.value = fileRegister.result.toString();
    }
}) 

function utf8ToBase64(str){
    return window.btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(str){
    return decodeURIComponent(escape(window.atob(str)));
}
function binaryNum(a) {
    var arr = [];
    while(a>0) {
        arr.push(a%2);
        a = Math.floor(a/2)
    }
    return arr;
}

function calculaeSquareAndMutil(alpha, x, p) {
    var arr = binaryNum(x);
    var beta = alpha % p;
    var result ;
    for(let i = arr.length-2; i >= 0; i--) {
        if(arr[i] ==0)
            result = (beta * beta)%p;
        else
            result = (beta*beta*alpha) % p;
            beta = result;
        }
        return result;
}

function Inverse(a,b){
    var q,r,y,y0,y1;
    y0=0, y1=1,d = b;
    while(a>0){
        q = Math.floor(b/a);
        r = b%a;
        if( r == 0)
            break;
        y = y0-q*y1;
        b=a;
        a=r;
        y0=y1;
        y1=y;
    }
    return y;
}

function download(file, text) {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", file);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element)
}

function registerDocument() {
    var valueRegister = document.getElementById('outPut').value
    var P = document.getElementById('inpRandomP').value
    var Y = document.getElementById('inpResultY').value;
    var K = parseInt(document.getElementById('inpResultK').value);
    var beta = parseInt(document.getElementById('inpResultD').value)
    var inpRandomA = parseInt(document.getElementById('inpRandomA').value);
    var m = getRadomA(0, P-1);;
    var S1 = calculaeSquareAndMutil(inpRandomA, K, P)
    var K_ND = Inverse(K, P-1);
    var S2 = (K_ND*(m-inpRandomA*S1)) % 18;
    var arr = []
    console.log(outPut.value);
    arr.push(outPut.value, S1, S2);
    localStorage.setItem('key', JSON.stringify(arr));
        alert("Signing Successfull Document !") 
    download("key.txt", arr.toString())
    
}
      
function checkRegisterDocument(){
    var checkKey = JSON.parse(localStorage.getItem('key'));
    console.log((outPut.value));
    console.log((checkKey.toString()))
    if(checkKey.toString() === outPut.value)
        alert("Document hasn't been changed")
    else  
        alert(" The documnet is invalid or has been changed");
    // window.localStorage.removeItem('key')
}
//function check primeNumber
function checkPrimeNumber(primeNumber) {

    let flag = 1;

    if (primeNumber < 2)
        return flag = 0;

    let i = 2;
    while (i < primeNumber) {
        if (primeNumber % i == 0) {
            flag = 0;
            break;
        }
        i++;
    }
    return flag;
}

//function get random A
function getRadomA(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//function calculaeModulo


console.log(calculaeSquareAndMutil(15, 3, 911))    
function randomKey() {
    //random value of Prime number P 
    var inpRandpmP = document.getElementById('inpRandomP');
    var inpRandomA = document.getElementById('inpRandomA');
    var inpRandomX = document.getElementById('inpRandomX');
    var inpResultD = document.getElementById('inpResultD');
    var inpResultK = document.getElementById('inpResultK');
    var inpResultY = document.getElementById('inpResultY');
    document.getElementById('inpRandomX')
    const arr = [];
    const randomP = Math.floor(Math.random() * 1000) + 2;

    for (let i = 2; i < 1000; i++)
        if (checkPrimeNumber(i) == 1)
            arr.push(i)
    var valueP = arr[(Math.random() * arr.length) | 0];
    inpRandpmP.value = valueP.toString();
    // console.log(arr)

    //random alpha number a from (2, p-2)
    const randomA = getRadomA(2, valueP - 2)
    inpRandomA.value = randomA.toString();

    //random alpha number x
    const randomX = Math.floor(Math.random() * 1000) + 2;
    inpRandomX.value = randomX.toString();

    console.log(calculaeSquareAndMutil(randomA,randomX, randomP))
    console.log(randomA,randomX, randomP)
    inpResultD.value = calculaeSquareAndMutil(randomA,randomX, randomP).toString();

    const randomK = getRadomA(0, valueP-1);
    inpResultK.value = randomK.toString();

    inpResultY.value = calculaeSquareAndMutil(randomA,randomK, randomP).toString();
}
function resetValue(){
    document.getElementById('inpRandomP').value = "";
    document.getElementById('inpRandomA').value = "";
    document.getElementById('inpRandomX').value = "";
    document.getElementById('inpResultD').value = "";
    document.getElementById('inpResultK').value = "";
    document.getElementById('inpResultY').value = "";
    window.location.reload();
}