import React from 'react';
import logo from './logo.svg';
import styles from './Header.module.scss';
import { IHeaderProps } from './IHeaderProps';

interface IHeaderState {

}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {

    }

    render() {
        const { onSearch } = this.props;
        return (
            <div className={styles.header}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a className="navbar-brand" href="#">ShopBridge</a>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
                                </li> */}
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(event) => onSearch(event)} />
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                            </form>
                        </div>
                    </div>
                </nav>            </div>
        );
    }

}

