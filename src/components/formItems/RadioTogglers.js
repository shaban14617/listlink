import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RadioTogglers({ options, selected, onChange }) {
  return (
    <div className="radio-togglers shadow">
      {options.map((option) => (
        <label key={option.value}>
          <input type="radio" name="bgType" value={option.value} />
          <div>
            <span>{option.label}</span>
            <FontAwesomeIcon icon={option.icon} />
          </div>
        </label>
      ))}
    </div>
  );
}

export default RadioTogglers;
