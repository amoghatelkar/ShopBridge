export interface IAddItemProps {
    onInputChange(event:any) :void;
    newItem:any;
    onSubmit():void;
    onCancel():void;
    onDropDownChange(data:any):void;
    formType:'add'|'edit';
}