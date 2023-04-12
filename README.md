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
     suppress-bottom-bar=false
     record-data={recordData}
     record-id={recordId}
     onrowstoggled={handleRowsToggled}
>
</c-dynamic-data-table>
```

---------------------------

https://user-images.githubusercontent.com/124932501/231554147-ab9f2d6b-8464-4c34-9f54-060f7727880f.mp4

---------------------------

![Dynamic Data table config](https://user-images.githubusercontent.com/124932501/231554202-00c51ca6-2e04-4ad4-97fd-bf5cb986f08f.png)

---------------------------

![Dynamic Data table ex](https://user-images.githubusercontent.com/124932501/231554243-34515dd5-98e7-40e9-8a80-0d1e2dbf601b.png)

