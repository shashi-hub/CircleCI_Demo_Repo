public with Sharing class  FieldSetController {
    
    public with Sharing class FieldSetWrapper{
        
        @AuraEnabled
        public String fieldAPIName { get; set; }
        @AuraEnabled
        public String objectApiName { get; set; }
        
    }
    @AuraEnabled(cacheable=true)
    public static List<FieldSetWrapper> getFields(String objectName , String fieldSetName){
        
        List<FieldSetWrapper> wrapperList = new List<FieldSetWrapper>();
        Schema.SObjectType sObj = Schema.getGlobalDescribe().get(objectName);
        for(Schema.FieldSetMember fieldMember : sObj.getDescribe().fieldSets.getMap().get(fieldSetName).getFields()){
            FieldSetWrapper wrapper = new FieldSetWrapper();
            wrapper.objectApiName = objectName;
            wrapper.fieldApiName = fieldMember.getFieldPath();
            wrapperList.add(wrapper);
        }
        System.debug('#### wrapperList '+JSON.serialize(wrapperList));
        return wrapperList;
    }
}