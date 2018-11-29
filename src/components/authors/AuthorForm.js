import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const AuthorForm = ({author, onSave, onChange, onBackClick, loading, errors}) => {
  console.log('author', author);
  return (
    <form>
      <TextInput
        name="firstName"
        label="First Name"
        value={author.firstName}
        onChange={onChange}
        error={errors.title} />

      <TextInput
        name="lastName"
        label="Last Name"
        value={author.lastName}
        onChange={onChange}
        error={errors.category} />

      <div className="text-right">
        <button
          className="btn btn-outline-secondary"
          onClick={onBackClick}>Back</button>

        <input
          type="submit"
          disabled={loading}
          value={loading ? 'Saving...' : 'Save'}
          className="btn btn-primary pushleft-5"
          onClick={onSave} />
      </div>
    </form>
  );
}

export default AuthorForm;
