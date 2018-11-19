
function MenuItem(name, kcal,ingredients, gluten, lactose) {
    this.name = name;
    this.kcal = kcal;
    this.ingredients = ingredients;
    this.gluten = gluten;
    this.lactose = lactose;
    this.stock = true;
    this.itemname = function() {
        return this.name;
    };
}




