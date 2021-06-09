import { LightningElement, api, track } from 'lwc';
// import moment from 'moment';
//import { moment } from "c/handleMultiSelect";
import moment from '@salesforce/resourceUrl/moment';
import { loadScript } from 'lightning/platformResourceLoader';
export default class DatePicker extends LightningElement {
    lastClass;
    @track moment;
    @track today;
    @track dateContext;
    @track selectedDate;
    @track dates = [];
    @track formattedSelectedDate;
    @api eventDates;
    // @track dat=["14-03-2021","15-03-2021","16-03-2021","05-03-2021"];
    connectedCallback(){
        Promise.all([
            loadScript(this, moment )
          ]).then(() => {
           this.loadActivities();
        })
        .catch(error => {
            console.error({
              message: 'Error occured on datePicker',
              error
            });
          })
    }

 loadActivities(){
    console.log('this.today========');

    // this.moment = window.moment();
    this.today = window.moment();
    this.dateContext = window.moment();
    this.selectedDate = window.moment();
        this.formattedSelectedDate = this.selectedDate.format('DD-MM-YYYY');
        this.year = this.dateContext.format('Y');
        this.month = this.dateContext.format('MMMM');
        this.refreshDateNodes();
    }

    previousMonth() {
        this.dateContext = window.moment(this.dateContext).subtract(1, 'month');
        this.month = this.dateContext.format('MMMM');
        this.year = this.dateContext.format('Y');
        this.refreshDateNodes();
    }

    nextMonth() {
        this.dateContext = window.moment(this.dateContext).add(1, 'month');
        this.month = this.dateContext.format('MMMM');
        this.year = this.dateContext.format('Y');
        this.refreshDateNodes();
    }

    goToday() {
        this.selectedDate = this.today;
        this.dateContext = this.today;
        this.month = this.dateContext.format('MMMM');
        this.year = this.dateContext.format('Y');
        this.formattedSelectedDate =  this.dateContext.format('DD-MM-YYYY');
        this.refreshDateNodes();
    }

    @api
    setSelected(e) {
        const selectedDate = this.template.querySelector('.selected');
        if (selectedDate) {
            selectedDate.className = this.lastClass;
        }

        const { date } = e.target.dataset;
        console.log(JSON.stringify(date));
        this.selectedDate = window.moment(date);
        this.dateContext = window.moment(date);
        this.lastClass = e.target.className;
        e.target.className = 'selected';
        this.formattedSelectedDate = this.selectedDate.format('DD-MM-YYYY');
    }

    refreshDateNodes() {
        this.dates = [];
        const currentMoment = window.moment(this.dateContext);
        // startOf mutates moment, hence clone before use
        const start = this.dateContext.clone().startOf('month');
        const startWeek = start.isoWeek();
        // months do not always have the same number of weeks. eg. February
        const numWeeks =
            window.moment.duration(currentMoment.endOf('month') - start).weeks() + 1;
        for (let week = startWeek; week <= startWeek + numWeeks; week++) {
            Array(7)
                .fill(0)
                .forEach((n, i) => {
                    const day = currentMoment
                        .week(week)
                        .startOf('week')
                        .clone()
                        .add(n + i, 'day');
                    let className = '';
                    if (day.month() === this.dateContext.month()) {
                        if (day.isSame(this.today, 'day')) {
                            className = 'today';
                        } else if (day.isSame(this.selectedDate, 'day')) {
                            className = 'selected';
                        } else {
                            className = 'date';
                            for(let i in this.eventDates){
                                console.log(this.eventDates[i]);
                                if(this.eventDates[i] === day.format('DD-MM-YYYY')) {
                                    className = 'eventday';
                                } 
                            }
                        }
                    } else {
                        className = 'padder';
                        for(let i in this.eventDates){
                            console.log(this.eventDates[i]);
                            if(this.eventDates[i] === day.format('DD-MM-YYYY')) {
                                className = 'previouseventday';
                            } 
                        }
                    }
                    this.dates.push({
                        className,
                        formatted: day.format('YYYY-MM-DD'),
                        text: day.format('DD')
                    });
                    console.log('this.dates==='+JSON.stringify(this.dates));
                });
        }
    }

    // connectedCallback() {
    //     this.refreshDateNodes();
    // }
}