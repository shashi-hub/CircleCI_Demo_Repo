import { LightningElement, wire, track, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
export default class FoodCart extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track cartItems = [];
    @track priceReference = [];
    @track subTotal = 0;
    @track totalItem = 0;
    @track inputValue = 1;
    @track cartEmpty = true;
    @track cart = false;
    @track fromDetail = [];
    @api cartStatus = [];
    connectedCallback() {
        registerListener('cartItem', this.addToCart, this);
        registerListener('counter', this.detailQuantity, this);
        this.totalPrice();
        this.totalItems();
        this.cartIsEmpty();
    }
    cartIsEmpty() {
        if (this.cartItems.length === 0) {
            this.cartEmpty = true;
            this.cart = false;
        } else {
            this.cartEmpty = false;
            this.cart = true;
        }
    }
    detailQuantity(foodItem) {
        console.log('foodItem' + foodItem);
        for (var i in this.cartItems) {
            if (this.cartItems[i].Id === foodItem.Id) {
                if (foodItem.quantity === 0) {
                    this.cartItems.splice(i, 1);
                } else {
                    this.cartItems[i].quantity = foodItem.quantity;
                    var total = this.cartItems[i].quantity * foodItem.itemPrice;
                    this.cartItems[i].Price__c = total;
                }
            }
        }
        this.totalPrice();
        this.totalItems();
        this.cartIsEmpty();
    }

    totalPrice() {
        var total = 0;
        for (var i in this.cartItems) {
            total += this.cartItems[i].Price__c;
        }
        this.subTotal = total;
    }
    totalItems() {
        var total = 0;
        for (var i in this.cartItems) {
            total += this.cartItems[i].quantity;
        }
        this.totalItem = total;
    }
    addToCart(item) {
        console.log('item' + item);
        var clone = {...item };
        clone.quantity = 1;
        this.cartItems.push(clone);
        console.log('this.cartItems' + JSON.stringify(this.cartItems));
        this.totalPrice();
        this.totalItems();
        this.cartIsEmpty();
    }
    increaseCount(event) {
        this.cartItems[event.detail.index].quantity += 1;
        var total = this.cartItems[event.detail.index].quantity * event.detail.itemPrice;
        this.cartItems[event.detail.index].Price__c = total;
        //console.log('event.detail.Id' + event.detail.cartItemId);
        this.totalPrice();
        this.totalItems();
        this.cartIsEmpty();
        var obj = {};
        obj.Id = this.cartItems[event.detail.index].Id;
        obj.quantity = this.cartItems[event.detail.index].quantity;
        this.cartStatus = obj;
        console.log('this.cartStatus' + JSON.stringify(this.cartStatus));
        //fireEvent(this.pageRef, 'quanDetail', this.cartStatus);

    }
    decreaseCount(event) {
        this.cartItems[event.detail.index].quantity -= 1;
        if (this.cartItems[event.detail.index].quantity === 0) {
            this.cartItems.splice(event.detail.index, 1);
            this.totalPrice();
            this.totalItems();
            this.cartIsEmpty();
        } else {
            var total = this.cartItems[event.detail.index].quantity * event.detail.itemPrice;
            this.cartItems[event.detail.index].Price__c = total;
            this.totalPrice();
            this.totalItems();
            this.cartIsEmpty();
        }
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}