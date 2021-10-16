import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilteringMenu = ({ onChange, filter }) => {
  return (
    <div className="filtering-menu mb-2">
      <FontAwesomeIcon
        className="clickable hoverable"
        size="lg"
        icon="list-ul"
        onClick={() => onChange("view", { list: +!filter.view.list })}
      />
    </div>
  );
};

export default FilteringMenu;
