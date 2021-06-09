import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, } from 'c/pubsub';
export default class FoodDetail extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track foodItems = [];
    @track cfoodItems = [];
    connectedCallback() {
        console.log('-------connectedCallback-foodDetailList----');
        registerListener('selectedCategory', this.handleCategoryChange, this);
        registerListener('quanDetail', this.quantityToDetail, this);
    }

    quantityToDetail(cartItem) {
        console.log('cartItem12' + JSON.stringify(cartItem));
        for (var i in this.foodItems) {
            if (this.foodItems[i].Id === cartItem.Id) {
                if (cartItem.quantity === 0) {
                    console.log('in');
                    //this.foodItems[i].quantity = cartItem.quantity;
                    this.foodItems[i].quantityButton = false;
                    this.foodItems[i].addButton = true;
                    //this.foodItems[i].quantity = 1;
                } else {
                    this.foodItems[i].quantity = cartItem.quantity;
                }
            }
        }
        console.log('this.foodItems13' + JSON.stringify(this.foodItems));
    }
    handleCategoryChange(foodItems) {
        //var clone = {...foodItems };
        var clone = [];
        var clone = JSON.parse(foodItems);
        for (var i in clone) {
            clone[i].quantity = 1;
            clone[i].quantityButton = false;
            clone[i].addButton = true;
        }
        this.foodItems = clone;
        console.log('foodItems' + JSON.stringify(clone));
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}