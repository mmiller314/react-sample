import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allAuthors, onSave, onChange, onBackClick, loading, errors}) => {
  return (
    <form>
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title} />

      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId}
        defaultOption="Select Author"
        options={allAuthors}
        onChange={onChange}
        error={errors.authorId} />

      <TextInput
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={errors.category} />

      <TextInput
        name="length"
        label="Length"
        value={course.length}
        onChange={onChange}
        error={errors.length} />

      <TextInput
        name="watchHref"
        label="Watch Href"
        value={course.watchHref}
        onChange={onChange}
        error={errors.length} />

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

export default CourseForm;
