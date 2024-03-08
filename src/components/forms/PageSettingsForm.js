import {
  faImage,
  faPalette,
  faPallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioTogglers from "../formItems/RadioTogglers";

function PageSettingsForm({ page }) {
  return (
    <div className="-m-4">
      <form>
        <div className="bg-gray-300 h-32 flex justify-center items-center">
          <RadioTogglers
            selected={"color"}
            options={[
              { value: "color", icon: faPalette, label: "Color" },
              { value: "image", icon: faImage, label: "Image" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div>avatar</div>
      </form>
    </div>
  );
}

export default PageSettingsForm;
