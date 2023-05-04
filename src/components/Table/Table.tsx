import * as React from "react";
import IWrapper from "@interfaces/IWrapper";

interface ITable {
  header: React.ReactNode;
  children: React.ReactNode;
}

/** Used to encapsulate style */
function Table({ header, children }: ITable) {
  return (
    <table className="border-collapse w-4/5 m-auto">
      <thead>{header}</thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function TH({ children }: IWrapper) {
  return (
    <th
      className="bg-gray-100 border-b border-gray-200 px-8 py-4
    text-gray-800 font-bold text-left"
    >
      {children}
    </th>
  );
}

function TD({ children }: IWrapper) {
  return (
    <th
      className="border-b border-gray-200 font-normal
      px-8 py-4 text-gray-700 text-left"
    >
      {children}
    </th>
  );
}

Table.TH = TH;
Table.TD = TD;

export default Table;
