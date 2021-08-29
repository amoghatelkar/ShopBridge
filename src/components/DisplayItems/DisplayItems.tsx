import React from 'react';
import styles from './DisplayItems.module.scss';
import { IDisplayItemsProps } from './IDisplayItemsProps';

interface IDisplayItemsState {

}

export default class DisplayItems extends React.Component<IDisplayItemsProps, IDisplayItemsState> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {

    }

    render() {
        const { items ,onDelete,onEdit} = this.props;
        const imageURL = 'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png';
        return (
            <div className={styles.displayItems}>
                <div className={styles.itemsGrid}>
                {items.map((item: any) =>
                    <div className={styles.item}>
                        <div className="card" >
                            <img src={item && item.imageURL ? item.imageURL : imageURL} className="card-img-top" alt="Please Provide Image URL" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Category : {item.category}</li>
                                <li className="list-group-item">Original Price : ${item.originalPrice}</li>
                                <li className="list-group-item">Discounted Price : ${item.price}</li>
                            </ul>
                            <div className="card-body actionButtons">
                            <div className={styles.edit}>
                            <button className="btn btn-outline-primary" type="button" onClick={() => onEdit(item)}>Edit</button>
                            </div>
                            <div className={styles.delete}>
                            <button className="btn btn-outline-danger" type="button" onClick={() => onDelete(item)}>Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    }

}

