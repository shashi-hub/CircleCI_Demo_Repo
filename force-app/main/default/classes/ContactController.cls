public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c
            FROM Contact
            WHERE Picture__c != null
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
    
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsList() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c, Description
            FROM Contact ORDER BY Name ASC LIMIT 10
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> nextContactList(List<Id> lastQueriedIDs) {
    List<Contact> chunkedContacts =
    [   SELECT  Id, Name, Title, Phone, Email, Picture__c, Description
        FROM    Contact
        WHERE   Id NOT IN :lastQueriedIDs
        ORDER BY Name
        LIMIT 10
    ];
         system.debug(lastQueriedIDs);
        return chunkedContacts;
    }      
        @AuraEnabled(cacheable=true)
    public static List<Contact> previousContactList(List<Id> lastQueriedIDs) {
    List<Contact> chunkedContacts =
    [   SELECT  Id, Name, Title, Phone, Email, Picture__c, Description
        FROM    Contact
        WHERE   Id NOT IN :lastQueriedIDs
        ORDER BY Name
        LIMIT 10
    ];
         system.debug(lastQueriedIDs);
        return chunkedContacts;
}
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c,Description
            FROM Contact
            WHERE Name LIKE :key AND Picture__c != null
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Contact getSingleContact() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c
            FROM Contact
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];
    }
}