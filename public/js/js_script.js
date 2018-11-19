

function main(){
    var index, menuitem;
    for (index in menulist){
        menuitem = menulist[index];
        addItem("item"+index);
        addTitle(menuitem.name, "item"+index);
        addImage(menuitem.img, menuitem.name, "item"+index);
        addIngredients(menuitem.kCal, menuitem.lactose, menuitem.gluten, menuitem.ingredients, "item"+index);

    }
}


function addItem(id){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", id);
    document.getElementById("burger").appendChild(newDiv);
}

function addTitle (name, parent_id) {
    var newDiv, newSpan, newContent;
    // create a new div element
    newDiv = document.createElement("div");
    newDiv.setAttribute("class","fixed");
    // and give it some content
    newSpan = document.createElement("span");
    newSpan.setAttribute("class","bn");
    newContent = document.createTextNode(name);
    newSpan.appendChild(newContent);
    newDiv.appendChild(newSpan);
    document.getElementById(parent_id).appendChild(newDiv);

}
function addImage (img_src, title, parent_id) {
    var newDiv, newImg;
    newDiv = document.createElement("div");
    newImg = document.createElement("img");
    newImg.setAttribute("class","burgers_img");
    newImg.setAttribute("alt","Span");
    newImg.setAttribute("src",img_src);
    newImg.setAttribute("title",title);
    newDiv.appendChild(newImg);
    document.getElementById(parent_id).appendChild(newDiv);

}
function addIngredients (kcal, lactose, gluten, ingredients, parent_id) {
    var newDiv, newList, newItem, newSpan, i_index, newContent;
    newDiv = document.createElement("div");
    newDiv.setAttribute("class","fixed");

    newList = document.createElement("ul");
    newItem = document.createElement("li");
    // Add kCal element
    newContent = document.createTextNode("kCal: "+ kcal + "g");
    newItem.appendChild(newContent);
    newList.appendChild(newItem);
    // Add Lactose element
    if (lactose === true){
        newItem = document.createElement("li");
        newSpan = document.createElement("span");
        newSpan.setAttribute("class","gl");
        newContent = document.createTextNode("contains lactose");
        newSpan.appendChild(newContent);
        newItem.appendChild(newSpan);
        newList.appendChild(newItem);
    }
    if (gluten === true){
        newItem = document.createElement("li");
        newSpan = document.createElement("span");
        newSpan.setAttribute("class","gl");
        newContent = document.createTextNode("contains gluten");
        newSpan.appendChild(newContent);
        newItem.appendChild(newSpan);
        newList.appendChild(newItem);
    }
    for (i_index in ingredients){
        newItem = document.createElement("li");
        // Add ingredient element
        newContent = document.createTextNode(ingredients[i_index]);
        newItem.appendChild(newContent);
        newList.appendChild(newItem);

    }


    document.getElementById(parent_id).appendChild(newList);

}

main();



