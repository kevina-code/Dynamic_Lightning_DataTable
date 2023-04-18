/**
 * Author       : Lakshay Katney (live.playg.app)
 * Description  : lookup component to be used in Lightning DataTable
 * Created      : 05.17.2021
 *
 * Revisions
 * Date : Name : Notes
 * 04.10.2023 : Kevin Antonioli (braveitnow@pm.me) : modify to be object agnostic/dynamic to work with dynamicDataTable LWC
 */
import lookUp from "@salesforce/apex/LookupController.lookUp";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { api, LightningElement, wire } from "lwc";

export default class LookupLwc extends LightningElement {
  @api valueId;
  @api objName;
  @api iconName;
  @api labelName;
  @api readOnly = false;
  @api filters = "";
  @api showLabel = false;
  @api uniqueKey;
  @api placeholder = "Search";
  @api fieldApiName;
  @api displayFields = "Name";
  @api displayFormat;
  @api recordData;
  @api makeColumnsReadOnly;
  objLabelName;

  /*Create Record Start*/
  @api createRecord;
  isLoaded = false;

  label;
  options; //lookup values
  isValue;
  blurTimeout;
  defaultValue;

  searchTerm;
  href;

  //css
  boxClass =
    "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
  inputClass = "";

  connectedCallback() {
    this.defaultValue = this.valueId;
    if (!this.displayFormat) {
      const splitFields = this.displayFields.split(",");
      this.displayFormat = splitFields[0];
    }
  }

  renderedCallback() {
    if (this.objName) {
      let temp = this.objName;
      if (temp.includes("__c")) {
        let newObjName = temp.replace(/__c/g, "");
        if (newObjName.includes("_")) {
          let vNewObjName = newObjName.replace(/_/g, " ");
          this.objLabelName = vNewObjName;
        } else {
          this.objLabelName = newObjName;
        }
      } else {
        this.objLabelName = this.objName;
      }
    }
  }

  //Used for creating Record Start
  @wire(getObjectInfo, { objectApiName: "$objName" })
  wiredObjectInfo({ error, data }) {
    if (data) {
      const relObjField = this.fieldApiName
        .replace(/\Id$/, "")
        .replace("__c", "__r");
      for (let i = 0; i < this.recordData.length; i++) {
        if (this.recordData[i].Id === this.uniqueKey) {
          const record = this.recordData[i];
          const lookupRecord = record[relObjField];
          if (lookupRecord) {
            this.selectItem(lookupRecord);
            break;
          }
        }
      }

      this.error = undefined;
    } else if (error) {
      this.error = error;
    }
  }

  //Used for creating Record End
  @wire(lookUp, {
    searchTerm: "$searchTerm",
    objApiName: "$objName",
    filters: "$filters",
    fields: "$displayFields"
  })
  wiredRecords({ error, data }) {
    if (data) {
      this.error = undefined;
      this.options = [];
      data.forEach((item) => {
        const option = { ...item };
        option.label = this.generateLabel(option);
        this.options.push(option);
      });
    } else if (error) {
      this.error = error;
    }
  }

  @wire(lookUp, {
    recordId: "$valueId",
    objApiName: "$objName",
    fields: "$displayFields"
  })
  wiredDefault({ error, data }) {
    if (data) {
      if (this.valueId) {
        this.selectItem(data[0]);
        this.options = undefined;
      }
    } else if (error) {
      this.error = error;
    }
  }

  handleClick() {
    this.searchTerm = "";
    this.inputClass = "slds-has-focus";
    this.boxClass =
      "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open";
  }

  inblur() {
    this.blurTimeout = setTimeout(() => {
      this.boxClass =
        "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
    }, 300);
  }

  handleSelect(event) {
    const ele = event.currentTarget;
    const selectedId = ele.dataset.id;
    const key = this.uniqueKey;
    const fieldApiName = this.fieldApiName;
    this.emitChangedEvent(selectedId, key, fieldApiName);

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }

    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].Id === selectedId) {
        this.selectItem(this.options[i]);
        break;
      }
    }
  }

  selectItem(record) {
    //show selection value on screen
    this.boxClass =
      "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
    this.label = this.generateLabel(record);
    this.href = "/" + record.Id;
    this.isValue = true;
    this.options = undefined;
  }

  generateLabel(record) {
    let label = this.displayFormat;
    const splitFields = this.displayFields.split(",");
    splitFields.forEach((field) => {
      field = field.trim();
      let value;

      //logic to handle relationhships in queries
      if (field.indexOf(".") > -1) {
        let splitRelations = field.split(".");
        splitRelations.forEach((item) => {
          value = value ? value[item] : record[item];
        });
      } else {
        value = record[field];
      }
      label = label.replace(field, value);
    });
    return label;
  }

  onChange(event) {
    this.searchTerm = event.target.value;
  }

  handleRemovePill() {
    this.isValue = false;
    this.valueId = "";
    const selectedId = null;
    const key = this.uniqueKey;
    const fieldApiName = this.fieldApiName;
    this.emitChangedEvent(selectedId, key, fieldApiName);
  }

  emitChangedEvent(selectedId, key, fieldApiName) {
    this.dispatchEvent(
      new CustomEvent("lookupchanged", {
        composed: true,
        bubbles: true,
        cancelable: true,
        detail: {
          data: { selectedId, key, fieldApiName }
        }
      })
    );
  }
}