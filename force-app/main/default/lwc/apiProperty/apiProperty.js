import { LightningElement } from 'lwc';

export default class ApiProperty extends LightningElement {
    percentage = 50;
renderedCallback(){
    console.log("==renderedcallback==");
}
    handlePercentageChange(event) {
        this.percentage = event.target.value;
    }
}