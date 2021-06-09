import { LightningElement, track, api, wire } from 'lwc';
import events from "@salesforce/apex/EventController.getEvents";
export default class UpcomingAppointments extends LightningElement {
@track param = '';
@track events;
@track error;
@track eventDates = [];
@track showCalendar=false;
// @wire(events)
//    wiredProperty({data, error}){
//        if(data){
//         console.log("In data");
//            this.events = data;
//            console.log(JSON.stringify(this.events));
//        }
//         else if (error) {
//             console.log("In error");
//            console.error(error);
//         }
//     }
connectedCallback(){
    this.getEvents();
}
    getEvents() {
        events()
            .then(result => {
                this.events = result;
                console.log(JSON.stringify(result[0].EventDates));
                var arr1 = result[0].EventDates;
                var set1 = new Set(arr1);
                let arr = [...set1];
                this.eventDates = arr;
                console.log(this.eventDates);
                this.showCalendar = true;
                // this.eventDates = set1;
                // console.log(JSON.stringify(this.events));
                // console.log('set1==='+JSON.stringify(this.eventDates));
            })
            .catch(error => {
                console.error(error);
            });
    }
   
        handleClick(event){
            event.stopPropagation();
           console.log( event.target.dataset.item);
          
        }
    
}