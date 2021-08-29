import React from 'react';
import logo from './logo.svg';
import styles from './AddItem.module.scss';
import { IAddItemProps } from './IAddItemProps';

interface IAddItemState {

}

export default class AddItem extends React.Component<IAddItemProps, IAddItemState> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {

    }

    render() {
        const {newItem,onInputChange,onSubmit ,onDropDownChange,onCancel,formType} = this.props;
        const category = [{name:'Food',key:'food'},{name:'Clothes',key:'clothes'},{name:'Electronics',key:'electronics'},{name:'House Hold',key:'houseHold'}]
        return (
            <div className={styles.addItem}>
                <h3>{formType === 'add' ? 'Add Item' : 'Edit Item' }</h3>
                <div className={styles.nameCategory}>
                <div className={styles.name}>
                    
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                    <input type="text" className="form-control" placeholder="Enter Name" name={'name'} onChange={(event)=> onInputChange(event)} aria-label="Name" value={newItem.name} aria-describedby="basic-addon1" />
                </div>
                    </div>
                    <div className={styles.category}>
                    <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" onChange={(event) => onDropDownChange(event)} aria-expanded="false">
                       {newItem && newItem.category ? category.filter(item => item.key === newItem.category)[0].name :'Select Category'} 
                    </button>
                    <ul className="dropdown-menu">
                     {category.map(data => <li><a className="dropdown-item" onClick={() => onDropDownChange(data)}>{data.name}</a></li>)}
                    </ul>
                </div>
                </div>
                </div>
                

                <div className="input-group">
                    <textarea className="form-control" placeholder={"Enter Description"} name={'description'} onChange={(event)=> onInputChange(event)} value={newItem.description} aria-label="With textarea"></textarea>
                    <span className="input-group-text">Description</span>
                </div>


                

                <label htmlFor="basic-url" className="form-label">Image URL</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">{newItem && newItem.imageURL ? newItem.imageURL.split(':')[0]+':': ''}</span>
                    <input type="text" className="form-control" id="basic-url" name={'imageURL'} value={newItem && newItem.imageURL ? newItem.imageURL.split(':')[1] : ''} onChange={(event)=> onInputChange(event)} aria-describedby="basic-addon3" />
                </div>

                <div className={styles.price}>
                    <div className={styles.oPrice}>
                        <label htmlFor="basic-url" className="form-label">Original Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" name={'originalPrice'} value={newItem.originalPrice} onChange={(event)=> onInputChange(event)} aria-label="Amount (to the nearest dollar)" />
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                    <div className={styles.dPrice}>
                        <label htmlFor="basic-url" className="form-label">Discount Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" name={'price'} value={newItem.price} onChange={(event)=> onInputChange(event)} aria-label="Amount (to the nearest dollar)" />
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                </div>

                <div className={styles.action}>
                    <div className={styles.submit}>
                        <button className="btn btn-primary" type="button" onClick={onSubmit}>Submit</button>
                    </div>
                    <div className={styles.cancel}>
                        <button className="btn btn-danger" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

}

