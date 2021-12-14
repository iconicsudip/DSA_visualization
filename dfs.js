//---------------------------------------------------------------Grid View--------------------------------------------------------------------

tbl = document.getElementById("grid");
let count=1;
for(let i=1;i<=5;i++){
    let row  = document.createElement("tr");
    row.id = "row"+i;
    tbl.appendChild(row);
    let get_row = document.getElementById("row"+i);
    for(let  j=1;j<=10;j++){
        let col=document.createElement("td");
        get_row.appendChild(col);
        col.innerHTML = `<div style="background:black;border:5px solid orange;height:3rem;width:3rem;border-radius:50%;margin:auto;" id="${count}"><h3 style="text-align:center;color:white;    margin: auto;padding: 1rem;">${count++}</h3></div>`;
    }
}

//---------------------------------------------------------------Input Functionality--------------------------------------------------------------------

var input1 = document.getElementById('start');
var input2 = document.getElementById("end") ;
input1,input2.addEventListener("keyup",function(event){
    if(input1.value=="" && input2.value==""){
        document.getElementById("find").disabled = true;
    }else{
        document.getElementById('find').disabled = false;
    }
});


//---------------------------------------------------------------Size of Graph--------------------------------------------------------------------

let m=5;
let n=10;

//---------------------------------------------------------------Adjacency matrix of the graph--------------------------------------------------------------------
let adj=[];
for(var l=0;l<=m*n;l++){
    if(l==0){
        adj.push([0]);
    }else if(l==10 || l==41){
        let v=[];
        if(l==10){
            v.push(l-1);
            v.push(l+10);
        }else{
            v.push(l-10);
            v.push(l+1);
        }
        adj.push(v.sort(function(a, b){return a-b}));
    }
    else if( l==11 || l==20 || l==21 || l==30 || l==31 || l==40){
        let v=[];
        if(l==20 || l==30 || l==40){
            v.push(l-1);
            v.push(l+10);
            v.push(l-10);
        }else{
            v.push(l-10);
            v.push(l+1);
            v.push(l+10);
        }
        adj.push(v.sort(function(a, b){return a-b}));
    }else{
            let v=[];
        
            var val=l;
            if(val-1>=1 && val-1<=50){
                v.push(val-1);
            }
            if(val-10>=1  && val-10<=50){
                v.push(val-10);
            }
            if(val+10<=50  && val+10>=1){
                v.push(val+10);
            }
            if(val+1<=50  && val+1>=1){
                v.push(val+1);
            }
            adj.push(v.sort(function(a, b){return a-b}));
        }
    }
//---------------------------------------------------------------DFS Function--------------------------------------------------------------------
function check_dfs(dfs,vis,i,adj,end,find){
    if(!find || i==end){
        dfs.push(i);
    }
    vis[i]=1;
    for(var j=0;j<adj[i].length;j++){
        if(adj[i][j]==end){
            find=true;
        }
        if(!vis[adj[i][j]]){
            check_dfs(dfs,vis,adj[i][j],adj,end,find);
        }
    }
    //console.log(find);
    return find;
}
function dfs(){
    let dfs = [];
    let vis = [];
    for(var i=0;i<m*n+1;i++){
        vis.push(0)
    }
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var find = false;
    for(var i=start;i<m*n+1;i++){
        if(find){
            break;
        }
        if(!vis[i]){
            find = check_dfs(dfs,vis,i,adj,end,find);
            //console.log(find)
            // let queue=[];
            // queue.push(i);
            // vis[i]=1;
            
            // while(queue.length!=0){
            //     var node = queue[0];
            //     queue.shift();
            //     dfs.push(node);
            //     if(node==end){
            //         find=true;
            //         break;
            //     }
            //     for(var j=0;j<adj[node].length;j++){
            //         if(!vis[adj[node][j]]){
            //             queue.push(adj[node][j]);
            //             vis[adj[node][j]]=1;
            //         }
            //     }
            // }
        }
    }
    console.log(dfs);
    var pos=0;
    var speed = parseInt(document.getElementById("time").value);
    console.log(speed);
    //============================================Showing all the nodes============================
    function show(start,end,dfs){
        var arrow =document.getElementById("arrow");
        setTimeout(function () {
            if(pos!=0){
                document.getElementById(dfs[pos-1]).removeChild( arrow);
            }

            if(dfs[pos]==end){
                document.getElementById(dfs[pos]).style.background="#198711";
                document.getElementById("find").style.display="none";
                document.getElementById("reload").style.display="block";
                //===============Arrow====================
                document.getElementById(dfs[pos]).appendChild(arrow);
                arrow.style.display="block";
                //=================Showing all present value================
                var elem = document.getElementById("elements");
                let p_elem  = document.createElement("h3");
                p_elem.innerHTML = dfs[pos];
                elem.appendChild(p_elem);
            }
            else if(dfs[pos]==start){
                document.getElementById(dfs[pos]).style.background="#198711";
                document.getElementById(dfs[pos]).appendChild(arrow);
                arrow.style.display="block";
                var elem = document.getElementById("elements");
                let p_elem  = document.createElement("h3");
                p_elem.innerHTML = dfs[pos]+",";
                elem.appendChild(p_elem);
            }else{
                document.getElementById(dfs[pos]).style.background=" #a50d0d";
                document.getElementById(dfs[pos]).appendChild(arrow);
                arrow.style.display="block";
                var elem = document.getElementById("elements");
                let p_elem  = document.createElement("h3");
                p_elem.innerHTML = dfs[pos]+",";
                elem.appendChild(p_elem);
            }
            pos++;
            if(pos<dfs.length){
                show(start,end,dfs);
            }
        },speed*1000)
    }
    show(start,end,dfs);
}

//======================================================Reload============================================
function reload(){
    location.reload();
}