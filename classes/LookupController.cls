/**
 * Author       : Lakshay Katney (live.playg.app)
 * Description  : lookup component to be used in Lightning DataTable
 * Created      : 05.17.2021
 *
 * Revisions
 * Date : Name : Notes
 * 04.10.2023 : Kevin Antonioli (braveitnow@pm.me) : modify to work with dynamicDataTable LWC
 */
public class LookupController {
  @AuraEnabled(cacheable=true)
  public static List<SObject> lookUp(
    String searchTerm,
    String objApiName,
    String filters,
    String recordId,
    String fields
  ) {
    Integer limitNum = 20;
    String finalQuery = 'SELECT ' + fields + ' FROM ' + objApiName;

    if (String.isBlank(recordId)) {
      if (String.isNotBlank(searchTerm)) {
        finalQuery += ' WHERE Name Like  \'%' + searchTerm + '%\' ';
      }

      if (String.isNotBlank(filters)) {
        finalQuery += String.isNotBlank(searchTerm) ? ' AND ' : ' WHERE ';
        finalQuery += filters;
      }
    } else {
      finalQuery += ' WHERE Id =  \'' + recordId + '\'';
    }

    finalQuery += ' LIMIT ' + limitNum;
    return database.query(finalQuery);
  }
}