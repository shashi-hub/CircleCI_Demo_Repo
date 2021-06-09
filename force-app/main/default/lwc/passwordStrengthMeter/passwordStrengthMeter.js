import { LightningElement,track,api } from 'lwc';

export default class PasswordStrengthMeter extends LightningElement {

    @track score = 0;
    @track digitIcon = "action:remove";
    @track upperCaseIcon = "action:remove";
    @track lowerCaseIcon = "action:remove";
    @track symbolIcon = "action:remove";

analyzePassword(event){
 var password = event.target.value;
 var score = 0
 if (!password)
 this.score =score;
 var letters = new Object();
        for (var i=0; i<password.length; i++) {
            letters[password[i]] = (letters[password[i]] || 0) + 1;
            console.log('letters'+letters[password[i]]);
            score += 5.0 / letters[password[i]];
           // console.log('score'+score);
        }   
        console.log('lettersout'+JSON.stringify(letters));    
       
        var variations = {
            digits: /\d/.test(password),
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            nonWords: /\W/.test(password),
        }  
        
        var variationCount = 0;
        for (var check in variations) {
            variationCount += (variations[check] == true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10; 
        this.score = score;            
        this.digitIcon = variations.digits == true ? "action:approval" : "action:remove";
        this.upperCaseIcon = variations.upper == true ? "action:approval" : "action:remove";
        this.lowerCaseIcon = variations.lower == true ? "action:approval" : "action:remove";
        this.symbolIcon = variations.nonWords == true ? "action:approval" : "action:remove";
}
    
}