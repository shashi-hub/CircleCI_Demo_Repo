public class FoodItemController {
 @AuraEnabled(cacheable=true)
        public static List<Food_Item__c> getFoodItems(String selectedkey) {
        String key = selectedkey ;
        return [
            SELECT Id, Name, Food_Type__c, Picture__c, Price__c, Recommended__c,Food_Category__c
            FROM Food_Item__c
            WHERE Food_Type__c =:key 
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
    @AuraEnabled(cacheable=true)
        public static List<Food_Category__c> getFoodCategory() {
        return [
            SELECT Id, Name 
            FROM Food_Category__c
            WITH SECURITY_ENFORCED
        ];
    }
     @AuraEnabled(cacheable=true)
        public static List<Food_Item__c> getRecommended() {
        return [
            SELECT Id, Name, Food_Type__c, Picture__c, Price__c, Recommended__c,Food_Category__c
            FROM Food_Item__c
            WHERE Recommended__c = true 
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
}