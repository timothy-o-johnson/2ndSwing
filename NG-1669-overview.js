// NG-1669-overview: Map Reduce Job when KITs are updated in NS VIA Fast Sync to Update all of the parent models to sync to Magento 

Technical requirements:

1. create a new item field called “kit_needs_refresh” - checkbox

2. When a kit item (ie: service matrix parent or child) is updated/created/deleted

3. find the SERVICE PARENT of the matrix parent, and set kit_needs_refresh to true.

4. create a MR job which finds service parent’s with kit_needs_refresh = true

5. map phase should emit item ids based on 2 further searches

    a. find all inventory items where kit attribute (based on the parent service item’s class - new or used)

6. reduce phase should take those item ids, and publish them to bus using the library, as shown in:

    a. PublishToBus\FileCabinet\SuiteScripts\PublishToBus\MR_PublishItemsFromSavedSearch.js’s map function. (in fact, you could use this script as a starting point for your new one here…)

    b. note - don’t confuse this with PublishToBus\FileCabinet\SuiteScripts\PublishToBus\MR_PublishSavedSearchResults.js, which does it INCORRECTLY.

7. setup this MR job to run on a schedule per  choosing (probably a few times per day is best…

