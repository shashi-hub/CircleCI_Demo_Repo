public without sharing class EventController {
    class EventWrapper {
        @auraEnabled public DateTime EndDateTime {get;set;}
        @auraEnabled public DateTime StartDateTime {get;set;}
        @auraEnabled public String EndDate {get;set;}
        @auraEnabled public String StartDate {get;set;}
        @auraEnabled public String Subject {get;set;}
        @auraEnabled public String Location {get;set;}
        @auraEnabled public String AssignedTo {get;set;}
        @auraEnabled public String Id {get;set;}
        @auraEnabled public List<String> EventDates {get;set;}

    } 

    @AuraEnabled(cacheable=true)
    public static List<EventWrapper> getEvents() {
      List<EventWrapper> eveWrapList = new List<EventWrapper>();   
      List<String> datesBetweenStartEnd = new List<String>();
        for(Event eve : [ SELECT AccountId,Description,EndDateTime,Id,IsAllDayEvent,Owner.Name,StartDateTime,Subject,WhatId,Who.Name,Location
                          FROM Event 
                          ORDER BY StartDateTime ASC]){
         EventWrapper eveWrap = new EventWrapper();
            DateTime startDT = eve.StartDateTime;
            DateTime endDT = eve.EndDateTime;
            eveWrap.Id = eve.Id;
            Date startDate = date.newinstance(startDT.year(), startDT.month(), startDT.day());
            Date endDate = date.newinstance(endDT.year(), endDT.month(), endDT.day());
            if(StartDate != EndDate){
               for(Integer i=0; i<= StartDate.daysBetween(EndDate); i++) {
                Date d = StartDate.addDays(i);
                if(String.ValueOf(d.month()).length() != 2 && String.ValueOf(d.day()).length() == 2){
                    String formattedDate = d.day()+ '-0' + d.month() + '-' + d.year();
                    datesBetweenStartEnd.add(formattedDate);
                }
                else if(String.ValueOf(d.day()).length() != 2 && String.ValueOf(d.month()).length() != 2){
                    String formattedDate = '0' + d.day()+ '-0' + d.month() + '-' + d.year();
                    datesBetweenStartEnd.add(formattedDate);
                }
                else if(String.ValueOf(d.day()).length() != 2 ){
                    String formattedDate = '0' + d.day()+ '-' + d.month() + '-' + d.year();
                    datesBetweenStartEnd.add(formattedDate);
                }
                else{
                    String formattedDate = d.day()+ '-' + d.month() + '-' + d.year();
                datesBetweenStartEnd.add(formattedDate);      
                   }
                 }
            }
            else{
                String dT = String.ValueOf(startDT);
                Datetime dtim = Datetime.valueOf(dT.replace('T',' '));
                String singleDate = dtim.format('dd-MM-yyyy');
                datesBetweenStartEnd.add(singleDate);
            }
            eveWrap.Location = eve.Location;
            eveWrap.Subject = eve.Subject;
            eveWrap.StartDateTime = eve.StartDateTime;
            eveWrap.EndDateTime = eve.EndDateTime;
            eveWrap.AssignedTo = eve.Owner.Name;
            eveWrapList.add(eveWrap);
            eveWrap.EventDates = datesBetweenStartEnd;
        }
        return eveWrapList;
    }
        @AuraEnabled
        public static List<Event> fetchAllEvents(){
            List<Event> eventList = new List<Event>();
            eventList = [Select Id, Subject, WhatId, WhoId, 
                        Description, EndDate, EndDateTime, OwnerId,
                        ActivityDate, ActivityDateTime From Event LIMIT 100];
            return eventList;
        }
}
