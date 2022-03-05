import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toggle from "react-toggle";

const ThemeToggle = ({ onChange }) => {
  return (
    <label>
      <Toggle
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon inverse icon="sun" />,
          unchecked: <FontAwesomeIcon inverse icon="moon" />,
        }}
        onChange={onChange}
      />
    </label>
  );
};

export default ThemeToggle;
