new Vue({
    el: '#submit_button',
    methods: {
        markDone: function(form_id) {
            var formElements = [];
            var myForm = document.getElementById(form_id);
            var checkbox, i, str;
            formElements.push(myForm.elements["fullname"].value);
            formElements.push(myForm.elements["email"].value);
            formElements.push(myForm.elements["street"].value);
            formElements.push(myForm.elements["house"].value);
            formElements.push(myForm.elements["payment"].value);
            formElements.push(myForm.elements["gender"].value);
            for (i in menulist){
                checkbox = document.getElementById("checkbox"+i);
                if (checkbox.checked === true){
                    formElements.push(checkbox.value);
                }
            }
            console.log(formElements);
            str = "The Current order is : ";
            for (i in formElements){
                str += formElements[i]+",  ";
            }
            vm.CurrentOrder = str;

        }
    },

});


var vm = new Vue({
    el: '#Current_Order',
    data: {
        CurrentOrder: ''
    }
});