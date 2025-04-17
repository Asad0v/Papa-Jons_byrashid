import {  deleteProductByid, editPizzas, getCateg, getProductByCat, postNewPizzas  } from "./service.js";

const categList = document.getElementById('categList')
const categListmob = document.querySelector('.categListmob')
let cards = document.getElementById('cards')
const main1 = document.getElementById('main1')
const main2 = document.getElementById('main2')
const mainHeadSec = document.getElementById('mainHeadSec')
const main = document.querySelector('main')
const inputs = document.querySelectorAll('#inputs input')
const notyf = new Notyf({
    duration: 1000,
    position: {
      x: 'center',
      y: 'center',
    },
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'warning'
        }
      },
      {
        type: 'error',
        background: 'indianred',
        duration: 2000,
        dismissible: true
      }
    ]
  })
let categData 

console.log(categListmob);

async function printCateg(){
    categData = await getCateg()

    categData.forEach(item =>{
        const onclckEvent = `onclick="printCatProds('${item.slug}')"`
        const printCards = `onclick="printCards()"`
          categList.innerHTML += `<li class="flex" ${item.slug !='kampaniyalar'? onclckEvent : printCards  } >
                                        <a rel="noopener noreferrer" href="#" class="flex items-center px-4 -mb-1 ">${item.slug}</a>
                                    </li>`
        categListmob.innerHTML += `<li class="flex" ${item.slug !='kampaniyalar'? onclckEvent : printCards  } >
                                    <a rel="noopener noreferrer" href="#" class="flex items-center px-4 -mb-1 ">${item.slug}</a>
                                </li>`
    })
    
}
printCateg()
window.printCards = function (status) {
    status && localStorage.clear()
    main.innerHTML = `<div id="main1" class="bg-[#F1F1F1] flex justify-center items-center container font-bold gap-2 py-4 w-[93%] m-auto mt-8">
            <h2 class=" text-2xl">Promo kodunuz var?</h2>
            <h2 class="text-[#0F9675] text-2xl">Endirimdən istifadə edin!</h2>
            <div class="flex justify-center items-center gap-3 ">
                <input class="border-[#0F9675] border-2 rounded-md p-2" type="text" placeholder="promo kodu daxil edin">
                <button class="bg-[#0F9675] text-white rounded-md p-2 border-[#333] border-2">OK</button>
            </div>
        </div>
        <div id="main2" class="mt-8">
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="img/slider1.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="img/slider2.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="img/slider3.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="img/slider4.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="img/slider5.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="img/slider6.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="flex justify-center items-center gap-3 py-5 flex-wrap" id="cards"></div>
        
        `
        var swiper = new Swiper(".mySwiper", {
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            loop: true,
            // mousewheel: true,
            keyboard: true,
            autoplay: {
                delay: 2000, // 3 saniyədən bir dönəcək
                disableOnInteraction: false, // istifadəçi müdaxilə etsə də dönməyə davam etsin
            },
        });
        cards = document.getElementById('cards')
}
// let cardsNum = 8
let cardsData 
window.printCatProds = async function(ctg){
    cardsData = await getProductByCat(ctg)
    
    //  let cardsData = null
    // 🧹 swiper və promo hissəni DOM-dan tam təmizləyirik:
    main.innerHTML = `
    
    <div class="flex justify-center items-center gap-3 py-5 flex-wrap" id="cards"></div>
    <div>
    <button id="showBtn" onclick="showMore()" class="p-2  text-[#d5a6a8] bg-[#0F9675] w-[100px] rounded-lg shadow-lg m-2">Daha çox...</button>
    </div>
    
    
    `
    printLoad()
    

    // sonra yenidən cards dəyişənini götürürük
    endPrint(ctg)
    
    
}
function endPrint(ctg){
    
    main.innerHTML = `
    
    <div class="flex justify-center items-center gap-3 py-5 flex-wrap" id="cards"></div>
     <div>
                     <button id="showBtn" onclick="showMore()" class="p-2  text-[#d5a6a8] bg-[#0F9675] w-[100px] rounded-lg shadow-lg m-2">Daha çox...</button>
        </div>
        

        `
    cards = document.getElementById('cards')

    // indi kartları yazdırırıq
    

        cardsData
        // .slice(0,cardsNum)
        .forEach(element => {
            cards.innerHTML += `<div class="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 flex flex-col justify-between">
                <img alt="burda product var idi" onerror="this.src='https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'" src="${element.img}" alt="" class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500">
                <div class="flex flex-col justify-between p-6 space-y-8">
                    <div class="space-y-2 ">
                        <h2 class="text-3xl font-semibold tracking-wide">${element.title}</h2>
                        <p class="dark:text-gray-800">${element.composition}</p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="handleDelete('${ctg}','${element.id}')" type="button" class="flex items-center justify-center cursor-pointer p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-200">Del</button>
                        <button onclick="showInps('${ctg}','${element.id}')" type="button" class="flex items-center justify-center cursor-pointer p-3 font-semibold tracking-wide rounded-md dark:bg-blue-600 dark:text-gray-200">Edit</button>
                        
                    </div>
                </div>
            </div>
            `
        })
        
}


