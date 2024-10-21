import React from "react";

interface Column {
  field: string;
  headerName: string;
}

interface TableComponentProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => JSX.Element;
}

const getValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  actions,
}) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 shadow-md table-fixed">
        <thead>
          <tr className="bg-custom-gradient text-customGray font-serif">
            {columns.map((column) => (
              <th key={column.field} className="py-2 px-4 border-b text-left">
                {column.headerName}
              </th>
            ))}
            {actions && <th className="py-2 px-4 border-b text-left">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.field} className="py-2 px-4 border-b text-left">
                  {/* Handle images separately */}
                  {column.field === "images" ? (
                    <img
                      src={row.images[0] || "https://via.placeholder.com/150"}
                      alt={row.service_name}
                      className="h-16 w-16 object-cover"
                    />
                  ) : (
                    getValue(row, column.field) // Use getValue to handle nested fields
                  )}
                </td>
              ))}
              {actions && (
                <td className="py-2 px-4 border-b text-left">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
