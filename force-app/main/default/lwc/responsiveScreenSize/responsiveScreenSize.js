import { LightningElement } from 'lwc';

export default class ResponsiveScreenSize extends LightningElement {
renderedCallback(){
   this.template.querySelector('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
}
}