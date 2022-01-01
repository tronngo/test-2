const API_URL = "https://61bc131bd8542f0017824588.mockapi.io/a/arrayproducts";
const API_cart = "https://61bc131bd8542f0017824588.mockapi.io/a/new-cart";


function show() {

    axios.get(`${API_URL}`).then((res) => {
        res.data.map(function(ele) {
            document.getElementById("product").innerHTML += `
              <div class=" mb-3 card text-center"  id="item-${ele.id} >
            <p class="ppp">
            <img class="card-img-top" src = "${ele.avatar}" " alt"Card image cap" ;>
            </p>
            <div class ="card-body">
            <h5 class = "card-title">${ele.name} </h5>
            <p class = "card-text"  class= "price" style="color: red;">${ele.price} </p>
            <button" type="submit" class=" btn bg-success" onclick="viewww(${ele.id})">Đặt hàng</button>
            </div>
            </div>`;
        });
    });
}
show();
// lengtharrcart(); // load phaanf gio hang

var id = 0;

function showdetail(type, material) {
    document.getElementById("product").innerHTML = ''
    axios.get(`${API_URL}`).then((res) => {
        for (let index = 0; index < res.data.length; index++) {
            if (res.data[index].type == type && res.data[index].material == material) {
                document.getElementById("product").innerHTML += `
            <div class=" mb-3 card text-center"  id="item-${res.data[index].id} >
            <p class="ppp">
            <img class="card-img-top" src = "${res.data[index].avatar}" " alt"Card image cap" ;>
            </p>
            <div class ="card-body">
            <h5 class = "card-title">${res.data[index].name} </h5>
            <p class = "card-text"  class= "price" style="color: red;">${res.data[index].price} </p>
            <button" type="submit" class=" btn bg-success" onclick="viewww(${res.data[index].id})" )">Đặt hàng</button>
            </div>
            </div>`;
            }
        }
    });
}
// -------------------------------------------------------------------------------------------------------------------------------






       
// ---------------------------------------------------------------------------------------



function viewww(n) {

    axios.get(`${API_URL}/${n}`).then(res => {
        var img = `<img class="card-img-top" src = "${res.data.avatar}" " alt"Card image cap" ;>`
        var infor = `
               <button  class= "infor" onclick="enter(${n}) ">MUA NGAY</button>`
        var buy = `
               <button class= "inf") "> MUA TRẢ GÓP </button>`
        var buyshope = `
               <button class= "in") ">XEM GIÁ TẠI SHOPPE</button>`
        var name = res.data.name;
        var price = res.data.price;


        document.getElementById("anha").innerHTML = img;
        document.getElementById("catNam").innerHTML = name;
        document.getElementById("catPrice").innerHTML = price;
        document.getElementById("button").innerHTML = infor;
        document.getElementById("buy").innerHTML = buy;
        document.getElementById("buyShoppe").innerHTML = buyshope;
        document.getElementById("chung").style.display = "block";
        document.getElementById("griddd").style.display = "none";


    })
    similerProduct(n);

}

function similerProduct(n) {
    document.getElementById('banchay').innerHTML = "";

    axios.get(`${API_URL}/${n}`)
        .then(res => {
            var typeProduct = res.data.type;

            axios.get(`${API_URL}`).then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    if (typeProduct === res.data[index].type) {
                        document.getElementById('banchay').innerHTML +=
                            `
                    <div class=" mb-3  card text-center"  id="item-${res.data[index].id} >
                    <p class="ppp">
                    <img class="card-img-top" src = "${res.data[index].avatar}" " alt"Card image cap" ;>
                    </p>
                    <div class ="card-body">
                    <h5 class = "card-title">${res.data[index].name} </h5>
                    <p class = "card-text"  class= "price" style="color: red;">${res.data[index].price} </p>
                    <button" class=" btn bg-success" onclick="viewww(${res.data[index].id})">Đặt hàng</button>
                    </div>
                </div>`;

                    }

                }
            })


        });
};

// ______________________________________________________Quản lý giỏ hàng


// \\________________________________________________them gio hàng
var arrcart =[];
var ar =0;
var i=0
var row =`<tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>hình ảnh</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Tổng</th>
                    <th>Hành Động</th>
                </tr>`
