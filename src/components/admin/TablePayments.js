import React from "react";

const TablePayments = ({ payments, setData }) => {
  return (
    <>
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-theme">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                    >
                      Short Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-black-300 uppercase tracking-wider"
                    >
                      Icon
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-right text-xs font-medium text-black-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-right text-xs font-medium text-black-300 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-theme">
                  {payments.length > 0 ? (
                    payments?.map((item, key) => (
                      <tr
                        className={`${
                          key % 2 === 0 ? "" : "bg-theme"
                        } hover:opacity-50`}
                        key={key}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                          <span className="capitalize font-medium">
                            {item.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                          <>{item.short_name}</>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-left">
                          <img src={item.icon} className="w-5" alt="icon" />
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right`}
                        >
                          {item.status ? "Active" : "Inactive"}
                        </td>
                        <td
                          className={`text-black-300 px-6 py-4 whitespace-nowrap text-sm cursor-pointer text-right`}
                          onClick={() => setData(item)}
                        >
                          Edit
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-black-400">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePayments;
