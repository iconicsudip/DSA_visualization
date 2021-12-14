//---------------------------------------------------------------Grid View--------------------------------------------------------------------
var done=false;
var search_array = [];
function make_array(){
    var input1 = document.getElementById('nums');
    var input2 = document.getElementById('maxnum');
    document.getElementById("search").style.display = "flex";
    if(input1.value!="" &&input2.value!=""){
        if(input1.value>20){
            alert("Number of element should be between 20");
        }else{
            tbl = document.getElementById("grid");
            let count=1;
            if(!done){
                for(let i=1;i<=1;i++){
                    let row  = document.createElement("tr");
                    row.id = "row"+i;
                    tbl.appendChild(row);
                    let get_row = document.getElementById("row"+i);
                    for(let  j=1;j<=input1.value;j++){
                        var randomNum  = Math.floor(Math.random() * input2.value)+1;
                        search_array.push(randomNum);
                        let col=document.createElement("td");
                        get_row.appendChild(col);
                        col.innerHTML = `<div style="background:black;border:5px solid orange;height:3rem;width:3rem;border-radius:50%;margin:auto;" id="${count++}"><h3 style="text-align:center;color:white;    margin: auto;padding: 1rem;">${randomNum}</h3></div>`;
                    }
                }
                document.getElementById("make_array").style.display="none";
                document.getElementById("reload").style.display="block";
                done=true;
            }
        }
    }else{
        if(input1.value==""){
            alert("Input number of elements.");
        }else if(input2.value==""){
            alert("Input array's maximum number.");
        }else{
            alert("Fill both fields.");
        }
    }
}

//---------------------------------------------------------------Input Functionality--------------------------------------------------------------------
var output = [];
function search(){
    var input3 = document.getElementById("search_input").value;
    for(var i=0;i<search_array.length;i++){
        if(search_array[i]==input3){
            output.push(search_array[i]);
            break;
        }else{
            output.push(search_array[i]);
        }
    }
    console.log(output);
    show(output,input3);
}

//---------------------------------------------------------------Size of Graph--------------------------------------------------------------------

var pos=0;
var id=1;
var speed = parseInt(document.getElementById("time").value);
console.log(speed);
var found = false;
//============================================Showing all the nodes============================
function show(output,input3){
    var arrow =document.getElementById("arrow");
    setTimeout(function () {
        if(pos!=0){
            document.getElementById(id-1).removeChild( arrow);
        }
        console.log(id)
        if(output[pos]==input3){
            document.getElementById(id).style.background="#198711";
            document.getElementById("search_button").style.display="none";
            document.getElementById("search_reload").style.display="block";
            //===============Arrow====================
            document.getElementById(pos+1).appendChild(arrow);
            arrow.style.display="block";
            //=================Showing all present value================
            found = true;
            var elem = document.getElementById("elements");
            let p_elem  = document.createElement("h3");
            p_elem.innerHTML = "Yes, Search element is found at position "+pos;
            elem.appendChild(p_elem);
        }else{
            document.getElementById(id).style.background="#a50d0d";
            document.getElementById(id).appendChild(arrow);
            arrow.style.display="block";
        }
        pos++;
        id++;
        if(pos==output.length && !found){
            var elem = document.getElementById("elements");
            let p_elem  = document.createElement("h3");
            p_elem.innerHTML = "No, Search element is not found at any position of this array";
            elem.appendChild(p_elem);
        }
        if(pos<output.length){
            show(output,input3);
        }
    },speed*1000)
}
var input3 = document.getElementById("search_input").value;


//======================================================Reload============================================
function reload(){
    location.reload();
}