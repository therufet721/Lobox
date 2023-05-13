import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { FaCheck, FaAngleDown, FaAngleUp } from "react-icons/fa";

const useStyles = createUseStyles({
  dropdown: {
    position: "relative",
    width: "300px",
  },
  input: {
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgb(161,172,218)",
    borderRadius: "14px",
    "&:focus": {
      border: "2px solid rgb(161,172,218)",
      boxShadow: "0px 0px 8px rgb(161,172,218)",
      outline: "none",
    },
  },
  dropdownItems: {
    position: "absolute",
    top: "45px",
    width: "100%",
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "20px",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  dropdownItem: {
    margin: "5px",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "rgb(242,244,255)",
      borderRadius: "12px",
    },
    "&.selected": {
      padding: "5px",
      backgroundColor: "rgb(242,244,255)",
      borderRadius: "12px",
      margin: "5px",
    },
  },
  tick: {
    color: "rgb(110,128,210)", // change this to blue
  },
  table: {
    marginTop: "10px",
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
  },
});

interface DropdownItem {
  title: string;
  subItems: string[];
  emoji: string;
}

const initialItems: DropdownItem[] = [
  {
    title: "Science",
    subItems: ["Physics", "Chemistry", "Biology"],
    emoji: "🔬",
  },
  {
    title: "Education",
    subItems: ["Math", "English", "History"],
    emoji: "🎓",
  },
  {
    title: "Sport",
    subItems: ["Soccer", "Basketball", "Tennis"],
    emoji: "⚽",
  },
  {
    title: "Art",
    subItems: ["Painting", "Sculpture", "Photography"],
    emoji: "🎨",
  },
  {
    title: "Games",
    subItems: ["Chess", "Poker", "Monopoly"],
    emoji: "🎮",
  },
];

const Dropdown: React.FC = () => {
  const [items, setItems] = useState<DropdownItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    if (searchValue === "") {
      setSelectedItem(null);
      setItems(initialItems);
    } else {
      const filteredItems = initialItems.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setItems(filteredItems);
    }
  }, [searchValue]);

  const handleSelectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={() => setIsOpen(true)}
        className={classes.input}
        placeholder={`Search...`}
      />

      {isOpen && (
        <div className={classes.dropdownItems}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${classes.dropdownItem} ${
                item.title === selectedItem?.title ? "selected" : ""
              }`}
              onClick={() => handleSelectItem(item)}
            >
              <span>
                {item.title}
                <span role="img" aria-label={item.title}>
                  {item.emoji}
                </span>
              </span>
              {item.title === selectedItem?.title && (
                <span className={classes.tick}>
                  <FaCheck />
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <table className={classes.table}>
          <tbody>
            {selectedItem.subItems.map((subItem, index) => (
              <tr key={index} className={classes.tableRow}>
                <td className={classes.tableCell}>{subItem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dropdown;