function printLoad(){
    for (let i = 0; i < 8; i++) {
        cards.innerHTML += `<div class="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
                            <div class="h-48 rounded-t dark:bg-gray-300"></div>
                            <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                                <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                                <div class="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                            </div>
                        </div>`
        
    }
}
// function staticRender() {
//     const category = localStorage.getItem('category')
//     const method = localStorage.getItem('method')
//     if(method){

//         // notyf.success(`${method} function delete worked. Proces has been and successfully`)
//         // Swal.fire({
//         //     title: `${method} function delete worked. Proces has been and successfully`,
//         //     text: 'Do you want to continue',
//         //     icon: 'success',
//         //     confirmButtonText: 'Cool'
//         //   })
//         localStorage.clear()
//     }
//     if(category){
//         printCatProds(category)
//     }
// }
// staticRender()

function getValues() {
    let  newMeat = {
        title: inputs[0].value,
        composition: inputs[1].value,
        img: inputs[2].value,
        price: inputs[3].value,
        category: inputs[4].value,
    }
    return newMeat
}


window.createPizza = function(){
    const newMeat = getValues()
    
    
    console.log(newMeat);
    
    // postNewPizzas(newMeat, newMeat.category)
    postNewPizzas(newMeat, newMeat.category)
    .then(data => {
        console.log("Serverdən cavab:", data);
        alert("Yemek veya icmek bilmirem qaqa ne elave etmisen uğurla əlavə olundu!");
    });
    cardsData.push(newMeat)
    endPrint()  
    

    inputs.forEach(input => input.value = '');
   
}
// window.createPizza = async function () {
//     const newMeat = getValues();
//     console.log(newMeat);

//     try {
//         const data = await postNewPizzas(newMeat, newMeat.category);
//         console.log("Serverdən cavab:", data);
//         alert("Yemək və ya içmək, bilmirəm qaqa, nə əlavə etmisənsə uğurla əlavə olundu!");
        
//        await printCatProds(); // Əlavə olunduqdan sonra siyahını yenilə

//         // input-ları sıfırla
//         inputs[0].value = '';
//         inputs[1].value = '';
//         inputs[2].value = '';
//         inputs[3].value = '';
//         inputs[4].value = '';
//     } catch (error) {
//         console.error("Xəta baş verdi:", error);
//         alert("Xəta baş verdi, zəhmət olmasa bir daha yoxlayın.");
//     }
// }

let flag = true

let globId;
window.showInps = function (category, id) {
    $(()=>{
        $('#inputs').show()
        $('#elaveEt').text(flag ?   '× BAGLA ×':'* Elave Et *')
            flag = !flag
    })
    const element = cardsData.find(item => item.id == id)
    globId = id
    inputs[0].value = element.title
    inputs[1].value = element.composition
    inputs[2].value = element.img
    inputs[3].value = element.price
    inputs[4].value = element.category
    window.scrollTo({
        top:0,
        behavior: "smooth"
    })  
}
window.updatePizza = function(){
    $(()=>{
        $('#inputs').hide()
        $('#elaveEt').text(flag ?   '× BAGLA ×':'* Elave Et *')
            flag = !flag
    })
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
    const newMeat = getValues()
    newMeat.id = globId ///////////////////////////////////////////////////////////bu duzgundur
    editPizzas(newMeat,newMeat.category, globId)
    // localStorage.setItem('method','edit')
    cardsData = cardsData.filter(item => item.id !=  globId)

    cardsData.push(newMeat)
    endPrint()

    inputs.forEach(input => input.value = '');
  
}

window.handleDelete = async function (ctg, id) {
    
    await deleteProductByid(ctg, id)
    // const newArr = cardsData.filter(item => item.id != id)
    // printCatProds(ctg)
    cardsData = cardsData.filter(item => item.id != id)
    endPrint()
    await Swal.fire({
                    title: `function delete worked. Proces has been and successfully`,
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
    // Swal.fire({
    //     title: "Are you sure?",
    //     text: "You won't be able to revert this!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!"
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire({
    //         title: "Deleted!",
    //         text: "Your file has been deleted.",
    //         icon: "success",
    //         timer: 2000, 
    //         timerProgressBar: true
    //       });
    //     }
    // });
    // cardsData = newArr
    //  localStorage.setItem ('category' , ctg)
    //  localStorage.setItem('method','delete')
    
    
}

window.openMobNav = function () {
    const mobNav = document.getElementById('mobNav')
    flag = !flag
    mobNav.style.display = flag ? 'flex' : 'none'
    
}


$(()=>{
    $('#inputs').hide()
    $('#elaveEt').click(function() {
        flag != flag
        $('#inputs').animate({height : 'toggle'}, 1200, function(){
            $('#elaveEt').text(flag ?   '× BAGLA ×':'* Elave Et *')
            flag = !flag
        })
    })
})


