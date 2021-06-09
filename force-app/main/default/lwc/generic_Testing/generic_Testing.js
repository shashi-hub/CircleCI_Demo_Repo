import { LightningElement, track, api, wire } from 'lwc';
import getfields from '@salesforce/apex/FieldSetController.getFields';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class Generic_Testing extends LightningElement {
    @api recordId;
    @api fieldSetName = "Account_Field_Set";
    @api objectApiName;
     fields=[{"fieldAPIName":"Name","objectApiName":"Account"},{"fieldAPIName":"AccountNumber","objectApiName":"Account"},{"fieldAPIName":"Industry","objectApiName":"Account"},{"fieldAPIName":"Is_Enabled__c","objectApiName":"Account"},{"fieldAPIName":"BillingCountry","objectApiName":"Account"}];
    //@wire(getfields, { objectName: '$objectApiName', fieldSetName: '$fieldSetName'})
    
    
    //fields = this.wireFields.data;

    connectedCallback(){
this.getFieldsFunction();
    }
    getFieldsFunction(){
        getfields({
            objectName : this.objectApiName,
            fieldSetName : this.fieldSetName
        })
        .then((result) => {
            //this.fields = result;
            console.log("value1---->"+JSON.stringify(this.fields));

        })
        .catch((error) => {
            this.error = error;
        })
    }
    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.LastName = 'My Custom Last Name'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
     }
}