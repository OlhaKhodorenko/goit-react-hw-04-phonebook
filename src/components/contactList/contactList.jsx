import PropTypes from 'prop-types';
import css from './contactList.module.css';

const ContactList = ({ filteredContacts, onDeleteContact }) => {
  return (
    <ul className={css.contactsList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.listItem}>
          <span className={css.marker}></span>
          <p className={css.itemName}>
            {name}: {number}
          </p>
          <button
            className={css.removeBtn}
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            remove
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default ContactList;
