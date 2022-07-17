import PropTypes from 'prop-types';
import css from './filter.module.css';

const Filter = ({ value, changeFilter }) => {
  return (
    <label>
      <h3>Find contacts by name</h3>
      <input value={value} className={css.input} onChange={changeFilter} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Filter;
