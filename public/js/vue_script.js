/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
    el: '#submit_button',
    data: {
        CurrentOrder: '',
        orders: {},
        maplocation: {},
        burgersList:[],
        customerInfo:{},
        failed: false,
        orderPlaced: false,
        items:'',
    },
    created: function () {
    socket.on('initialize', function (data) {
        this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
        this.orders = data.orders;
    }.bind(this));
    },
    methods: {
        markDone: function(form_id) {
            if (this.checkItems(form_id) === true){
                var formElements = [];
                var myForm = document.getElementById(form_id);
                var checkbox, i, str;
                formElements.push(myForm.elements["fullname"].value);
                formElements.push(myForm.elements["email"].value);
                // formElements.push(myForm.elements["street"].value);
                // formElements.push(myForm.elements["house"].value);
                formElements.push(myForm.elements["payment"].value);
                formElements.push(myForm.elements["gender"].value);
                this.customerInfo.fullname = myForm.elements["fullname"].value;
                this.customerInfo.email = myForm.elements["email"].value;
                this.customerInfo.payment = myForm.elements["payment"].value;
                this.customerInfo.gender = myForm.elements["gender"].value;
                for (i in menulist){
                    checkbox = document.getElementById("checkbox"+i);
                    if (checkbox.checked === true){
                        formElements.push(checkbox.value);
                        this.burgersList.push(formElements[formElements.length-1]);
                    }
                }
                str = "The Current order is : ";
                for (i in formElements){
                    str += formElements[i];
                    if (i<(formElements.length-1)){
                        str +=  ", ";

                    }
                }
                this.CurrentOrder = this.customerInfo;
                this.CurrentOrder["Address"] = this.maplocation;
                this.items = this.burgersList;
            }


        },
        checkItems: function(form_id){
            var myForm = document.getElementById(form_id);

            if(myForm.elements["fullname"].value.length === 0){
                alert("Please write your name");
                this.failed=true;
                return false;
            }
            else if(myForm.elements["email"].value.length === 0){
                alert("Please write your email");
                this.failed=true;
                return false;
            }
            else if(myForm.elements["payment"].value.length === 0){
                alert("Please choose your payment method");
                this.failed=true;
                return false;
            }
            else if(myForm.elements["gender"].value.length === 0){
                alert("Please choose gender");
                this.failed=true;
                return false;
            }
            else if(Object.keys(this.maplocation).length  === 0){
                alert("Please choose a location for delivery on map");
                this.failed=true;
                return false;
            }
            else{
                var count = 0;
                var checkbox, i;
                for (i in menulist){
                    checkbox = document.getElementById("checkbox"+i);
                    if (checkbox.checked === true){
                        count += 1;
                    }
                }
                if(count === 0){
                    alert("Please choose at least one burger");
                    this.failed=true;
                    return false;
                }
            }

            this.failed=false;
            return true;

        },

        setLocation:function (event) {
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                y: event.currentTarget.getBoundingClientRect().top};
            this.maplocation = { x: event.clientX - 10 - offset.x,
                y: event.clientY - 10 - offset.y }

        },
        getNext: function () {
            var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addToOrder: function () {
            if (this.failed === false){
                socket.emit("addOrder", { orderId: this.getNext(),
                    details: this.maplocation,
                    orderItems: this.burgersList,
                    customerInfo: this.customerInfo
                });
                this.orderPlaced = true;
                this.burgersList = [];
                this.maplocation = {};
                this.customerInfo = {};
            }


        }
    },

});

//
// var vm = new Vue({
//     el: '#Current_Order',
//     data: {
//         CurrentOrder: '',
//     }
//
// });