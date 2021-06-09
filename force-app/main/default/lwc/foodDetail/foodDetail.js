import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
export default class FoodDetail extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api foodItem = [];
    @track cfoodItem = [];
    @track sfoodItem = [];
    @api addButton;
    @api quantityButton;
    @api inputValue = 1;
    connectedCallback() {
        console.log('-------connectedCallback-foodDetail---');
        setTimeout(() => {
            this.transition();
        }, 10);
        if (this.quantityButton === true && this.foodItem.quantity >= 1) {
            this.quantityButton === true;
        }
    }
    transition() {
        var trans = this.template.querySelector('.mytransition');
        trans.style.transitionProperty = "opacity , -webkit-transform";
        trans.style.transitionDuration = "0.1s";
        trans.style.WebkitTransform = "scale(1)";
        trans.style.opacity = "1";
    }
    beforeTransition() {
        var trans = this.template.querySelector('.mytransition');
        trans.style.WebkitTransform = "scale(0.7)";
        trans.style.opacity = "0.5";
    }
    disconnectedCallback() {
        this.beforeTransition();
    }
    addToCart(event) {
        event.preventDefault();
        fireEvent(this.pageRef, 'cartItem', this.foodItem);
        console.log('foodItem' + JSON.stringify(this.foodItem));
        this.addButton = false;
        this.quantityButton = true;
    }
    minus(event) {
        event.preventDefault();
        this.inputValue--;
        var clone = {...this.foodItem };
        clone.quantity = this.inputValue;
        var obj = {};
        obj.Id = clone.Id;
        obj.quantity = clone.quantity;
        obj.itemPrice = clone.Price__c;
        this.sfoodItem = obj;
        if (this.inputValue === 0) {
            this.addButton = true;
            this.quantityButton = false;
            fireEvent(this.pageRef, 'counter', this.sfoodItem);
            this.inputValue = 1;
        } else {
            console.log(' this.sfoodItem' + JSON.stringify(this.sfoodItem));
            fireEvent(this.pageRef, 'counter', this.sfoodItem);
        }
    }
    plus(event) {
        event.preventDefault();
        this.inputValue++;
        var clone = {...this.foodItem };
        clone.quantity = this.inputValue;
        var obj = {};
        obj.Id = clone.Id;
        obj.quantity = clone.quantity;
        obj.itemPrice = clone.Price__c;
        this.sfoodItem = obj;
        console.log(' this.sfoodItem' + JSON.stringify(this.sfoodItem));
        fireEvent(this.pageRef, 'counter', this.sfoodItem);
    }
}
//var col = this.template.querySelectorAll('.col');
//trans[i].style.display = "inline-block !important";
//trans[i].style.minWidth = " 320px";
//trans[i].style.align = "center";
//trans[i].style.flex = "1";
//trans[i].style.justifyContent = "space-between";
//trans[i].style.transitionDelay = "2s";
//trans[i].style.width = "330px";
//trans[i].style.height = "230px";