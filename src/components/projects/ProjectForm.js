import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ProjectForm = ({project, onSave, onChange, onBackClick, loading, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={project.name}
        onChange={onChange}
        error={errors.name} />

      <TextInput
        name="abbreviation"
        label="Abbreviation"
        value={project.abbreviation}
        onChange={onChange}
        error={errors.abbreviation} />

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows="8"
          className="form-control"
          value={project.description}
          onChange={onChange}></textarea>
      </div>

      <TextInput
        name="totalHours"
        label="Total Hours"
        value={project.totalHours}
        onChange={onChange}
        error={errors.totalHours} />

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

export default ProjectForm;
