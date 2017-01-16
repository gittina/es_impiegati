var memoria=[];

var add=function(id, name, surname, level, salary){
    var res;
    
    if(id==''){
        id=String(getNewId());
        memoria.push([id,name, surname, level, salary]);
        res=1;
        console.log("registered with id: "+id);
    } else if (find(id)!=(-1)){
        remove(id);
        memoria.push([id, name, surname, level, salary]);
        res=0;
        console.log("registered with id: "+id);
    } else {
        memoria.push([id, name, surname, level, salary]);
        res=1;
        console.log("registered with id "+id);
    }
    
    return res;
}

var remove = function(id){
    var pos=find(id);
    if (pos!=(-1)){
        memoria.splice(pos,1);
        return 0;
    } else return 1;
}

var get=function(id){
    var pos=find(id);
    if (pos!=(-1)) return memoria[pos];
    else return undefined;
}

function find(id){
    for (i=0; i<memoria.length; i++)
        if (memoria[i][0]==id) return i;
    return -1;
    
}

//ritorna nuovo id se è stato lasciato vuoto
function getNewId(){
    newId=1;
    found=false;
    
    while(!found){
        if(!existId(newId)) found=true;
        else newId++;
    }
    return newId;
}

//ritorna true se id è già stato usato 
function existId(newId){
    for (i=0; i<memoria.length; i++){
        if (newId==memoria[i][0]) return true;
    }
    return false;
}

exports.add=add;
exports.remove=remove;
exports.get=get;
