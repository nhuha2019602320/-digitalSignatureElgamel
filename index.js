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

inpFile.addEventListener('change', () =>{
    let fileCheck = new FileReader();
    fileCheck.readAsText(inpFile.files[0]);
    fileCheck.onload = () => {
        outPut.value = fileCheck.result.toString();
    }
})

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
//conver string to number
function convertUni(arrInput){
    arrUni = [];
    for(var index = 0; index < arrInput.length; index++)
        arrUni.push(arrInput.charCodeAt(index));
    return arrUni;
}
//convert number to string
function convertString(arrOut){
    arrString = [];
    for(var index = 0; index < arrOut.length; index++)
        arrString.push(String.fromCharCode(arrOut[index]));
    return arrString;
}
function registerDocument() {
    var P = document.getElementById('inpRandomP').value;
    var alpha = document.getElementById('inpRandomA').value;
    var X = document.getElementById('inpRandomX').value;
    var valueOfInput = document.getElementById('outPut').value;
    var K = document.getElementById('inpResultK').value;
    var beta = calculaeSquareAndMutil(alpha,X,P);
    arrBanRoUni = convertUni(valueOfInput);
    arrBanMa = []
    var c1, c2,k;
    for(var index = 0 ; index < arrBanRoUni.length; index ++){;
        c1 = calculaeSquareAndMutil(alpha, K, P);
        c2 = (arrBanRoUni[index] * calculaeSquareAndMutil(beta,K,P)) %P;
        arrBanMa.push(c1,c2);
    }
    //ban ma
    var banMa = [];
    banMa = convertString(arrBanMa).join('');
    console.log(banMa)
    outPut.value = arrBanMa.join('');
    alert("REGISTER SUCCESS !")
    return banMa;
}
function checkRegisterDocument(){
    var P = document.getElementById("inpRandomP").value;
    var alpha = document.getElementById("inpRandomA").value;
    var c = document.getElementById("outPut").value;
    var arrBanMas = convertUni(c);
    var ArrgiaiMa = [];
    for(var i = 0; i < arrBanMas.length; ){
        //---------- dinh li nho fermat-------------------
        var k =calculaeSquareAndMutil(arrBanMas[i],alpha,P);// k nho hon p
        var m = (calculaeSquareAndMutil(k,P-2,P)* (arrBanMas[i+1])%P )%P;
        
        ArrgiaiMa.push(m);
        i+=2;
        console.log(ArrgiaiMa)
    }
    alert("CHECK SUCCESS!");
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


console.log(calculaeSquareAndMutil(65,31,178))    
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

    for (let i = 2; i < 9000; i++)
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
}