function enter(n) {
    // add vo card
    alert("Đã them vào giỏ hàng")

    axios.get(`${API_URL}/${n}`).then((res) => {
        
        var datas = {
            id: res.data.id,
            avatar: res.data.avatar,
            name: res.data.name,
            price: res.data.price
            
        };
        
        arrcart.push(datas);
        
        document.getElementById("cartping").innerHTML=row
     for (let i = 0; i < arrcart.length; i++) {
        var html=`
        <tr>
        <td>${i+1}</td>
        <td>${arrcart[i].name}</td>
        <td><img id ='thunho' style="width:200px;height:auto;" src="${arrcart[i].avatar}" alt=""> </td>
        <td>${arrcart[i].price}</td>
        <td><input type="number" value='0' min="0"  id="product${i}" oninput="updatecar(${i})"> </td>
        <td id = "total${i}">${totalEl}</td>
        <td>  <button class="btn btn-danger" onclick="deleteproduct(${i})">Delete</button></td>
      </tr>
        `  
         document.getElementById("cartping").innerHTML+=html;   
     } 
    document.getElementById("notification").innerHTML = arrcart.length;
    });  
    document.getElementById("divcart").style.display ="block"
    document.getElementById("chung").style.display ="none"

}
function updatecar(i){    
    var qty = document.getElementById('product'+i).value;
    
    arrcart[i].qty = parseInt(qty);
    totalEl = arrcart[i].qty*arrcart[i].price;
    document.getElementById("total"+i).innerHTML=totalEl;

    document.getElementById('product'+i).setAttribute('value', qty)        
      updatetotal()
}
var totalEl =0;
var alltotal=0
function updatetotal(){
    var alltotal = 0;
    for (var i of arrcart){
        alltotal += i.price*i.qty;
    }
    document.getElementById("alltotal").value=alltotal;
    
}
function backHome(){
    document.getElementById("divcart").style.display ="none"
    document.getElementById("griddd").style.display ="block"
}
function moveiforcustomer(){
    document.getElementById("divcart").style.display ="none"
    document.getElementById("paya").style.display ="block"
    
    document.getElementById("name").value=localStorage.getItem("username")
    document.getElementById("email").value=localStorage.getItem("email")
    var or_date = new Date();
    var date = or_date.getDate() + '-' + (or_date.getMonth() + 1) + '-' + or_date.getFullYear();
    document.getElementById("date").value=date;
}

function checkinput(){
    var phone = document.getElementById("phone").value
    var province = document.getElementById("province").value
    var distric = document.getElementById("distric").value
    var commune = document.getElementById("commune").value
    var apartmentNumber = document.getElementById("apartmentNumber")
    if (province ==""|| distric =="" || commune ==""|| apartmentNumber ==""|| phone ==""){
            return true
    }
}
function payment(){
    var or_date = new Date();
    var date = or_date.getDate() + '-' + (or_date.getMonth() + 1) + '-' + or_date.getFullYear();
    document.getElementById("date").value=date;
    var username = localStorage.getItem("username")
    var email = localStorage.getItem("email")
    var phone = document.getElementById("phone").value
    var province = document.getElementById("province").value
    var distric = document.getElementById("distric").value
    var commune = document.getElementById("commune").value
    var apartmentNumber = document.getElementById("apartmentNumber").value
    var place = apartmentNumber +'-'+commune+"-"+distric+"-"+province +"."
    if (checkinput() == true){
            alert("Nhập đầy đủ thông tin")

    }
    else{
    axios.get(API_cart).then(res =>{
    var arrpost =[]
    for (let index = 0; index < arrcart.length; index++) {
        var object = {
            price:arrcart[index].price,
            avatar:arrcart[index].avatar,
            name: arrcart[index].name,
            
        }
        
        arrpost.push(object)
    }
     var object2 ={
            username:username,
            email:email,
            array: arrpost,
            phone:phone,
            date: date,
            place:place,
            total:document.getElementById("alltotal").value
        }
        axios.post(API_cart, object2);
    })
    alert("đã mua hàng thành công")
    

    }
    reset()
    
    
}
function showbillcustomer(username,email,phone){
    var tong =document.getElementById("alltotal").value
    axios.get(API_cart).then((res)=>{
        var arraipi = res.data
        for (j in arraipi[-1].array) {
            
        }
    })
}




function reset() {
    document.getElementById('phone').value = '';
    document.getElementById('province').value = '';
    document.getElementById('distric').value = '';
    document.getElementById('commune').value = '';
    document.getElementById('apartmentNumber').value = '';
}

// Lấy ra bill Có t
