import { LightningElement, track, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Food_Item__c';
import Type_FIELD from '@salesforce/schema/Food_Item__c.Food_Type__c';
import { CurrentPageReference } from 'lightning/navigation';
import findItems from '@salesforce/apex/FoodItemController.getFoodItems';
import Recommended from '@salesforce/apex/FoodItemController.getRecommended';
import { fireEvent } from 'c/pubsub';
export default class PicklistValuesDemo extends LightningElement {

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Type_FIELD })
    TypePicklistValues;

    @wire(CurrentPageReference) pageRef;
    @track categories = [];
    @track recommended = [];
    @track foodItems = [];

    connectedCallback() {
        this.getRecommended();
    }
    getRecommended() {
        Recommended()
            .then((data) => {
                this.foodItems = data;
                fireEvent(this.pageRef, 'selectedCategory', JSON.stringify(this.foodItems));
            })
            .catch((error) => {
                this.error = error;
            })
    }

    handleClick(event) {
        event.preventDefault();
        var i = event.currentTarget.dataset.id;
        var key = this.TypePicklistValues.data.values[i].label;
        findItems({
                selectedkey: key
            })
            .then((data) => {
                console.log('this.foodItemsss' + JSON.stringify(this.foodItems));
                this.foodItems = data;
                fireEvent(this.pageRef, 'selectedCategory', JSON.stringify(this.foodItems));
            })
            .catch((error) => {
                this.error = error;
            })
    }
    handleRecommended(event) {
        event.preventDefault();
        Recommended()
            .then((data) => {
                this.foodItems = data;
                fireEvent(this.pageRef, 'selectedCategory', JSON.stringify(this.foodItems));
            })
            .catch((error) => {
                this.error = error;
            })
    }
}