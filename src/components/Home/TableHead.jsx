import { useState } from "react";

/* FontAwesome import */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";


const TableHead = ({ columns, handleSorting }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                    ? sortField === accessor && order === "asc"
                        ? "up" : sortField === accessor && order === "desc"
                        ? "down" : "default"
                    : "none";
                return (
                    <th 
                        key={accessor} 
                        id={'th-'+accessor}
                        onClick={sortable ? () => handleSortingChange(accessor) : null}
                        
                    >
                        <div className="th-content">
                            {label}

                            <div className="sort-icon">
                                <FontAwesomeIcon icon={faSortUp} id="sortUp" className={cl} />
                                <FontAwesomeIcon icon={faSortDown} id="sortDown" className={cl} />
                                <FontAwesomeIcon icon={faSort} id="sortDefault" className={cl} />
                            </div>
                        </div>
                    </th>
                )})}
            </tr>
        </thead>
    );
};
   
export default TableHead;