import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RadioTogglers({ options, defaultValue, onChange }) {
  return (
    <div className="radio-togglers shadow">
      {options.map((option) => (
        <label key={option.label}>
          <input
            type="radio"
            name="bgType"
            value={option.value}
            defaultChecked={defaultValue === option.value}
            onClick={(ev) => onChange(ev.target.value)}
          />
          <div>
            <span>{option.label}</span>
            <FontAwesomeIcon icon={option.icon} />
            <FontAwesomeIcon icon={option.icon} />
          </div>
        </label>
      ))}
    </div>
  );
}

export default RadioTogglers;
