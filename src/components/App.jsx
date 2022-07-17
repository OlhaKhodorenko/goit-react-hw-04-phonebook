import { nanoid } from 'nanoid';
import { ContactForm } from './contactForm/contactForm';
import Filter from './filter/filter';
import ContactList from './contactList/contactList';
import savedContacts from './savedContacts.json';
import { useState, useEffect } from 'react';

const INITIAL_STATE = {
  contacts: savedContacts,
  filter: '',
};

export const App = () => {
  const [contacts, setContacts] = useState(INITIAL_STATE.contacts);
  const [filter, setFilter] = useState(INITIAL_STATE.filter);

  const addContact = ({ name, number }) => {
    const includedСontact = contacts.find(contact => contact.name === name);
    if (includedСontact) {
      alert(name + 'is already in contacts.');
      return;
    }
    setContacts([
      {
        id: nanoid(),
        name,
        number,
      },
      ...contacts,
    ]);
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedValue = filter.toLocaleLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizedValue)
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const LSContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(LSContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }
  return (
    <div className="container">
      <h1>Phonebook</h1>
      <div className="wrap">
        <div>
          <ContactForm onFormSubmit={addContact} />
          <Filter value={filter} changeFilter={changeFilter} />
        </div>
        <div>
          <h2>Contacts</h2>
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    </div>
  );
};

// export default class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };
//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedValue = filter.toLocaleLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLocaleLowerCase().includes(normalizedValue)
//     );
//   };

//   addContact = ({ name, number }) => {
//     const includedСontact = this.state.contacts.find(
//       contact => contact.name === name
//     );
//     if (includedСontact) {
//       alert(name + 'is already in contacts.');
//       return;
//     }
//     this.setState(({ contacts }) => {
//       return {
//         contacts: [
//           {
//             id: nanoid(),
//             name,
//             number,
//           },
//           ...contacts,
//         ],
//       };
//     });
//   };

//   deleteContact = contactId => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== contactId),
//     }));
//   };
//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();
//     return (
//       <div className="container">
//         <h1>Phonebook</h1>
//         <div className="wrap">
//           <div>
//             <ContactForm onFormSubmit={this.addContact} />
//             <Filter value={filter} changeFilter={this.changeFilter} />
//           </div>
//           <div>
//             <h2>Contacts</h2>
//             <ContactList
//               filteredContacts={filteredContacts}
//               onDeleteContact={this.deleteContact}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
