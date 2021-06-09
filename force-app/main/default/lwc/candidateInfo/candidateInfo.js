import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, } from 'c/pubsub';

export default class CandidateInfo extends LightningElement {
    @api selectedContact;
    @wire(CurrentPageReference) pageRef;
    connectedCallback() {
        console.log('-------connectedCallback----');
        registerListener('selectedContact', this.handleSearchKeyChange, this);
    }
    handleSearchKeyChange(contact) {
        this.selectedContact = contact;
    }
    disconnectedCallback() {
        // unsubscribe from selectedContact event
        unregisterAllListeners(this);
    }
}