import { LightningElement, track, wire } from 'lwc';
import getContactsList from '@salesforce/apex/ContactController.getContactsList';
import findContacts from '@salesforce/apex/ContactController.findContacts';
import getNextContacts from '@salesforce/apex/ContactController.nextContactList';
import getPreviousContacts from '@salesforce/apex/ContactController.previousContactList';
previousContactList
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class SearchComponent extends LightningElement {
    @track defaultContact = [];
    @track allContacts = [];
    @track contacts = [];
    @track chunkContacts = [];
    @track stackedArray = [];
    @track collectIds = [];
    @track loaded = false;
    @track issearching = false;
    @track seeMore = true;
    @track showMore;
    @track stackIndex = 0;
    @track error;
    @track contactsStack;
    @track count = 1;
    @track lastQueriedIDs = [];
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
            this.getContacts();
        }
        //displays remaining contacts available in a set of 10
    handleNext(event) {
        event.preventDefault();
        this.stackedArray = this.chunk(this.lastQueriedIDs, 10);
        this.stackIndex = this.stackedArray.length - 1;
        console.log('lastqueriedId' + this.lastQueriedIDs);
        console.log('stackedArray' + this.stackedArray);
        getNextContacts({
                lastQueriedIDs: this.lastQueriedIDs
            })
            .then((data) => {
                this.contacts = data;
                //this.contactsStack.push(handleQueriedIds(this.contacts));
                this.handleQueriedIds(this.contacts);
                console.log('this.lastQueriedIDsnext' + this.lastQueriedIDs);
            })
            .catch((error) => {
                this.error = error;
            })
    }
    handlePrevious(event) {
        event.preventDefault();
        console.log('ss!!!!!!!' + this.stackIndex);
        var collect = this.stackedArray[this.stackIndex];
        this.collectIds.push(collect);
        console.log('this.collectIds' + this.collectIds);
        //console.log('this.stackedArray' + JSON.stringify(this.stackedArray));
        console.log('!!!!!!!ss' + this.stackIndex);
        this.stackIndex--;
        getPreviousContacts({
                lastQueriedIDs: this.collectIds
            })
            .then((data) => {
                this.contacts = data;
            })
            .catch((error) => {
                this.error = error;
            })
    }
    chunk(array, size) {
            const chunkedContacts = [];
            var index = 0;
            chunkedContacts.push([]);
            for (let i = 0; i < array.length; i++) {
                if (i !== 0 && i % size === 0) {
                    chunkedContacts.push([array[i]]);
                    index++;
                } else {
                    chunkedContacts[index].push(array[i]);
                }
            }
            this.stackedArray = chunkedContacts;
            return chunkedContacts;
        }
        //get all contacts from the server
    getContacts() {
        getContactsList()
            .then((data) => {
                this.contacts = data;
                this.handleQueriedIds(this.contacts);
                console.log('this.contactsStack' + this.contactsStack);
                this.count = 1;
                fireEvent(this.pageRef, 'selectedContact', allContacts[0]);
            })
            .catch((error) => {
                this.error = error;
            })
    }
    handleQueriedIds(contacts) {
        for (var i in contacts) {
            this.lastQueriedIDs.push(contacts[i].Id);
        }
    }

    //show the filtered list according to the user's input
    handleKeyChange(event) {
            var userInput = event.target.value;
            this.issearching = true;
            this.seeMore = userInput.length === 0 ? true : false;
            findContacts({
                    searchKey: userInput
                })
                .then((data) => {
                    this.contacts = userInput.length === 0 ? this.defaultContact : data;
                    this.issearching = false;
                    this.count = 0;
                })
                .catch((error) => {
                    this.error = error;
                })
        }
        //fires the event with selected contact
    handleClick(event) {
        event.preventDefault();
        var i = event.currentTarget.dataset.id;
        console.log('key' + this.contacts[i]);
        fireEvent(this.pageRef, 'selectedContact', this.contacts[i]);
    }
}
/**chunk(array, size) {
               const chunkedContacts = [];
               for (let i = 0; i < array.length; i++) {
                   const last = chunkedContacts[chunkedContacts.length - 1];
                   //console.log('last' + last);
                   if (!last || last.length === size) {
                       // console.log('chunkedContacts' + array[i]);
                       chunkedContacts.push([array[i]]);
                       console.log('chunkedContacts' + [i]);
                       //console.log('chunkedContacts' + chunkedContacts);
                   } else {
                       last.push(array[i]);
                       console.log('array[i]' + array[i]);
                   }
               }
               this.chunkContacts = chunkedContacts;
               this.contacts = this.chunkContacts[0];
               this.defaultContact = this.chunkContacts[0];
           }*/
/*chunk(array, size) {
            const chunkedContacts = [];
            var index = 0;
            chunkedContacts.push([]);
            for (let i = 0; i < array.length; i++) {
                if (i !== 0 && i % size === 0) {
                    chunkedContacts.push([array[i]]);
                    index++;
                } else {
                    chunkedContacts[index].push(array[i]);
                }
            }
            console.log('chunkedContacts' + chunkedContacts);
            this.contacts = this.defaultContact = chunkedContacts[0];
            this.chunkContacts = chunkedContacts;
        }*/