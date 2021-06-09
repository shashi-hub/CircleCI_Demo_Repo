import { LightningElement, track, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
export default class FoodCartItem extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api cartItem = [];
    @api index;
    @api inputValue;
    @track itemPrice = 0;
    @track Id = "";
    @track inpValue = 0;
    @api cartStatus = [];

    connectedCallback() {
        const itemprice = this.cartItem.Price__c;
        this.itemPrice = itemprice;
        this.Id = this.cartItem.Id;
    }

    plus(event) {
        event.preventDefault();
        const plusEvent = new CustomEvent('add', {
            detail: {
                itemPrice: this.itemPrice,
                index: this.index,
                cartItemId: this.Id,
            }
        });
        this.dispatchEvent(plusEvent);
        var obj = {};
        obj.Id = this.cartItem.Id;
        obj.quantity = this.cartItem.quantity;
        console.log('obj' + JSON.stringify(obj));
        fireEvent(this.pageRef, 'quanDetail', obj);
    }
    minus(event) {
        event.preventDefault();
        const plusEvent = new CustomEvent('remove', {
            detail: {
                itemPrice: this.itemPrice,
                index: this.index,
                //cartItemId: this.cartItem.Id,
                //quantity: this.inputValue
            }
        });
        this.dispatchEvent(plusEvent);
        var obj = {};
        obj.Id = this.cartItem.Id;
        obj.quantity = this.cartItem.quantity;
        console.log('obj' + JSON.stringify(obj));
        fireEvent(this.pageRef, 'quanDetail', obj);
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}