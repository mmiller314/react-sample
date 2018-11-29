import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const TaskForm = ({task, allResources, completedOptions, onSave, onChange, onBackClick, loading, errors}) => {
  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={task.name}
        onChange={onChange}
        error={errors.name} />

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows="8"
          className="form-control"
          value={task.description}
          onChange={onChange}></textarea>
      </div>

      <SelectInput
        name="assignToId"
        label="Assign To"
        value={task.assignToId}
        defaultOption="Select Resource"
        options={allResources}
        onChange={onChange}
        error={errors.assignToId} />

      <TextInput
        name="hours"
        label="Hours"
        value={task.hours}
        onChange={onChange}
        error={errors.hours} />

        <SelectInput
          name="completed"
          label="Is Complete"
          value={task.completed}
          defaultOption="-- Select --"
          options={completedOptions}
          onChange={onChange}
          error={errors.completed} />

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

export default TaskForm;
