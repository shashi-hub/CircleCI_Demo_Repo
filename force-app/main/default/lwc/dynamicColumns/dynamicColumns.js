import { LightningElement, track } from 'lwc';
export default class DynamicColumns extends LightningElement {
    @track digits = [];
    @track percentage = "20";
    connectedCallback() {
            this.addDigits();
            setTimeout(() => {
                this.applyWidth();
            }, 50);
        }
        //Add numbers in array.
    addDigits() {
            for (var i = 1; i <= 30; i++) {
                this.digits.push(i);
            }
        }
        //Calculate the percentage required for each division according to the users input.
    calculateDivisions(event) {
            var userInput = event.target.value;
            this.percentage = userInput.length === 0 ? 20 : 100 / userInput;
            console.log(this.percentage);
            this.applyWidth();
        }
        //Apply calculated width for each division and display them inline.
    applyWidth() {
        var columns = this.template.querySelectorAll('.dynamicColumn');
        for (var i = 0; i < columns.length; i++) {
            columns[i].style.width = this.percentage + "%";
            //columns[i].style.display = "inline";
            columns[i].style.textAlign = "center";
            //columns[i].style.border = "1px solid #4CAF50";
        }
    }
}