# Dynamic_Lightning_DataTable

Object-agnostic easily configurable Dynamic Lightning Datatable LWC
* Leverages lightning-datatable
* Object-agnostic - can be used with any standard or custom object
* Easily configurable - just configure the parameters with desired object name, fields, where clause, etc
* Reusable - configure multiple instances across objects without updating the code
* Use dynamic id fields in optional where clause
* Columns auto format the field type
* Ability to use display relationship names/paths (ex: Account.Owner.Name)

Deploy to Salesforce: https://live.playg.app/play/dynamic-lightning-data-table

Syntax:
```html
<c-dynamic-data-table
     obj-api-name="Contact"
     field-paths="Id, Name, Email, Account.Owner.Name"
     field-paths-for-search="Name, Email"
     where-clause="AccountId = :recordId ORDER BY FirstName"
	 actions-str="view, edit"
     record-data={recordData}
     record-id={recordId}
>
</c-dynamic-data-table>
```

![image](https://user-images.githubusercontent.com/124932501/229315781-e3369e1e-c37c-4656-8f58-4d758e46d5ae.png)

![image](https://user-images.githubusercontent.com/124932501/229315764-2fe1e5bc-200c-44d2-bfca-cd99fa9fbf63.png)
