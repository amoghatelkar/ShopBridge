import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase';
import DisplayItems from './components/DisplayItems/DisplayItems';
import AddItem from './components/AddItem/AddItem';
import Header from './components/Header/Header';

interface IAppState {
  heading: string;
  allItems: any;
  items: any;
  newItem: any;
  formType:'edit'|'add';
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      heading: "Welcome to Shop Bridge",
      allItems: [],
      items: [],
      newItem: {},
      formType:'add'
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.storage();
    } else {
      firebase.app();
    }
  }

  public componentDidMount = () => {
    this.listenForChange();
  }

  listenForChange = () => {
    let allItems = this.state.allItems; // create a copy of this.state.Books
    firebase
      .database()
      .ref("items")
      .on("child_added", snapshot => {
        console.log(snapshot);
        let item = {
          key: snapshot.key,
          name: snapshot.val().name,
          description: snapshot.val().description,
          price: snapshot.val().price,
          category: snapshot.val().category,
          imageURL: snapshot.val().imageURL,
          originalPrice: snapshot.val().originalPrice,
        };
        allItems.push(item);
        this.setState({ // call this.setState function with the updated books
          allItems: allItems,
          items: allItems
        }, () => console.log(this.state.allItems));
      });

    firebase
      .database()
      .ref("items")
      .on("child_removed", snapshot => {
        this.setState(prevState => ({ // You can also get the current state passing a callback to this.setState
          allItems: prevState.allItems.filter((item: any) => item.key !== snapshot.key),
          items: prevState.allItems.filter((item: any) => item.key !== snapshot.key),
        }));
        console.log("Deleted " + this.state.allItems.length);
      });

    firebase
      .database()
      .ref("items")
      .on("child_changed", snapshot => {
        let Index = allItems.findIndex((obj: any) => obj.key === snapshot.key);
        allItems[Index].name = snapshot.val().name;
        allItems[Index].description = snapshot.val().description;
        allItems[Index].imageURL = snapshot.val().imageURL;
        allItems[Index].category = snapshot.val().category;
        allItems[Index].price = snapshot.val().price;
        allItems[Index].originalPrice = snapshot.val().originalPrice;
        allItems[Index].key = snapshot.key;

        this.setState({
          allItems: allItems,
          items: allItems
        });
      });
  }

  private onInputChange = (event: any) => {
    this.setState({
      newItem: { ...this.state.newItem, [event.target.name]: event.target.value }
    })
    console.log(this.state.newItem);
  }

  private onDropDownChange = (data: any) => {
    console.log(data);
    this.setState({
      newItem: { ...this.state.newItem, category: data.key }
    })
  }

  private validate = () => {
    const {newItem} = this.state;
    return newItem.name && newItem.description && newItem.category && newItem.imageURL && newItem.originalPrice && newItem.price
  }

  private onSubmit = () => {
    try {
      const { newItem } = this.state;
      if (this.validate()) {
        var newItemData = {
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
          category: newItem.category,
          imageURL: newItem.imageURL,
          originalPrice: newItem.originalPrice,
          created: new Date().toDateString(),
          modified: new Date().toDateString()
        };

        let clearData = {
          name:'',
          description:'',
          originalPrice:'',
          price:'',
          imageURL:'',
          created:'',
          modified: '',
          key:''
        }
        if(this.state.formType === 'add'){
          firebase.database().ref("items").push(newItemData).then(() => this.setState({
            newItem: clearData
          },() => alert(`Successfully added the item : ${newItemData.name}`)));
        }
        else if(this.state.formType === 'edit'){
          firebase.database().ref("items").child(this.state.newItem.key).set(newItemData).then(() => this.setState({
            newItem: clearData,
            formType:'add'
          },() => alert(`Successfully modified the item : ${newItemData.name}`)));
        }
        
      } else {
        alert("Please fill all the fields");
      }
    }
    catch (error) {
      alert("Uploading item Failed");
    }
  }

  private onEdit = (item:any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      newItem:item,
      formType:'edit'
    });
  }

  private onDelete = (item:any) => {
        firebase.database().ref('items').child(item.key).remove();
  } 

  private onCancel = () => {
    this.setState({
      newItem:{
        name:'',
        description:'',
        originalPrice:'',
        price:'',
        imageURL:'',
        created:'',
        modified: '',
        key:''
      },
      formType:'add'
    });
  }

  private onSearch = (event:any) => {

    let allItems = JSON.parse(JSON.stringify(this.state.allItems));
      this.setState({
        items:allItems.filter((item:any) =>  item.name.toLowerCase().search(event.target.value.toLowerCase()) > -1)
      })
  } 

  render() {
    const { items, newItem ,formType} = this.state;
    return (
      <div className={styles.app}>
        <Header onSearch={this.onSearch}/>
        <AddItem formType={formType} onInputChange={this.onInputChange} newItem={newItem} onSubmit={this.onSubmit} onCancel={this.onCancel} onDropDownChange={this.onDropDownChange} />
        {formType === 'add' ? <DisplayItems items={items} onDelete={this.onDelete} onEdit={this.onEdit} /> : null}
        
      </div>
    );
  }

}

