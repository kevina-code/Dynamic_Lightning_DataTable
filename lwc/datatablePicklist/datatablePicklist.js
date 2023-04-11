/**
 * Author       : Lakshay Katney (live.playg.app)
 * Description  : lookup component to be used in Lightning DataTable
 * Created      : 05.17.2021
 *
 * Revisions
 * Date : Name : Notes
 * 04.10.2023 : Kevin Antonioli (braveitnow@pm.me) : modify to be object agnostic/dynamic to work with dynamicDataTable LWC
 */
import { LightningElement, api } from "lwc";

export default class DatatablePicklist extends LightningElement {
  @api label;
  @api placeholder;
  @api options;
  @api value;
  @api context;
  @api fieldApiName;

  handleChange(event) {
    //show the selected value on UI
    this.value = event.detail.value;

    //fire event to send context and selected value to the data table
    this.dispatchEvent(
      new CustomEvent("picklistchanged", {
        composed: true,
        bubbles: true,
        cancelable: true,
        detail: {
          data: {
            context: this.context,
            value: this.value,
            fieldApiName: this.fieldApiName
          }
        }
      })
    );
  }
}